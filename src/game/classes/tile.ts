import { ITile } from "../../Interfaces/ITile";
import { Grass } from "../terrain/ground/grass";
import { Dird } from "../terrain/ground/dirt";
import { Mountain } from "../terrain/props/mountain";
import { Tree } from "../terrain/props/tree";

const TileClasses = {
  Grass,
  Dird,
  Mountain,
  Tree
} satisfies Record<string, ITile>

type TileKey = keyof typeof TileClasses;

export class Tile {
  name: string;
  type: string;
  atlasPos: { x: number; y: number };
  destructible: boolean;
  colision: boolean;

  constructor(tile: TileKey) {
    const TileClass = TileClasses[tile];
    this.name = TileClass.name;
    this.type = TileClass.type;
    this.atlasPos = TileClass.atlasPos[Math.floor(Math.random() * TileClass.atlasPos.length)]
    this.destructible = TileClass.destructible;
    this.colision = TileClass.colision;
  }
}
