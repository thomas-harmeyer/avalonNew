import { useContext, useEffect, useState } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { FaCheck, FaQuestion, FaTimes } from "react-icons/fa";
import { MissionState } from "../../interfaces/Game";
import Mission from "../../interfaces/Mission";
import User from "../../interfaces/User";
import GameContext from "../context/GameContext";
import socket from "../context/socket";
import SuggestedMissions from "./SuggestedMissions";

const GameView = () => {
  const game = useContext(GameContext);
  console.log(
    game && game.missions.length && game.missions[0].length
      ? game.missions[0][0]
      : ""
  );
  console.log(game.missionData);

  const [passedMissions, setPassedMissions] = useState<Mission[]>([]);
  const [loadedMission, setLoadedMission] = useState<Mission[]>();
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  useEffect(() => {
    const setData = async () => {
      //set passed missions
      if (game.missions.length) {
        const passedMissionsTemp: Mission[] = [];
        game.missions.forEach((missionArray, i) => {
          passedMissionsTemp.push(missionArray[missionArray.length - 1]);
        });
        setPassedMissions(passedMissionsTemp);
        setLoadedMission(passedMissionsTemp);
        const mission =
          game.missions[game.missionData.onMission][
            game.missions[game.missionData.onMission].length - 1
          ];
        if (game.missionData.state === MissionState.Voting) {
          setSelectedUsers(mission.suggestedUsers);
        }
      }
    };
    //run fetch data
    setData();
  }, [
    game.missionData.onMission,
    game.missionData.state,
    game.missions,
    game.users,
  ]);

  function handleVote(vote: boolean) {
    console.log("user-vote");
    socket.emit("user-vote", vote);
  }
  function handleSuggest() {
    console.log("user-suggest");
    socket.emit("user-suggest", selectedUsers);
  }

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
                {game.missions.map((mission, i) => (
                  <td key={"mission: " + i}>
                    <Card
                      bg="light"
                      onClick={() => setLoadedMission(game.missions[i])}
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
      {loadedMission && (
        <SuggestedMissions
          loadedMission={loadedMission}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          handleSuggest={handleSuggest}
          handleVote={handleVote}
        ></SuggestedMissions>
      )}
    </>
  );
};

export default GameView;
