"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStartGame = void 0;
const Game_1 = require("./interfaces/Game");
function handleStartGame(ope) {
    Game_1.GameModel.findByOpe(ope).then((game) => {
        if (!game || game.users[0].role) {
            return;
        }
        const users = game.users;
        let n = game.users.length;
        let numOfGood = 0;
        let numOfBad = 0;
        const totalPlayers = game.data.totalPlayers;
        const totalGood = Math.floor(totalPlayers / 2 + 1);
        const totalBad = Math.floor(totalPlayers / 2 - (totalPlayers % 2 === 0 ? 1 : 0));
        let index = 0;
        if (game.roles.includes("Merlin")) {
            users[index].role = "Merlin";
            index++;
            numOfGood++;
        }
        if (game.roles.includes("Percival")) {
            users[index].role = "Percival";
            index++;
            numOfGood++;
        }
        if (game.roles.includes("Assassin")) {
            users[index].role = "Assassin";
            index++;
            numOfBad++;
        }
        if (game.roles.includes("Morgana")) {
            users[index].role = "Morgana";
            index++;
            numOfBad++;
        }
        while (numOfGood < totalGood) {
            users[index].role = "Good Knight";
            numOfGood++;
            index++;
        }
        while (numOfBad < totalBad) {
            users[index].role = "Bad Knight";
            numOfBad++;
            index++;
        }
        for (let i = 0; i < n; i++) {
            const randomNumber1 = getRandomInt(n);
            const randomNumber2 = getRandomInt(n);
            const tempRole = game.users[randomNumber1].role;
            game.users[randomNumber1].role = game.users[randomNumber2].role;
            game.users[randomNumber2].role = tempRole;
        }
        Game_1.GameModel.updateOne({ ope: game.ope }, game).then((response) => {
            return response;
        });
    });
}
exports.handleStartGame = handleStartGame;
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
//# sourceMappingURL=game-controller.js.map