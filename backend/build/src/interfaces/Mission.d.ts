import User from "./User";
export declare class Mission {
    suggester?: User;
    suggestedUsers?: User[];
    voteData?: VoteDataClass;
    passed?: boolean;
    data: MissionMetaDataClass;
}
declare class MissionMetaDataClass {
    numOfPlayers: number;
    numOfFails: number;
}
declare class VoteDataClass {
    isVoting: boolean;
    passed?: boolean;
    userVotes?: UserVoteClass[];
}
declare class UserVoteClass {
    user: User;
    passed: boolean;
}
export declare const missionCounts: {
    5: {
        numOfPlayers: number[];
        numOfFails: number[];
    };
    6: {
        numOfPlayers: number[];
        numOfFails: number[];
    };
    7: {
        numOfPlayers: number[];
        numOfFails: number[];
    };
    8: {
        numOfPlayers: number[];
        numOfFails: number[];
    };
    9: {
        numOfPlayers: number[];
        numOfFails: number[];
    };
    10: {
        numOfPlayers: number[];
        numOfFails: number[];
    };
};
export declare const MissionModel: import("@typegoose/typegoose").ReturnModelType<typeof Mission, import("@typegoose/typegoose/lib/types").BeAnObject>;
export default Mission;
