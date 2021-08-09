import User from "./User";

interface Mission {
  suggester?: User;
  suggestedUsers: User[];
  voteData: VoteData;
  passed?: boolean;
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

export interface UserVote {
  user: User;
  passed: boolean;
}

export default Mission;
