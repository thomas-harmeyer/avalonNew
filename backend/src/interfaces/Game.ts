
import { Mission, missionCounts } from "./Mission";
import { User } from "./User";

  // this.missions = [];
  // const missionCount: { numOfPlayers: number[]; numOfFails: number[] } =
  //   missionCounts[this.users.length as keyof typeof missionCounts];
  // for (let i = 0; i < missionCount.numOfPlayers.length; i++) {
  //   this.missions[i].push({
  //     data: {
  //       numOfPlayers: missionCount.numOfPlayers[i],
  //       numOfFails: missionCount.numOfFails[i],
  //     },
  //   } as Mission);
  // }

  
export class Game {
   ope: string;

   users: User[];

   data: GameMetadata;

    required: true,
    default: ["Merlin", "Percival", "Morgana", "Assassin"],
   roles!: string[];

  public missions?: Mission[][];

  public static async findByOpe(
    this: ReturnModelType<typeof Game>,
    ope: string
  ) {
    return this.findOne({ ope }).exec();
  }

  public async getUsers(this: DocumentType<Game>) {
    return this.users;
  }

  public async addUser(this: DocumentType<Game>, userToAdd: User) {
    if (!containsUser(this, userToAdd)) {
      this.users.push(userToAdd);
      await this.save();
      return this;
    }
  }

  public async removeUser(this: DocumentType<Game>, userToRemove: User) {
    if (containsUser(this, userToRemove)) {
      this.users.splice(
        this.users.indexOf(
          this.users.filter((userFilter: User) => {
            return userFilter._id === userToRemove._id;
          })[0]
        ),
        1
      );
      await this.save();
      return this;
    }
  }

  public async saveSettings(this: DocumentType<Game>, game: Game) {
    this.roles = game.roles;
    this.data.totalPlayers = game.data.totalPlayers;
    await this.save();
    return this;
  }
}

export class GameMetadata {
  totalPlayers: number;

  passedMissions?: number;

  failedMissions?: number;
}


async function containsUser(game: Game, userContains: User) {
  return (
    game.users.filter((userToFilter: User, i: number) => {
      return userToFilter?._id === userContains._id;
    }).length > 0
  );
}

export default Game;
