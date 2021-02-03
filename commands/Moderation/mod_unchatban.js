const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )
  let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
  let logName = await Logs.findOne( { guildID: message.guild.id } )
  const logchannel = bot.channels.cache.get(logName.incidentLog)
  let chatbanrole = message.guild.roles.cache.get(currPrefix.chatbanRole)
  if (!chatbanrole) { return; }
  const Failure = bot.emojis.cache.get(require("../../storage/config.json").emojis.Failure); 
  const Success = bot.emojis.cache.get(require("../../storage/config.json").emojis.Success);
  
  var noPermsEmbed = new Discord.MessageEmbed()
      .setDescription(`${Failure} Unchatbanning a member requires you to have \`MANAGE ROLES\` and \`MUTE MEMBERS\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.MessageEmbed()
      .setDescription(`${Failure} Unchatbanning a member requires me to have \`BAN MEMBERS\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission(["MANAGE_ROLES" && "MUTE_MEMBERS"])) {
    return message.channel.send(noPermsEmbed);
  }

let unchatbanErrorEmbed = new Discord.MessageEmbed()
      .setColor("#ff4f4f")
      .setTitle(`\`Command: ${currPrefix.prefix}unchatban\``)
      .addField("**Description:**", "Unchatban a user. Allow them to see all permitted channels again.")
      .addField("**Command usage:**", `${currPrefix.prefix}unchatban <@User> [Reason]`)
      .addField("**Example:**", `${currPrefix.prefix}unchatban @Mr.Dobby#0001 He's been a good boy`)
      .setFooter("<> = Required, [] = Optional")
      .setTimestamp()

let NotEvenChatbannedEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setAuthor(`${member.user.tag} | Unchatban`, member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Failure} ${member} is not even chatbanned`)

let unchatbanEmbed = new Discord.MessageEmbed()
      .setColor("#7aff7a")
      .setAuthor('Successfully unchatbanned!', member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Success} <@${member.user.id}> has been unchatbanned`)

      if (!member) return message.channel.send(unchatbanErrorEmbed);
      let reason = args.slice(1).join(" ");
      if (!reason) reason = "No reason given.";

let unchatbanEmbedLog = new Discord.MessageEmbed()
      .setAuthor(`${member.user.tag} | Unchatban`, member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`\`${currPrefix.prefix}unchatban <@User> [Reason]\``)
      .setColor("#7aff7a")
      .addField('User:', `<@${member.id}>`, true)
      .addField('Moderator:', `<@${message.author.id}>`, true)
      .addField('Reason:', reason, false)
      .setFooter(`ID: ${member.user.id}`)
      .setTimestamp()

      if (member.roles.cache.has(chatbanrole.id)) {

            await(member.roles.remove(chatbanrole));
      
            } else {
      
            return message.channel.send(NotEvenChatbannedEmbed);
            
            }
      
      if (logchannel) {

            await logchannel.send(unchatbanEmbedLog);
            await message.channel.send(unchatbanEmbed);
            
          } else {
        
            await message.channel.send(unchatbanEmbed);
        
      }

}

module.exports.help = {
  name: "unchatban",
  aliases: []
}
