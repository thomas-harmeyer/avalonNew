import { Link } from "react-router-dom";
import Links from "./Links";

const Welcome = () => {
  return (
    <div>
      <h4>Welcome to the Game of Avalon</h4>
      <Link to={Links.Lobby}>Start Game</Link>
    </div>
  );
};

export default Welcome;
