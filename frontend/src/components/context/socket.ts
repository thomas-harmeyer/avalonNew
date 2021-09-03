import io from "socket.io-client";

const link = "tharmeyer.dev:4000/lobby";
export function getUsername() {
  return localStorage.getItem("username");
}

export function getOpe(): string {
  const ope = localStorage.getItem("ope");
  if (ope !== null) return ope;
  else return "ope";
}

export const socket = io(link, {
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
});

export function tryConnect() {
  if (!socket.connected) {
    console.log("try connecting");
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
