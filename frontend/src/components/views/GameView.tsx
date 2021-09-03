import { useContext, useEffect, useState } from "react";
import { Alert, Card, CloseButton, Col, Row, Table } from "react-bootstrap";
import { FaCheck, FaQuestion, FaTimes } from "react-icons/fa";
import { Redirect } from "react-router-dom";
import { MissionState } from "../../interfaces/Game";
import Mission from "../../interfaces/Mission";
import User from "../../interfaces/User";
import GameContext from "../context/GameContext";
import socket from "../context/socket";
import Links from "../Links";
import SuggestedMissions from "./SuggestedMissions";

const GameView = () => {
  const game = useContext(GameContext);

  const [passedMissions, setPassedMissions] = useState<Mission[]>([]);
  const [loadedMission, setLoadedMission] = useState<number>(-1);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [lastOnMission, setLastOnMission] = useState<[number, number]>([0, 0]);
  const [onMission, setOnMission] = useState<number>(0);
  const [error, setError] = useState<string>();
  const [canSuggest, setCanSuggest] = useState<boolean>(true);

  useEffect(() => {
    const setData = async () => {
      //set passed missions
      if (game.missions.length) {
        const passedMissionsTemp: Mission[] = [];
        game.missions.forEach((missionArray, i) => {
          passedMissionsTemp.push(missionArray[missionArray.length - 1]);
        });
        setPassedMissions(passedMissionsTemp);

        const mission =
          loadedMission === -1
            ? game.missions[game.missionData.onMission][
                game.missions[game.missionData.onMission].length - 1
              ]
            : game.missions[loadedMission][
                game.missions[loadedMission].length - 1
              ];
        if (game.missionData.state === MissionState.Voting) {
          setSelectedUsers(mission.suggestedUsers);
        }
        //if new mission
        if (
          lastOnMission[0] !== game.missionData.onMission ||
          lastOnMission[1] !== game.missions[game.missionData.onMission].length
        ) {
          setSelectedUsers([]);
          setLoadedMission(game.missionData.onMission);
          setOnMission(game.missions[game.missionData.onMission].length - 1);
          setCanSuggest(true);
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
    loadedMission,
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

  if (game.hasStarted === false) {
    return <Redirect to={Links.Lobby} />;
  }

  if (game.missionData.result !== undefined) {
    return <Redirect to={Links.Merlin} />;
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
          <Card
            bg={loadedMission === -1 ? "primary" : "light"}
            onClick={() => {
              setLoadedMission(-1);
              setOnMission(game.missionData.onMission);
              setCanSuggest(true);
            }}
          >
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
                      bg={loadedMission === i ? "primary" : "light"}
                      onClick={() => {
                        setLoadedMission(i);
                        if (i === game.missionData.onMission) {
                          setOnMission(game.missions[i].length - 1);
                          setCanSuggest(true);
                        } else {
                          setOnMission(game.missions[i].length - 1);
                          setCanSuggest(false);
                        }
                      }}
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
      {passedMissions.length > 0 && (
        <SuggestedMissions
          loadedMissions={
            loadedMission === -1 ? passedMissions : game.missions[loadedMission]
          }
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          handleSuggest={handleSuggest}
          handleVote={handleVote}
          handlePass={handleSuccess}
          onMission={onMission}
          canSuggest={canSuggest}
        ></SuggestedMissions>
      )}
    </>
  );
};

export default GameView;
