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

    const clientId = this.client.developmentMode
      ? this.client.config.devDiscordClientId
      : this.client.config.discordClientId;

    const rest = new REST().setToken(this.client.config.devToken);
    // dev
    if (!this.client.developmentMode) {
      const globalCommands: any = await rest.put(
        Routes.applicationCommands(clientId),
        {
          body: this.GetJson(
            this.client.commands.filter((command) => !command.dev)
          ),
        }
      );

      console.log(
        `Successfully loaded ${globalCommands.length} global application (/) commands.`
      );
    }
    // global
    const devCommands: any = await rest.put(
      Routes.applicationGuildCommands(clientId, this.client.config.devGuildId),
      {
        body: this.GetJson(
          this.client.commands.filter((command) => command.dev)
        ),
      }
    );

    console.log(
      `Successfully loaded ${devCommands.length} dev application (/) commands.`
    );
  }

  private GetJson(commands: Collection<string, Command>): object[] {
    const data: object[] = [];

    commands.forEach((command) => {
      data.push(command.data.toJSON());
    });

    return data;
  }
}
