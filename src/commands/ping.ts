import { ApplicationCommandOptionType, Client, MessageComponentInteraction, Options } from "discord.js";
import { ICommand } from "../Interfaces/ICommand";

const pingCommand: ICommand = {
  name: "ping",
  description: "pong",
  options: [],

  callback: (bot: Client, interaction: MessageComponentInteraction) => {
    interaction.reply("CA MARCHE encore ?")
  }
}

export = pingCommand