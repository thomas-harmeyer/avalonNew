import Mission, { missionCounts, MissionMetadata } from "./Mission";
import { User } from "./User";

export const games: Game[] = [];

interface Game {
  missions: Mission[][];
  users: User[];
  ope: string;
  missionData: GameMissionMetadata;
  roles: string[];
  totalPlayers: number;
}

export enum MissionState {
  Suggesting = "suggesting",
  Voting = "voting",
  onMission = "onMission",
}

export interface GameMissionMetadata {
  state: MissionState;
  onMission: number;
  passedMissions: number;
  failedMissions: number;
}

export async function defaultMissions(game: Game) {
  game.missionData = {
    state: MissionState.Suggesting,
    onMission: 0,
    passedMissions: 0,
    failedMissions: 0,
  } as GameMissionMetadata;
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
    roles: ["Merlin", "Percival", "Assassin", "Morgana"],
    missions: [],
    totalPlayers: 5,
    missionData: {
      state: MissionState.Suggesting,
      onMission: 0,
      passedMissions: 0,
      failedMissions: 0,
    },
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
