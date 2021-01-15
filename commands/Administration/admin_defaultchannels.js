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
        .setDescription(`If your channel permissions are somewhat screwed, here's a small script to clean it up. If you have a Mute role or Chatban role, they will get denied their permissions as well.\n**1:** Overwrite channel permissions\n**2:** Update channel permissions\n\n\`Command usage: ${currPrefix.prefix}setdefaultchannelpermissions -y <1 | 2>\``)

    let confirm = args[0];
    if (confirm !== `-y`) return message.channel.send(prefixEmbed)

    let muterole = currPrefix.muteRole;
    let chatbanrole = currPrefix.chatbanRole;

    switch(args[1]) {
        case '1':
            
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
                message.channel.send(`Something went wrong: ${e}`)
            }
            
            let changeChannelPerms1 = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag} | Set Default Channel Permissions`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`${Sucess} All channels have been reset with permissions.`)
                .setColor(`#7aff7a`)
        
            message.channel.send(changeChannelPerms1)

    break;
        case '2':

        try {
            message.guild.channels.cache.forEach(async (channel) => {
                await channel.updateOverwrite(chatbanrole, { VIEW_CHANNEL: false, READ_MESSAGE_HISTORY: false });
                await channel.updateOverwrite(muterole, { SEND_MESSAGES: false, ADD_REACTIONS: false, SPEAK: false, STREAM: false });
                await channel.updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: null, VIEW_CHANNEL: null });
            });
        } catch (e) {
            message.channel.send(`Something went wrong: ${e}`)
        }

        let changeChannelPerms2 = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} | Set Default Channel Permissions`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${Sucess} All channels have been updated with permissions.`)
            .setColor(`#7aff7a`)

        message.channel.send(changeChannelPerms2)

    break;
    }

}

module.exports.help = {
  name: "defaultchannels",
  aliases: ["setdefaultchannelpermissions"]
}
