const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Enabled = require("../../lib/raid");
const mongoose = require('mongoose');
const IGNORED = new Set([
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
  ]);
  
//(ow && ow.READ_MESSAGES !== false && ow.SEND_MESSAGES !== false)
module.exports.run = async (bot, message, args, client) => {

    let currPrefix = await Servers.findOne( { guildID: message.guild.id } );
    let isRaid = await Enabled.findOne( { guildID: message.guild.id } );
    await mongoose.connect('mongodb://localhost:27017/Dobby_Bot', {
        useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
          if (err) return console.error(err)
    });

    const Failure = bot.emojis.get("697388354689433611");
    const Sucess = bot.emojis.get("697388354668462110");
  
    var noPermsEmbed = new Discord.RichEmbed()
        .setDescription(`${Failure} Toggling the raid function requires you to have \`ADMINISTRATOR\` permissions.`)
        .setColor("#ff0000")
      
    var noPermsEmbedBot = new Discord.RichEmbed()
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

            await Enabled.findOneAndUpdate({ guildID: message.guild.id }, { $set: { raid: true} }, { new: true})

            let RaidON = new Discord.RichEmbed()
                .setAuthor(`${message.author.tag} | Raid Protection`, message.author.displayAvatarURL)
                .setDescription(`${Sucess} Raid mode set to: **true**\nAnyone joining the server will now get banned.`)
                .setColor(`#ff0000`)

            message.channel.send(RaidON)

            var { id } = message.guild.defaultRole;
            var ow = message.channel.permissionOverwrites.get(id)
            var channels = message.guild.channels.filter(ch => ch.type !== 'category');  
                channels.forEach(async (channel) => {
                    if (ow && [ow.READ_MESSAGES !== false || ow.SEND_MESSAGES !== false]) {
                        if (!IGNORED.has(channel.id)) {
                            await channel.overwritePermissions(message.guild.id, {
                                SEND_MESSAGES: false
                            }).then(async (cha) => {
                                if (cha.type == "text") {
                                    if (!cha.name.endsWith('🔒')) {
                                        await cha.edit({ name: cha.name + '🔒' });
                                }
                            }
                        });
                    }
                };
            });

                break;
        case 'false':
        case 'off':

            await Enabled.findOneAndUpdate({ guildID: message.guild.id }, { $set: { raid: false} }, { new: true})
            
            let RaidOFF = new Discord.RichEmbed()
                .setAuthor(`${message.author.tag} | Raid Protection`, message.author.displayAvatarURL)
                .setDescription(`${Sucess} Raid mode set to: **false**\nIt is now safe to join the server.`)
                .setColor(`#00ff00`)

            message.channel.send(RaidOFF)

            var { id } = message.guild.defaultRole; 
            var ow = message.channel.permissionOverwrites.get(id)
            var channels = message.guild.channels.filter(ch => ch.type !== 'category');
                channels.forEach(async (channel) => {
                    if (ow && [ow.READ_MESSAGES !== false || ow.SEND_MESSAGES !== true]) {
                        if (!IGNORED.has(channel.id)) {
                            await channel.overwritePermissions(message.guild.id, {
                                SEND_MESSAGES: null
                            }).then(async (cha) => {
                                if (cha.type == "text") {
                                    if (cha.name.endsWith('🔒')) {
                                        await cha.edit({ name: cha.name.replace(/\s*🔒/, '') });
                                }
                            }
                        });
                    };
                }
            });

                break;
        default: 

            let RaidUsageEmbed = new Discord.RichEmbed()
                .setAuthor(`${message.author.tag} | Raid Protection`, message.author.displayAvatarURL)
                .setDescription(`Raid mode is currently: **${isRaid.raid}**\n\n\`Command usage: ${currPrefix.prefix}raid <true/on | false/off>\`\nWhen **true/on**, new members get banned, and channels get locked.\nWhen **false/off**, anyone is save to join without getting banned.`)
               
            message.channel.send(RaidUsageEmbed)
    }

}

module.exports.help = {
  name: "raid",
  aliases: []
}
