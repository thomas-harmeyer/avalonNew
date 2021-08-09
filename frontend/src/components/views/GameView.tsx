import { useContext, useEffect, useState } from "react";
import { Alert, Card, CloseButton, Col, Row, Table } from "react-bootstrap";
import { FaCheck, FaQuestion, FaTimes } from "react-icons/fa";
import { MissionState } from "../../interfaces/Game";
import Mission from "../../interfaces/Mission";
import User from "../../interfaces/User";
import GameContext from "../context/GameContext";
import socket from "../context/socket";
import SuggestedMissions from "./SuggestedMissions";

const GameView = () => {
  const game = useContext(GameContext);

  const [passedMissions, setPassedMissions] = useState<Mission[]>([]);
  const [loadedMissions, setLoadedMission] = useState<Mission[]>();
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [lastOnMission, setLastOnMission] = useState<[number, number]>([0, 0]);
  const [error, setError] = useState<string>();

  console.log(loadedMissions);

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
        if (
          lastOnMission[0] !== game.missionData.onMission ||
          lastOnMission[1] !== game.missions[game.missionData.onMission].length
        ) {
          setSelectedUsers([]);
          setLastOnMission([
            game.missionData.onMission,
            game.missions[game.missionData.onMission].length,
          ] as [number, number]);
        }
      }
    };
    //run fetch data
    setData();
  }, [
    game.missionData.onMission,
    game.missionData.state,
    game.missions,
    lastOnMission,
  ]);

  function handleVote(vote: boolean) {
    console.log("user-vote");
    socket.emit("user-vote", vote);
  }
  function handleSuggest() {
    console.log("user-suggest");
    const mission =
      game.missions[game.missionData.onMission][
        game.missions[game.missionData.onMission].length - 1
      ];
    if (selectedUsers.length === mission.data.numOfPlayers) {
      socket.emit("user-suggest", selectedUsers);
      setSelectedUsers([]);
    } else {
      setError("You must select the correct number of users");
    }
  }
  function handleSuccess(success: boolean) {
    console.log("user-passed");
    socket.emit("user-passed", success);
  }

  return (
    <>
      {error && (
        <Row
          onClick={() => {
            setError(undefined);
          }}
        >
          <Col>
            <Alert variant={"danger"}>
              {error}
              <hr />
              <CloseButton />
            </Alert>
          </Col>
        </Row>
      )}
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
      {loadedMissions && (
        <SuggestedMissions
          loadedMissions={loadedMissions}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          handleSuggest={handleSuggest}
          handleVote={handleVote}
          handlePass={handleSuccess}
        ></SuggestedMissions>
      )}
    </>
  );
};

export default GameView;
