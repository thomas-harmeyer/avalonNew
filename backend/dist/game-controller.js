import { GameModel } from "./interfaces/Game";
export function handleStartGame(ope) {
    GameModel.findByOpe(ope).then(function (game) {
        if (!game || game.users[0].role) {
            return;
        }
        var users = game.users;
        var n = game.users.length;
        var numOfGood = 0;
        var numOfBad = 0;
        var totalPlayers = game.data.totalPlayers;
        var totalGood = Math.floor(totalPlayers / 2 + 1);
        var totalBad = Math.floor(totalPlayers / 2 - (totalPlayers % 2 === 0 ? 1 : 0));
        var index = 0;
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
        for (var i = 0; i < n; i++) {
            //get random numbers
            var randomNumber1 = getRandomInt(n);
            var randomNumber2 = getRandomInt(n);
            //switch two roles
            var tempRole = game.users[randomNumber1].role;
            game.users[randomNumber1].role = game.users[randomNumber2].role;
            game.users[randomNumber2].role = tempRole;
        }
        GameModel.updateOne({ ope: game.ope }, game).then(function (response) {
            return response;
        });
    });
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
//# sourceMappingURL=game-controller.js.map