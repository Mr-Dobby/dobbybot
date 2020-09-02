const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");

module.exports.run = async (bot, message, args, client) => {

    let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

    const Failure = bot.emojis.cache.get("697388354689433611");
    const Sucess = bot.emojis.cache.get("697388354668462110");
  
    var noPermsEmbed = new Discord.MessageEmbed()
        .setDescription(`${Failure} Setting new prefix requires you to have \`ADMINISTRATOR\` permissions.`)
        .setColor("#ff0000")
  
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(noPermsEmbed);
    }

    let prefixEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Prefix`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Current prefix of this server: \`${currPrefix.prefix}\`\nDefault prefix: \`-\`\nSet **new** prefix with \`${currPrefix.prefix}prefix <Prefix>\``)

    let newPrefix = args[0];
    if (!newPrefix) return message.channel.send(prefixEmbed)

    let NP = await Servers.findOneAndUpdate({ guildID: message.guild.id }, { $set: { prefix: newPrefix } }, { new: true })

    let newPrefixEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Prefix`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Sucess} Prefix has now been set to: \`${NP.prefix}\``)

    message.channel.send(newPrefixEmbed)

}

module.exports.help = {
  name: "prefix",
  aliases: []
}
