import { findByOpe, Game, GameModel, defaultMissions } from "./interfaces/Game";

export function handleStartGame(ope: string) {
  findByOpe(ope).then((game) => {
    if (!game || game.users[0].role) {
      return;
    }
    defaultMissions(game).then((game) => {
      const users = game.users;
      let n = game.users.length;
      let numOfGood = 0;
      let numOfBad = 0;
      const totalPlayers = game.data.totalPlayers;
      const totalGood = Math.floor(totalPlayers / 2 + 1);
      const totalBad = Math.floor(
        totalPlayers / 2 - (totalPlayers % 2 === 0 ? 1 : 0)
      );
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
        //get random numbers
        const randomNumber1 = getRandomInt(n);
        const randomNumber2 = getRandomInt(n);

        //switch two roles
        const tempRole: string | undefined = game.users[randomNumber1].role;
        game.users[randomNumber1].role = game.users[randomNumber2].role;
        game.users[randomNumber2].role = tempRole;
      }
      GameModel.updateOne({ ope: game.ope }, game).then((response) => {
        return response;
      });
    });
  });
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}
