import { Client } from "discord.js"
import path = require("path")
const getAllFiles = require("../Utils/getAllFiles")

module.exports = (bot: Client) => {
  const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true)

  for (const eventFolder of eventFolders) {{
    const eventFiles = getAllFiles(eventFolder)
    
    const eventName = eventFolder.replace(/\\/g, "/").split("/").pop()
    
    bot.on(eventName, async (arg) => {
      for (const eventFile of eventFiles) {
        const eventFunction = require(eventFile)
        await eventFunction(bot, arg)
      }
    })
  }}
}