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
	const activity = newPresence.activities.find(a => a.name === "Spotify");
	if (!activity) return;

	// shit doesnt work if multiple rich presence activities in newPresence Array
	//let activity = newPresence.activities[1];
	//let songName = newPresence.activities[1]?.details;
	// let artist = newPresence.activities[1]?.state;

	let songName = activity.details;
	let artist = activity.state;

	let userId = newPresence.userId;

	let viId = "272159790308917249" // vi userId
	let plopId = "430417076868481044" // plop userId
	let channelId = "1424872135205195828" //channel to log all songs vi listens to

// check if user=vi -> song=Borrowed Time -> artist=Rick and Morty; Tennis
	if(userId == viId){ // change to test
		if(songName == "Borrowed Time (From Rick and Morty: Season 5)"){
			if(artist == "Rick and Morty; Tennis"){
				let message = `✅ ${newPresence.user.globalName} is listening to ${songName} by ${artist} on ${activity.name}.`;
				dmUser(plopId,message);
			}
		}
	}
//log all songs vi listens to, to a specific channel
	if(userId == viId){
		let message = `🎵 ${newPresence.user.globalName} is listening to ${songName} by ${artist} on ${activity.name}.`;
		writeToChannel(channelId,message);
	}
});
// Log in to Discord with your client's token
client.login(token);

// function to DM a user
async function dmUser(userId,message){
	try {
		const user = await client.users.fetch(userId);
		await user.send(message);
	} catch (err) {
		console.error("Could not send DM:", err);
	}
}

//function to write a message to a specific channel
async function writeToChannel(channelId, message) {
	try {
		const channel = await client.channels.fetch(channelId);
		await channel.send(message);
	} 
	catch (err) {
		console.error("❌ Could not write to channel:", err);
	}
}