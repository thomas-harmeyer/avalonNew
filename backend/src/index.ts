import { createServer } from "http";
import { connect } from "mongoose";
import { Server, Socket } from "socket.io";
import { app } from "./app-controller";
import { handleStartGame } from "./game-controller";
import { findGame, Game, games } from "./interfaces/Game";
import { User } from "./interfaces/User";

connect("mongodb://localhost:27017/avalon", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

  // await findByOpe(ope).then(async (game) => {
  //   if (!game) {
  //     game = new GameModel(game);
  //     await game.save();
  //   }
  //   addUser(game, user).then((game) => {
  //     if (game) emitUsers(game);
  //   });
  // });

  socket.on("connected", () => {
    console.log(game);
    emitUsers(game);
    // findByOpe(ope).then((game) => {
    //   if (game) emitUsers(game);
    // });
  });
  socket.on("disconnect", function (reason) {
    game.users = game.users.filter((userFilter: User) => {
      return userFilter._id !== user._id;
    });
    // console.log("user disconnected");
    // findByOpe(ope).then((game) => {
    //   if (game)
    //     removeUser(game, user).then((game) => {
    //       if (game) emitUsers(game);
    //     });
    // });
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

// connectToDb();
// async function connectToDb() {
//   await connect("mongodb://localhost:27017/avalon", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   const db = connection;
//   db.on("error", console.error.bind(console, "connection error:"));
// }
