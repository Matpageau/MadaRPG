import fs from "fs"
import path from "path";
import { Player } from "../game/classes/player";

export function getPlayers(): Player[] {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), "./data/players.json"), "utf-8"))
}

export function setPlayers(players: Player[]) {
  fs.writeFileSync(path.join(process.cwd(), "./data/players.json"), JSON.stringify(players))
}