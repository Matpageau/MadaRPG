import { ApplicationCommandOptionData, PermissionsBitField } from "discord.js"

export interface ICommand {
  name: string
  description: string
  callback: (...args: any[]) => any
  options: ApplicationCommandOptionData[]
  devOnly?: boolean
  testOnly?: boolean
  deleted?: boolean
  permissionsRequired?: PermissionsBitField[]
}