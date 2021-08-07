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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.deleteAllUsers = exports.deleteUser = exports.addUser = exports.UserModel = exports.User = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const mongoose_1 = require("mongoose");
class User {
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "_id", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "ope", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Metadata)
], User.prototype, "data", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Boolean)
], User.prototype, "isGood", void 0);
exports.User = User;
class Metadata {
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Number)
], Metadata.prototype, "winRate", void 0);
exports.UserModel = typegoose_1.getModelForClass(User);
function addUser(user, ope) {
    return __awaiter(this, void 0, void 0, function* () {
        const userModel = new exports.UserModel(user);
        userModel.save();
    });
}
exports.addUser = addUser;
function deleteUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        yield connectToDb();
        const response = yield exports.UserModel.findOneAndDelete({
            _id: user._id,
            username: user.username,
        }).exec();
    });
}
exports.deleteUser = deleteUser;
function deleteAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield exports.UserModel.deleteMany({});
    });
}
exports.deleteAllUsers = deleteAllUsers;
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return exports.UserModel.find({});
    });
}
exports.getUsers = getUsers;
function connectToDb() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.connect("mongodb://localhost:27017/avalon", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });
}
exports.default = User;
//# sourceMappingURL=User.js.map