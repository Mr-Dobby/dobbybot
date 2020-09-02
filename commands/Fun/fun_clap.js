const Discord = require("discord.js");
const randomizeCase = word => word.split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join('');

module.exports.run = async (bot, message, args, client) => {

    if (args.length < 1) return;
    message.delete();
    message.channel.send(args.map(randomizeCase).join(':clap:'));

}

module.exports.help = {
  name: "clap",
  aliases: []
}