import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div>
      <h4>Welcome to the Game of Avalon</h4>
      <Link to="/Lobby">Start Game</Link>
    </div>
  );
};

export default Welcome;
