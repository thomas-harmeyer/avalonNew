import { Link } from "react-router-dom";
import Links from "../Links";

const About = () => {
  return (
    <div>
      <h4>Version 1.0.0</h4>
      <Link to={Links.Welcome}>Go Back</Link>
    </div>
  );
};

export default About;
