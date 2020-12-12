const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )
  let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
  let logName = await Logs.findOne( { guildID: message.guild.id } )
  const logchannel = bot.channels.cache.get(logName.incidentLog)
  let muterole = message.guild.roles.cache.get(currPrefix.muteRole)
  if (!muterole) { return; }
  const Failure = bot.emojis.cache.get("697388354689433611");
  const Sucess = bot.emojis.cache.get("697388354668462110");

  var noPermsEmbed = new Discord.MessageEmbed()
      .setDescription(`${Failure} Unmute a member requires you to have \`MANAGE ROLES\` and \`MUTE MEMBERS\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.MessageEmbed()
      .setDescription(`${Failure} Unmute a member requires me to have \`BAN MEMBERS\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission(["MANAGE_ROLES" && "MUTE_MEMBERS"])) {
    return message.channel.send(noPermsEmbed);
  }

let unmuteErrorEmbed = new Discord.MessageEmbed()
      .setColor("#ff4f4f")
      .setTitle(`\`Command: ${currPrefix.prefix}unmute\``)
      .addField("**Description:**", "Unmute a user. Allow them to chat again.")
      .addField("**Command usage:**", `${currPrefix.prefix}unmute <@User> [Reason]`)
      .addField("**Example:**", `${currPrefix.prefix}unmute @Mr.Dobby#0001 He's been a good boy`)
      .setFooter("<> = Required, [] = Optional")
      .setTimestamp()

let NotEvenMutedEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setAuthor(`${member.user.tag} | Unmute`, member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Failure} ${member} is not even muted`)

let unmuteEmbed = new Discord.MessageEmbed()
      .setColor("#7aff7a")
      .setAuthor('Successfully unmuted!', member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Sucess} <@${member.user.id}> has been unmutened`)

      if (!member) return message.channel.send(unmuteErrorEmbed);
      let reason = args.slice(1).join(" ");
      if (!reason) reason = "No reason given.";

let unmuteEmbedLog = new Discord.MessageEmbed()
      .setAuthor(`${member.user.tag} | Unmute`, member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`\`${currPrefix.prefix}unmute <@User> [Reason]\``)
      .setColor("#7aff7a")
      .addField('User:', `<@${member.id}>`, true)
      .addField('Moderator:', `<@${message.author.id}>`, true)
      .addField('Reason:', reason, false)
      .setFooter(`ID: ${member.user.id}`)
      .setTimestamp()

      if (member.roles.cache.has(muterole.id)) {

      await(member.roles.remove(muterole));

      } else {

      return message.channel.send(NotEvenMutedEmbed);
      
      }

      if (logchannel) {

            await logchannel.send(unmuteEmbedLog);
            await message.channel.send(unmuteEmbed);
            
          } else {
        
            await message.channel.send(unmuteEmbed);
        
      }

}

module.exports.help = {
  name: "unmute",
  aliases: []
}
