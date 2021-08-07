import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { app } from "./app-controller";
import { handleStartGame } from "./game-controller";
import { findGame, Game, games } from "./interfaces/Game";
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
    username: username,
    ope: ope,
  };

  socket.join(ope);
  const game = findGame(ope);
  game.users.push(user);

  socket.on("connected", () => {
    console.log(game);
    emitUsers(game);
  });
  socket.on("disconnect", function (reason) {
    game.users = game.users.filter((userFilter: User) => {
      return userFilter._id !== user._id;
    });
  });

  socket.on("start-game", () => {
    handleStartGame(game);
  });
});

export function emitUsers(game: Game) {
  lobby.to(game.ope).emit("update-lobby", game);
}

httpServer.listen(4000, function () {
  console.log("listening on *:4000");
});
