import "dotenv/config"
import { Client } from "discord.js"
const eventHandler = require("./handlers/eventHandler")

const bot = new Client({
  intents: ["Guilds", "GuildMessages", "GuildMembers", "MessageContent"]
})

eventHandler(bot)

bot.login(process.env.BOT_TOKEN)