"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = require("cors");
const express_1 = require("express");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const game_controller_1 = require("./game-controller");
const Game_1 = require("./interfaces/Game");
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.get("/settings", function (req, res) {
    Game_1.GameModel.findByOpe(req.query.ope).then(function (game) {
        req.send(game);
    });
});
app.post("/settings", function (req, res) {
    Game_1.GameModel.findByOpe(req.body.game.ope).then(function (game) {
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
var httpServer = http_1.createServer(app);
var options = {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
};
var io = new socket_io_1.Server(httpServer, options);
var lobby = io.of("/lobby");
lobby.on("connection", function (socket) {
    var username = socket.handshake.auth.username;
    var ope = socket.handshake.auth.ope;
    var user = {
        username: username
    };
    socket.join(ope);
    Game_1.GameModel.findByOpe(ope).then(function (game) {
        game === null || game === void 0 ? void 0 : game.addUser(user).then(function (game) {
            if (game)
                emitUsers(game);
        });
    });
    socket.on("connected", function () {
        Game_1.GameModel.findByOpe(ope).then(function (game) {
            if (game)
                emitUsers(game);
        });
    });
    socket.on("disconnect", function (reason) {
        console.log("user disconnected");
        Game_1.GameModel.findByOpe(ope).then(function (game) {
            if (game)
                game.removeUser(user).then(function (game) {
                    if (game)
                        emitUsers(game);
                });
        });
    });
    socket.on("start-game", function () {
        game_controller_1.handleStartGame(ope);
    });
});
function emitUsers(game) {
    lobby.to(game.ope).emit("update-lobby", game);
}
httpServer.listen(4000, function () {
    console.log("listening on *:4000");
});
//# sourceMappingURL=index.js.map