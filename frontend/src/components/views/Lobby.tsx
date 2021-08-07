import { useEffect, useState } from "react";
import { Alert, Button, Col, Row, Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Game from "../../interfaces/Game";
import socket, { tryConnect } from "../context/socket";
import LobbyNameList from "../LobbyNameList";

const Lobby = () => {
  const settingsHaveBeenUpdated = sessionStorage.getItem(
    "settingsHaveBeenUpdated"
  );
  const [lobby, setLobby] = useState<Game>();
  const [redirectToSettings, setRedirectToSettings] = useState<boolean>(false);
  const [redirectToGame, setRedirectToGame] = useState<boolean>(false);
  const [alert, setAlert] = useState<string>();
  useEffect(() => {
    tryConnect();

    function updateLobby(game: Game) {
      console.log(game);
      if (game.users.length === 1 && !settingsHaveBeenUpdated) {
        setRedirectToSettings(true);
      } else {
        sessionStorage.setItem("settingsHaveBeenUpdated", "true");
        setLobby(game);
      }
    }
    const fetchData = async () => {
      console.log("connected");
      socket.emit("connected");
      socket.on("update-lobby", updateLobby);
    };

    fetchData();
    return function disconnect() {
      console.log("socket off");
      socket.off("update-lobby");
    };
  }, [settingsHaveBeenUpdated]);
  if (!localStorage.getItem("username")) {
    return <Redirect to="login" />;
  }
  if (redirectToSettings) {
    return <Redirect to="/settings" />;
  }
  if (redirectToGame) {
    return <Redirect to="/role" />;
  }

  function startGame() {
    if (!lobby?.data) {
      setAlert("You need to update the settings first");
      return;
    }
    console.group("number of users");
    console.groupEnd();

    if (lobby && lobby.users.length === lobby.data.totalPlayers) {
      socket.emit("start-game");
      setRedirectToGame(true);
    } else {
      setAlert("You need to have the correct number of players");
    }
  }

  const loadedLobby = () => {
    return (
      <>
        {alert && (
          <Row>
            <Col>
              <Alert variant={"danger"}>{alert}</Alert>
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <h1>OPE: {lobby && lobby.ope ? lobby.ope : 0}</h1>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <h1>
              {lobby && lobby.users ? lobby.users.length : 0}/
              {lobby && lobby.data ? lobby.data.totalPlayers : "?"} Players
            </h1>
          </Col>
        </Row>
        <Row>
          {lobby && lobby.users && lobby.users.length > 0 && (
            <LobbyNameList users={lobby.users}></LobbyNameList>
          )}
        </Row>
        <Row className="mt-3">
          <Col>
            <Button variant="outline-success" onClick={startGame}>
              Start Game
            </Button>
          </Col>
        </Row>
      </>
    );
  };
  return (
    <>
      {lobby ? (
        loadedLobby()
      ) : (
        <span>
          <Spinner animation="grow" variant="primary" />
        </span>
      )}
    </>
  );
};

export default Lobby;
