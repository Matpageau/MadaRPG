import { EmbedBuilder, MessageComponentInteraction } from "discord.js";

export function baseEmbed(): EmbedBuilder {
  return new EmbedBuilder()
}

export function sendErrorEmbed(interaction: MessageComponentInteraction, error: string) {
  interaction.reply({embeds: [baseEmbed().setTitle(error)]}).then((msg) => {
    setTimeout(() => {
      msg.delete()
    }, 2000);
  })
        
}