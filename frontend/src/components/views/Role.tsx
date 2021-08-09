import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { getKnownRoles } from "../../interfaces/Roles";
import User from "../../interfaces/User";
import GameContext from "../context/GameContext";
import { getUsername, tryConnect } from "../context/socket";
import { useContext } from "react";

const Role = () => {
  const game = useContext(GameContext);

  const [knownUsers, setKnownUsers] = useState<User[]>();

  useEffect(() => {
    tryConnect();

    function updateLobby() {
      game.users.forEach((user: User) => {
        if (user.username === getUsername()) {
          setKnownUsers(getKnownRoles(user, game.users));
        }
      });
    }
    updateLobby();
  }, [game.users]);
  return (
    <div>
      <h4>
        Your Role is{" "}
        {game.users.find((user: User) => user.username === getUsername())?.role}
      </h4>
      <Row>
        {knownUsers &&
          knownUsers.map((user, i) => (
            <Col xs={6} key={"user:" + user._id}>
              <Card bg="secondary" text="light" className="mt-1">
                <Card.Body>
                  {user.username}
                  {": "}
                  {user.role}
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      <Row className="mt-3">
        <Col>
          <LinkContainer to="/game">
            <Button>Start Game</Button>
          </LinkContainer>
        </Col>
      </Row>
    </div>
  );
};

export default Role;
