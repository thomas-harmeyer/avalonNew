import User from "./User";

//meta data class that contains num of players and fails
export interface MissionMetadata {
  numOfPlayers: number;
  numOfFails: number;
}

//container class for vote data class
interface UserVote {
  user: User;
  passed: boolean;
}

//data class that contains vote info
interface VoteData {
  //if the vote passed, only exists after vote has happened
  passed?: boolean;
  //array of the users votes
  userVotes: UserVote[];
}

export interface Mission {
  suggester?: User;
  suggestedUsers: User[];
  voteData: VoteData;
  passed?: boolean;
  data: MissionMetadata;
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

export default Mission;
