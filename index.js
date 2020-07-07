const Discord = require("discord.js");
require('dotenv').config();
const bot = new Discord.Client({ disableEveryone: true });
const lib = require("./lib/functions");

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.afk = new Map();

lib.setup(bot);

module.exports.bot = bot;

bot.login(process.env.TOKEN);
