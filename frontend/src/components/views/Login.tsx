import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Redirect } from "react-router-dom";
import { reconnect } from "../context/socket";
import Links from "../Links";

const Login = () => {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [ope, setOpe] = useState(localStorage.getItem("ope"));
  const [redirect, setRedirect] = useState(false);
  function storeUsername(username: string) {
    localStorage.setItem("username", username);
    setUsername(username);
  }
  function storeOpe(ope: string) {
    localStorage.setItem("ope", ope);
    sessionStorage.removeItem("settingsHaveBeenUpdated");
    reconnect();
    setOpe(ope);
  }
  if (redirect) {
    return <Redirect to={Links.Lobby} />;
  }
  return (
    <>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={username ? username : ""}
                placeholder={username ? username : ""}
                onChange={(event) => {
                  storeUsername(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>OPE</Form.Label>
              <Form.Control
                placeholder={ope ? ope : "O.P.E."}
                value={ope ? ope : ""}
                onChange={(event) => {
                  storeOpe(event.target.value);
                }}
              />
            </Form.Group>
            <Button variant="primary" onClick={() => setRedirect(true)}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
