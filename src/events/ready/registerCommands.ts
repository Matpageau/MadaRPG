import { ApplicationCommandManager, Client, GuildApplicationCommandManager } from "discord.js";
import { ICommand } from "../../Interfaces/ICommand";
const { testServer } = require("../../../config.json");
const getLocalCommands = require("../../Utils/getLocalCommands");
const getApplicationCommands = require("../../Utils/getApplicationCommands");
const areCommandDifferent = require("../../Utils/areCommandsDifferent")

module.exports = async (bot: Client) => {
  try {
    const localCommands: ICommand[] = getLocalCommands();
    const applicationCommands = await getApplicationCommands(bot, testServer);

    for (const localCommand of localCommands) {
      const { name, description, options, deleted } = localCommand;

      const existingCommand = applicationCommands.cache.find(
        (cmd: ICommand) => cmd.name === name
      );
      
      if (existingCommand) {
        if (deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`🗑️ Commande '${name}' supprimée.`);
          continue
        }
       
        if(areCommandDifferent(existingCommand, localCommand)) {          
          await applicationCommands.edit(existingCommand.id, {
            name,
            description,
            options
          })
          console.log(`🔁 Commande '${name}' modifiée.`)
        }
      } else {
        if(localCommand.deleted) {
          console.log(`➡️ La commande ${name} n'a pas été enregistrée car elle doit être supprimée`)
          continue
        }

        await applicationCommands.create({
          name,
          description,
          options
        })

        console.log(`👍 La commande ${name} a été enregistrée`)
      }
    }
  } catch (error) {
    console.error(`There was an error: ${error}`);
  }
};
