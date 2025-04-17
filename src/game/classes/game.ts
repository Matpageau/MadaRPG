import fs from "fs"
import path from "path"
import { Map } from "./map"


export class Game {
  static mapChannelId: string | null = "828518673244618752"
  static mapMessageId: string | null = null
  static map: Map

  static setGameData(game: Game) {
    fs.writeFileSync(path.join(process.cwd(), "./data/game.json"), JSON.stringify(game))
  }
}