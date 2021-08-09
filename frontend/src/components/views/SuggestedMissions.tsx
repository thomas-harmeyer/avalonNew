import { useContext } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { FaCheck, FaQuestion, FaTimes } from "react-icons/fa";
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
  //test data
  // const testUsers: User[] = [
  //   {
  //     _id: "1",
  //     username: "thomas",
  //     ope: "hell",
  //     role: Roles.GoodKnight,
  //     data: { winRate: 0.5 },
  //     isGood: true,
  //   },
  //   {
  //     _id: "2",
  //     username: "louis",
  //     ope: "hell",
  //     role: Roles.Merlin,
  //     data: { winRate: 0.5 },
  //     isGood: true,
  //   },
  //   {
  //     _id: "3",
  //     username: "keegan",
  //     ope: "hell",
  //     role: Roles.Merlin,
  //     data: { winRate: 0.5 },
  //     isGood: true,
  //   },
  //   {
  //     _id: "4",
  //     username: "may",
  //     ope: "hell",
  //     role: Roles.Merlin,
  //     data: { winRate: 0.5 },
  //     isGood: true,
  //   },
  //   {
  //     _id: "5",
  //     username: "chuck",
  //     ope: "hell",
  //     role: Roles.Merlin,
  //     data: { winRate: 0.5 },
  //     isGood: true,
  //   },
  //   {
  //     _id: "6",
  //     username: "loki",
  //     ope: "hell",
  //     role: Roles.GoodKnight,
  //     data: { winRate: 0.5 },
  //     isGood: true,
  //   },
  //   {
  //     _id: "7",
  //     username: "k",
  //     ope: "hell",
  //     role: Roles.Merlin,
  //     data: { winRate: 0.5 },
  //     isGood: true,
  //   },
  //   {
  //     _id: "8",
  //     username: "nicole",
  //     ope: "hell",
  //     role: Roles.Merlin,
  //     data: { winRate: 0.5 },
  //     isGood: true,
  //   },
  // ];
  // users = testUsers;
  // loadedMission = [
  //   {
  //     data: {
  //       numOfPlayers: 2,
  //       numOfFails: 2,
  //     },
  //     suggestedUsers: [],
  //   },
  //   {
  //     data: {
  //       numOfPlayers: 3,
  //       numOfFails: 1,
  //     },
  //     suggestedUsers: [],
  //   },
  //   {
  //     data: {
  //       numOfPlayers: 2,
  //       numOfFails: 1,
  //     },
  //     suggestedUsers: [],
  //   },
  //   {
  //     data: {
  //       numOfPlayers: 3,
  //       numOfFails: 1,
  //     },
  //     suggestedUsers: [],
  //   },
  //   {
  //     data: {
  //       numOfPlayers: 3,
  //       numOfFails: 1,
  //     },
  //     suggestedUsers: [],
  //   },
  // ];
  //end test data

  function handleSelectUser(user: User, numOfPlayers: number) {
    if (!game.missionData.isVoting)
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
                          : mission.suggestedUsers?.filter(
                              (missionUser: User) => {
                                return missionUser._id === user._id;
                              }
                            ).length
                          ? "bg-warning"
                          : selectedUsers.filter((missionUser: User) => {
                              return missionUser._id === user._id;
                            }).length && j === game.missionData.onMission
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
                        game.missionData.isVoting === false
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
      {game.missionData.isVoting && (
        <Row>
          <Col>
            <FaCheck
              style={{ color: "green" }}
              onClick={
                game.missionData.isVoting
                  ? () => handleVote(true)
                  : () => handleSuggest()
              }
            />
          </Col>
          <Col>
            <FaTimes
              style={{ color: "red" }}
              onClick={
                game.missionData.isVoting
                  ? () => handleVote(false)
                  : () => handleSuggest()
              }
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default SuggestedMissions;
