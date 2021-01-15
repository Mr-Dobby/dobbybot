const Discord = require("discord.js");
require('dotenv').config();
const bot = new Discord.Client({ disableEveryone: true });
const fs = require("fs");

const { Player } = require('discord-player');

bot.player = new Player(bot);
bot.config = require('./config/bot.js')
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.filters = bot.config.filters;

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command: ${file}`);
        bot.commands.set(command.help.name, command);
        command.help.aliases.forEach(alias => {
            bot.aliases.set(alias, command.help.name);
        });
    };
});

const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of player) {
    console.log(`Loading Discord-player event: ${file}`);
    const event = require(`./player/${file}`);
    bot.player.on(file.split(".")[0], event.bind(null, bot));
};

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading Discord.js event: ${file}`);
    const event = require(`./events/${file}`);
    bot.on(file.split(".")[0], event.bind(null, bot));
};

module.exports.bot = bot;

bot.login(process.env.TOKEN);