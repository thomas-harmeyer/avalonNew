import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { handleStartGame } from "./game-controller";
import { Game, GameModel } from "./interfaces/Game";
import { User } from "./interfaces/User";

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/settings", (req: any, res: any) => {
  GameModel.findByOpe(req.query.ope).then((game: Game | null) => {
    req.send(game);
  });
});

app.post("/settings", (req: any, res: any) => {
  GameModel.findByOpe(req.body.game.ope).then((game) => {
    if (game) {
      game.removeUser(game.users[0]);
      game.saveSettings(req.body.game).then((game: Game) => {
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

lobby.on("connection", (socket: Socket) => {
  const username: string = socket.handshake.auth.username;
  const ope: string = socket.handshake.auth.ope;
  const user: User = {
    username: username,
  };

  socket.join(ope);
  GameModel.findByOpe(ope).then((game) => {
    game?.addUser(user).then((game) => {
      if (game) emitUsers(game);
    });
  });
  socket.on("connected", () => {
    GameModel.findByOpe(ope).then((game) => {
      if (game) emitUsers(game);
    });
  });
  socket.on("disconnect", function (reason) {
    console.log("user disconnected");
    GameModel.findByOpe(ope).then((game) => {
      if (game)
        game.removeUser(user).then((game) => {
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
