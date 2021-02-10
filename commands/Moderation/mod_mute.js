const Discord = require("discord.js");
const ms = require("ms");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

  let logName = await Logs.findOne( { guildID: message.guild.id } )
  const logchannel = bot.channels.cache.get(logName.incidentLog)
  let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
  const Failure = bot.emojis.cache.get(require("../../storage/config.json").emojis.Failure); 
  const Success = bot.emojis.cache.get(require("../../storage/config.json").emojis.Success);

  var noPermsEmbed = new Discord.MessageEmbed()
      .setDescription(`${Failure} Muting a member requires you to have \`MANAGE MESSAGE\` and \`MUTE MEMBERS\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.MessageEmbed()
      .setDescription(`${Failure} Muting a member requires me to have \`MANAGE CHANNELS\`, \`MANAGE ROLES\`, \` MANAGE MEMBERS\` and \`MUTE MEMBERS\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission("MUTE_MEMBERS" && "MANAGE_ROLES")) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission("MANAGE_CHANNELS" && "MANAGE_ROLES" && "MANAGE_MEMBERS" && "MUTE_MEMBERS")) {
    return message.channel.send(noPermsEmbed);
  }

    const mutePermErrorModEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setAuthor(`${message.author.tag} | Permission Error`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Failure} Member is a Moderator.`)

    const mutePermErrorAdminEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setAuthor(`${message.author.tag} | Permission Error`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Failure} Member is an Administrator.`)

    const mutePermErrorOwnerEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setAuthor(`${message.author.tag} | Stupidity Error`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Failure} This is the server owner, nice try tho.`)

    const muteErrorEmbed = new Discord.MessageEmbed()
      .setColor("#ff4f4f")
      .setTitle(`\`Command: ${currPrefix.prefix}mute\` | Alias: \`stfu\``)
      .addField("**Description:**", "Mute a user. Deny them from text chatting & voice talking.")
      .addField("**Command usage:**", `${currPrefix.prefix}mute <@User> <Time> [Reason]`)
      .addField("**Example:**", `${currPrefix.prefix}mute @Mr.Dobby#0001 1m`)
      .setFooter("Default mute time: 30 min. | <> = Required, [] = Optional")

    const AlreadyMutedEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setAuthor(`${member.user.tag} | Mute`, member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Failure} ${member} is already muted`)

      if (member === message.guild.me || member.id === message.author.id) {
        return;
      }

      if (!member) return message.channel.send(muteErrorEmbed);
      if (member === message.guild.owner) return message.channel.send(mutePermErrorOwnerEmbed);
      if (member.hasPermission("ADMINISTRATOR")) return message.channel.send(mutePermErrorAdminEmbed);
      if (member.hasPermission("KICK_MEMBERS" || "BAN_MEMBERS" || "MANAGE_MESSAGES" || "MANAGE_ROLES" || "MANAGE_CHANNELS" || "MUTE_MEMBERS" || "DEAFEN_MEMBERS" || "MOVE_MEMBERS")) return message.channel.send(mutePermErrorModEmbed);
    
      let muterole = currPrefix.muteRole;
      if (member.roles.cache.has(muterole)) return message.channel.send(AlreadyMutedEmbed)
      //start of create role
      if (!message.guild.roles.cache.get(muterole) || currPrefix.muteRole == "") {
        try {
          muterole = await message.guild.roles.create({
            data: {
              name: "🔇 Muted",
              color: "#525252",
              permissions:[]
            }
          })
        } catch(e) {
          console.log(e.stack);
        }
        await Servers.findOneAndUpdate({ guildID: message.guild.id }, { $set: { muteRole: muterole.id } }, { new: true })
        message.guild.channels.cache.forEach(channel => {
          channel.updateOverwrite(muterole, { SEND_MESSAGES: false, ADD_REACTIONS: false, SPEAK: false, STREAM: false });
        });
      }

      let mutetime = args[1];
      if (!mutetime) mutetime = "60m";
      let reason = args.slice(2).join(' ');
      if (!reason) reason = 'No reason given.'

      const muteembed = new Discord.MessageEmbed()
        .setColor("#7aff7a")
        .setAuthor('Successfully muted!', member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Success} <@${member.user.id}> has been muted`)

      const muteLogEmbed = new Discord.MessageEmbed()
        .setAuthor(`${member.user.tag} | Mute`, member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`\`${currPrefix.prefix}mute <@User> [Reason]\``)
        .setColor("#ff4f4f")
        .addField("User:", `<@${member.user.id}>`, true)
        .addField("Moderator", `<@${message.author.id}>`, true)
        .addField("Time", `${ms(ms(mutetime), { long: true })}`, true)
        .addField("Reason", `${reason}`, false)
        .setFooter(`ID: ${member.user.id}`)
        .setTimestamp()

      const AutoEmbed = new Discord.MessageEmbed()
        .setAuthor(`${member.user.tag} | Auto unmute`, member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`\`${currPrefix.prefix}mute <@User> [Reason]\``)
        .setColor("#7aff7a")
        .addField("User:", `<@${member.user.id}>`, true)
        .addField("Reason", `Auto | Time Expired.`, true)
        .setFooter(`ID: ${member.user.id}`)
        .setTimestamp()


      await (member.roles.add(muterole));
      if (member.voice.channel) {
        member.setMute(true);
      }

      if (logchannel) {

        await logchannel.send(muteLogEmbed);
        await message.channel.send(muteembed);
        
      } else {
    
        await message.channel.send(muteembed);
    
      }

      setTimeout(function() {
        try {
          member.roles.remove(muterole);
          if (member.voice.channel) {
            member.setMute(false);
          }
          delete bot.muted[toMute.id];
          fs.writeFileSync("../../storage/muted.json", JSON.stringify(bot.muted, null, 4), error => {
            if (error) { console.log(error) }
          })
          logchannel.send(AutoEmbed)
        } catch (e) {
          console.log(e)
        }
      }, ms(mutetime));

}

module.exports.help = {
  name: "mute",
  aliases: ["stfu"]
}
