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
      .setDescription(`${Failure} Unchatbanning a member requires you to have \`MANAGE MESSAGES\` and \`MUTE MEMBERS\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.MessageEmbed()
      .setDescription(`${Failure} Unchatbanning a member requires me to have \`BAN MEMBERS\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission(["MANAGE_MESSAGE" && "MUTE_MEMBERS"])) {
    return message.channel.send(noPermsEmbed);
  }

      if (!logchannel) {

      let unchatbanErrorEmbed = new Discord.MessageEmbed()
            .setColor("#ff4f4f")
            .setTitle(`\`Command: ${currPrefix.prefix}unchatban\``)
            .addField("**Description:**", "Unchatan a user. Allow them to see all permitted channels again.")
            .addField("**Command usage:**", `${currPrefix.prefix}unchatban <@User> [Reason]`)
            .addField("**Example:**", `${currPrefix.prefix}unchatban @Mr.Dobby#0001 He's been a good boy`)
            .setFooter("<> = Required, [] = Optional")
            .setTimestamp()

            let member = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.cache.get(args[0]));
            if (!member) return message.channel.send(unchatbanErrorEmbed);

            let reason = args.slice(1).join(" ");
            if (!reason) reason = "No reason given."

            let unchatbanrole = message.guild.roles.cache.get(currPrefix.chatbanRole)
            if (!unchatbanrole) return;

      let unchatbanEmbed = new Discord.MessageEmbed()
            .setColor("#7aff7a")
            .setAuthor('Successfully unchatbanned!', member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`<@${member.user.id}> has been unchatbanned`)

      let Embed2Member = new Discord.MessageEmbed()
            .setColor("#7aff7a")
            .setDescription(`Unchatbanned in ${message.guild}`)
            .addField("Moderator", `${message.author.tag} | <@${message.author.id}>`, true)
            .addField(`Unchatban reason: `, `**${reason}**`, false)

    if (!member.roles.cache.has(unchatbanrole.id)) return;

    await(member.roles.remove(unchatbanrole.id));
    message.channel.send(unchatbanEmbed);

try {
      await member.send(Embed2Member) 
            } catch(e) {
      return;
}
  
} else {

      let unchatbanErrorEmbed = new Discord.MessageEmbed()
            .setColor("#ff4f4f")
            .setTitle(`\`Command: ${currPrefix.prefix}unchatban\``)
            .addField("**Description:**", "Unchatan a user. Allow them to see all permitted channels again.")
            .addField("**Command usage:**", `${currPrefix.prefix}unchatban <@User> [Reason]`)
            .addField("**Example:**", `${currPrefix.prefix}unchatban @Mr.Dobby#0001 He's been a good boy`)
            .setFooter("<> = Required, [] = Optional")
            .setTimestamp()

      let member = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.cache.get(args[0]));
      if (!member) return message.channel.send(unchatbanErrorEmbed);

      let reason = args.slice(1).join(" ");
      if (!reason) reason = "No reason given."

      let unchatbanrole = message.guild.roles.cache.get(currPrefix.chatbanRole)
      if (!unchatbanrole) return;

let NotEvenChatbannedEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setAuthor(`${member.user.tag} | Unchatban`, member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Failure} ${member} is not even chatbanned`)

let unchatbanEmbed = new Discord.MessageEmbed()
      .setColor("#7aff7a")
      .setAuthor('Successfully unchatbanned!', member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Sucess} <@${member.user.id}> has been unchatbanned`)

let unchatbanEmbedLog = new Discord.MessageEmbed()
      .setAuthor(`${member.user.tag} | Unchatban`, member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`\`${currPrefix.prefix}unmute <@User> [Reason]\``)
      .setColor("#7aff7a")
      .addField('User:', `<@${member.id}>`, true)
      .addField('Moderator:', `<@${message.author.id}>`, true)
      .addField('Reason:', reason, false)
      .setFooter(`ID: ${member.user.id}`)
      .setTimestamp()

let Embed2Member = new Discord.MessageEmbed()
      .setColor("#7aff7a")
      .setDescription(`Unchatbanned in ${message.guild}`)
      .addField("Moderator", `${message.author.tag} | <@${message.author.id}>`, true)
      .addField(`Reason: `, `**${reason}**`, false)
      .setFooter(`Your ID: ${member.id}`)
      .setTimestamp()

if (!member.roles.cache.has(unchatbanrole.id)) return message.channel.send(NotEvenChatbannedEmbed);

await(member.roles.remove(unchatbanrole.id));
logchannel.send(unchatbanEmbedLog)
message.channel.send(unchatbanEmbed);

try {
await member.send(Embed2Member) 
} catch(e) {
      return;
    }          
  }
}

module.exports.help = {
  name: "unchatban",
  aliases: []
}
