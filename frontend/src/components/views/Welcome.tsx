import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { LinkContainer } from "react-router-bootstrap";

const Welcome = () => {
  const ope = localStorage.getItem("ope");
  return (
    <>
      <Row>
        <Col>
          <h4>Welcome to the Game of Avalon</h4>
        </Col>
      </Row>
      <Row>
        <ButtonGroup>
          <LinkContainer to={ope ? "/lobby" : "/login"}>
            <Button variant="primary">Join Game</Button>
          </LinkContainer>
          <LinkContainer to="/about">
            <Button variant="outline-primary">About</Button>
          </LinkContainer>
        </ButtonGroup>
      </Row>
    </>
  );
};

export default Welcome;
