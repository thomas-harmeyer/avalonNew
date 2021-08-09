import { useContext } from "react";
import { Button, ButtonGroup, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Roles from "../../interfaces/Roles";
import GameContext from "../context/GameContext";
import socket from "../context/socket";

const Settings = () => {
  const game = useContext(GameContext);
  const totalPlayersArray: number[] = [5, 6, 7, 8, 9, 10];
  const RolesArray: Roles[] = [
    Roles.Merlin,
    Roles.Percival,
    Roles.Assassin,
    Roles.Morgana,
  ];
  function setTotalPlayers(count: number) {
    game.totalPlayers = count;
    socket.emit("update-game", game);
  }

  function setRole(role: Roles) {
    if (game.roles.includes(role)) {
      game.roles = game.roles.filter((roleFilter) => {
        return roleFilter !== role;
      });
    } else {
      game.roles.push(role);
    }
    socket.emit("update-game", game);
  }
  return (
    <div>
      <br />
      <Row>
        <p>Which characters would you like to play with?</p>
        <ButtonGroup>
          {RolesArray.map((role: Roles) => (
            <Button
              key={role}
              variant={game.roles.includes(role) ? "primary" : "secondary"}
              onClick={() => setRole(role)}
            >
              {role}
            </Button>
          ))}
        </ButtonGroup>
      </Row>
      <br />
      <Row>
        <p>How many players are there?</p>
        <ButtonGroup>
          {totalPlayersArray.map((totalPlayer, index) => (
            <Button
              key={totalPlayer}
              variant={
                game.totalPlayers === totalPlayer ? "primary" : "secondary"
              }
              onClick={() => setTotalPlayers(totalPlayer)}
            >
              {totalPlayer}
            </Button>
          ))}
        </ButtonGroup>
      </Row>
      <br />
      <Row>
        <LinkContainer to="/lobby">
          <Button variant="success">To Lobby</Button>
        </LinkContainer>
      </Row>
    </div>
  );
};

export default Settings;
