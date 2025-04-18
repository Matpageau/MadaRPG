import { CanvasRenderingContext2D, createCanvas, Image, loadImage } from "canvas"
import { AttachmentBuilder, MessageComponentInteraction } from "discord.js"
import { sendErrorEmbed } from "../../Utils/controllers/controllerEmbeds"
import path from "path"
import { Tile } from "./tile"
import { ITile } from "../../Interfaces/ITile"

export class Map {
  mapChannelId: string | null = "828518673244618752"
  mapMessageId: string | null = null
  pixelMap: [Tile][][] = []
  tilesX = 51         //51
  tilesY = 29         //29
  tilePixelSize = 32

  constructor() {
    this.generateMap()
  }

  generateMap() {
    for (let y = 0; y < this.tilesY; y++) {
      this.pixelMap[y] = []
      for (let x = 0; x < this.tilesX; x++) {   
        const tile = new Tile(Math.random() < 0.8 ? "Grass" : "Dird")
        this.pixelMap[y][x] = [tile]
      }      
    }

    this.createMoutains(3)
    this.createTrees()
  }

  async createMapImage() {    
    const atlas = await loadImage(path.join(__dirname, "../images/atlas.png"))
    const canvas = createCanvas(this.tilePixelSize * this.tilesX, this.tilePixelSize * this.tilesY)
    let ctx = canvas.getContext("2d")

    for (let y = 0; y < this.pixelMap.length; y++) {
      for (let x = 0; x < this.pixelMap[y].length; x++) {
        this.pixelMap[y][x].forEach(pixel => {          
          ctx.drawImage(
            atlas,
            pixel.atlasPos.x * this.tilePixelSize, pixel.atlasPos.y * this.tilePixelSize,
            this.tilePixelSize, this.tilePixelSize,
            x * this.tilePixelSize, y * this.tilePixelSize,
            this.tilePixelSize, this.tilePixelSize
          )
        });
      }
    }
  
    return canvas.toBuffer('image/png')
  }

  createMoutains(count: number) {
    for (let i = 0; i < count; i++) {
      let good = false
      do {
        const randomY = Math.floor(Math.random() * this.tilesY)
        const randomX = Math.floor(Math.random() * this.tilesX)
  
        if(!(randomY < 3 || randomY > this.tilesY - 3 || randomX < 10 || randomX > this.tilesX - 10 || this.pixelMap[randomY][randomX].some(prop => prop.type == "prop"))) {
          const tile = new Tile("Mountain")
          for (let y = randomY - 3; y < randomY + 2; y++) {
            for (let x = randomX - 1; x < randomX + 1; x++) {
              this.pixelMap[y][x].push(tile)
            }
          }
          good = true
        }
      } while (!good); 
    }
  }

  createTrees() {
    for (let y = 0; y < this.tilesY; y++) {
      for (let x = 0; x < this.tilesX; x++) {
        if(Math.random() > 0.8 && !this.pixelMap[y][x].some(prop => prop.type == "prop")) {          
          this.pixelMap[y][x].push(new Tile("Tree"))
        }
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