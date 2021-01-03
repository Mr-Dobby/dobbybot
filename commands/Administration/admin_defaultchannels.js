const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");

module.exports.run = async (bot, message, args, client) => {

    let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

    const Failure = bot.emojis.cache.get("697388354689433611");
    const Sucess = bot.emojis.cache.get("697388354668462110");
  
    var noPermsEmbed = new Discord.MessageEmbed()
        .setDescription(`${Failure} Resetting channel permissions requires you to have \`ADMINISTRATOR\` permissions.`)
        .setColor("#ff0000")
    
        var noPermsEmbedBot = new Discord.MessageEmbed()
        .setDescription(`${Failure} Resetting channel permissions requires me to have \`MANAGE CHANNELS\` permissions.`)
        .setColor("#ff0000")
  
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
      return message.channel.send(noPermsEmbedBot)
    }

    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(noPermsEmbed);
    }

    let prefixEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Set Default Channel Permissions`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`If your channel permissions are somewhat screwed, here's a small script to clean it up. If you have a Mute role or Chatban role, they will get denied their permissions as well.\n\n\`Command usage: ${currPrefix.prefix}setdefaultchannelpermissions -y\``)

    let confirm = args[0];
    if (confirm !== `-y`) return message.channel.send(prefixEmbed)

    let muterole = currPrefix.muteRole
    let chatbanrole = currPrefix.chatbanRole

    try {
        message.guild.channels.cache.forEach(channel => {
            channel.overwritePermissions([
                {
                    id: message.guild.id,
                    null: ['SEND_MESSAGES'],
                },
                {
                    id: chatbanrole,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: muterole,
                    deny: ['SEND_MESSAGES', 'ADD_REACTIONS', 'SPEAK']
                }
            ]);
        });
    } catch (e) {
        message.channel.send(`Something went wrong: $${e}`)
    }
    
    let newPrefixEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Set Default Channel Permissions`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Sucess} All channels have been reset with permissions.`)
        .setColor(`#7aff7a`)

    message.channel.send(newPrefixEmbed)

}

module.exports.help = {
  name: "defaultchannels",
  aliases: ["setdefaultchannelpermissions"]
}
