import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, EmbedBuilder, MessageComponentInteraction, MessageFlags } from "discord.js";
import { ICommand } from "../Interfaces/ICommand";
import { Player } from "../game/classes/player";
import { getPlayers, setPlayers } from "../Utils/datas";

const pingCommand: ICommand = {
  name: "p",
  description: "Afficher son profil",
  options: [],
  
  callback: (bot: Client, interaction: MessageComponentInteraction) => {
    const playerArray: Player[] = getPlayers()

    if(!playerArray.some((player: Player) => player.id == interaction.user.id)) {
      playerArray.push(new Player(interaction.user))
      setPlayers(playerArray)
    }

    const player: Player | undefined = playerArray.find(user => user.id = interaction.user.id)

    interaction.reply({ embeds: [new EmbedBuilder()
      .setAuthor({iconURL: interaction.user.avatarURL() || undefined, name: player?.displayName ?? ""})
      .setTitle(`Profil de ${player?.displayName}`)
      ],
      components: [
        new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
          new ButtonBuilder()
          .setCustomId(`deck-${interaction.user.id}`)
          .setLabel("Deck")
          .setEmoji("🃏")
          .setStyle(ButtonStyle.Secondary)
        )
      ]
    })
  }
}

export = pingCommand