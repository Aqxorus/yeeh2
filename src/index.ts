import 'dotenv/config';
import { Client, Partials, GatewayIntentBits } from 'discord.js';
import { CommandKit } from 'commandkit';
import path from 'path';

const { Guilds, GuildMembers, GuildPresences } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
  intents: [Guilds, GuildMembers, GuildPresences],
  partials: [User, Message, GuildMember, ThreadMember],
  allowedMentions: { parse: ['users', 'roles', 'everyone'], repliedUser: true },
});

new CommandKit({
  client,
  commandsPath: path.join(__dirname, 'commands'),
  eventsPath: path.join(__dirname, 'events'),
  validationsPath: path.join(__dirname, 'validations'),
  devGuildIds: ['664637118265688074'],
  devUserIds: ['598624275083034654'],
  // devRoleIds: ['DEV_ROLE_ID_1', 'DEV_ROLE_ID_2'],
  // skipBuiltInValidations: true,
  bulkRegister: true,
});

let token;

switch (process.env.DEBUG_MODE) {
  case '0':
    token = process.env.TOKEN;

    break;

  case '1':
    token = process.env.TEST_TOKEN;

    break;
}

client.login(token);
