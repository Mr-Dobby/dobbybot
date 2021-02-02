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
      .setDescription(`${Failure} Clearing messages requires you to have \`MANAGE MESSAGES\` permissions.`)
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
      .addField("**Description:**", "Deletes messages. Channel or user, max 100.")
      .addField("**Command usage:**", `${currPrefix.prefix}clear <Number> [@User/#Channel]`)
      .addField("**Example:**", `${currPrefix.prefix}clear 69 #general`)
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

    let MemberOrChannel = bot.users.cache.get(args[1]) || bot.channels.cache.get(args[1]) || message.guild.member(message.mentions.users.first()) || message.guild.channels.cache.get(args[1]) || message.channel.id;

    let clearEmbed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} | Clear`, message.author.displayAvatarURL({ dynamic: true }))
    .setColor("#4fff7f")
    .addField("Cleared", `${deleteCount} messages`, true)
    .addField("Moderator", `<@${message.author.id}>`, true)
    .setFooter(`ID: ${message.author.id}`)
    .setTimestamp();

    message.delete()

    try {
      if (bot.guilds.cache.get(message.guild.id).member(MemberOrChannel)) {
        message.channel.messages.fetch({ limit: 100 }).then(messages => {
          const filter = MemberOrChannel ? MemberOrChannel.id : bot.user.id;
          messages = messages.filter(m => m.author.id == filter).array().slice(0, deleteCount);
          message.channel.bulkDelete(messages + 1, true).catch(e => {
            message.channel.send(`Something went wrong: ${e}`)
          })
        })
        clearEmbed.setDescription(`\`${currPrefix.prefix}clear <number> <@user>\``).addField(`Member`, `${MemberOrChannel.toString()}`, true)
        logchannel.send(clearEmbed)
      } else {
        if (message.channel.type == "text") {
          message.channel.bulkDelete(deleteCount + 2, true).catch(e => {
            message.channel.send(`Something went wrong: ${e}`)
          })
        }
        clearEmbed.setDescription(`\`${currPrefix.prefix}clear <number> <#channel>\``).addField(`Channel`, `<#${MemberOrChannel}>`, true)
        logchannel.send(clearEmbed)
      }
    } catch (e) {
      message.channel.send(`Something went wrong: ${e}`)
    }

  } else {

    let clearErrorEmbed = new Discord.MessageEmbed()
    .setColor("#ff4f4f")
    .setTitle(`\`Command: ${currPrefix.prefix}clear\` | Alias: \`purge\``)
    .addField("**Description:**", "Deletes message in this channel. Max 100, newer than 2 weeks.")
    .addField("**Command usage:**", `${currPrefix.prefix}clear <Number>`)
    .addField("**Example:**", `${currPrefix.prefix}clear 69`)
    .setFooter("<> = Required, [] = Optional")

 
    var noPermsEmbed = new Discord.MessageEmbed()
        .setDescription(`${Failure} Clearing messages requires you to have \`MANAGE MESSAGES\` permissions.`)
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
