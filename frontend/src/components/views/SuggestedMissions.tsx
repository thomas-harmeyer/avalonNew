import { Col, Row, Table } from "react-bootstrap";
import { FaCheck, FaQuestion, FaTimes } from "react-icons/fa";
import Mission, { UserVote } from "../../interfaces/Mission";
import User from "../../interfaces/User";

type SuggestedMissionProps = {
  suggestedMissions: Mission[];
  users: User[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<User[]>>;
  selectedUsers: User[];
  suggestingMission: number;
  voteOnSuggestedMission: (vote: boolean) => void;
};

const SuggestedMissions = ({
  suggestedMissions,
  users,
}: SuggestedMissionProps) => {
  return (
    <>
      <Row>
        <Col>
          <Table bordered>
            <thead>
              <tr>
                <td>User</td>
                {suggestedMissions.map((mission: Mission, j: number) => (
                  <td key={"suggestedMissions:" + j}>{j + 1}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user: User, i: number) => (
                <tr
                  key={"user" + i}
                  // className={suggestedMission.passed ? "bg-success" : "bg-danger"}
                >
                  <td>{user.username}</td>
                  {suggestedMissions.map((mission: Mission, j: number) => (
                    <td
                      key={"suggestedMissions2:" + j}
                      className={
                        mission.suggester && mission.suggester._id === user._id
                          ? "bg-info"
                          : mission.suggestedUsers?.filter(
                              (missionUser: User) => {
                                return missionUser._id === user._id;
                              }
                            ).length
                          ? "bg-warning"
                          : selectedUsers.filter((missionUser: User) => {
                              return missionUser._id === user._id;
                            }).length && j === suggestingMission
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
                        mission.voteData.isVoting
                      ) ? (
                        <>{j === suggestingMission ? <FaQuestion /> : <></>}</>
                      ) : (
                        <>
                          {mission.voteData?.userVotes?.filter(
                            (userVote: UserVote) => {
                              return userVote.user._id === user._id;
                            }
                          )[0].passed ? (
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
                {suggestedMissions.map((mission: Mission, j: number) => (
                  <td key={"suggestedMissionsNumOfPlayers:" + j}>
                    {mission.data.numOfPlayers}
                  </td>
                ))}
              </tr>
            </tfoot>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <FaCheck
            style={{ color: "green" }}
            onClick={() => voteOnSuggestedMission(true)}
          />
        </Col>
        <Col>
          <FaTimes
            style={{ color: "red" }}
            onClick={() => voteOnSuggestedMission(false)}
          />
        </Col>
      </Row>
    </>
  );
};

export default SuggestedMissions;
