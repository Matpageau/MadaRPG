export interface ITile {
  type: string;
  atlasPos: { x: number; y: number }[];
  destructible: boolean;
  colision: boolean;
}
