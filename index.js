const fs = require('fs');
const discord = require('discord.js');
const { Client, Intents } = require('discord.js');

// Set discord intents. More info in https://discordjs.guide/popular-topics/intents.html
global.client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ],
    disableMentions: 'everyone',
});

// Get the config file.
client.config = require('./config/bot');
client.discord = client.config.discord;
client.commands = new discord.Collection();

// Read the commands from file ./commands/
fs.readdirSync('./commands/').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    }
});

// Read the events from file ./events/
const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of events) {
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
}

// Set the playing status.
client.on("ready", () => {
    setInterval(function () {
        client.user.setPresence({
            activities: [{
                name: "Discord.js",
                type: "PLAYING"
            }],
            status: "online"
        });
    });
});

// Get the bot token from the config/bot.js file.
client.login(client.discord.token);
