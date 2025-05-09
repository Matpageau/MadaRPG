import { Client, Interaction, PermissionsBitField } from "discord.js";
import { ICommand } from "../../Interfaces/ICommand";
import { IAction } from "../../Interfaces/IActions";
const { devs, testServer } = require("../../../config.json")
const getLocalCommands = require("../../Utils/getLocalCommands")
const getActions = require("../../Utils/getActions")

module.exports = async (bot: Client, interaction: Interaction) => {
  if(!(interaction.isChatInputCommand() || interaction.isButton())) return

  
  try {
    if(interaction.isChatInputCommand()) {
      const localCommands: ICommand[] = getLocalCommands()
      const commandObject = localCommands.find(cmd => cmd.name === interaction.commandName)
  
      if(!commandObject) return
  
      if(commandObject.devOnly) {
        if(!devs.includes(interaction.member?.user.id)) {
          interaction.reply({
            content: "Seulement les dev peuvent faire cette commande",
            flags: "Ephemeral"
          })
          return
        }
      }
  
      if(commandObject.testOnly) {
        if(!(interaction.guild?.id === testServer)) {
          interaction.reply({
            content: "Cette commande est impossible ici",
            flags: "Ephemeral"
          })
          return
        }
      }
  
      if(commandObject.permissionsRequired?.length) {
        if(interaction.member && interaction.member.permissions instanceof PermissionsBitField) {
          for (const permission of commandObject.permissionsRequired) {
            if(!interaction.member?.permissions.has(permission)) {
              interaction.reply({
                content: "Tu n'as pas asser de permissions.",
                flags: "Ephemeral"
              })
              return
            }
          }
        }
      }
  
      await commandObject.callback(bot, interaction)

    }else if(interaction.isButton()) {
      const actions: IAction[] = getActions()
      const actionObject = actions.find((action) => action.name === interaction.customId.split("-")[0])

      if(!actionObject) return

      actionObject.callback(bot, interaction)
    }
  } catch (error) {
    console.error(`Il y a eu une erreure sur cette commande:`)
    if(error instanceof Error) {
      console.error(error.message)
      console.error(error.stack)
    } else {
      console.error(error)
    }
  }
}