import io from "socket.io-client";

const link = "http://localhost:4000/lobby";
export function getUsername() {
  return localStorage.getItem("username");
}
export function getOpe() {
  return localStorage.getItem("ope");
}
export const socket = io(link, { autoConnect: false });
export function tryConnect() {
  console.group();
  console.log("try connect");
  console.groupEnd();
  if (!socket.connected) {
    if (getUsername() && getOpe()) {
      socket.auth = {
        username: getUsername(),
        id: `${Date.now()}`,
        ope: getOpe(),
      };
      socket.connect();
    }
  }
}

export function reconnect() {
  socket.disconnect();
  tryConnect();
}
tryConnect();

export default socket;
