import { createContext } from "react";
import Game, { MissionState } from "../../interfaces/Game";
import Roles from "../../interfaces/Roles";
import { getOpe } from "./socket";

export const GameContext = createContext({
  ope: getOpe(),
  users: [],
  totalPlayers: 0,
  roles: [Roles.Merlin, Roles.Percival, Roles.Assassin, Roles.Morgana],
  missions: [],
  missionData: {
    state: MissionState.Suggesting,
    onMission: 0,
    passedMissions: 0,
    failedMissions: 0,
  },
  hasStarted: false,
} as Game);

export default GameContext;
