import { createCanvas } from "canvas"
import { Game } from "./game"
import { AttachmentBuilder, MessageComponentInteraction } from "discord.js"
import { sendErrorEmbed } from "../controllers/controllerEmbeds"

export class Map {
  static pixelMap: number[]

  static createMapImage() {
    const tilePixelSize = 30
    const tilesX = 41
    const tilesY = 31

    const canvas = createCanvas(tilePixelSize * tilesX, tilePixelSize * tilesY)
    const ctx = canvas.getContext("2d")

    for (let y = 0; y < tilesY; y++) {
      for (let x = 0; x < tilesX; x++) {
        const color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
        ctx.fillStyle = color
        ctx.fillRect(x * tilePixelSize, y * tilePixelSize, tilePixelSize, tilePixelSize)
      }
    }

    return canvas.toBuffer('image/png');
  }
  
  static async updateOrCreateMapMessage(interaction: MessageComponentInteraction) {
    const map = this.createMapImage()
    
    if(Game.mapChannelId == null) {
      return sendErrorEmbed(interaction, "L'id du channel de la carte est introuvable")
    }
    
    
    const channel = await interaction.guild?.channels.fetch(Game.mapChannelId).catch(() => null);
    if (!channel?.isTextBased()) {
      return sendErrorEmbed(interaction, "Le channel de la carte est introuvable")
    }
    
    let msg = null
    if(Game.mapMessageId) {
      msg = await channel.messages.fetch(Game.mapMessageId).catch(() => null);
    }

    const file = new AttachmentBuilder(map, { name: 'map.png' });

    interaction.deferUpdate()
    if(msg) {
      msg.edit({files: [file]})
    } else {
      channel.send({files: [file]}).then((msg) => {
        Game.mapMessageId = msg.id
      })
    }
  }
}