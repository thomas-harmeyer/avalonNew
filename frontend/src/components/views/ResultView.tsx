import { useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import GameContext from "../context/GameContext";
import { getUsername } from "../context/socket";
import Links from "../Links";
const ResultView = () => {
  const game = useContext(GameContext);

  const isGood = game.users.find((user, i) => {
    return user._id === getUsername();
  })?.isGood;
  const result = game.result && isGood;
  return (
    <>
      <Row>
        <Col>{result ? "you win" : "you lose"}</Col>
      </Row>
      <br />
      <Row>
        <Col>
          <LinkContainer to={Links.Lobby}>
            <Button variant="primary">Back to Lobby</Button>
          </LinkContainer>
        </Col>
      </Row>
    </>
  );
};

export default ResultView;
