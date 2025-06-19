import { Collection, Events, REST, Routes } from 'discord.js';
import Event from '../../base/classes/Event';
import CustomClient from '../../base/classes/CustomClient';
import Command from '../../base/classes/Command';

export default class Ready extends Event {
  constructor(client: CustomClient) {
    super(client, {
      name: Events.ClientReady,
      description: 'Ready event.',
      once: true,
    });
  }

  async Execute() {
    console.log(`${this.client.user?.tag} is ready!`);

    const commands: object[] = this.GetJson(this.client.commands);

    const rest = new REST().setToken(this.client.config.token1);

    const setCommands: any = await rest.put(
      Routes.applicationGuildCommands(
        this.client.config.discordClientId,
        this.client.config.guildId
      ),
      {
        body: commands,
      }
    );

    console.log(`Successfully registered ${setCommands.length} commands.`);
  }

  private GetJson(commands: Collection<string, Command>): object[] {
    const data: object[] = [];

    commands.forEach((command) => {
      data.push({
        name: command.name,
        description: command.description,
        options: command.options,
        default_member_permissions:
          command.default_member_permissions.toString(),
        dm_permission: command.dm_permission,
      });
    });

    return data;
  }
}
