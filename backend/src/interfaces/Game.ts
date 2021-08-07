import { Document, model, Schema } from "mongoose";
import Mission, {
  missionCounts,
  MissionMetadata,
  MissionSchema,
} from "./Mission";
import { User } from "./User";

interface GameMetadata {
  totalPlayers: number;
  passedMissions?: number;
  failedMissions?: number;
}

const GameMetadataSchema = new Schema<GameMetadata>({
  totalPlayers: { type: Number, required: true, default: 5 },
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
  ope: { type: String, required: true },
  users: { type: [String], required: true, default: [] },
  data: { type: GameMetadataSchema, required: true },
  roles: {
    type: [String],
    required: true,
    default: ["Merlin", "Percival", "Assassin", "Morgana"],
  },
  missions: {
    type: [[MissionSchema]],
    required: true,
    default: [],
  },
});

export async function defaultMissions(game: Game & Document<any, any, Game>) {
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
  return await game.save();
}

GameSchema.post("save", function (next) {
  console.log(this);
  next();
});

export const GameModel = model<Game>("Game", GameSchema);

export async function findByOpe(ope: string) {
  return await GameModel.findOne({ ope: ope }).then((game) => {
    return game;
  });
}

export async function addUser(
  game: Game & Document<any, any, Game>,
  user: User
) {
  if (!containsUser(game, user)) {
    console.log(user);
    game.users.push(user);
    return await game.save();
  } else {
    return game;
  }
}

export async function removeUser(
  game: Game & Document<any, any, Game>,
  user: User
) {
  if (containsUser(game, user)) {
    const userIndex = getIndexOfUser(game, user);
    game.users.splice(userIndex, 1);
    return await game.save();
  } else {
    return game;
  }
}

export async function saveSettings(
  game: Game & Document<any, any, Game>,
  gameSettings: Game
) {
  game.roles = gameSettings.roles;
  game.data.totalPlayers = gameSettings.data.totalPlayers;
  return await game.save();
}

export function containsUser(game: Game, user: User) {
  return (
    game.users.filter((userToFilter: User) => {
      return userToFilter._id === user._id;
    }).length !== 0
  );
}

export function getIndexOfUser(game: Game, user: User) {
  return game.users.indexOf(
    game.users.filter((userToFilter: User) => {
      return user._id === userToFilter._id;
    })[0]
  );
}

export default Game;
