import {
  ChatInputCommandInteraction,
  MessageFlags,
  PermissionsBitField,
} from 'discord.js';
import Command from '../base/classes/Command';
import CustomClient from '../base/classes/CustomClient';
import Category from '../base/enums/Category';

export default class test extends Command {
  constructor(client: CustomClient) {
    super(client, {
      name: 'test',
      description: 'my test command',
      category: Category.Utilities,
      default_member_permissions:
        PermissionsBitField.Flags.UseApplicationCommands,
      dm_permission: false,
      cooldown: 5,
      dev: false,
      options: [],
    });
  }

  Execute(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      content: 'Test comamnd works',
      flags: MessageFlags.Ephemeral,
    });
  }
}
