import {
  ApplicationCommandTypes,
  createEmbeds,
  snowflakeToTimestamp,
} from '@discordeno/bot';
import { createCommand } from '../commands.js';

createCommand({
  name: 'ping',
  description: 'See if the bot latency is okay',
  type: ApplicationCommandTypes.ChatInput,
  async execute(interaction) {
    const ping = Date.now() - snowflakeToTimestamp(interaction.id);

    const embeds = createEmbeds()
      .setTitle(`The client ping is ${ping}ms`)
      .setColor('669fea');

    await interaction.respond({ embeds });
  },
});
