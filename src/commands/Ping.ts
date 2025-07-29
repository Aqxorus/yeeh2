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

export default class ping extends Command {
  constructor(client: CustomClient) {
    const data = new SlashCommandBuilder()
      .setName('ping')
      .setDescription("Replies with the API's Latency + Client Ping")
      .setDefaultMemberPermissions(
        PermissionsBitField.Flags.UseApplicationCommands
      )
      .setContexts(InteractionContextType.Guild);

    super(client, data, {
      category: Category.Utilities,
      cooldown: 5,
      dev: false,
    });
  }

  async Execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setDescription(
        `API Latency: ${this.client.ws.ping}ms\nClient Ping: ${ping}ms`
      );

    await interaction.editReply({ embeds: [embed] });
  }
}
