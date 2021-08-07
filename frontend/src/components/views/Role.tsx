import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Game from "../../interfaces/Game";
import { getKnownRoles } from "../../interfaces/Roles";
import User from "../../interfaces/User";
import { getUsername, socket, tryConnect } from "../context/socket";

const Role = () => {
  const [user, setUser] = useState<User>();
  const [knownUsers, setKnownUsers] = useState<User[]>();

  useEffect(() => {
    tryConnect();

    function updateLobby(game: Game) {
      game.users.forEach((user: User) => {
        if (user.username === getUsername()) {
          setUser(user);
          setKnownUsers(getKnownRoles(user, game.users));
        }
      });
    }

    function fetchData() {
      socket.emit("connected");
      socket.on("update-lobby", updateLobby);
    }

    fetchData();
    return function disconnect() {
      socket.off("update-lobby");
    };
  }, []);
  return (
    <div>
      <h4>Your Role is {user && user.role ? user.role : ""}</h4>
      <Row>
        {knownUsers &&
          knownUsers.map((user, i) => (
            <Col xs={6} key={user._id}>
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
