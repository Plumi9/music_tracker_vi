// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
	],
});

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
	if(newPresence.activities[1] != "Spotify" ) return;

	let activity = newPresence.activities[1];
	let songName = newPresence.activities[1]?.details;
	let artist = newPresence.activities[1]?.state;

	let userId = newPresence.userId;

	let viId = "272159790308917249" // vi userId
	let plopId = "430417076868481044" // plop userId

	if(userId == viId){ // change to test
		if(songName == "Borrowed Time (From Rick and Morty: Season 5)"){
			if(artist == "Rick and Morty; Tennis"){
				let message = `✅ ${newPresence.user.globalName} is listening to ${songName} by ${artist} on ${activity}.`;
				dmUser(plopId,message);
			}
		}
	}
});
// Log in to Discord with your client's token
client.login(token);

async function dmUser(userId,message){
	try {
		const user = await client.users.fetch(userId);
		await user.send(message);
	} catch (err) {
		console.error("Could not send DM:", err);
	}
}