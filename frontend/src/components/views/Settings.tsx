import axios from "axios";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Row, Spinner } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Redirect } from "react-router-dom";
import Game, { GameMetadata } from "../../interfaces/Game";
import Roles from "../../interfaces/Roles";

const Settings = () => {
  const ope = localStorage.getItem("ope");
  const [redirect, setRedirect] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [merlin, setMerlin] = useState(true);
  const [percival, setPercival] = useState(true);
  const [assassin, setAssassin] = useState(true);
  const [morgana, setMorgana] = useState(true);
  const [playerCount, setPlayerCount] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("http://localhost:5000/settings", {
          params: { ope: ope },
        })
        .then((res: any) => {
          const lobby: Game = res.data;
          console.log(lobby);
          setPlayerCount(lobby && lobby.data ? lobby.data.totalPlayers : 5);
          if (lobby && lobby.roles) {
            setMerlin(lobby.roles.includes(Roles.Merlin));
            setPercival(lobby.roles.includes(Roles.Percival));
            setAssassin(lobby.roles.includes(Roles.Assassin));
            setMorgana(lobby.roles.includes(Roles.Morgana));
          }
          setLoaded(true);
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, [ope]);

  function saveSettings() {
    sessionStorage.setItem("settingsHaveBeenUpdated", "true");
    const opeS: string = ope ? ope : "";
    const roles: Roles[] = [] as Roles[];
    const metadata: GameMetadata = {
      totalPlayers: playerCount,
    } as GameMetadata;
    if (merlin) roles.push(Roles.Merlin);
    if (percival) roles.push(Roles.Percival);
    if (assassin) roles.push(Roles.Assassin);
    if (morgana) roles.push(Roles.Morgana);
    const gameOptions: Game = {
      ope: opeS,
      roles: roles,
      data: metadata,
    } as Game;
    axios.post("http://localhost:5000/settings", {
      game: gameOptions,
    });
    setRedirect(true);
  }

  function loadedSettings() {
    return (
      <div>
        <br />
        <Row>
          <p>Which characters would you like to play with?</p>
          <ButtonGroup>
            <Button
              id="merlinButton"
              variant={merlin ? "primary" : "secondary"}
              onClick={() => setMerlin(!merlin)}
            >
              Merlin
            </Button>
            <Button
              id="percivalButton"
              variant={percival ? "primary" : "secondary"}
              onClick={() => setPercival(!percival)}
            >
              Percival
            </Button>
            <Button
              id="assassinButton"
              variant={assassin ? "primary" : "secondary"}
              onClick={() => setAssassin(!assassin)}
            >
              Assassin
            </Button>
            <Button
              id="morganaButton"
              variant={morgana ? "primary" : "secondary"}
              onClick={() => setMorgana(!morgana)}
            >
              Morgana
            </Button>
          </ButtonGroup>
        </Row>
        <br />
        <Row>
          <p>How many players are there?</p>
          <ButtonGroup>
            <Button
              variant={playerCount === 5 ? "primary" : "secondary"}
              onClick={() => setPlayerCount(5)}
            >
              5
            </Button>
            <Button
              variant={playerCount === 6 ? "primary" : "secondary"}
              onClick={() => setPlayerCount(6)}
            >
              6
            </Button>
            <Button
              variant={playerCount === 7 ? "primary" : "secondary"}
              onClick={() => setPlayerCount(7)}
            >
              7
            </Button>
            <Button
              variant={playerCount === 8 ? "primary" : "secondary"}
              onClick={() => setPlayerCount(8)}
            >
              8
            </Button>
            <Button
              variant={playerCount === 9 ? "primary" : "secondary"}
              onClick={() => setPlayerCount(9)}
            >
              9
            </Button>
            <Button
              variant={playerCount === 10 ? "primary" : "secondary"}
              onClick={() => setPlayerCount(10)}
            >
              10
            </Button>
          </ButtonGroup>
        </Row>
        <br />
        <Row>
          <LinkContainer to="/lobby">
            <Button variant="success" onClick={saveSettings}>
              Save Settings
              {redirect && <Redirect to="/lobby" />}
            </Button>
          </LinkContainer>
        </Row>
      </div>
    );
  }
  return (
    <>
      {loaded ? (
        loadedSettings()
      ) : (
        <span>
          <Spinner animation="grow" variant="primary" />
        </span>
      )}
    </>
  );
};
export default Settings;
