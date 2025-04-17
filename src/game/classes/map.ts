import { createCanvas, loadImage } from "canvas"
import { Game } from "./game"
import { AttachmentBuilder, MessageComponentInteraction } from "discord.js"
import { sendErrorEmbed } from "../../Utils/controllers/controllerEmbeds"
import path from "path"

export class Map {
  mapChannelId: string | null = "828518673244618752"
  mapMessageId: string | null = null
  pixelMap: [number, number][][] = []
  tilesX = 161         //51
  tilesY = 91          //29
  tilePixelSize = 32

  constructor() {
    this.generateMap()
  }

  async createMapImage() {
    const atlas = await loadImage(path.join(__dirname, "../images/atlas.png"))
    const canvas = createCanvas(this.tilePixelSize * this.tilesX, this.tilePixelSize * this.tilesY)
    const ctx = canvas.getContext("2d")

    for (let y = 0; y < this.tilesY; y++) {
      for (let x = 0; x < this.tilesX; x++) {
        const [tileX, tileY] = this.pixelMap[y][x];

        ctx.drawImage(
          atlas,
          tileX * this.tilePixelSize, tileY * this.tilePixelSize,
          this.tilePixelSize, this.tilePixelSize,
          x * this.tilePixelSize, y * this.tilePixelSize,
          this.tilePixelSize, this.tilePixelSize
        )
      }
    }

    return canvas.toBuffer('image/png');
  }

  generateMap() {
    for (let y = 0; y < this.tilesY; y++) {
      this.pixelMap[y] = []
      for (let x = 0; x < this.tilesX; x++) {        
        this.pixelMap[y][x] = [0, Math.floor(Math.random() * 2)]
      }      
    }
  }
  
  async updateOrCreateMapMessage(interaction: MessageComponentInteraction) {
    const map = await this.createMapImage()
    
    if(this.mapChannelId == null) {
      return sendErrorEmbed(interaction, "L'id du channel de la carte est introuvable")
    }
    
    
    const channel = await interaction.guild?.channels.fetch(this.mapChannelId).catch(() => null);
    if (!channel?.isTextBased()) {
      return sendErrorEmbed(interaction, "Le channel de la carte est introuvable")
    }
    
    let msg = null
    if(this.mapMessageId) {
      msg = await channel.messages.fetch(this.mapMessageId).catch(() => null);
    }

    const file = new AttachmentBuilder(map, { name: 'map.png' });

    interaction.deferUpdate()
    if(msg) {
      msg.edit({files: [file]})
    } else {
      channel.send({files: [file]}).then((msg) => {
        this.mapMessageId = msg.id
      })
    }
  }
}