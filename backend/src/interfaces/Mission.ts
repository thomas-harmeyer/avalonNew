import { getModelForClass, prop } from "@typegoose/typegoose";
import User from "./User";

export class Mission {
  @prop()
  public suggester?: User;

  @prop()
  public suggestedUsers?: User[];

  @prop()
  public voteData?: VoteDataClass;

  @prop()
  public passed?: boolean;

  @prop({ required: true })
  public data!: MissionMetaDataClass;
}

//meta data class that contains num of players and fails
class MissionMetaDataClass {
  @prop({ required: true })
  numOfPlayers!: number;

  @prop({ required: true })
  numOfFails!: number;
}

//data class that contains vote info
class VoteDataClass {
  //if there is currently a vote for this mission
  @prop({ required: true })
  isVoting!: boolean;

  //if the vote passed, only exists after vote has happened
  @prop()
  passed?: boolean;

  //array of the users votes
  @prop()
  userVotes?: UserVoteClass[];
}

//container class for vote data class
class UserVoteClass {
  @prop({ required: true })
  user!: User;

  @prop({ required: true })
  passed!: boolean;
}

//number of players on each mission for each size of game
export const missionCounts = {
  //size of game = 5...
  5: {
    numOfPlayers: [2, 3, 2, 3, 3],
    numOfFails: [1, 1, 1, 1, 1],
  },
  6: {
    numOfPlayers: [2, 3, 4, 3, 4],
    numOfFails: [1, 1, 1, 1, 1],
  },
  7: {
    numOfPlayers: [2, 3, 3, 4, 4],
    numOfFails: [1, 1, 1, 2, 1],
  },
  8: {
    numOfPlayers: [3, 4, 4, 5, 5],
    numOfFails: [1, 1, 1, 2, 1],
  },
  9: {
    numOfPlayers: [3, 4, 4, 5, 5],
    numOfFails: [1, 1, 1, 2, 1],
  },
  10: {
    numOfPlayers: [3, 4, 4, 5, 5],
    numOfFails: [1, 1, 1, 2, 1],
  },
};

export const MissionModel = getModelForClass(Mission);

export default Mission;
