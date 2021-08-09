import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { app } from "./app-controller";
import { handleStartGame } from "./game-controller";
import Game, { findGame } from "./interfaces/Game";
import { User } from "./interfaces/User";

const httpServer = createServer(app);
const options = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
};

const io = new Server(httpServer, options);
const lobby = io.of("/lobby");

lobby.on("connection", async (socket: Socket) => {
  const username: string = socket.handshake.auth.username;
  const ope: string = socket.handshake.auth.ope;
  const user: User = {
    _id: socket.id,
    username: username,
    ope: ope,
  };

  socket.join(ope);
  let game = findGame(ope);
  game.users.push(user);
  emitGame(game);

  socket.on("disconnect", function (reason) {
    game.users = game.users.filter((userFilter: User) => {
      return userFilter._id !== user._id;
    });
    emitGame(game);
  });

  socket.on("update-game", (updatedGame: Game) => {
    game = updatedGame;
    emitGame(game);
  });

  socket.on("start-game", () => {
    handleStartGame(game);
    emitGame(game);
  });

  socket.on("user-suggest", (selectedUsers: User[]) => {
    game.missionData.isVoting = true;
    const mission =
      game.missions[game.missionData.onMission][
        game.missions[game.missionData.onMission].length - 1
      ];
    mission.suggestedUsers = selectedUsers;
    mission.voteData = { userVotes: [] };
    emitGame(game);
  });

  socket.on("user-vote", (vote: boolean) => {
    const mission =
      game.missions[game.missionData?.onMission][
        game.missions[game.missionData?.onMission].length - 1
      ];
    mission.voteData.userVotes.push({ user: user, passed: vote });
    console.log(mission);
    if (mission.voteData.userVotes.length === game.totalPlayers) {
      let passedVotes = 0;
      mission.voteData.userVotes.forEach((userVote, index) => {
        if (userVote.passed) {
          passedVotes++;
        }
      });

      let notPassedVotes = game.totalPlayers - passedVotes;
      const voteResult = passedVotes > notPassedVotes;
      mission.passed = voteResult;
      game.missionData.isVoting = false;
      if (voteResult) {
        game.missionData.isOnMission = true;
      } else {
      }
    }
    emitGame(game);
  });
});

export function emitGame(game: Game) {
  console.log("emit game");
  lobby.to(game.ope).emit("update-game", game);
}

httpServer.listen(4000, function () {
  console.log("listening on *:4000");
});
