import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, Client, EmbedBuilder, MessageComponentInteraction, MessageFlags } from "discord.js";
import { ICommand } from "../Interfaces/ICommand";
import { Player } from "../game/classes/player";
import { getPlayers, setPlayers } from "../Utils/datas";

const pingCommand: ICommand = {
  name: "p",
  description: "Afficher son profil",
  options: [],
  
  callback: (bot: Client, interaction: ChatInputCommandInteraction) => {
    const playerArray = getPlayers()

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
          .setCustomId(`newGame-${interaction.user.id}`)
          .setLabel("Créer la carte")
          .setStyle(ButtonStyle.Secondary)
        )
      ]
    })
  }
}

export = pingCommand