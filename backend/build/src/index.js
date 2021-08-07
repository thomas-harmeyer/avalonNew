"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = require("cors");
const express_1 = require("express");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const game_controller_1 = require("./game-controller");
const Game_1 = require("./interfaces/Game");
const app = express_1.express();
app.use(cors_1.default());
app.use(express_1.express.json());
app.use(express_1.express.urlencoded({
    extended: true,
}));
app.get("/settings", (req, res) => {
    Game_1.GameModel.findByOpe(req.query.ope).then((game) => {
        req.send(game);
    });
});
app.post("/settings", (req, res) => {
    Game_1.GameModel.findByOpe(req.body.game.ope).then((game) => {
        if (game) {
            game.removeUser(game.users[0]);
            game.saveSettings(req.body.game).then((game) => {
                emitUsers(game);
                res.send(game);
            });
        }
    });
});
app.listen(5000, () => {
    console.log("settings server listening on /:5000");
});
const httpServer = http_1.createServer(app);
const options = {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
};
const io = new socket_io_1.Server(httpServer, options);
const lobby = io.of("/lobby");
lobby.on("connection", (socket) => {
    const username = socket.handshake.auth.username;
    const ope = socket.handshake.auth.ope;
    const user = {
        username: username,
    };
    socket.join(ope);
    Game_1.GameModel.findByOpe(ope).then((game) => {
        game === null || game === void 0 ? void 0 : game.addUser(user).then((game) => {
            if (game)
                emitUsers(game);
        });
    });
    socket.on("connected", () => {
        Game_1.GameModel.findByOpe(ope).then((game) => {
            if (game)
                emitUsers(game);
        });
    });
    socket.on("disconnect", function (reason) {
        console.log("user disconnected");
        Game_1.GameModel.findByOpe(ope).then((game) => {
            if (game)
                game.removeUser(user).then((game) => {
                    if (game)
                        emitUsers(game);
                });
        });
    });
    socket.on("start-game", () => {
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