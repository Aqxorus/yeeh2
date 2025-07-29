import {
  ChatInputCommandInteraction,
  MessageFlags,
  PermissionsBitField,
  SlashCommandBuilder,
  InteractionContextType,
  EmbedBuilder,
} from 'discord.js';
import Command from '../base/classes/Command';
import CustomClient from '../base/classes/CustomClient';
import Category from '../base/enums/Category';

export default class dadjoke extends Command {
  constructor(client: CustomClient) {
    const data = new SlashCommandBuilder()
      .setName('dadjoke')
      .setDescription('Random dad jokes from icanhazdadjoke.com')
      .setDefaultMemberPermissions(
        PermissionsBitField.Flags.UseApplicationCommands
      )
      .setContexts(InteractionContextType.Guild);

    super(client, data, {
      category: Category.Fun,
      cooldown: 10,
      dev: false,
    });
  }

  async Execute(interaction: ChatInputCommandInteraction) {
    try {
      await interaction.reply({
        content: '<a:grayloading:1368124692698894406> Getting a dad joke...',
      });

      const res = await fetch('https://icanhazdadjoke.com/slack');
      const data = await res.json();

      const joke = data.attachments[0].text;

      const embed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription(joke)
        .setFooter({ text: 'Dad jokes - icanhazdadjoke.com' });

      await interaction.editReply({
        content: '',
        embeds: [embed],
      });
    } catch (e) {
      console.error(e);
    }
  }
}
