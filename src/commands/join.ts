import { ChatInputCommandInteraction, Client } from "discord.js";
import { ICommand } from "../Interfaces/ICommand";
import { baseEmbed } from "../Utils/controllers/controllerEmbeds";
import { Game } from "../game/classes/game";

const joinCommand: ICommand = {
  name: "join",
  description: "Rejoindre la partie en cour",
  options: [],
  
  callback: (bot: Client, interaction: ChatInputCommandInteraction) => {
    
  }
}

export = joinCommand