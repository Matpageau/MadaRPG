import { ApplicationCommandOptionData, ChatInputCommandInteraction, Client, PermissionsBitField } from "discord.js"

export interface ICommand {
  name: string
  description: string
  callback: (bot: Client, interaction: ChatInputCommandInteraction, ...args: any[]) => any
  options: ApplicationCommandOptionData[]
  devOnly?: boolean
  testOnly?: boolean
  deleted?: boolean
  permissionsRequired?: PermissionsBitField[]
}