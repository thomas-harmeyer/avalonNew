import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { app } from "./app-controller";
import { handleRestartGame, handleStartGame } from "./game-controller";
import Game, { findGame, MissionState } from "./interfaces/Game";
import Mission, { missionCounts, MissionMetadata } from "./interfaces/Mission";
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
  let game = findGame(ope);

  const tempUser = game.users.find((user, index) => {
    return user.username === username;
  });

  let user: User =
    game.hasStarted && tempUser
      ? tempUser
      : ({
          _id: username,
          username: username,
          ope: ope,
        } as User);

  user._id = username;

  socket.join(ope);

  if (!game.hasStarted) {
    game.users.push(user);
  }

  emitGame(game);

  socket.on("disconnect", function (reason) {
    if (!game.hasStarted) {
      game.users = game.users.filter((userFilter: User) => {
        return userFilter._id !== user._id;
      });
    } else {
      if (game.usersToRemove === undefined) {
        game.usersToRemove = [];
      }
      game.usersToRemove?.push(user);
    }
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
  socket.on("restart-game", () => {
    handleRestartGame(game);
    emitGame(game);
  });

  socket.on("user-suggest", (selectedUsers: User[]) => {
    if (game.missionData.state === MissionState.Suggesting) {
      game.missionData.state = MissionState.Voting;
      const mission =
        game.missions[game.missionData.onMission][
          game.missions[game.missionData.onMission].length - 1
        ];
      mission.suggester = user;
      mission.suggestedUsers = selectedUsers;
      mission.voteData = { userVotes: [] };
      emitGame(game);
    }
  });

  socket.on("user-vote", (vote: boolean) => {
    if (game.missionData.state === MissionState.Voting) {
      const mission =
        game.missions[game.missionData?.onMission][
          game.missions[game.missionData?.onMission].length - 1
        ];
      if (
        mission.voteData.userVotes.find((userVote, index) => {
          return userVote.user._id === user._id;
        })
      )
        return;
      mission.voteData.userVotes.push({ user: user, passed: vote });
      //count passed votes
      if (mission.voteData.userVotes.length === game.totalPlayers) {
        let passedVotes = 0;
        mission.voteData.userVotes.forEach((userVote, index) => {
          if (userVote.passed) {
            passedVotes++;
          }
        });

        let notPassedVotes = game.totalPlayers - passedVotes;
        const voteResult = passedVotes > notPassedVotes;
        mission.voteData.passed = voteResult;
        if (voteResult) {
          game.missionData.state = MissionState.onMission;
        } else {
          if (game.missions[game.missionData.onMission].length < 5) {
            game.missionData.state = MissionState.Suggesting;
            game.missions[game.missionData.onMission].push({
              data: {
                numOfPlayers:
                  missionCounts[game.users.length as keyof typeof missionCounts]
                    .numOfPlayers[game.missionData.onMission],
                numOfFails:
                  missionCounts[game.users.length as keyof typeof missionCounts]
                    .numOfFails[game.missionData.onMission],
              } as MissionMetadata,
              userResults: [],
              suggestedUsers: [],
              voteData: { userVotes: [] },
            } as Mission);
          } else {
            missionPassed(mission, false, game);
          }
        }
      }
      emitGame(game);
    }
  });

  socket.on("user-passed", (passed: boolean) => {
    if (game.missionData.state === MissionState.onMission) {
      const mission =
        game.missions[game.missionData.onMission][
          game.missions[game.missionData.onMission].length - 1
        ];
      if (
        mission.userResults.find((userResult, index) => {
          return userResult.user._id === user._id;
        })
      )
        return;
      mission.userResults.push({ user, passed });
      if (mission.userResults.length === mission.data.numOfPlayers) {
        let numOfFailed = 0;
        mission.userResults.forEach((userResult, index) => {
          !userResult.passed && numOfFailed++;
        });
        const missionResult = !(numOfFailed >= mission.data.numOfFails);
        missionPassed(mission, missionResult, game);
        //todo end of game
      }
    }
    emitGame(game);
  });
  socket.on("user-guess", (user: User) => {
    game.result = user.role !== "merlin";
    emitGame(game);
  });
});

function missionPassed(mission: Mission, missionResult: boolean, game: Game) {
  mission.passed = missionResult;
  if (missionResult) {
    game.missionData.passedMissions++;
  } else {
    game.missionData.failedMissions++;
  }
  game.missionData.state = MissionState.Suggesting;
  game.missionData.onMission++;

  if (
    game.missionData.failedMissions > 2 ||
    game.missionData.passedMissions > 2
  ) {
    game.missionData.result = game.missionData.passedMissions > 2;
    if (game.missionData.result === false) {
      game.result = false;
    }
  }
}

export function emitGame(game: Game) {
  console.log("emit game");
  console.log(game);
  lobby.to(game.ope).emit("update-game", game);
}

httpServer.listen(4000, function () {
  console.log("listening on *:4000");
});
