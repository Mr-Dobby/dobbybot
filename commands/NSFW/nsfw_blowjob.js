const Discord = require('discord.js');
const Neko = require('nekos.life');
const neko = new Neko();
const Servers = require("../../lib/mongodb");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )
  
    if (!message.channel.nsfw) return message.channel.send(`:underage: You need to be in an NSFW channel to use this command.\nCheck \`${currPrefix.prefix}nsfwhuh\``).then(message => message.delete({ timeout: 5000 }))

    return message.channel.send(`Command disabled.`)
    neko.nsfw.blowJob().then(neko => {

        const RandomColour = ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        const embed = new Discord.MessageEmbed()
            .setColor(RandomColour)
            .setDescription("Now that's some hot quality porn!")
            .setImage(neko.url)
            .setFooter("Free porn thanks to Neko.life")

        message.channel.send(embed);

    })

}

module.exports.help = {
name: "blowjob",
aliases: []
}
