const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
//let warns = JSON.parse(fs.readFileSync("../../storage/warnings.json", "utf8"));
const Servers = require("../../lib/mongodb");

module.exports.run = async (bot, message, args, client) => {

    let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

    if (message.guild.id === "521602207406227476") {

    const warnClearErrorEmbed = new Discord.RichEmbed()
    .setColor("#ff0000")
    .setTitle(`**Command:** ${currPrefix.prefix}clearwarns`)
    .addField("**Description:**", "Clear warnings for a user.")
    .addField("**Command usage:**", `${currPrefix.prefix}clearwarns <@User>`)
    .addField("**Example:**", `${currPrefix.prefix}clearwarns @Mr.Dobby#0001`)
    .setFooter("<> = Required, [] = Optional")

    let user = message.guild.member(message.mentions.users.last() || message.mentions.users.first());
    if (!user) return message.channel.send(warnClearErrorEmbed);
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Only Administrators can clear warns.")    
    
    if (!warns[`${user.id}, ${message.guild.id}`]) {
        warns[`${user.id}, ${message.guild.id}`] = {
            warns: 0
        };
    }

    let reason = `${warns[`${user.id}, ${message.guild.id}`].warns} warnings have been cleared for this user`;
    if (warns[`${user.id}, ${message.guild.id}`].warns >= 0) {
        warns[`${user.id}, ${message.guild.id}`] = {
        warns: 0
    };
} else {
        reason = "This user doesn't have any warnings, so nothing changed."
    };

    const clearWarnsLogEmbed = new Discord.RichEmbed()
    .setColor("#ffc500")
    .setAuthor(`${user.user.tag} | Clear warns`, user.user.displayAvatarURL)
    .setDescription(`\`${currPrefix.prefix}clearwarn <@User>\``)
    .addField("Cleared warns for", `${user.user.tag} | <@${user.id}>`, true)
    .addField("Administrator", `${message.author.tag} | <@${message.author.id}>`, true)
    .addField("Result", reason, false)
    .setFooter(`ID: ${user.id}`)
    .setTimestamp()

    let logchannel = message.guild.channels.find(channel => channel.name === "incident-logs" || channel.name === "dobby-logs");
    if (!logchannel) return message.channel.send("I require logs for this command to be used. Try `-logs`")

    logchannel.send(clearWarnsLogEmbed)

    } else {

    let warnRole = message.guild.roles.find(role => role.name === "Warned");
    user.removeRole(warnRole)
    message.channel.send("Success.")

    }

}

module.exports.help = {
  name: "clearwarn",
  aliases: ["clearwarns"]
}
