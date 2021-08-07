"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionModel = exports.missionCounts = exports.Mission = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const User_1 = require("./User");
class Mission {
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", User_1.default)
], Mission.prototype, "suggester", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Array)
], Mission.prototype, "suggestedUsers", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", VoteDataClass)
], Mission.prototype, "voteData", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Boolean)
], Mission.prototype, "passed", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", MissionMetaDataClass)
], Mission.prototype, "data", void 0);
exports.Mission = Mission;
class MissionMetaDataClass {
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Number)
], MissionMetaDataClass.prototype, "numOfPlayers", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Number)
], MissionMetaDataClass.prototype, "numOfFails", void 0);
class VoteDataClass {
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Boolean)
], VoteDataClass.prototype, "isVoting", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Boolean)
], VoteDataClass.prototype, "passed", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Array)
], VoteDataClass.prototype, "userVotes", void 0);
class UserVoteClass {
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", User_1.default)
], UserVoteClass.prototype, "user", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Boolean)
], UserVoteClass.prototype, "passed", void 0);
exports.missionCounts = {
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
exports.MissionModel = typegoose_1.getModelForClass(Mission);
exports.default = Mission;
//# sourceMappingURL=Mission.js.map