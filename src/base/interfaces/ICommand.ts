import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';
import CustomClient from '../classes/CustomClient';
import Category from '../enums/Category';

export default interface ICommand {
  client: CustomClient;
  data: SlashCommandBuilder;
  category: Category;
  cooldown: number;
  dev: boolean;

  Execute(interaction: ChatInputCommandInteraction): void;
  AutoComplete(interaction: AutocompleteInteraction): void;
}
