import fs from "fs"
import path from "path"
import { Map } from "./map"
import { Player } from "./player"


export class Game {
  map: Map
  leftPlayersIds: Player[] = []
  rightPlayersIds: Player[] = []

  constructor() {
    this.map = new Map()
  }

  setGameData(game: Game) {
    fs.writeFileSync(path.join(process.cwd(), "./data/game.json"), JSON.stringify(game))
  }
}