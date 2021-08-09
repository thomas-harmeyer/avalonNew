import io from "socket.io-client";

const link = "http://localhost:4000/lobby";
export function getUsername() {
  return localStorage.getItem("username");
}

export function getOpe(): string {
  const ope = localStorage.getItem("ope");
  if (ope !== null) return ope;
  else return "ope";
}

export const socket = io(link, { autoConnect: false });

export function tryConnect() {
  if (!socket.connected) {
    if (getUsername() && getOpe()) {
      socket.auth = {
        username: getUsername(),
        id: `${Date.now()}`,
        ope: getOpe(),
      };
      socket.on("connected", () => {
        console.log("connected");
      });
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
