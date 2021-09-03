import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BootstrapNavbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import { FaCog } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import Links from "./Links";

const Navbar = () => {
  return (
    <BootstrapNavbar bg="dark" variant="dark">
      <Container fluid className="justify-content-end">
        <Nav className="me-auto">
          <Row>
            <Col>
              <LinkContainer to={Links.Welcome}>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
            </Col>
          </Row>
        </Nav>
        <Nav>
          <LinkContainer to={Links.Login}>
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
          <LinkContainer to={Links.Settings}>
            <BootstrapNavbar.Brand>
              <Row>
                <Col>
                  <FaCog />
                </Col>
              </Row>
            </BootstrapNavbar.Brand>
          </LinkContainer>
        </Nav>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
