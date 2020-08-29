const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");
const ms = require("ms");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

  let logName = await Logs.findOne( { guildID: message.guild.id } )
  const logchannel = bot.channels.cache.get(logName.incidentLog)

  const Failure = bot.emojis.cache.get("697388354689433611");
  const Sucess = bot.emojis.cache.get("697388354668462110");

  var noPermsEmbed = new Discord.MessageEmbed()
      .setDescription(`${Failure} Slowmoding a channel requires you to have \`MANAGE MESSAGE\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.MessageEmbed()
      .setDescription(`${Failure} Slowmoding a channel requires me to have \`MANAGE MESSAGE\` and \`MANAGE CHANNELS\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission(["MANAGE_CHANNELS" && "MANAGE_MESSAGES"])) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send(noPermsEmbed);
  }

    const slowmodeErrorEmbed = new Discord.MessageEmbed()
        .setColor("#ff4f4f")
        .setTitle(`\`Command: ${currPrefix.prefix}slowmode\` | Alias: \`sm\``)
        .addField("**Description:**", "Slowdown a channel for all users. To disable, set [Time] to 0.")
        .addField("**Command usage:**", `${currPrefix.prefix}slowmode <channel> [Time] [Reason]`)
        .addField("**Example:**", `${currPrefix.prefix}slowmode #general 10 Too much spam`)
        .setFooter("Default slowmode time: 5 sec, time has to be in seconds. | <> = Required, [] = Optional")
        .setImage("https://cdn.discordapp.com/attachments/682653576501264394/728205143241261166/several_people_are_typing.gif")
    
  if (logchannel) {

    var channel = message.guild.channels.cache.get(args[0]);
    if (!channel) channel = message.mentions.channels.first();
    if (!channel) return message.channel.send(slowmodeErrorEmbed);

    var time = args[1];
    if (!time || isNaN(time)) { 
        time = 5;
    }

    var reason = args.slice(2).join(" ");
    if (!reason) reason = 'No reason provided.'

    const slowmodeSuccess = new Discord.MessageEmbed()
        .setColor("#7aff7a")
        .setAuthor(`${message.author.tag} | Channel slowmode on`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Sucess} ${channel} has recieved a slowmode.`)

    const slowmodelifted = new Discord.MessageEmbed()
        .setColor("#7aff7a")
        .setAuthor(`${message.author.tag} | Channel slowmode off`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Sucess} ${channel} no longer has slowmode enabled.`)

    const slowmodeembedLog = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Slowmode`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`\`${currPrefix.prefix}slowmode <channel> [Time] [Reason]\``)
        .setColor("#ff4f4f")
        .addField("Moderator", `<@${message.author.id}>`, true)
        .addField("Channel", `${message.channel.toString()}`, true)
        .addField("Time", `${ms(ms(time), { long: true })}`, true)
        .addField("Reason", `${reason}`, true)

    const slowmodliftedeembedLog = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Slowmode lifted`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`\`${currPrefix.prefix}slowmode <channel> [Time] [Reason]\``)
        .setColor("#7aff7a")
        .addField("Moderator", `<@${message.author.id}>`, true)
        .addField("Channel", `${message.channel.toString()}`, true)
        .addField("Reason", `${reason}`, false)

    try {
        if (channel.type == 'text') {
            if (message.member.hasPermission("MANAGE_MESSAGES")) {
                if (time == 0) {
                    channel.setRateLimitPerUser(time, reason)
                    message.channel.send(slowmodelifted)
                    return logchannel.send(slowmodliftedeembedLog)
                }
            channel.setRateLimitPerUser(time, reason)
            logchannel.send(slowmodeembedLog)
            return message.channel.send(slowmodeSuccess)
            } else {
                return;
            }
        }
    } catch (e) {

        const slowmodeError = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setAuthor(`${message.author.tag} | Slowmode Error`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${Failure} ${e}`)

        return message.channel.send(slowmodeError)
    }
  } else {

    var channel = message.guild.channels.cache.get(args[0]);
    if (!channel) channel = message.mentions.channels.first();
    if (!channel) return message.channel.send(slowmodeErrorEmbed);

    var time = args[1];
    if (!time || isNaN(time)) {
        time = 5;
    }

    var reason = args.slice(2).join(" ");
    if (!reason) reason = 'No reason provided.'

    const slowmodeSuccess = new Discord.MessageEmbed()
        .setColor("#7aff7a")
        .setAuthor(`${message.author.tag} | Channel slowmoded`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Sucess} ${channel} has recieved a slowmode.`)

    const slowmodelifted = new Discord.MessageEmbed()
        .setColor("#7aff7a")
        .setAuthor(`${message.author.tag} | Channel slowmode off`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Sucess} ${channel} no longer has slowmode enabled.`)

    try {
        if (channel.type == 'text') {
            if (message.member.hasPermission("MANAGE_MESSAGES")) {
                if (time == 0) {
                    channel.setRateLimitPerUser(time, reason)
                    message.channel.send(slowmodelifted)
                }
            channel.setRateLimitPerUser(time, reason)
            return message.channel.send(slowmodeSuccess)
            } else {
                return;
            }
        }
    } catch (e) {

        const slowmodeError = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setAuthor(`${message.author.tag} | Slowmode Error`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${Failure} ${e}`)

        return message.channel.send(slowmodeError)
    }
  }

}

module.exports.help = {
  name: "slowmode",
  aliases: ["sm"]
}
