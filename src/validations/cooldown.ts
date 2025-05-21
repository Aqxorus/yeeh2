// import type { ValidationProps } from 'commandkit';
// import { MessageFlags, Collection } from 'discord.js';

// // Collection to store cooldowns. Key: 'userId-commandName', Value: expirationTimestamp
// const cooldowns = new Collection<string, number>();

// export default function ({
//   interaction,
//   commandObj,
//   handler, // handler is available from ValidationProps but not used in this specific logic
// }: ValidationProps): boolean | void {
//   // Check if the command has a cooldown property and it's a positive number
//   if (
//     !commandObj.options?.cooldown ||
//     typeof commandObj.options?.cooldown !== 'number' ||
//     commandObj.options?.cooldown <= 0
//   ) {
//     return; // No cooldown configured for this command, or invalid value, so proceed.
//   }

//   const userId = interaction.user.id;
//   const commandName = commandObj.data.name;
//   const cooldownKey = `${userId}-${commandName}`;

//   const now = Date.now();
//   const expirationTime = cooldowns.get(cooldownKey);

//   if (expirationTime && now < expirationTime) {
//     // User is on cooldown
//     const timeLeft = (expirationTime - now) / 1000;
//     interaction.reply({
//       content: `You are on cooldown for this command. Please wait ${timeLeft.toFixed(
//         1
//       )} more second(s).`,
//       flags: MessageFlags.Ephemeral,
//     });
//     return true; // Stop command execution
//   }

//   // User is not on cooldown or cooldown has expired, set new cooldown
//   // commandObj.cooldown is expected to be in seconds
//   const newExpirationTime = now + commandObj.cooldown * 1000;
//   cooldowns.set(cooldownKey, newExpirationTime);

//   // Return nothing (or false) to proceed with command execution
// }
