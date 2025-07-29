import {
  ChatInputCommandInteraction,
  MessageFlags,
  PermissionsBitField,
  SlashCommandBuilder,
  InteractionContextType,
  EmbedBuilder,
} from 'discord.js';
import Command from '../../base/classes/Command';
import CustomClient from '../../base/classes/CustomClient';
import Category from '../../base/enums/Category';

export default class leave extends Command {
  constructor(client: CustomClient) {
    const data = new SlashCommandBuilder()
      .setName('leave')
      .setDescription('Makes the bot leave a server')
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
      .setContexts(InteractionContextType.Guild)
      .addStringOption((option) =>
        option
          .setName('id')
          .setDescription(
            'enter guild id to leave (type `list` for all guilds)'
          )
          .setRequired(true)
      ) as SlashCommandBuilder;

    super(client, data, {
      category: Category.Developer,
      cooldown: 0,
      dev: true,
    });
  }

  async Execute(interaction: ChatInputCommandInteraction) {
    try {
      const id = interaction.options.getString('id');

      if (!id) {
        return await interaction.reply({
          content: 'Please provide a valid guild ID or "list".',
          flags: MessageFlags.Ephemeral,
        });
      }

      if (id.toLowerCase() === 'list') {
        this.client.guilds.cache.forEach((guild) => {
          console.log(`${guild.name} | ${guild.id}`);
        });
        const guild = this.client.guilds.cache.map(
          (guild) => ` ${guild.name} | ${guild.id}`
        );
        try {
          return await interaction.reply({
            content: `Guilds:\n\`${guild}\``,
            flags: MessageFlags.Ephemeral,
          });
        } catch {
          return await interaction.reply({
            content: `check console for list of guilds`,
            flags: MessageFlags.Ephemeral,
          });
        }
      }

      const guild = this.client.guilds.cache.get(id);

      if (!guild) {
        return await interaction.reply({
          content: `\`${id}\` is not a valid guild id.`,
          flags: MessageFlags.Ephemeral,
        });
      }

      await guild
        .leave()
        .then((c) => console.log(`Left guild ${id}`))
        .catch((e) => {
          console.error('[ERROR] Leaving guild:', e);
        });
      return await interaction.reply({
        content: `Left guild \`${id}\`.`,
        flags: MessageFlags.Ephemeral,
      });
    } catch (e) {
      console.error(e);
    }
  }
}
