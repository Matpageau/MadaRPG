import { ApplicationCommand, RESTPostAPIApplicationCommandsJSONBody } from "discord.js"
import path = require("path")
import { ICommand } from "../Interfaces/ICommand"
const getAllFiles = require("./getAllFiles")

module.exports = (exceptions: string[] = []): ICommand[] => {
  let localsCommands: ICommand[] = []

  const commandFiles: string = getAllFiles(path.join(__dirname, "..", "commands"))
  
  for (const commandFile of commandFiles) {
    const commandObject: ICommand = require(commandFile)

    if(exceptions.includes(commandObject.name)) {
      continue
    }

    localsCommands.push(commandObject)
  }
  
  return localsCommands
}