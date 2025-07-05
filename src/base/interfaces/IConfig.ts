export default interface IConfig {
  token: string;
  discordClientId: string;
  guildId: string;

  devToken: string;
  devDiscordClientId: string;
  devGuildId: string;

  apiKey: string;
  heartbeat: string;
  baseURL: string;
  mongoUri: string;
  defaultCooldown: number;
  debugMode: number;
}
