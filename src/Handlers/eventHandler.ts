import { loadFiles } from '../Functions/fileloader';
import { Client } from 'discord.js';

async function loadEvents(client: Client) {
  console.time('Events Loaded');

  client.events = new Map();
  const events = new Array();

  const files = (await loadFiles('Events')) ?? [];

  for (const file of files) {
  }
}
