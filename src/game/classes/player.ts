import { User } from "discord.js";

export class Player {
  displayName: string;
  id: string;
  xPosition: number | null;
  yPosition: number | null;
  lastLogin: string;
  
  constructor(user: User) {
    this.displayName = user.displayName ? user.displayName : user.username
    this.id = user.id
    this.lastLogin = new Date().toISOString()
    this.xPosition = null
    this.yPosition = null
  }
}