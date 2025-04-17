import { Client, MessageComponentInteraction } from "discord.js"

export interface IAction {
  name: string
  callback: (bot: Client, interaction: MessageComponentInteraction, ...args: any[]) => any
}