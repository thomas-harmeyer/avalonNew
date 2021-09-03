import { useContext } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import {
  FaCheck,
  FaQuestion,
  FaThumbsDown,
  FaThumbsUp,
  FaTimes,
} from "react-icons/fa";
import { Redirect } from "react-router-dom";
import { MissionState } from "../../interfaces/Game";
import Mission, { UserVote } from "../../interfaces/Mission";
import User from "../../interfaces/User";
import GameContext from "../context/GameContext";
import socket from "../context/socket";

type SuggestedMissionProps = {
  loadedMissions: Mission[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<User[]>>;
  selectedUsers: User[];
  handleSuggest: () => void;
  handleVote: (vote: boolean) => void;
  handlePass: (success: boolean) => void;
  onMission: number;
  canSuggest: boolean;
};

const SuggestedMissions = ({
  loadedMissions,
  setSelectedUsers,
  selectedUsers,
  handleSuggest,
  handleVote,
  handlePass,
  onMission,
  canSuggest,
}: SuggestedMissionProps) => {
  console.log("on mission " + onMission);
  const game = useContext(GameContext);
  console.log(game);
  if (game.missions.length === 0) {
    return <Redirect to="/lobby" />;
  }

  const hasVoted = game.missions[game.missionData.onMission][
    game.missions[game.missionData.onMission].length - 1
  ].voteData?.userVotes.find((userVote, index) => {
    return userVote.user._id === socket.id;
  })
    ? true
    : false;
  const hasPassed = game.missions[game.missionData.onMission][
    game.missions[game.missionData.onMission].length - 1
  ].userResults.find((userResult, index) => {
    return userResult.user._id === socket.id;
  })
    ? true
    : false;
  const areSuggested = loadedMissions[onMission].suggestedUsers.find(
    (user, index) => {
      return user._id === socket.id;
    }
  )
    ? true
    : false;

  function handleSelectUser(user: User, numOfPlayers: number) {
    if (game.missionData.state === MissionState.Suggesting && canSuggest)
      if (
        selectedUsers.filter((userFilter: User) => {
          return userFilter._id === user._id;
        }).length > 0
      ) {
        setSelectedUsers((selectedUsers) =>
          selectedUsers.filter((userFilter: User) => {
            return userFilter._id !== user._id;
          })
        );
      } else {
        if (selectedUsers.length < numOfPlayers) {
          setSelectedUsers((selectedUsers) => [...selectedUsers, user]);
        } else {
          let selectedUsersTemp = selectedUsers;
          selectedUsersTemp.pop();
          setSelectedUsers([...selectedUsersTemp, user]);
        }
      }
  }

  return (
    <>
      <Row>
        <Col>
          <Table bordered className="">
            <thead>
              <tr key={"loadedMission"}>
                <td>User</td>
                {loadedMissions.map((mission: Mission, j: number) => (
                  <td key={"suggestedMissions:" + j}>{j + 1}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {game.users.map((user: User, i: number) => (
                <tr key={"user" + i}>
                  <td
                    className={
                      game.missions[onMission][
                        game.missions[onMission].length - 1
                      ].suggester?._id === user._id
                        ? "bg-primary"
                        : ""
                    }
                  >
                    {user.username}
                  </td>
                  {loadedMissions.map((mission: Mission, j) => (
                    <td
                      key={"suggestedMissions2:" + j}
                      className={
                        mission.suggester &&
                        mission.suggester._id === user._id &&
                        mission.passed !== undefined
                          ? !mission.suggestedUsers.find(
                              (missionUser: User) => {
                                return missionUser._id === user._id;
                              }
                            )
                            ? "bg-warning"
                            : mission.passed
                            ? "bg-success"
                            : "bg-danger"
                          : mission.suggestedUsers.find((missionUser: User) => {
                              return missionUser._id === user._id;
                            })
                          ? mission.passed === undefined
                            ? "bg-secondary"
                            : mission.passed
                            ? "bg-secondary"
                            : "bg-secondary"
                          : selectedUsers?.find((missionUser: User) => {
                              return missionUser._id === user._id;
                            }) && j === onMission
                          ? "bg-info"
                          : ""
                      }
                      onClick={() =>
                        handleSelectUser(user, mission.data.numOfPlayers)
                      }
                    >
                      {!(mission && j <= onMission) ? (
                        j === onMission && <FaQuestion />
                      ) : (
                        <>
                          {mission.voteData?.userVotes?.find(
                            (userVote: UserVote) => {
                              return userVote.user._id === user._id;
                            }
                          )?.passed === undefined ? (
                            <FaQuestion />
                          ) : mission.voteData.userVotes.length !==
                            game.totalPlayers ? (
                            <FaQuestion />
                          ) : mission.voteData?.userVotes?.find(
                              (userVote: UserVote) => {
                                return userVote.user._id === user._id;
                              }
                            )?.passed ? (
                            <FaCheck
                              style={{
                                color:
                                  mission.passed === undefined
                                    ? "green"
                                    : mission.passed
                                    ? "green"
                                    : "red",
                              }}
                            />
                          ) : (
                            <FaTimes
                              style={{
                                color:
                                  mission.passed === undefined
                                    ? "red"
                                    : !mission.passed
                                    ? "green"
                                    : "red",
                              }}
                            />
                          )}
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td># of players</td>
                {loadedMissions.map((mission: Mission, j: number) => (
                  <td key={"suggestedMissionsNumOfPlayers:" + j}>
                    {mission.data.numOfPlayers}
                    {mission.data.numOfFails > 1 && "!"}
                  </td>
                ))}
              </tr>
            </tfoot>
          </Table>
        </Col>
      </Row>
      {game.missionData.state === MissionState.Suggesting && (
        <Row>
          <Col>
            <Button variant="primary" onClick={() => handleSuggest()}>
              Suggest
            </Button>
          </Col>
        </Row>
      )}
      {game.missionData.state === MissionState.Voting && !hasVoted && (
        <Row>
          <Col>
            <FaThumbsUp
              style={{ color: "green" }}
              onClick={() => handleVote(true)}
            />
          </Col>
          <Col>
            <FaThumbsDown
              style={{ color: "red" }}
              onClick={() => handleVote(false)}
            />
          </Col>
        </Row>
      )}
      {game.missionData.state === MissionState.onMission &&
        !hasPassed &&
        areSuggested && (
          <Row>
            <Col>
              <FaCheck
                style={{ color: "green" }}
                onClick={() => {
                  handlePass(true);
                }}
              />
            </Col>
            <Col>
              <FaTimes
                style={{ color: "red" }}
                onClick={() => {
                  handlePass(false);
                }}
              />
            </Col>
          </Row>
        )}
    </>
  );
};

export default SuggestedMissions;
