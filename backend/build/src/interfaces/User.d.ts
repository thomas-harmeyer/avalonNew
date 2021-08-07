export declare class User {
    _id?: string;
    username: string;
    ope?: string;
    role?: string;
    data?: Metadata;
    isGood?: boolean;
}
declare class Metadata {
    winRate: number;
}
export declare const UserModel: import("@typegoose/typegoose").ReturnModelType<typeof User, import("@typegoose/typegoose/lib/types").BeAnObject>;
export declare function addUser(user: User, ope: string): Promise<void>;
export declare function deleteUser(user: User): Promise<void>;
export declare function deleteAllUsers(): Promise<void>;
export declare function getUsers(): Promise<User[]>;
export default User;
