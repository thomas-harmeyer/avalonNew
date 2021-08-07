import User from "../interfaces/User";
import Mission from "./Mission";
import Roles from "./Roles";

interface Game {
  missions: Mission[][];
  users: User[];
  ope: string;
  data: GameMetadata;
  roles: Roles[];
}

export interface GameMetadata {
  totalPlayers: number;
  passedMissions?: number;
  failedMissions?: number;
}

export default Game;
