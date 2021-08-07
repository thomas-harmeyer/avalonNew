import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { handleStartGame } from "./game-controller";
import { GameModel } from "./interfaces/Game";
var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.get("/settings", function (req, res) {
    GameModel.findByOpe(req.query.ope).then(function (game) {
        req.send(game);
    });
});
app.post("/settings", function (req, res) {
    GameModel.findByOpe(req.body.game.ope).then(function (game) {
        if (game) {
            game.removeUser(game.users[0]);
            game.saveSettings(req.body.game).then(function (game) {
                emitUsers(game);
                res.send(game);
            });
        }
    });
});
app.listen(5000, function () {
    console.log("settings server listening on /:5000");
});
var httpServer = createServer(app);
var options = {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
};
var io = new Server(httpServer, options);
var lobby = io.of("/lobby");
lobby.on("connection", function (socket) {
    var username = socket.handshake.auth.username;
    var ope = socket.handshake.auth.ope;
    var user = {
        username: username
    };
    socket.join(ope);
    GameModel.findByOpe(ope).then(function (game) {
        game === null || game === void 0 ? void 0 : game.addUser(user).then(function (game) {
            if (game)
                emitUsers(game);
        });
    });
    socket.on("connected", function () {
        GameModel.findByOpe(ope).then(function (game) {
            if (game)
                emitUsers(game);
        });
    });
    socket.on("disconnect", function (reason) {
        console.log("user disconnected");
        GameModel.findByOpe(ope).then(function (game) {
            if (game)
                game.removeUser(user).then(function (game) {
                    if (game)
                        emitUsers(game);
                });
        });
    });
    socket.on("start-game", function () {
        handleStartGame(ope);
    });
});
function emitUsers(game) {
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
//# sourceMappingURL=index.js.map