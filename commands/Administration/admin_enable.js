const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Raid = require("../../lib/raid");
const mongoose = require('mongoose');

module.exports.run = async (bot, message, args, client) => {

    let currPrefix = await Servers.findOne( { guildID: message.guild.id } );
    let isRaid = await Raid.findOne( { guildID: message.guild.id } );
    await mongoose.connect('mongodb://localhost:27017/Dobby_Bot', {
        useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
          if (err) return console.error(err)
    });

    const Failure = bot.emojis.cache.get("697388354689433611");
    const Sucess = bot.emojis.cache.get("697388354668462110");
  
    var noPermsEmbed = new Discord.MessageEmbed()
        .setDescription(`${Failure} Enabling any functions within the server requires you to have \`MANAGE GUILD\` or \`ADMINISTRATOR\` permissions`)
        .setColor("#ff0000")
  
    if (!message.member.hasPermission(["ADMINISTRATOR" || "MANAGE_GUILD"])) {
      return message.channel.send(noPermsEmbed);
    }

    const OnOrOff = args[0];

    switch (OnOrOff) {
        case 'lvlmsg':

            await Servers.findOneAndUpdate({ guildID: message.guild.id }, { $set: { lvlmsg: true } }, { new: true })

            let disablelvlmsg = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag} | Level Up Message`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`${Sucess} Enabled level up message for the server`)
                .setColor(`#7aff7a`)

            message.channel.send(disablelvlmsg)

    break;    
    
        case 'lockdown':

            await Servers.findOneAndUpdate({ guildID: message.guild.id }, { $set: { lockdown: true } }, { new: true })

            let enablelockdown = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag} | Lockdown During Raid`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`${Sucess} Enabled the lockdown function for the server`)
                .setColor(`#7aff7a`)

            message.channel.send(enablelockdown)

    break;

        case 'nsfw':

            await Servers.findOneAndUpdate({ guildID: message.guild.id }, { $set: { nsfw: true } }, { new: true })

            let enableNSFW = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag} | NSFW`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`${Sucess} Enabled NSFW for the server`)
                .setColor(`#7aff7a`)

            message.channel.send(enableNSFW)
    
    break;

        default: 

        let disableDefaultEmbed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} | Enable Server Functions`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`
${currPrefix.lvlmsg ? `${Sucess}` : `${Failure}`} | Level up message | \`${currPrefix.prefix}enable lvlmsg\`
${currPrefix.lockdown ? `${Sucess}` : `${Failure}`} | Lockdown during raid | \`${currPrefix.prefix}enable lockdown\`
${currPrefix.nsfw ? `${Sucess}` : `${Failure}`} | NSFW for the server | \`${currPrefix.prefix}enable nsfw\`
                `)
            .addField(`Raid Function`, `Raid is currently: ${isRaid.raid ? `${Sucess}` : `${Failure}`}\nTo ${isRaid.raid ? `**disable**` : `**enable**`} the raid, check out: \`${isRaid.raid ? `${currPrefix.prefix}raid off` : `${currPrefix.prefix}raid on`}\``)
            .setFooter(`To disable functions, head over to: ${currPrefix.prefix}disable`)
            .setColor(`#5eff5e`)

        message.channel.send(disableDefaultEmbed)

    }

}

module.exports.help = {
  name: "enable",
  aliases: []
}
