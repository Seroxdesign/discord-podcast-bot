import dotenv from 'dotenv'
dotenv.config()

import {
  Client,
  GatewayIntentBits,
  ButtonBuilder,
  Events,
  ActionRowBuilder,
  ButtonStyle,
} from 'discord.js'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ]
})

const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('view-podcast')
					.setLabel('view podcast')
					.setStyle(ButtonStyle.Primary),
			);

client.login(process.env.DISCORD_TOKEN);

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on("messageCreate", async (message) => {
  console.log('message', message);
  if(!message?.author.bot && message.content.includes('podcast')){
    message.reply({
      content: 'Decentra Talks the podcast of the web',
      components: [row]
    })
  }
})

client.on('interactionCreate', async interaction => {
  if (interaction.customId === 'view-podcast') {
    await interaction.reply({content: 'View the show: https://open.spotify.com/show/2HfqI2dFN85uLLFwGqEk0d?si=6cde112c5d224f91'})
  }
})