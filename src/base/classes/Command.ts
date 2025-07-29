import {
  ChatInputCommandInteraction,
  AutocompleteInteraction,
  SlashCommandBuilder,
} from 'discord.js';
import Category from '../enums/Category';
import ICommand from '../interfaces/ICommand';
import CustomClient from './CustomClient';
import ICommandOptions from '../interfaces/ICommandOptions';

export default class Command implements ICommand {
  client: CustomClient;
  data: SlashCommandBuilder;
  category: Category;
  cooldown: number;
  dev: boolean;

  constructor(client: CustomClient, data: SlashCommandBuilder, options: ICommandOptions) {
    this.client = client;
    this.data = data;
    this.category = options.category;
    this.cooldown = options.cooldown;
    this.dev = options.dev;
  }

  Execute(interaction: ChatInputCommandInteraction): void {}
  AutoComplete(interaction: AutocompleteInteraction): void {}
}
