interface UserMetadata {
  winRate: number;
}

export interface User {
  _id?: string;
  username: string;
  ope?: string;
  role?: string;
  data?: UserMetadata;
  isGood?: boolean;
}

export async function addUser(user: User) {}

export async function deleteUser(user: User) {}

export async function deleteAllUsers() {}

export async function getUsers() {}

export default User;
