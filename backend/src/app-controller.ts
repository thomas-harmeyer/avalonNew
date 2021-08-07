import { Roles } from "./../../frontend/src/interfaces/Roles";
import cors from "cors";
import express from "express";
import Game, { findGame } from "./interfaces/Game";
import { emitUsers } from "./index";

export const app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/settings", (req: any, res: any) => {
  const game = findGame(req.query.ope);
  res.send(game);
});

app.post("/settings", (req: any, res: any) => {
  const gameSettings = req.body.game;
  const game = findGame(req.body.game.ope);
  game.roles = gameSettings.roles;
  game.data.totalPlayers = gameSettings.data.totalPlayers;

  emitUsers(game);
  res.send(game);
});

app.listen(5000, () => {
  console.log("settings server listening on /:5000");
});
