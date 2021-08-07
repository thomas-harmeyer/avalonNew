import Roles from "./Roles";

interface User {
  _id: string;
  username: string;
  ope: string;
  role: Roles;
  data: Metadata;
  isGood: boolean;
}

interface Metadata {
  winRate: number;
}

export default User;
