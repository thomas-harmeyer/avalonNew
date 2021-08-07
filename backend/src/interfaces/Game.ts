import Mission, { missionCounts, MissionMetadata } from "./Mission";
import { User } from "./User";

export const games: Game[] = [];

interface GameMetadata {
  totalPlayers: number;
  passedMissions?: number;
  failedMissions?: number;
}

export interface Game {
  ope: string;
  users: User[];
  data: GameMetadata;
  roles: string[];
  missions: Mission[][];
}

export async function defaultMissions(game: Game) {
  const missions: Mission[][] = [];
  const missionCount: { numOfPlayers: number[]; numOfFails: number[] } =
    missionCounts[game.users.length as keyof typeof missionCounts];
  for (let i = 0; i < missionCount.numOfPlayers.length; i++) {
    missions.push([
      {
        data: {
          numOfPlayers: missionCount.numOfPlayers[i],
          numOfFails: missionCount.numOfFails[i],
        } as MissionMetadata,
      },
    ] as Mission[]);
  }
  game.missions = missions;
}

export function createGame(ope: string) {
  const game: Game = {
    ope: ope,
    users: [],
    data: { totalPlayers: 5 },
    roles: ["Merlin", "Percival", "Assassin", "Morgana"],
    missions: [],
  };
  games.push(game);
  return game;
}

export function findGame(ope: string) {
  const game = games.find((game: Game) => {
    return game.ope === ope;
  });
  if (game) {
    return game;
  } else {
    return createGame(ope);
  }
}

export default Game;
