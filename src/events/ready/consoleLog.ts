import { Client } from "discord.js"

module.exports = (bot: Client) => {
  console.log(`${bot.user?.displayName} Online !`)
}
