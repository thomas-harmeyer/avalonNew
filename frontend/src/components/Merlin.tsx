import { useContext, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import Row from "react-bootstrap/esm/Row";
import { Redirect } from "react-router-dom";
import Roles from "../interfaces/Roles";
import User from "../interfaces/User";
import GameContext from "./context/GameContext";
import socket, { getUsername } from "./context/socket";
import Links from "./Links";

const Welcome = () => {
  const [selectedUser, setSelectedUser] = useState<User>();
  const game = useContext(GameContext);

  console.log(game);

  if (game.result !== undefined) {
    return <Redirect to={Links.Result}></Redirect>;
  }

  const isAssassin =
    game.users.find((user, i) => {
      return user._id === getUsername();
    })?.role === Roles.Assassin;

  let goodUsers = game.users.filter((user, i) => {
    return user.isGood;
  });

  function guessUser() {
    socket.emit("user-guess", selectedUser);
  }
  if (game.hasStarted === false) {
    return <Redirect to={Links.Result} />;
  }
  return (
    <>
      {!isAssassin ? (
        <Row>
          <Col>The Assassin is guessing Merlin</Col>
        </Row>
      ) : (
        <>
          <Row>
            {goodUsers.map((user, i) => (
              <Col xs={6} key={"user:" + i}>
                <Card
                  bg={user._id === selectedUser?._id ? "primary" : "secondary"}
                  text="light"
                  className="mt-1"
                  onClick={() => {
                    setSelectedUser(user);
                  }}
                >
                  <Card.Body>{user.username}</Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <br />
          <Row>
            <Col>
              <Button
                onClick={() => {
                  guessUser();
                }}
              >
                guess merlin
              </Button>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Welcome;
