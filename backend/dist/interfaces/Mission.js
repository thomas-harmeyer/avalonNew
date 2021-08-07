var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { getModelForClass, prop } from "@typegoose/typegoose";
var Mission = /** @class */ (function () {
    function Mission() {
    }
    __decorate([
        prop()
    ], Mission.prototype, "suggester");
    __decorate([
        prop()
    ], Mission.prototype, "suggestedUsers");
    __decorate([
        prop()
    ], Mission.prototype, "voteData");
    __decorate([
        prop()
    ], Mission.prototype, "passed");
    __decorate([
        prop({ required: true })
    ], Mission.prototype, "data");
    return Mission;
}());
export { Mission };
//meta data class that contains num of players and fails
var MissionMetaDataClass = /** @class */ (function () {
    function MissionMetaDataClass() {
    }
    __decorate([
        prop({ required: true })
    ], MissionMetaDataClass.prototype, "numOfPlayers");
    __decorate([
        prop({ required: true })
    ], MissionMetaDataClass.prototype, "numOfFails");
    return MissionMetaDataClass;
}());
//data class that contains vote info
var VoteDataClass = /** @class */ (function () {
    function VoteDataClass() {
    }
    __decorate([
        prop({ required: true })
    ], VoteDataClass.prototype, "isVoting");
    __decorate([
        prop()
    ], VoteDataClass.prototype, "passed");
    __decorate([
        prop()
    ], VoteDataClass.prototype, "userVotes");
    return VoteDataClass;
}());
//container class for vote data class
var UserVoteClass = /** @class */ (function () {
    function UserVoteClass() {
    }
    __decorate([
        prop({ required: true })
    ], UserVoteClass.prototype, "user");
    __decorate([
        prop({ required: true })
    ], UserVoteClass.prototype, "passed");
    return UserVoteClass;
}());
//number of players on each mission for each size of game
export var missionCounts = {
    //size of game = 5...
    5: {
        numOfPlayers: [2, 3, 2, 3, 3],
        numOfFails: [1, 1, 1, 1, 1]
    },
    6: {
        numOfPlayers: [2, 3, 4, 3, 4],
        numOfFails: [1, 1, 1, 1, 1]
    },
    7: {
        numOfPlayers: [2, 3, 3, 4, 4],
        numOfFails: [1, 1, 1, 2, 1]
    },
    8: {
        numOfPlayers: [3, 4, 4, 5, 5],
        numOfFails: [1, 1, 1, 2, 1]
    },
    9: {
        numOfPlayers: [3, 4, 4, 5, 5],
        numOfFails: [1, 1, 1, 2, 1]
    },
    10: {
        numOfPlayers: [3, 4, 4, 5, 5],
        numOfFails: [1, 1, 1, 2, 1]
    }
};
export var MissionModel = getModelForClass(Mission);
export default Mission;
//# sourceMappingURL=Mission.js.map