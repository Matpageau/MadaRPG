import { Card } from "./card";
const suits: ("heart" | "diamond" | "spade" | "club")[] = ["heart", "diamond", "spade", "club"]

export class Deck {
  cards: Card[] = [];

  static createBaseDeck(): Deck {
    const deck = new Deck
    deck.generateBaseDeck()
    return deck
  }

  generateBaseDeck() {
    for (let i = 1; i <= 13; i++) {
      for(let suit of suits) {
        this.cards.push(new Card(i, suit, i))        
      }
    }
  }
}