import IHandler from '../interfaces/IHandler';
import path from 'path';
import { glob } from 'glob';
import CustomClient from './CustomClient';
import Event from './Event';
import Command from './Command';
import SubCommand from './SubCommand';

export default class Handler implements IHandler {
  client: CustomClient;

  constructor(client: CustomClient) {
    this.client = client;
  }

  async LoadEvents() {
    const files = (await glob(`dist/events/**/*.js`)).map((filePath) =>
      path.resolve(filePath)
    );

    files.map(async (file: string) => {
      const event: Event = new (await import(file)).default(this.client);

      if (!event.name)
        return (
          delete require.cache[require.resolve(file)] &&
          console.log(`${file.split('/').pop()} does not have a name.`)
        );

      const execute = (...args: any) => event.Execute(...args);

      // @ts-ignore
      if (event.once) this.client.once(event.name, execute);
      // @ts-ignore
      else this.client.on(event.name, execute);

      return delete require.cache[require.resolve(file)];
    });
  }

  async LoadCommands() {
    const files = (await glob(`dist/commands/**/*.js`)).map((filePath) =>
      path.resolve(filePath)
    );

    files.map(async (file: string) => {
      const command: Command | SubCommand = new (await import(file)).default(
        this.client
      );

      // Handle SubCommands
      if (file.split('/').pop()?.split('.')[2]) {
        const subCommand = command as SubCommand;
        if (!subCommand.name) {
          return (
            delete require.cache[require.resolve(file)] &&
            console.log(`${file.split('/').pop()} does not have a name.`)
          );
        }
        return this.client.subCommands.set(subCommand.name, subCommand);
      }

      // Handle Commands
      const regularCommand = command as Command;
      if (!regularCommand.data.name) {
        return (
          delete require.cache[require.resolve(file)] &&
          console.log(`${file.split('/').pop()} does not have a name.`)
        );
      }

      this.client.commands.set(regularCommand.data.name, regularCommand);

      return delete require.cache[require.resolve(file)];
    });
  }
}
