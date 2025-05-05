import { ChatInputCommandInteraction, Client } from "discord.js";
import { ICommand } from "../Interfaces/ICommand";
import { baseEmbed } from "../Utils/controllers/controllerEmbeds";
import { Game } from "../game/classes/game";

const newGameCommand: ICommand = {
  name: "newgame",
  description: "Commencer une nouvelle partie",
  options: [],
  
  callback: (bot: Client, interaction: ChatInputCommandInteraction) => {
    const game = new Game()
    game.map.updateOrCreateMapMessage(interaction)
    game.setGameData(game)
    
    interaction.reply({embeds: [baseEmbed()
      .setTitle("Une nouvelle partie est commencée !")
      .setColor("Green")
    ]}).then(msg => {
      setTimeout(() => {
        msg.delete()
      }, 2000);
    })
  }
}

export = newGameCommand