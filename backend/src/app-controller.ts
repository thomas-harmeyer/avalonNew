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
