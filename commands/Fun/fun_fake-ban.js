const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )
    const Failure = bot.emojis.cache.get("697388354689433611");
    const Sucess = bot.emojis.cache.get("697388354668462110");
    const Troll = bot.emojis.cache.get("723559450153189456");

    const banErrorEmbed = new Discord.MessageEmbed()
          .setColor("#ff0000")
          .setTitle(`\`Command: ${currPrefix.prefix}ban\``)
          .addField("**Description:**", "Ban a user from the server.")
          .addField("**Command usage:**", `${currPrefix.prefix}ban <@User> [Reason]`)
          .addField("**Example:**", `${currPrefix.prefix}ban @Mr.Dobby#0001 Spam`)
          .setFooter("<> = Required, [] = Optional")

    const banPermErrorModEmbed = new Discord.MessageEmbed()
          .setColor("#ff0000")
          .setAuthor(`${message.author.tag} | Permission Error`, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`${Failure} Member is a Moderator.`)

    const banPermErrorAdminEmbed = new Discord.MessageEmbed()
          .setColor("#ff0000")
          .setAuthor(`${message.author.tag} | Permission Error`, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`${Failure} Member is an Administrator.`)

    const banPermErrorOwnerEmbed = new Discord.MessageEmbed()
          .setColor("#ff0000")
          .setAuthor(`${message.author.tag} | Stupidity Error`, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`${Failure} This is the server owner, nice try tho.`)

    if (!message.member.hasPermission("BAN_MEMBERS")) {
      return message.channel.send("You need `BAN MEMBERS` permission.");
    }

    let bUser = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if (!bUser) return message.channel.send(banErrorEmbed);

    if (bUser === message.guild.owner) return message.channel.send(banPermErrorOwnerEmbed);
    if (bUser.hasPermission("ADMINISTRATOR")) return message.channel.send(banPermErrorAdminEmbed);
    if (bUser.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_MESSAGES", "MANAGE_ROLES_OR_PERMISSIONS", "MANAGE_CHANNELS", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS"])) return message.channel.send(banPermErrorModEmbed)

    let banEmbed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setAuthor('Successfully banned!', bUser.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Sucess} <@${bUser.user.id}> has been banned`)

    let BuhByeEmbed = new Discord.MessageEmbed()
        .setAuthor(`${bUser.user.username}, you were \`fake\` banned`, bUser.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`LOL LOL LOL LOL LOL\n\n${Troll} ${Troll} ${Troll} ${Troll} ${Troll}`)
        .setColor("#ff0000")
        .setFooter(`Your ID: ${bUser.user.id}`)
        .setTimestamp()

        await message.delete()
        await message.channel.send(banEmbed)
        
        try {
            await bUser.send(BuhByeEmbed)
        } catch (e) {
            return;
        }

}

module.exports.help = {
  name: "fban",
  aliases: ["fakeban"]
}
