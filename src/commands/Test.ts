import {
  ChatInputCommandInteraction,
  MessageFlags,
  PermissionsBitField,
  SlashCommandBuilder,
  InteractionContextType
} from 'discord.js';
import Command from '../base/classes/Command';
import CustomClient from '../base/classes/CustomClient';
import Category from '../base/enums/Category';

export default class test extends Command {
  constructor(client: CustomClient) {
    const data = new SlashCommandBuilder()
      .setName('test')
      .setDescription('Test command to check if the bot is working')
      .setDefaultMemberPermissions(PermissionsBitField.Flags.UseApplicationCommands)
      .setContexts(InteractionContextType.Guild);

    super(client, data, {
      category: Category.Utilities,
      cooldown: 5,
      dev: true,
    });
  }

  Execute(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      content: 'Test command works',
      flags: MessageFlags.Ephemeral,
    });
  }
}
