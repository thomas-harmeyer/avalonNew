import cors from "cors";
import express from "express";
import { createServer } from "http";
import { connect } from "mongoose";
import { Server, Socket } from "socket.io";
import { handleStartGame } from "./game-controller";
import {
  addUser,
  deleteAllGames,
  findByOpe,
  Game,
  GameModel,
  removeUser,
  saveSettings,
} from "./interfaces/Game";
import { User } from "./interfaces/User";

connect("mongodb://localhost:27017/avalon", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
deleteAllGames();

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/settings", (req: any, res: any) => {
  findByOpe(req.query.ope).then((game) => {
    res.send(game);
  });
});

app.post("/settings", (req: any, res: any) => {
  findByOpe(req.body.game.ope).then((game) => {
    if (game) {
      saveSettings(game, req.body.game).then((game: Game) => {
        emitUsers(game);
        res.send(game);
      });
    }
  });
});

app.listen(5000, () => {
  console.log("settings server listening on /:5000");
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
  await findByOpe(ope).then(async (game) => {
    if (!game) {
      game = new GameModel(game);
      await game.save();
    }
    addUser(game, user).then((game) => {
      if (game) emitUsers(game);
    });
  });
  socket.on("connected", () => {
    findByOpe(ope).then((game) => {
      if (game) emitUsers(game);
    });
  });
  socket.on("disconnect", function (reason) {
    console.log("user disconnected");
    findByOpe(ope).then((game) => {
      if (game)
        removeUser(game, user).then((game) => {
          if (game) emitUsers(game);
        });
    });
  });

  socket.on("start-game", () => {
    handleStartGame(ope);
  });
});

function emitUsers(game: Game) {
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
