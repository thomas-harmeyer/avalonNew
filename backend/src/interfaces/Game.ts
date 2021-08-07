import Mission, {
  MissionSchema,
  missionCounts,
  MissionMetadata,
} from "./Mission";
import { User } from "./User";
import { Document, Schema, model, connect, SchemaType } from "mongoose";

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
  ope: { type: String, required: true },
  users: { type: [String], required: true },
  data: { type: GameMetadataSchema, required: true },
  roles: {
    type: [String],
    required: true,
    default: ["Merlin", "Percival", "Assassin", "Morgana"],
  },
  missions: {
    type: [[MissionSchema]],
    required: true,
    default: function () {
      const missions: Mission[][] = [];
      const missionCount: { numOfPlayers: number[]; numOfFails: number[] } =
        missionCounts[this.users.length as keyof typeof missionCounts];
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
      return missions;
    },
  },
});

const GameModel = model<Game>("Game", GameSchema);

async function findByOpe() {}

async function addUser() {}

async function removeUser(userToRemove: User) {}

async function saveSettings(game: Game) {}

async function containsUser(game: Game, userContains: User) {}

export default Game;
