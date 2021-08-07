import { Card, Col } from "react-bootstrap";
import User from "../interfaces/User";

type LobbyNameListProps = {
  users: User[];
};

const LobbyNameList: React.FC<LobbyNameListProps> = (props) => {
  return (
    <>
      {props.users.map((user, i) => (
        <Col xs={6} key={user._id}>
          <Card bg="secondary" text="light" className="mt-1">
            <Card.Body>{user.username}</Card.Body>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default LobbyNameList;
