import type { SlashCommandProps, CommandOptions } from 'commandkit';
import {
  EmbedBuilder,
  InteractionContextType,
  SlashCommandBuilder,
} from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription("Replies with the API's latency + client ping.")
  .setContexts(InteractionContextType.Guild);

export async function run({ interaction, client, handler }: SlashCommandProps) {
  await interaction.deferReply();

  const reply = await interaction.fetchReply();

  const ping = reply.createdTimestamp - interaction.createdTimestamp;

  const embed = new EmbedBuilder()
    .setColor('Blue')
    .setDescription(
      `🏓 Pong!\n\nAPI Latency: ${client.ws.ping}ms\nClient Ping: ${ping}ms`
    );

  await interaction.editReply({
    embeds: [embed],
  });
}

export const options: CommandOptions = {
  botPermissions: ['SendMessages'],
  cooldown: 10,
};
