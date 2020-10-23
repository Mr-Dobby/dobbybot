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
        case 'lvlmsg':

            await Servers.findOneAndUpdate({ guildID: message.guild.id }, { $set: { lvlmsg: false } }, { new: true })

            let disablelvlmsg = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag} | Level Up Message`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`${Sucess} Disabled level up message for the server`)
                .setColor(`#7aff7a`)

            message.channel.send(disablelvlmsg)

    break;    
    
        case 'lockdown':

            await Servers.findOneAndUpdate({ guildID: message.guild.id }, { $set: { lockdown: false } }, { new: true })

            let disablelockdown = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag} | Lockdown During Raid`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`${Sucess} Disabled the lockdown function for the server`)
                .setColor(`#7aff7a`)

            message.channel.send(disablelockdown)

    break;
        default: 

        let disableDefaultEmbed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} | Disable Server Functions`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`
${currPrefix.lvlmsg ? `${Sucess}` : `${Failure}`} | Level up message | \`${currPrefix.prefix}disable lvlmsg\`
${currPrefix.lockdown ? `${Sucess}` : `${Failure}`} | Lockdown during raid | \`${currPrefix.prefix}disable lockdown\`
                `)
            .setFooter(`To enable functions, head over to: ${currPrefix.prefix}enable`)
            .setColor(`#5eff5e`)

        message.channel.send(disableDefaultEmbed)

    }

}

module.exports.help = {
  name: "disable",
  aliases: []
}
