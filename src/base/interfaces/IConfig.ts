export default interface IConfig {
  token: string;
  discordClientId: string;
  guildId: string;

  devToken: string;
  devDiscordClientId: string;
  devGuildId: string;
  devUserIds: string[];

  mongoUri: string;
  devMongoUri: string;

  apiKey: string;
  heartbeat: string;
  baseURL: string;
  defaultCooldown: number;
  debugMode: number;
}
