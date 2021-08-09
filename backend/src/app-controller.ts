import cors from "cors";
import express from "express";
import { emitGame } from "./index";
import Game, { findGame } from "./interfaces/Game";

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
  const gameSettings: Game = req.body.game;
  const game = findGame(req.body.game.ope);
  game.roles = gameSettings.roles;
  game.totalPlayers = gameSettings.totalPlayers;

  emitGame(game);
  res.send(game);
});

app.listen(5000, () => {
  console.log("settings server listening on /:5000");
});
