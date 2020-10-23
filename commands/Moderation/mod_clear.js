const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

  let logName = await Logs.findOne( { guildID: message.guild.id } )
  const logchannel = bot.channels.cache.get(logName.incidentLog)

  const Failure = bot.emojis.cache.get("697388354689433611");
  const Sucess = bot.emojis.cache.get("697388354668462110");

  var noPermsEmbed = new Discord.MessageEmbed()
      .setDescription(`${Failure} Clearing messages requires you to have \`ADMINISTRATOR\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.MessageEmbed()
      .setDescription(`${Failure} Clearing messages requires me to have \`MANAGE MESSAGES\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send(noPermsEmbed);
  }

  if (logchannel) {

          let clearErrorEmbed = new Discord.MessageEmbed()
              .setColor("#ff4f4f")
              .setTitle(`\`Command: ${currPrefix.prefix}clear\` | Alias: \`purge\``)
              .addField("**Description:**", "Deletes message in this channel. Max 100, newer than 2 weeks.")
              .addField("**Command usage:**", `${currPrefix.prefix}clear <Number>`)
              .addField("**Example:**", `${currPrefix.prefix}clear 69`)
              .setFooter("<> = Required, [] = Optional")

              if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
                return message.channel.send(clearErrorEmbed)
              }

              let deleteCount;

              if (parseInt(args[0]) > 100) {
                deleteCount = 100;
              } else { 
                deleteCount = parseInt(args[0]);
              }

              // Deleting the messages
              message.delete()
              await message.channel.bulkDelete(deleteCount, true)
              .catch(err => message.channel.send(`Error: ${err}\nTry again.`))
        
              const clearEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${message.author.tag} | Clear`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`\`${currPrefix.prefix}clear <Number>\``)
                    .setColor("#4fff7f")
                    .addField("Cleared", `${deleteCount} messages`, true)
                    .addField("Channel", `${message.channel}`, true)
                    .addField("Moderator", `<@${message.author.id}>`, true)
                    .setFooter(`ID: ${message.author.id}`)
                    .setTimestamp();
        
              logchannel.send(clearEmbed)

  } else {

    let clearErrorEmbed = new Discord.MessageEmbed()
    .setColor("#ff4f4f")
    .setTitle(`\`Command: ${currPrefix.prefix}clear\` | Alias: \`purge\``)
    .addField("**Description:**", "Deletes message in this channel. Max 100, newer than 2 weeks.")
    .addField("**Command usage:**", `${currPrefix.prefix}clear <Number>`)
    .addField("**Example:**", `${currPrefix.prefix}clear 69`)
    .setFooter("<> = Required, [] = Optional")

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send('You need `MANAGE MESSAGES` permission')
    };

    if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
      return message.channel.send(clearErrorEmbed)
    }

    let deleteCount;

    if (parseInt(args[0]) > 100) {
      deleteCount = 100;
    } else { 
      deleteCount = parseInt(args[0]);
    }

    // Deleting the messages
    message.delete()
    await message.channel.bulkDelete(deleteCount, true)

    let DidYouKnow = new Discord.MessageEmbed()
        .setDescription(`Did you know you can log these actions?\n- Try out \`${currPrefix.prefix}logging\``)

    message.channel.send(DidYouKnow).then(m => m.delete({ timeout: 10000 }))

  }

}

module.exports.help = {
  name: "clear",
  aliases: ["purge"]
}
