import { Client, MessageComponentInteraction } from "discord.js";
import { IAction } from "../../Interfaces/IActions";
import { Map } from "../../game/classes/map";

const openDeck: IAction = {
  name: "createMap",

  callback(bot: Client, interaction: MessageComponentInteraction) {
    Map.updateOrCreateMapMessage(interaction)
  }
}

export = openDeck