const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Raid = require("../../lib/raid");
const mongoose = require('mongoose');

/*const IGNORED = new Set([
    "565456894819434497",
    "597058198712746005",
    "548440071733248001",
    "630373520177758228",
    "702430212851236965",
    "570705027824353293",
    "639389690407026698",
    "619047834062159882",
    "717810963834994759",
    "574841403851538454",
    "616947219790037014",
    "593930390612475926",
    "672111923344572429",
    "676790155444748310",
    "746711088275390565",
    "743579819916394638",
    "747187965146431659",
    "705123297846886430",
    "691650704330326077",
    "691650738916425728",
    "687695988110000166",
    "690570030127120455",
    "706919593612017704"
  ]);
*/
//(ow && ow.READ_MESSAGES !== false && ow.SEND_MESSAGES !== false)
module.exports.run = async (bot, message, args, client) => {

    let currPrefix = await Servers.findOne( { guildID: message.guild.id } );
    let isRaid = await Raid.findOne( { guildID: message.guild.id } );
    let igcha = await Raid.findOne( { guildID: message.guild.id } );
    let ignore = igcha.ignoredChannels;
    await mongoose.connect('mongodb://localhost:27017/Dobby_Bot', {
        useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
          if (err) return console.error(err)
    });

    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z']

    const Failure = bot.emojis.cache.get("697388354689433611");
    const Sucess = bot.emojis.cache.get("697388354668462110");
  
    var noPermsEmbed = new Discord.MessageEmbed()
        .setDescription(`${Failure} Toggling the raid function requires you to have \`ADMINISTRATOR\` permissions.`)
        .setColor("#ff0000")
      
    var noPermsEmbedBot = new Discord.MessageEmbed()
        .setDescription(`${Failure} Toggling the raid function requires me to have \`ADMINISTRATOR\` permissions.`)
        .setColor("#ff0000")
  
    if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(noPermsEmbedBot)
    }
  
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(noPermsEmbed);
    }

    const OnOrOff = args[0];

    switch (OnOrOff) {
        case 'true':
        case 'on':

            await Raid.findOneAndUpdate({ guildID: message.guild.id }, { $set: { raid: true } }, { new: true })

            let RaidON = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag} | Raid Protection`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`${Sucess} Raid mode set to: **true**\nAnyone joining the server will now get banned.`)
                .setColor(`#ff0000`)

            message.channel.send(RaidON)

            var id = message.guild.id;
            var channels = message.guild.channels.cache.filter(ch => ch.type !== 'category' || ch.type !== 'voice');  
                channels.forEach(async (channel) => {
                    if (!ignore.includes(channel.id)) {
                        if (channel.type === "text" && channel.type !== "voice" && channel.type !== "category") {
                            await channel.overwritePermissions([
                                {
                                    id: id,
                                    deny: ['SEND_MESSAGES']
                                }
                            ]).then(async (cha) => {
                                if (cha.type == "text") {
                                    if (!cha.name.endsWith('🔒')) {
                                        await cha.edit({ name: cha.name + '🔒' });
                                }
                            }
                        });
                    }
                }
            });
    break;
        case 'false':
        case 'off':

            await Raid.findOneAndUpdate({ guildID: message.guild.id }, { $set: { raid: false } }, { new: true })
            
            let RaidOFF = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag} | Raid Protection`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`${Sucess} Raid mode set to: **false**\nIt is now safe to join the server.`)
                .setColor(`#5eff5e`)

            message.channel.send(RaidOFF)

            var id = message.guild.id;
            var muteRole = message.guild.roles.cache.find(r => r.name === "🔇 Muted");
            var chatbanRole = message.guild.roles.cache.find(r => r.name === "⛔ Chatbanned");
            var channels = message.guild.channels.cache.filter(ch => ch.type !== 'category' || ch.type !== 'voice');
                channels.forEach(async (channel) => {
                    if (!ignore.includes(channel.id)) {
                        if (channel.type === "text" && channel.type !== "voice" && channel.type !== "category") {
                            await channel.overwritePermissions([
                                {
                                    id: id,
                                    null: ['SEND_MESSAGES']
                                }
                            ]).then(async (cha) => {
                                if (muteRole && chatbanRole) {
                                    await cha.overwritePermissions([
                                        {
                                            id: muteRole.id,
                                            deny: ['SEND_MESSAGES', 'ADD_REACTIONS']
                                        },
                                        {
                                            id: chatbanRole.id,
                                            deny: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']
                                        }
                                    ])
                                }
                                    if (cha.type == "text") {
                                        if (cha.name.endsWith('🔒')) {
                                            await cha.edit({ name: cha.name.replace(/\s*🔒/, '') });
                                }
                            }
                        });
                    }
                }
            });
    break;
        case 'ignore':

        var channels2ignore = args.splice(1).join(', ');
        
        if (!channels2ignore || !isNaN(channels2ignore)) { 

            let ignoreChannelsEmbed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag} | Raid Protection`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`**Raid protection - Ignore text channels to lockdown.**\n\`Command usage: ${currPrefix.prefix}raid ignore <ChannelID> <ChannelID>\`
                **You can also show current ignored channels.**\n\`Command usage: ${currPrefix.prefix}raid ignore list\``)
                .setFooter(`The channel IDs must be space seperated. Clear the list with ${currPrefix.prefix}raid ignore clear`)

            return message.channel.send(ignoreChannelsEmbed)

        } 

        if (channels2ignore.toLowerCase() === "list") {
            if (ignore !== "`Not set`") {

                let ignoreChannelsEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${message.author.tag} | Raid Protection`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`**Currently ignoring:**\n<#${ignore.replace(/, /g, ">\n <#") + ">"}`)
                    .setFooter(`Clear the list with ${currPrefix.prefix}raid ignore clear`)
                    .setColor("#7aff7a")

                return message.channel.send(ignoreChannelsEmbed)
            } else {

                let ignoreChannelsEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${message.author.tag} | Raid Protection`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`**Not ignoring any channels at the moment.**`)
                    .setFooter(`Add channels to the list with ${currPrefix.prefix}raid ignore <Channel ID> <Channel ID>`)
                    .setColor("#7aff7a")

                return message.channel.send(ignoreChannelsEmbed)

            }
        }

        if (channels2ignore.toLowerCase() === "clear") {

            await Raid.findOneAndUpdate({ guildID: message.guild.id }, { $set: { ignoredChannels: "`Not set`" } })

            let ignoreChannelsEmbed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag} | Raid Protection`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`${Sucess} **Successfully cleared the channel ignore list.**`)
                .setColor("#7aff7a")

            return message.channel.send(ignoreChannelsEmbed)
            
        } 
        
        if (ignore === "`Not set`" && channels2ignore && !channels2ignore.toLowerCase().includes(alphabet)) {

            await Raid.findOneAndUpdate({ guildID: message.guild.id }, { $set: { ignoredChannels: channels2ignore }, $split: [ channels2ignore, "," ] }, { new: true })

            let ignoreChannelsEmbed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag} | Raid Protection`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`${Sucess} **Successfully ignoring:**\n<#${channels2ignore.replace(/, /g, ">\n <#") + ">"}`)
                .setFooter(`Clear the list with ${currPrefix.prefix}raid ignore clear`)
                .setColor("#7aff7a")
                

            return message.channel.send(ignoreChannelsEmbed)

        } else { 
            
            let ignoreChannelsEmbed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag} | Raid Protection`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`**Raid protection - Ignore text channels to lockdown.**\n\`Command usage: ${currPrefix.prefix}raid ignore <ChannelID> <ChannelID>\`
                **You can also show current ignored channels.**\n\`Command usage: ${currPrefix.prefix}raid ignore list\``)
                .setFooter(`The channel IDs must be space seperated. Clear the list with ${currPrefix.prefix}raid ignore clear`)

        message.channel.send(ignoreChannelsEmbed) 
    
    }

    break;
        default: 

        if (isRaid.raid == true) {

            let RaidUsageEmbed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag} | Raid Protection`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Raid mode is currently: **${isRaid.raid ? "true" : "false"}**\n\n\`Command usage: ${currPrefix.prefix}raid <true/on | false/off>\`\nWhen **true/on**, new members get banned, and channels get locked.\nWhen **false/off**, anyone is save to join without getting banned.`)
                .setColor(`#ff0000`)

            message.channel.send(RaidUsageEmbed)

        } else {

            let RaidUsageEmbed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag} | Raid Protection`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Raid mode is currently: **${isRaid.raid ? "true" : "false"}**\n\n\`Command usage: ${currPrefix.prefix}raid <true/on | false/off>\`\nWhen **true/on**, new members get banned, and channels get locked.\nWhen **false/off**, anyone is save to join without getting banned.
                \nYou can also choose channels to ignore during a raid.\n\`Command usage: ${currPrefix.prefix}raid ignore\`
                __**We recommend to ignore staff and info channels.**__`)
                .setColor(`#5eff5e`)

            message.channel.send(RaidUsageEmbed)

        }
    }

}

module.exports.help = {
  name: "raid",
  aliases: []
}
