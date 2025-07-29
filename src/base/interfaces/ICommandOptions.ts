import { SlashCommandBuilder } from 'discord.js';
import Category from '../enums/Category';

export default interface ICommandOptions {
  category: Category;
  cooldown: number;
  dev: boolean;
}
