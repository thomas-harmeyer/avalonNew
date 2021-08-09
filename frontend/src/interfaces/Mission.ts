import User from "./User";

interface Mission {
  suggester?: User;
  suggestedUsers: User[];
  userResults: ResultData[];
  voteData: VoteData;
  passed?: boolean;
  success?: boolean;
  data: MissionMetaData;
}

interface MissionMetaData {
  numOfPlayers: number;
  numOfFails: number;
}

interface VoteData {
  passed?: boolean;
  userVotes: UserVote[];
}

interface ResultData {
  user: User;
  passed?: boolean;
}

export interface UserVote {
  user: User;
  passed: boolean;
}

export default Mission;
