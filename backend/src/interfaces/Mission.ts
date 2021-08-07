import { Document, Schema, model, connect, SchemaType } from "mongoose";
import User, { UserSchema } from "./User";

//meta data class that contains num of players and fails
export interface MissionMetadata {
  numOfPlayers: number;
  numOfFails: number;
}
export const MissionMetadataSchema = new Schema<MissionMetadata>({
  numOfPlayers: { type: Number, required: true },
  numOfFails: { type: Number, required: true },
});

//container class for vote data class
interface UserVote {
  user: User;
  passed: boolean;
}
export const UserVoteSchema = new Schema<UserVote>({
  user: { type: UserSchema, required: true },
  passed: { type: Boolean, required: true },
});

//data class that contains vote info
interface VoteData {
  //if there is currently a vote for this mission
  isVoting: boolean;
  //if the vote passed, only exists after vote has happened
  passed?: boolean;
  //array of the users votes
  userVotes?: UserVote[];
}
export const VoteDataSchema = new Schema<VoteData>({
  isVoting: { type: Boolean },
  passed: Boolean,
  userVotes: [UserVoteSchema],
});

export interface Mission {
  suggester?: User;
  suggestedUsers?: User[];
  voteData?: VoteData;
  passed?: boolean;
  data: MissionMetadata;
}
export const MissionSchema = new Schema<Mission>({
  suggester: UserSchema,
  suggestedUsers: [UserSchema],
  voteData: VoteDataSchema,
  passed: Boolean,
  data: { type: MissionMetadataSchema, required: true },
});

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

export default Mission;
