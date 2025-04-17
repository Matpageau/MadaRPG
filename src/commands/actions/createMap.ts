import { Client, MessageComponentInteraction } from "discord.js";
import { IAction } from "../../Interfaces/IActions";
import { Map } from "../../game/classes/map";
import { Game } from "../../game/classes/game";

const openDeck: IAction = {
  name: "newGame",

  callback(bot: Client, interaction: MessageComponentInteraction) {
    const game = new Game()
    game.map.updateOrCreateMapMessage(interaction)
  }
}

export = openDeck