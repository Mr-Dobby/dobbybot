const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

  let logName = await Logs.findOne( { guildID: message.guild.id } )
  const logchannel = bot.channels.get(logName.incidentLog)

  const Failure = bot.emojis.get("697388354689433611");
  const Sucess = bot.emojis.get("697388354668462110");

  var noPermsEmbed = new Discord.RichEmbed()
      .setDescription(`${Failure} Unmuting a member requires you to have \`MANAGE MESSAGE\` and \`MUTE MEMBERS\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.RichEmbed()
      .setDescription(`${Failure} Unmuting a member requires me to have \`MANAGE MESSAGE\` and \`MANAGE ROLES\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission(["MUTE_MEMBERS" && "MANAGE_ROLES_OR_PERMISSIONS"])) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission(["MUTE_MEMBERS" && "MANAGE_MESSAGES"])) {
    return message.channel.send(noPermsEmbed);
  }

      if (!logchannel) {

      const unmuteErrorEmbed = new Discord.RichEmbed()
            .setColor("#ff4f4f")
            .setTitle(`\`Command: ${currPrefix.prefix}unmute\``)
            .addField("**Description:**", "Unmute a user. Allow them to text chat & voice talk again.")
            .addField("**Command usage:**", `${currPrefix.prefix}unmute <@User> [Reason]`)
            .addField("**Example:**", `${currPrefix.prefix}unmute @Mr.Dobby#0001 He's been a good boy`)
            .setFooter("<> = Required, [] = Optional")
            .setTimestamp()

            let member = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.get(args[0]));
            if (!member) return message.channel.send(unmuteErrorEmbed);

            let reason = args.slice(1).join(" ");
            if (!reason) reason = "No reason given."

            let muterole = message.guild.roles.find(r => r.name === "🔇 Muted")
            if (!muterole) return message.channel.send("`🔇 Muted` role not found, so they can't have been muted by me.").then(message => message.delete(5000))

      const NotEvenMutedEmbed = new Discord.RichEmbed()
            .setColor("#ff0000")
            .setAuthor(`${member.user.tag} | Unmute`, member.user.displayAvatarURL)
            .setDescription(`${member} is not even muted`)

      const unmuteEmbed = new Discord.RichEmbed()
            .setColor("#7aff7a")
            .setAuthor('Successfully unmuted!', member.user.avatarURL)
            .setDescription(`<@${member.user.id}> has been unmuted`)

      let Embed2Member = new Discord.RichEmbed()
            .setColor("#7aff7a")
            .setDescription(`Unmuted in ${message.guild}`)
            .addField("Moderator", `${message.author.tag} | <@${message.author.id}>`, true)
            .addField(`Unmute reason: `, `**${reason}**`, false)

    if (!member.roles.has(muterole.id)) return message.channel.send(NotEvenMutedEmbed);

    await(member.removeRole(muterole.id));
    message.channel.send(unmuteEmbed);

      try {
            await member.send(Embed2Member) 
            } catch(e) {
      return;
      }

} else {

      const unmuteErrorEmbed = new Discord.RichEmbed()
            .setColor("#ff4f4f")
            .setTitle(`\`Command: ${currPrefix.prefix}unmute\``)
            .addField("**Description:**", "Unmute a user. Allow them to text chat & voice talk again.")
            .addField("**Command usage:**", `${currPrefix.prefix}unmute <@User> [Reason]`)
            .addField("**Example:**", `${currPrefix.prefix}unmute @Mr.Dobby#0001 He's been a good boy`)
            .setFooter("<> = Required, [] = Optional")
            .setTimestamp()


      let member = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.get(args[0]));
      if (!member) return message.channel.send(unmuteErrorEmbed);

      let reason = args.slice(1).join(" ");
      if (!reason) reason = "No reason given."

      let muterole = message.guild.roles.find(r => r.name === "🔇 Muted")
      if (!muterole) return message.channel.send("`🔇 Muted` role not found, so they can't have been muted by me.")

const NotEvenMutedEmbed = new Discord.RichEmbed()
      .setColor("#ff0000")
      .setAuthor(`${member.user.tag} | Unmute`, member.user.displayAvatarURL)
      .setDescription(`${Failure} ${member} is not even muted`)

const unmuteEmbed = new Discord.RichEmbed()
      .setColor("#7aff7a")
      .setAuthor('Successfully unmuted!', member.user.avatarURL)
      .setDescription(`${Sucess} <@${member.user.id}> has been unmuted`)

const unmuteEmbedLog = new Discord.RichEmbed()
      .setAuthor(`${member.user.tag} | Unmute 🔉`, member.user.displayAvatarURL)
      .setDescription(`\`${currPrefix.prefix}unmute <@User> [Reason]\``)
      .setColor("#7aff7a")
      .addField('User:', `${member.user.tag}\n<@${member.id}>`, true)
      .addField('Moderator:', `${message.author.tag}\n<@${message.author.id}>`, true)
      .addField('Reason:', reason, false)
      .setFooter(`ID: ${member.user.id}`)
      .setTimestamp()

let Embed2Member = new Discord.RichEmbed()
      .setColor("#7aff7a")
      .setAuthor(`Unmuted in ${message.guild}`, member.user.displayAvatarURL)
      .setDescription(`Reason: ${reason}`, false)
      .setTimestamp()

if (!member.roles.has(muterole.id)) return message.channel.send(NotEvenMutedEmbed);

await (member.removeRole(muterole.id));
await message.channel.send(unmuteEmbed);
await logchannel.send(unmuteEmbedLog)

try {
      await member.send(Embed2Member) 
      } catch(e) {
      message.channel.send("Unfortunately, I couldn't DM them this exciting message since they blocked it. What a shame.")
      }
  }
}

module.exports.help = {
  name: "unmute",
  aliases: []
}
