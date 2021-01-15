const Discord = require('discord.js')
const Servers = require("../../lib/mongodb");
const hmtai = require('hmtai');

module.exports.run = async (bot, message, args, client) => {

    let currPrefix = await Servers.findOne( { guildID: message.guild.id } )
    if (!message.channel.nsfw) return message.channel.send(`:underage: You need to be in an NSFW channel to use this command.\nCheck \`${currPrefix.prefix}nsfwhuh\``).then(message => message.delete({ timeout: 5000 }))
    if (currPrefix.nsfw == false) return message.channel.send(`NSFW is disabled.`)

    const RandomColour = ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
    const embed = new Discord.MessageEmbed()
        .setColor(RandomColour)
        .setDescription("Now that's some hot quality porn!")
        .setImage(hmtai.nsfw.cum())
        .setFooter("Free porn thanks to hmtai")
    message.channel.send(embed);

}



module.exports.help = {
    name: "cum",
    aliases: []
}