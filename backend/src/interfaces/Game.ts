import { Document, model, Schema } from "mongoose";
import Mission, {
  missionCounts,
  MissionMetadata,
  MissionSchema,
} from "./Mission";
import { User, UserSchema } from "./User";

export const games: Game[] = [];

interface GameMetadata {
  totalPlayers: number;
  passedMissions?: number;
  failedMissions?: number;
}

const GameMetadataSchema = new Schema<GameMetadata>({
  totalPlayers: { type: Number, default: 5 },
  passedMissions: Number,
  failedMissions: Number,
});

export interface Game {
  ope: string;
  users: User[];
  data: GameMetadata;
  roles: string[];
  missions: Mission[][];
}

const GameSchema = new Schema<Game>({
  _id: { type: String, required: true },
  ope: { type: String, required: true },
  users: { type: [UserSchema], default: [] },
  data: { type: GameMetadataSchema, default: () => ({}) },
  roles: {
    type: [String],
    default: ["Merlin", "Percival", "Assassin", "Morgana"],
  },
  missions: {
    type: [[MissionSchema]],
    default: [],
  },
});

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

GameSchema.post("save", function () {
  console.log(this);
});

export const GameModel = model<Game>("Game", GameSchema);

export async function findByOpe(ope: string) {
  return await GameModel.findOne({ ope }).then(async (game) => {
    if (game) {
      return game;
    } else {
      const gameDoc = new GameModel({ _id: ope, ope: ope });
      return await gameDoc.save();
    }
  });
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
