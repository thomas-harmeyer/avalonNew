import User from "../interfaces/User";
import Mission from "./Mission";
import Roles from "./Roles";

interface Game {
  missions: Mission[][];
  users: User[];
  ope: string;
  missionData: GameMissionMetadata;
  roles: Roles[];
  totalPlayers: number;
  hasStarted: boolean;
  result?: boolean;
}

export interface GameMissionMetadata {
  state: MissionState;
  onMission: number;
  passedMissions: number;
  failedMissions: number;
  result?: boolean;
}

export enum MissionState {
  Suggesting = "suggesting",
  Voting = "voting",
  onMission = "onMission",
}
export default Game;
