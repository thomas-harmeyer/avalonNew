import React from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Links from "./components/Links";
import Navbar from "./components/Navbar";
import About from "./components/views/About";
import Game from "./components/views/GameView";
import Join from "./components/views/Join";
import Lobby from "./components/views/Lobby";
import Login from "./components/views/Login";
import Role from "./components/views/Role";
import Settings from "./components/views/Settings";
import Welcome from "./components/views/Welcome";

function App() {
  return (
    <Router>
      <Route path="/" component={Navbar}></Route>
      <Container fluid className="App justify-content-center text-center">
        <Route exact path={Links.Welcome} component={Welcome}></Route>
        <Route exact path={Links.Join} component={Join}></Route>
        <Route exact path={Links.Login} component={Login}></Route>
        <Route exact path={Links.About} component={About}></Route>
        <Route exact path={Links.Settings} component={Settings}></Route>
        <Route exact path={Links.Lobby} component={Lobby}></Route>
        <Route exact path={Links.Role} component={Role}></Route>
        <Route exact path={Links.Game} component={Game}></Route>
      </Container>
    </Router>
  );
}

export default App;
