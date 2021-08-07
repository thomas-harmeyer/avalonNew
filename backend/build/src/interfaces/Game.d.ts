import { ReturnModelType, DocumentType } from "@typegoose/typegoose";
import { Mission } from "./Mission";
import { User } from "./User";
export declare class Game {
    ope: string;
    users: User[];
    data: GameMetadata;
    roles: string[];
    missions?: Mission[][];
    static findByOpe(this: ReturnModelType<typeof Game>, ope: string): Promise<DocumentType<Game, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    getUsers(this: DocumentType<Game>): Promise<User[]>;
    addUser(this: DocumentType<Game>, userToAdd: User): Promise<DocumentType<Game, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    removeUser(this: DocumentType<Game>, userToRemove: User): Promise<DocumentType<Game, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    saveSettings(this: DocumentType<Game>, game: Game): Promise<DocumentType<Game, import("@typegoose/typegoose/lib/types").BeAnObject>>;
}
export declare class GameMetadata {
    totalPlayers: number;
    passedMissions?: number;
    failedMissions?: number;
}
export declare const GameModel: ReturnModelType<typeof Game, import("@typegoose/typegoose/lib/types").BeAnObject>;
export default Game;
