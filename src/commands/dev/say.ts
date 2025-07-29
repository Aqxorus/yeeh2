import {
  ChatInputCommandInteraction,
  MessageFlags,
  PermissionsBitField,
  SlashCommandBuilder,
  InteractionContextType,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ModalSubmitInteraction,
  TextChannel,
  Message,
} from 'discord.js';
import Command from '../../base/classes/Command';
import CustomClient from '../../base/classes/CustomClient';
import Category from '../../base/enums/Category';

const AUTHORIZED_USERS = ['598624275083034654', '693965900805570633'];

const EMOJIS = {
  ERROR: '<:error:1368083075145269339>',
  SUCCESS: '<:success:1368084245259616326>',
} as const;

const MESSAGES = {
  UNAUTHORIZED: `${EMOJIS.ERROR} This command is only available to people who are sigma.`,
  SUCCESS: `${EMOJIS.SUCCESS} Sent!`,
  MESSAGE_NOT_FOUND: `${EMOJIS.ERROR} Could not find that message.`,
  CHANNEL_NOT_TEXT: `${EMOJIS.ERROR} Channel is not text-based.`,
  NO_GUILD_OR_CHANNEL: `${EMOJIS.ERROR} No guild or channel available.`,
  MESSAGE_ACCESS_ERROR: `${EMOJIS.ERROR} Could not find or access that message.`,
  SEND_ERROR: `${EMOJIS.ERROR} Failed to send message:`,
} as const;

export default class Say extends Command {
  constructor(client: CustomClient) {
    const data = new SlashCommandBuilder()
      .setName('say')
      .setDescription('Makes the bot say something')
      .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
      .setContexts(InteractionContextType.Guild)
      .addStringOption((option) =>
        option
          .setName('id')
          .setDescription('The ID of the message you want to reply to')
          .setMaxLength(50)
      ) as SlashCommandBuilder;

    super(client, data, {
      category: Category.Developer,
      cooldown: 0,
      dev: false,
    });
  }

  private isUserAuthorized(userId: string): boolean {
    return AUTHORIZED_USERS.includes(userId);
  }

  private async getTextChannel(interaction: ChatInputCommandInteraction) {
    const { guild, channelId } = interaction;

    if (!guild || !channelId) {
      throw new Error(MESSAGES.NO_GUILD_OR_CHANNEL);
    }

    const channel = await guild.channels.fetch(channelId);

    if (!channel?.isTextBased()) {
      throw new Error(MESSAGES.CHANNEL_NOT_TEXT);
    }

    return channel as TextChannel;
  }

  private async replyToMessage(
    channel: TextChannel,
    messageId: string,
    content: string
  ): Promise<Message> {
    try {
      const targetMessage = await channel.messages.fetch(messageId);
      return await targetMessage.reply(content);
    } catch {
      throw new Error(MESSAGES.MESSAGE_NOT_FOUND);
    }
  }

  private async sendMessage(
    channel: TextChannel,
    content: string
  ): Promise<Message> {
    return await channel.send(content);
  }

  async Execute(interaction: ChatInputCommandInteraction) {
    try {
      // Check authorization
      if (!this.isUserAuthorized(interaction.user.id)) {
        return await interaction.reply({
          content: MESSAGES.UNAUTHORIZED,
          flags: MessageFlags.Ephemeral,
        });
      }

      const targetMessageId = interaction.options.getString('id');

      // Create and show modal
      const modal = new ModalBuilder({
        customId: `sayModal-${interaction.user.id}`,
        title: 'Say',
      });

      const textInput = new TextInputBuilder({
        customId: 'sayInput',
        label: 'What do you want to say? (Through the bot)',
        style: TextInputStyle.Paragraph,
        maxLength: 2000,
      });

      const row = new ActionRowBuilder<TextInputBuilder>().addComponents(
        textInput
      );
      modal.addComponents(row);

      await interaction.showModal(modal);

      // Handle modal submission
      const filter = (modalInteraction: ModalSubmitInteraction) =>
        modalInteraction.customId === `sayModal-${interaction.user.id}`;

      const modalInteraction = await interaction.awaitModalSubmit({
        filter,
        time: 300_000, // 5 minutes timeout
      });

      const messageContent =
        modalInteraction.fields.getTextInputValue('sayInput');

      await modalInteraction.deferReply({
        flags: MessageFlags.Ephemeral,
      });

      try {
        const channel = await this.getTextChannel(interaction);

        if (targetMessageId) {
          await this.replyToMessage(channel, targetMessageId, messageContent);
        } else {
          await this.sendMessage(channel, messageContent);
        }

        await modalInteraction.editReply({
          content: MESSAGES.SUCCESS,
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : MESSAGES.MESSAGE_ACCESS_ERROR;

        await modalInteraction.editReply({
          content: errorMessage,
        });
      }
    } catch (error) {
      console.log(
        `[WARN] Say command was used by ${interaction.user.username} but it was cancelled.`
      );
    }
  }
}
