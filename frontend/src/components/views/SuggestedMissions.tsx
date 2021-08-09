import { useContext } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import {
  FaCheck,
  FaQuestion,
  FaThumbsDown,
  FaThumbsUp,
  FaTimes,
} from "react-icons/fa";
import { MissionState } from "../../interfaces/Game";
import Mission, { UserVote } from "../../interfaces/Mission";
import User from "../../interfaces/User";
import GameContext from "../context/GameContext";

type SuggestedMissionProps = {
  loadedMission: Mission[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<User[]>>;
  selectedUsers: User[];
  handleSuggest: () => void;
  handleVote: (vote: boolean) => void;
};

const SuggestedMissions = ({
  loadedMission,
  setSelectedUsers,
  selectedUsers,
  handleSuggest,
  handleVote,
}: SuggestedMissionProps) => {
  const game = useContext(GameContext);
  function handleSelectUser(user: User, numOfPlayers: number) {
    if (game.missionData.state === MissionState.Suggesting)
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
          <Table bordered>
            <thead>
              <tr>
                <td>User</td>
                {loadedMission.map((mission: Mission, j: number) => (
                  <td key={"suggestedMissions:" + j}>{j + 1}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {game.users.map((user: User, i: number) => (
                <tr
                  key={"user" + i}
                  // className={suggestedMission.passed ? "bg-success" : "bg-danger"}
                >
                  <td>{user.username}</td>
                  {loadedMission.map((mission: Mission, j: number) => (
                    <td
                      key={"suggestedMissions2:" + j}
                      className={
                        mission.suggester && mission.suggester._id === user._id
                          ? "bg-info"
                          : mission.suggestedUsers?.length &&
                            mission.suggestedUsers?.find(
                              (missionUser: User) => {
                                return missionUser._id === user._id;
                              }
                            )
                          ? "bg-warning"
                          : selectedUsers?.find((missionUser: User) => {
                              return missionUser._id === user._id;
                            }) && j === game.missionData.onMission
                          ? "bg-warning"
                          : ""
                      }
                      onClick={() =>
                        handleSelectUser(user, mission.data.numOfPlayers)
                      }
                    >
                      {!(
                        mission &&
                        mission.voteData &&
                        game.missionData.state === MissionState.Voting
                      ) ? (
                        <>
                          {j === game.missionData.onMission ? (
                            <FaQuestion />
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <>
                          {mission.voteData?.userVotes?.find(
                            (userVote: UserVote) => {
                              return userVote.user._id === user._id;
                            }
                          )?.passed ? (
                            <FaCheck style={{ color: "green" }} />
                          ) : (
                            <FaTimes style={{ color: "red" }} />
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
                {loadedMission.map((mission: Mission, j: number) => (
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
            <FaCheck
              style={{ color: "green" }}
              onClick={() => handleSuggest()}
            />
          </Col>
          <Col>
            <Button variant="primary" onClick={() => handleSuggest()}>
              Suggest
            </Button>
          </Col>
        </Row>
      )}
      {game.missionData.state === MissionState.Voting && (
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
    </>
  );
};

export default SuggestedMissions;
