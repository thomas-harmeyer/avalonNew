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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Game_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModel = exports.GameMetadata = exports.Game = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const Mission_1 = require("./Mission");
const User_1 = require("./User");
let Game = Game_1 = class Game {
    static findByOpe(ope) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findOne({ ope }).exec();
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users;
        });
    }
    addUser(userToAdd) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!containsUser(this, userToAdd)) {
                this.users.push(userToAdd);
                yield this.save();
                return this;
            }
        });
    }
    removeUser(userToRemove) {
        return __awaiter(this, void 0, void 0, function* () {
            if (containsUser(this, userToRemove)) {
                this.users.splice(this.users.indexOf(this.users.filter((userFilter) => {
                    return userFilter._id === userToRemove._id;
                })[0]), 1);
                yield this.save();
                return this;
            }
        });
    }
    saveSettings(game) {
        return __awaiter(this, void 0, void 0, function* () {
            this.roles = game.roles;
            this.data.totalPlayers = game.data.totalPlayers;
            yield this.save();
            return this;
        });
    }
};
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Game.prototype, "ope", void 0);
__decorate([
    typegoose_1.prop({ type: () => [User_1.User], required: true }),
    __metadata("design:type", Array)
], Game.prototype, "users", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", GameMetadata)
], Game.prototype, "data", void 0);
__decorate([
    typegoose_1.prop({
        type: () => [String],
        required: true,
        default: ["Merlin", "Percival", "Morgana", "Assassin"],
    }),
    __metadata("design:type", Array)
], Game.prototype, "roles", void 0);
__decorate([
    typegoose_1.prop({ type: () => [[Mission_1.Mission]] }),
    __metadata("design:type", Array)
], Game.prototype, "missions", void 0);
Game = Game_1 = __decorate([
    typegoose_1.pre("save", function () {
        this.missions = [];
        const missionCount = Mission_1.missionCounts[this.users.length];
        for (let i = 0; i < missionCount.numOfPlayers.length; i++) {
            this.missions[i].push({
                data: {
                    numOfPlayers: missionCount.numOfPlayers[i],
                    numOfFails: missionCount.numOfFails[i],
                },
            });
        }
    })
], Game);
exports.Game = Game;
class GameMetadata {
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Number)
], GameMetadata.prototype, "totalPlayers", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], GameMetadata.prototype, "passedMissions", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], GameMetadata.prototype, "failedMissions", void 0);
exports.GameMetadata = GameMetadata;
exports.GameModel = typegoose_1.getModelForClass(Game);
function containsUser(game, userContains) {
    return __awaiter(this, void 0, void 0, function* () {
        return (game.users.filter((userToFilter, i) => {
            return (userToFilter === null || userToFilter === void 0 ? void 0 : userToFilter._id) === userContains._id;
        }).length > 0);
    });
}
exports.default = Game;
//# sourceMappingURL=Game.js.map