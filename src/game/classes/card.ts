export class Card {
  value: number;
  suit: "heart" | "diamond" | "spade" | "club";
  price: number;
  level: number;

  constructor(value: number, suit: "heart" | "diamond" | "spade" | "club", price: number) {
    this.value = value;
    this.suit = suit;
    this.price = price;
    this.level = 1;
  }
}