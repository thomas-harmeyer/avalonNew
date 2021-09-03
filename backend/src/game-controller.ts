import Game, { defaultMissions, MissionState } from "./interfaces/Game";

export function handleStartGame(game: Game) {
  if (!game.hasStarted) {
    game.hasStarted = true;
    defaultMissions(game);
    const users = game.users;
    let n = game.users.length;
    let numOfGood = 0;
    let numOfBad = 0;
    const totalPlayers = game.totalPlayers;
    const totalGood = Math.floor(totalPlayers / 2 + 1);
    const totalBad = Math.floor(
      totalPlayers / 2 - (totalPlayers % 2 === 0 ? 1 : 0)
    );
    let index = 0;

    if (game.roles.includes("Merlin")) {
      users[index].role = "Merlin";
      users[index].isGood = true;
      index++;
      numOfGood++;
    }
    if (game.roles.includes("Percival")) {
      users[index].role = "Percival";
      users[index].isGood = true;
      index++;
      numOfGood++;
    }
    if (game.roles.includes("Assassin")) {
      users[index].role = "Assassin";
      users[index].isGood = false;
      index++;
      numOfBad++;
    }
    if (game.roles.includes("Morgana")) {
      users[index].role = "Morgana";
      users[index].isGood = false;
      index++;
      numOfBad++;
    }

    while (numOfGood < totalGood) {
      users[index].role = "Good Knight";
      users[index].isGood = true;
      numOfGood++;
      index++;
    }
    while (numOfBad < totalBad) {
      users[index].role = "Bad Knight";
      users[index].isGood = false;
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
  }
}

export function handleRestartGame(game: Game) {
  game.hasStarted = false;
  if (game.usersToRemove)
    game.usersToRemove.forEach((userToRemove, i) => {
      game.users = game.users.filter((user, i) => {
        return user._id !== userToRemove._id;
      });
    });
  game.missions = [];
  game.missionData = {
    state: MissionState.Suggesting,
    onMission: 0,
    passedMissions: 0,
    failedMissions: 0,
  };
  game.result = undefined;
  for (let i = 0; i < game.users.length; i++) {
    game.users[i].role = undefined;
    game.users[i].isGood = undefined;
    game.users[i].data = undefined;
  }
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}
