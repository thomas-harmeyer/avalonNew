import { useEffect, useState } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { FaCheck, FaQuestion, FaTimes } from "react-icons/fa";
import Game from "../../interfaces/Game";
import Mission from "../../interfaces/Mission";
import Roles from "../../interfaces/Roles";
import User from "../../interfaces/User";
import socket from "../context/socket";
import SuggestedMissions from "./SuggestedMissions";

const GameView = () => {
  const testUsers: User[] = [
    {
      _id: "1",
      username: "thomas",
      ope: "hell",
      role: Roles.GoodKnight,
      data: { winRate: 0.5 },
      isGood: true,
    },
    {
      _id: "2",
      username: "louis",
      ope: "hell",
      role: Roles.Merlin,
      data: { winRate: 0.5 },
      isGood: true,
    },
    {
      _id: "3",
      username: "keegan",
      ope: "hell",
      role: Roles.Merlin,
      data: { winRate: 0.5 },
      isGood: true,
    },
    {
      _id: "4",
      username: "may",
      ope: "hell",
      role: Roles.Merlin,
      data: { winRate: 0.5 },
      isGood: true,
    },
    {
      _id: "5",
      username: "chuck",
      ope: "hell",
      role: Roles.Merlin,
      data: { winRate: 0.5 },
      isGood: true,
    },
    {
      _id: "6",
      username: "loki",
      ope: "hell",
      role: Roles.GoodKnight,
      data: { winRate: 0.5 },
      isGood: true,
    },
    {
      _id: "7",
      username: "k",
      ope: "hell",
      role: Roles.Merlin,
      data: { winRate: 0.5 },
      isGood: true,
    },
    {
      _id: "8",
      username: "nicole",
      ope: "hell",
      role: Roles.Merlin,
      data: { winRate: 0.5 },
      isGood: true,
    },
    {
      _id: "9",
      username: "emma",
      ope: "hell",
      role: Roles.Merlin,
      data: { winRate: 0.5 },
      isGood: true,
    },
    {
      _id: "10",
      username: "pat",
      ope: "hell",
      role: Roles.Merlin,
      data: { winRate: 0.5 },
      isGood: true,
    },
  ];

  const [missions, setMissions] = useState<Mission[][]>([]);
  const [loadedMission, setLoadedMission] = useState<Mission[]>();
  const [users, setUsers] = useState<User[]>(testUsers);
  const [passedMissions, setPassedMissions] = useState<Mission[]>([]);

  useEffect(() => {
    const updateLobby = (game: Game) => {
      //log game
      console.log(game);

      //set users
      setUsers(game.users);

      //set missions
      setMissions(game.missions);

      //set passed missions
      const passedMissionsTemp: Mission[] = [];
      game.missions.forEach((missionArray, i) => {
        passedMissionsTemp.push(missionArray[missionArray.length - 1]);
      });
      setPassedMissions(passedMissionsTemp);
    };

    //ask for lobby data
    const fetchData = async () => {
      socket.emit("connected");
      socket.on("update-lobby", updateLobby);
    };

    //run fetch data
    fetchData();
  }, [missions.length]);

  return (
    <>
      <Row>
        <Col>
          <Card bg="light" onClick={() => setLoadedMission(passedMissions)}>
            <Card.Body>Passed Missions</Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table>
            <tbody>
              <tr>
                {missions &&
                  missions.map((mission, i) => (
                    <td key={"mission: " + i}>
                      <Card
                        bg="light"
                        onClick={() => setLoadedMission(missions[i])}
                      >
                        <Card.Body>
                          {mission[mission.length - 1].passed === undefined ? (
                            <FaQuestion />
                          ) : mission[mission.length - 1].passed ? (
                            <FaCheck style={{ color: "green" }} />
                          ) : (
                            <FaTimes style={{ color: "red" }} />
                          )}
                        </Card.Body>
                      </Card>
                    </td>
                  ))}
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      {loadedMission && users && (
        <SuggestedMissions
          suggestedMissions={loadedMission}
          users={users}
        ></SuggestedMissions>
      )}
    </>
  );
};

export default GameView;
