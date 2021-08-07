import { useState } from "react";
import { Button, Col, FormControl, InputGroup, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Join = () => {
  const [ope, setOpe] = useState(localStorage.getItem("ope"));

  function storeOpe(ope: string) {
    localStorage.setItem("ope", ope);
    setOpe(ope);
  }
  return (
    <>
      <Row>
        <Col>
          <p>
            Your O.P.E. is any code you choose, just make sure everyone chooses
            the same O.P.E.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <InputGroup>
            <FormControl
              placeholder={ope ? ope : "O.P.E."}
              onChange={(event) => {
                storeOpe(event.target.value);
              }}
            />
            <LinkContainer to="/lobby">
              <Button>Submit</Button>
            </LinkContainer>
          </InputGroup>
        </Col>
      </Row>
    </>
  );
};

export default Join;
