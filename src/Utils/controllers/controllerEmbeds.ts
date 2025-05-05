import { BaseInteraction, ChatInputCommandInteraction, EmbedBuilder, Interaction, MessageComponentInteraction } from "discord.js";

export function baseEmbed(): EmbedBuilder {
  return new EmbedBuilder()
}

export function sendErrorEmbed(interaction: MessageComponentInteraction | ChatInputCommandInteraction, error: string) {
  interaction.reply({embeds: [baseEmbed().setTitle(error)]}).then((msg) => {
    setTimeout(() => {
      msg.delete()
    }, 2000);
  })
        
}