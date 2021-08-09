import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Links from "./components/Links";
import Navbar from "./components/Navbar";
import About from "./components/views/About";
import GameView from "./components/views/GameView";
import Join from "./components/views/Join";
import Lobby from "./components/views/Lobby";
import Login from "./components/views/Login";
import Role from "./components/views/Role";
import Settings from "./components/views/Settings";
import Welcome from "./components/views/Welcome";
import GameContext from "./components/context/GameContext";
import Game, { MissionState } from "./interfaces/Game";
import socket from "./components/context/socket";
import Roles from "./interfaces/Roles";

function App() {
  const [game, setGame] = useState<Game>({
    ope: "",
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
  socket.on("update-game", (game: Game) => {
    setGame(game);
  });

  return (
    <Router>
      <Route path="/" component={Navbar}></Route>
      <Container fluid className="App justify-content-center text-center">
        <Route exact path={Links.Welcome} component={Welcome}></Route>
        <Route exact path={Links.Join} component={Join}></Route>
        <Route exact path={Links.Login} component={Login}></Route>
        <Route exact path={Links.About} component={About}></Route>
        <GameContext.Provider value={game}>
          <Route exact path={Links.Settings} component={Settings}></Route>
          <Route exact path={Links.Lobby} component={Lobby}></Route>
          <Route exact path={Links.Role} component={Role}></Route>
          <Route exact path={Links.Game} component={GameView}></Route>
        </GameContext.Provider>
      </Container>
    </Router>
  );
}

export default App;
