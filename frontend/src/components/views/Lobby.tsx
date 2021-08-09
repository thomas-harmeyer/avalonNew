import { useEffect, useState, useContext } from "react";
import { Alert, Button, Col, Row, Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import GameContext from "../context/GameContext";
import socket, { tryConnect } from "../context/socket";
import LobbyNameList from "../LobbyNameList";

const Lobby = () => {
  const game = useContext(GameContext);
  const settingsHaveBeenUpdated = sessionStorage.getItem(
    "settingsHaveBeenUpdated"
  );
  const [redirectToSettings, setRedirectToSettings] = useState<boolean>(false);
  const [redirectToGame, setRedirectToGame] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  useEffect(() => {
    tryConnect();

    function checkLobby() {
      if (game?.users.length === 1 && !settingsHaveBeenUpdated) {
        sessionStorage.setItem("settingsHaveBeenUpdated", "true");
        setRedirectToSettings(true);
      } else {
        sessionStorage.setItem("settingsHaveBeenUpdated", "true");
      }
    }
    checkLobby();
  }, [game?.users.length, settingsHaveBeenUpdated]);

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
    if (!game?.totalPlayers) {
      setError("You need to update the settings first");
      return;
    }
    console.group("number of users");
    console.groupEnd();

    if (game && game.users.length === game.totalPlayers) {
      socket.emit("start-game");
      setRedirectToGame(true);
    } else {
      setError("You need to have the correct number of players");
    }
  }

  const loadedLobby = () => {
    return (
      <>
        {error && (
          <Row
            onClick={() => {
              setError(undefined);
            }}
          >
            <Col>
              <Alert variant={"danger"}>{error}</Alert>
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <h1>OPE: {game && game.ope ? game.ope : 0}</h1>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <h1>
              {game.users ? game.users.length : 0}/
              {game.totalPlayers ? game.totalPlayers : "?"} Players
            </h1>
          </Col>
        </Row>
        <Row>
          {game && game.users && game.users.length > 0 && (
            <LobbyNameList users={game.users}></LobbyNameList>
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
      {game ? (
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
