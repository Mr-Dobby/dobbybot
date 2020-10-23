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
      .setDescription(`${Failure} Unmuting a member requires you to have \`MANAGE MESSAGE\` and \`MUTE MEMBERS\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.MessageEmbed()
      .setDescription(`${Failure} Unmuting a member requires me to have \`MANAGE MESSAGE\` and \`MANAGE ROLES\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission(["MUTE_MEMBERS" && "MANAGE_ROLES"])) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission(["MUTE_MEMBERS" && "MANAGE_MESSAGES"])) {
    return message.channel.send(noPermsEmbed);
  }

      if (!logchannel) {

      const unmuteErrorEmbed = new Discord.MessageEmbed()
            .setColor("#ff4f4f")
            .setTitle(`\`Command: ${currPrefix.prefix}unmute\``)
            .addField("**Description:**", "Unmute a user. Allow them to text chat & voice talk again.")
            .addField("**Command usage:**", `${currPrefix.prefix}unmute <@User> [Reason]`)
            .addField("**Example:**", `${currPrefix.prefix}unmute @Mr.Dobby#0001 He's been a good boy`)
            .setFooter("<> = Required, [] = Optional")
            .setTimestamp()

            let member = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.cache.get(args[0]));
            if (!member) return message.channel.send(unmuteErrorEmbed);

            let reason = args.slice(1).join(" ");
            if (!reason) reason = "No reason given."

            let muterole = message.guild.roles.cache.cache.get(currPrefix.muteRole)
            if (!muterole) return;

      const NotEvenMutedEmbed = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setAuthor(`${member.user.tag} | Unmute`, member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`${member} is not even muted`)

      const unmuteEmbed = new Discord.MessageEmbed()
            .setColor("#7aff7a")
            .setAuthor('Successfully unmuted!', member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`<@${member.user.id}> has been unmuted`)

      let Embed2Member = new Discord.MessageEmbed()
            .setColor("#7aff7a")
            .setDescription(`Unmuted in ${message.guild}`)
            .addField("Moderator", `${message.author.tag} | <@${message.author.id}>`, true)
            .addField(`Unmute reason: `, `**${reason}**`, false)

    if (!member.roles.cache.has(muterole.id)) return message.channel.send(NotEvenMutedEmbed);

    await(member.roles.remove(muterole.id));
    message.channel.send(unmuteEmbed);

      try {
            await member.send(Embed2Member) 
            } catch(e) {
      return;
      }

} else {

      const unmuteErrorEmbed = new Discord.MessageEmbed()
            .setColor("#ff4f4f")
            .setTitle(`\`Command: ${currPrefix.prefix}unmute\``)
            .addField("**Description:**", "Unmute a user. Allow them to text chat & voice talk again.")
            .addField("**Command usage:**", `${currPrefix.prefix}unmute <@User> [Reason]`)
            .addField("**Example:**", `${currPrefix.prefix}unmute @Mr.Dobby#0001 He's been a good boy`)
            .setFooter("<> = Required, [] = Optional")
            .setTimestamp()

      let member = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.cache.get(args[0]));
      if (!member) return message.channel.send(unmuteErrorEmbed);

      let reason = args.slice(1).join(" ");
      if (!reason) reason = "No reason given."

      let muterole = message.guild.roles.cache.get(currPrefix.muteRole)
      if (!muterole) return;

const NotEvenMutedEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setAuthor(`${member.user.tag} | Unmute`, member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Failure} ${member} is not even muted`)

const unmuteEmbed = new Discord.MessageEmbed()
      .setColor("#7aff7a")
      .setAuthor('Successfully unmuted!', member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Sucess} <@${member.user.id}> has been unmuted`)

const unmuteEmbedLog = new Discord.MessageEmbed()
      .setAuthor(`${member.user.tag} | Unmute`, member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`\`${currPrefix.prefix}unmute <@User> [Reason]\``)
      .setColor("#7aff7a")
      .addField('User:', `<@${member.id}>`, true)
      .addField('Moderator:', `<@${message.author.id}>`, true)
      .addField('Reason:', reason, false)
      .setFooter(`ID: ${member.user.id}`)
      .setTimestamp()

let Embed2Member = new Discord.MessageEmbed()
      .setColor("#7aff7a")
      .setAuthor(`Unmuted in ${message.guild}`, member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`Reason: ${reason}`, false)
      .setTimestamp()

if (!member.roles.cache.has(muterole.id)) return message.channel.send(NotEvenMutedEmbed);

await (member.roles.remove(muterole.id));
await message.channel.send(unmuteEmbed);
await logchannel.send(unmuteEmbedLog)

try {
      await member.send(Embed2Member) 
      } catch(e) {
      
      }
  }
}

module.exports.help = {
  name: "unmute",
  aliases: []
}
