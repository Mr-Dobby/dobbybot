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
      .setDescription(`${Failure} Kicking members requires you to have \`KICK MEMBERS\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.RichEmbed()
      .setDescription(`${Failure} Kicking members requires me to have \`KICK MEMBERS\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission("KiCK_MEMBERS")) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission("KICK_MEMBERS")) {
    return message.channel.send(noPermsEmbed);
  }

            const kickErrorEmbed = new Discord.RichEmbed()
                  .setColor("#ff4f4f")
                  .setTitle(`\`Command: ${currPrefix.prefix}kick\` | Alias: \`gtfo\``)
                  .addField("**Description:**", "Kick a user out of the server.")
                  .addField("**Command usage:**", `${currPrefix.prefix}kick <@User> [Reason]`)
                  .addField("**Example:**", `${currPrefix.prefix}kick @Mr.Dobby#0001 Spam`)
                  .setFooter("<> = Required, [] = Optional")

            const kickPermErrorModEmbed = new Discord.RichEmbed()
                  .setColor("#ff0000")
                  .setAuthor(`${message.author.tag} | Permission Error`, message.author.displayAvatarURL)
                  .setDescription(`${Failure} Member is a Moderator.`)
        
            const kickPermErrorAdminEmbed = new Discord.RichEmbed()
                  .setColor("#ff0000")
                  .setAuthor(`${message.author.tag} | Permission Error`, message.author.displayAvatarURL)
                  .setDescription(`${Failure} Member is an Administrator.`)
        
            const kickPermErrorOwnerEmbed = new Discord.RichEmbed()
                  .setColor("#ff0000")
                  .setAuthor(`${message.author.tag} | Stupidity Error`, message.author.displayAvatarURL)
                  .setDescription(`${Failure} This is the server owner, nice try tho.`)

        if (logchannel) {

        let kUser = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!kUser) return message.channel.send(kickErrorEmbed);

        if (kUser.highestRole.position >= message.member.highestRole.position) {
            return message.channel.send('You cannot kick a member who is higher or has the same role as you!');
        }

        if (kUser === message.guild.me) {
            return message.channel.send("Not gonna kick myself with this command, fella.")
        }
        
        if (kUser.id === message.author.id) {
            return message.channel.send("Imagine trying to kick yourself.. ")
        }

        if (kUser === message.guild.owner) return message.channel.send(kickPermErrorOwnerEmbed);
        if (kUser.hasPermission("ADMINISTRATOR")) return message.channel.send(kickPermErrorAdminEmbed);
        if (kUser.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_MESSAGES", "MANAGE_ROLES_OR_PERMISSIONS", "MANAGE_CHANNELS", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS"])) return message.channel.send(kickPermErrorModEmbed)

        let kReason = args.join(" ").slice(22);
        if (!kReason) kReason = "No reason given.";

            let kickEmbed = new Discord.RichEmbed()
                .setColor("#7aff7a")
                .setAuthor('Successfully kicked!', kUser.user.displayAvatarURL)
                .setDescription(`${Sucess} <@${kUser.user.id}> has been kicked`)

            let kickEmbedLog = new Discord.RichEmbed()
                .setAuthor(`${kUser.user.tag} | Kick 🔨`, kUser.user.displayAvatarURL)
                .setDescription(`\`${currPrefix.prefix}kick <@User> [Reason]\``)
                .setColor("#ff4f4f")
                .addField("User", `${kUser.user.tag}\n<@${kUser.id}>`, true)
                .addField("Moderator", `${message.author.tag}\n<@${message.author.id}>`, true)
                .addField("Reason", kReason)
                .setFooter(`ID: ${kUser.user.id}`)
                .setTimestamp()

            let BuhByeEmbed = new Discord.RichEmbed()
                .setAuthor(`${kUser.user.tag}, you were kicked from the ${message.guild.name} server`, kUser.user.displayAvatarURL)
                .setColor("#ff4f4f")
                .addField("Reason", kReason)
                .setFooter(`Your ID: ${kUser.user.id}`)
                .setTimestamp()

        try {
          await kUser.send(BuhByeEmbed);
            } catch(e) {
                return;
        }

        message.delete();
        message.channel.send(kickEmbed)
        logchannel.send(kickEmbedLog)
        message.guild.member(kUser).kick({
            reason: `Kick | ${message.author.tag}: ${kReason}`
        });

    } else {

        let kUser = message.guild.member(message.mentions.users.last() || message.mentions.users.first());
        if (!kUser) return message.channel.send(kickErrorEmbed);
        
        let botRole = message.guild.roles.find(r => r.name === "Dobby Bot");
        if (kUser.highestRole.position <= botRole.position) {
            return await message.channel.send(`My highest role needs to be higher than their highest.`);
        }

        if (kUser.highestRole.position >= message.member.highestRole.position) {
            return message.channel.send('You cannot kick a member who is higher or has the same role as you!');
        }

        if (kUser === message.guild.me) {
            return message.channel.send("Not gonna kick myself with this command, fella.")
        }
        
        if (kUser.id === message.author.id) {
            return message.channel.send("Imagine trying to kick yourself.. ")
        }

        if (kUser === message.guild.owner) return message.channel.send(kickPermErrorOwnerEmbed);
        if (kUser.hasPermission("ADMINISTRATOR")) return message.channel.send(kickPermErrorAdminEmbed);
        if (kUser.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_MESSAGES", "MANAGE_ROLES_OR_PERMISSIONS", "MANAGE_CHANNELS", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS"])) return message.channel.send(kickPermErrorModEmbed)

        let kReason = args.join(" ").slice(22);
        if (!kReason) kReason = "No reason given.";

            let kickEmbed = new Discord.RichEmbed()
                .setColor("#7aff7a")
                .setAuthor('Successfully kicked!', kUser.user.displayAvatarURL)
                .setDescription(`<@${kUser.user.id}> has been kicked`)

            let BuhByeEmbed = new Discord.RichEmbed()
                .setAuthor(`**${kUser.user.tag}**, you were kicked from **${message.guild.name}**`, kUser.user.displayAvatarURL)
                .setColor("#ff4f4f")
                .addField("Reason", kReason)
                .setFooter(`ID: ${kUser.user.id}`)
                .setTimestamp()

        try {
          await kUser.send(BuhByeEmbed);
            } catch(e) {
            message.channel.send("Tried telling the member they're kicking, they're kicked. But, you know....")
        }

        message.delete();
        message.channel.send(kickEmbed)
        message.guild.member(kUser).kick({
            reason: `Kick | ${message.author.tag}: ${kReason}`
        });
    }

}

module.exports.help = {
  name: "kick",
  aliases: ["gtfo"]
}
