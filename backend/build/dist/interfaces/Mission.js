"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionModel = exports.missionCounts = exports.Mission = void 0;
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const typegoose_1 = require("@typegoose/typegoose");
var Mission = (function () {
    function Mission() {
    }
    __decorate([
        typegoose_1.prop()
    ], Mission.prototype, "suggester");
    __decorate([
        typegoose_1.prop()
    ], Mission.prototype, "suggestedUsers");
    __decorate([
        typegoose_1.prop()
    ], Mission.prototype, "voteData");
    __decorate([
        typegoose_1.prop()
    ], Mission.prototype, "passed");
    __decorate([
        typegoose_1.prop({ required: true })
    ], Mission.prototype, "data");
    return Mission;
}());
exports.Mission = Mission;
var MissionMetaDataClass = (function () {
    function MissionMetaDataClass() {
    }
    __decorate([
        typegoose_1.prop({ required: true })
    ], MissionMetaDataClass.prototype, "numOfPlayers");
    __decorate([
        typegoose_1.prop({ required: true })
    ], MissionMetaDataClass.prototype, "numOfFails");
    return MissionMetaDataClass;
}());
var VoteDataClass = (function () {
    function VoteDataClass() {
    }
    __decorate([
        typegoose_1.prop({ required: true })
    ], VoteDataClass.prototype, "isVoting");
    __decorate([
        typegoose_1.prop()
    ], VoteDataClass.prototype, "passed");
    __decorate([
        typegoose_1.prop()
    ], VoteDataClass.prototype, "userVotes");
    return VoteDataClass;
}());
var UserVoteClass = (function () {
    function UserVoteClass() {
    }
    __decorate([
        typegoose_1.prop({ required: true })
    ], UserVoteClass.prototype, "user");
    __decorate([
        typegoose_1.prop({ required: true })
    ], UserVoteClass.prototype, "passed");
    return UserVoteClass;
}());
exports.missionCounts = {
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
exports.MissionModel = typegoose_1.getModelForClass(Mission);
exports.default = Mission;
//# sourceMappingURL=Mission.js.map