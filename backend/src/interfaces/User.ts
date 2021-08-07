import { connect, model, Schema } from "mongoose";

interface UserMetadata {
  winRate: number;
}

const UserMetadataSchema = new Schema<UserMetadata>({
  winRate: { type: Number, required: true, default: 0 },
});

export interface User {
  _id?: string;
  username: string;
  ope?: string;
  role?: string;
  data?: UserMetadata;
  isGood?: boolean;
}

export const UserSchema = new Schema<User>({
  _id: String,
  username: { type: String, required: true },
  ope: String,
  role: String,
  data: UserMetadataSchema,
  isGood: Boolean,
});

export const UserModel = model<User>("User", UserSchema);

export async function addUser(user: User, ope: string) {}

export async function deleteUser(user: User) {}

export async function deleteAllUsers() {}

export async function getUsers() {}

export default User;
