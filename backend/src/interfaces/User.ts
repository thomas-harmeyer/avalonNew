import { getModelForClass, prop } from "@typegoose/typegoose";
import { connect } from "mongoose";

export class User {
  @prop()
  public _id?: string;

  @prop({ required: true })
  public username!: string;

  @prop()
  public ope?: string;

  @prop()
  public role?: string;

  @prop()
  public data?: Metadata;

  @prop()
  public isGood?: boolean;
}

class Metadata {
  @prop({ required: true })
  public winRate!: number;
}

export const UserModel = getModelForClass(User);

export async function addUser(user: User, ope: string): Promise<void> {
  const userModel = new UserModel(user);
  userModel.save();
}

export async function deleteUser(user: User): Promise<void> {
  await connectToDb();

  const response = await UserModel.findOneAndDelete({
    _id: user._id,
    username: user.username,
  }).exec();
}

export async function deleteAllUsers(): Promise<void> {
  const response = await UserModel.deleteMany({});
}

export async function getUsers(): Promise<User[]> {
  return UserModel.find({});
}

async function connectToDb() {
  await connect("mongodb://localhost:27017/avalon", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default User;
