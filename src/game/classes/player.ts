import { User } from "discord.js";
import { Deck } from "./deck";

export class Player {
  displayName: string;
  id: string;
  money: number;
  level: number;
  deck: Deck;
  lastLogin: string;
  
  constructor(user: User) {
    this.displayName = user.displayName ? user.displayName : user.username
    this.id = user.id
    this.money = 0
    this.deck = Deck.createBaseDeck()
    this.level = 1
    this.lastLogin = new Date().toISOString()
  }
}