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
      .setDescription(`${Failure} Kicking members requires you to have \`KICK MEMBERS\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.MessageEmbed()
      .setDescription(`${Failure} Kicking members requires me to have \`KICK MEMBERS\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission("KiCK_MEMBERS")) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission("KICK_MEMBERS")) {
    return message.channel.send(noPermsEmbed);
  }

            const kickErrorEmbed = new Discord.MessageEmbed()
                  .setColor("#ff4f4f")
                  .setTitle(`\`Command: ${currPrefix.prefix}kick\` | Alias: \`gtfo\``)
                  .addField("**Description:**", "Kick a user out of the server.")
                  .addField("**Command usage:**", `${currPrefix.prefix}kick <@User> [Reason]`)
                  .addField("**Example:**", `${currPrefix.prefix}kick @Mr.Dobby#0001 Spam`)
                  .setFooter("<> = Required, [] = Optional")

            const kickPermErrorModEmbed = new Discord.MessageEmbed()
                  .setColor("#ff0000")
                  .setAuthor(`${message.author.tag} | Permission Error`, message.author.displayAvatarURL({ dynamic: true }))
                  .setDescription(`${Failure} Member is a Moderator.`)
        
            const kickPermErrorAdminEmbed = new Discord.MessageEmbed()
                  .setColor("#ff0000")
                  .setAuthor(`${message.author.tag} | Permission Error`, message.author.displayAvatarURL({ dynamic: true }))
                  .setDescription(`${Failure} Member is an Administrator.`)
        
            const kickPermErrorOwnerEmbed = new Discord.MessageEmbed()
                  .setColor("#ff0000")
                  .setAuthor(`${message.author.tag} | Stupidity Error`, message.author.displayAvatarURL({ dynamic: true }))
                  .setDescription(`${Failure} This is the server owner, nice try tho.`)

        if (logchannel) {

        let kUser = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if (!kUser) return message.channel.send(kickErrorEmbed);
/*
        if (kUser.highestRole.position >= message.member.highestRole.position) {
            return message.channel.send('You cannot kick a member who is higher or has the same role as you!');
        }
*/
        if (kUser === message.guild.me) {
            return message.channel.send("Not gonna kick myself with this command, fella.")
        }
        
        if (kUser.id === message.author.id) {
            return message.channel.send("Imagine trying to kick yourself.. ")
        }

        if (kUser === message.guild.owner) return message.channel.send(kickPermErrorOwnerEmbed);
        if (kUser.hasPermission("ADMINISTRATOR")) return message.channel.send(kickPermErrorAdminEmbed);
        if (kUser.hasPermission(["KICK_MEMBERS" || "BAN_MEMBERS" || "MANAGE_MESSAGES" || "MANAGE_ROLES" || "MANAGE_CHANNELS" || "MUTE_MEMBERS" || "DEAFEN_MEMBERS" || "MOVE_MEMBERS"])) return message.channel.send(kickPermErrorModEmbed)

        let kReason = args.join(" ").slice(22);
        if (!kReason) kReason = "No reason given.";

            let kickEmbed = new Discord.MessageEmbed()
                .setColor("#7aff7a")
                .setAuthor('Successfully kicked!', kUser.user.displayAvatarURL({ dynamic: true }))
                .setDescription(`${Sucess} <@${kUser.user.id}> has been kicked`)

            let kickEmbedLog = new Discord.MessageEmbed()
                .setAuthor(`${kUser.user.tag} | Kick`, kUser.user.displayAvatarURL({ dynamic: true }))
                .setDescription(`\`${currPrefix.prefix}kick <@User> [Reason]\``)
                .setColor("#ff4f4f")
                .addField("User", `<@${kUser.id}>`, true)
                .addField("Moderator", `<@${message.author.id}>`, true)
                .addField("Reason", kReason)
                .setFooter(`ID: ${kUser.user.id}`)
                .setTimestamp()

            let BuhByeEmbed = new Discord.MessageEmbed()
                .setAuthor(`${kUser.user.tag}, you were kicked from the ${message.guild.name} server`, kUser.user.displayAvatarURL({ dynamic: true }))
                .setColor("#ff4f4f")
                .addField("Reason", kReason)
                .setFooter(`Your ID: ${kUser.user.id}`)
                .setTimestamp()

        await message.delete();
        await message.channel.send(kickEmbed)
        await logchannel.send(kickEmbedLog)
        try {
          await kUser.send(BuhByeEmbed);
            } catch(e) { }
        var target = message.guild.members.cache.get(kUser.id)
        target.kick()

    } else {

        let kUser = message.guild.member(message.mentions.users.last() || message.mentions.users.first());
        if (!kUser) return message.channel.send(kickErrorEmbed);
        
/*
        if (kUser.highestRole.position >= message.member.highestRole.position) {
            return message.channel.send('You cannot kick a member who is higher or has the same role as you!');
        }
*/
        if (kUser === message.guild.me) {
            return message.channel.send("Not gonna kick myself with this command, fella.")
        }
        
        if (kUser.id === message.author.id) {
            return message.channel.send("Imagine trying to kick yourself.. ")
        }

        if (kUser === message.guild.owner) return message.channel.send(kickPermErrorOwnerEmbed);
        if (kUser.hasPermission("ADMINISTRATOR")) return message.channel.send(kickPermErrorAdminEmbed);
        if (kUser.hasPermission(["KICK_MEMBERS" || "BAN_MEMBERS" || "MANAGE_MESSAGES" || "MANAGE_ROLES" || "MANAGE_CHANNELS" || "MUTE_MEMBERS" || "DEAFEN_MEMBERS" || "MOVE_MEMBERS"])) return message.channel.send(kickPermErrorModEmbed)

        let kReason = args.join(" ").slice(22);
        if (!kReason) kReason = "No reason given.";

            let kickEmbed = new Discord.MessageEmbed()
                .setColor("#7aff7a")
                .setAuthor('Successfully kicked!', kUser.user.displayAvatarURL({ dynamic: true }))
                .setDescription(`<@${kUser.user.id}> has been kicked`)

            let BuhByeEmbed = new Discord.MessageEmbed()
                .setAuthor(`**${kUser.user.tag}**, you were kicked from **${message.guild.name}**`, kUser.user.displayAvatarURL({ dynamic: true }))
                .setColor("#ff4f4f")
                .addField("Reason", kReason)
                .setFooter(`ID: ${kUser.user.id}`)
                .setTimestamp()

        await message.delete();
        await message.channel.send(kickEmbed)
        await logchannel.send(kickEmbedLog)
        try {
          await kUser.send(BuhByeEmbed);
            } catch(e) { }
        var target = message.guild.members.cache.get(kUser.id)
        target.kick()

        try {
          await kUser.send(BuhByeEmbed);
            } catch(e) {
            message.channel.send("Tried telling the member they're kicking, they're kicked. But, you know....")
        }

    }

}

module.exports.help = {
  name: "kick",
  aliases: ["gtfo"]
}
