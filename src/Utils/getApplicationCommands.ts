import {
  ApplicationCommandManager,
  Client,
  GuildApplicationCommandManager,
} from "discord.js";

module.exports = async (
  bot: Client,
  guildId?: string
): Promise<ApplicationCommandManager | GuildApplicationCommandManager> => {
  let applicationCommands: ApplicationCommandManager | GuildApplicationCommandManager;

  if (guildId) {
    const guild = await bot.guilds.fetch(guildId);
    applicationCommands = guild.commands;
  } else {
    if (!bot.application) throw new Error("Bot application not initialized");
    applicationCommands = bot.application.commands;
  }

  await applicationCommands.fetch({});
  return applicationCommands;
};
