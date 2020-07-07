const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

    const member = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.get(args[1]));
    const logName = await Logs.findOne( { guildID: message.guild.id } );
    const logchannel = bot.channels.get(logName.serverLog);
    const Failure = bot.emojis.get("697388354689433611");
    const Sucess = bot.emojis.get("697388354668462110");
    
    let OnlyStaff = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Add Member to Ticket`, message.author.displayAvatarURL)
        .setDescription(`${Failure} <@${message.author.id}> only staff can add members to tickets`)
        .setColor("#ffc500")

    let noLogs = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | No Log Channel`, message.author.displayAvatarURL)
        .setDescription(`${Failure} Reqiures a \`Server log\` or \`Action log\` channel. Set one with \`${currPrefix.prefix}set\``)
        .setColor("#ff4f4f")

    if (!logchannel) return message.channel.send(noLogs)
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(OnlyStaff)

    let AMTicketEmbedError = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Add Member to Ticket`, message.author.displayAvatarURL)
        .setDescription(`${Failure} Command usage: \`${currPrefix.prefix}add <Ticket ID> <User ID>\``)
        .setColor("#ffc500")

    const ticketNumber = args[0];
    const ticketChannel = message.guild.channels.find(c => c.name == `ticket-${ticketNumber}`);
    if (!ticketChannel) return message.channel.send(AMTicketEmbedError)

    let TicketEmbedLog = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Added Member to Ticket 🔒`, message.author.displayAvatarURL)
        .setDescription(`\`${currPrefix.prefix}add <Ticket ID> <User ID>\``)
        .setColor("#ffc500")
        .addField("Added member to ticket", `${member.user.tag}\n<@${member.user.id}>`, true)
        .addField("Moderator", `${message.author.tag}\n<@${message.author.id}>`, true)
        .setFooter(`Ticket ID: ${ticketNumber}`)
        .setTimestamp()

    if (!member) return message.channel.send(AMTicketEmbedError);

    let AMTicketEmbedSuccess = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Add Member to Ticket`, message.author.displayAvatarURL)
        .setDescription(`${Sucess} <@${message.author.id}> added <@${member.id}> to this ticket!`)
        .setColor("#ffc500")

    if (member) {
        await ticketChannel.overwritePermissions(member, {
            VIEW_CHANNEL: true
        })
    }
    await message.delete()
    await logchannel.send(TicketEmbedLog)
    await ticketChannel.send(AMTicketEmbedSuccess)

}

module.exports.help = {
  name: "add",
  aliases: ["amticket"] //{Add} {Member} (to) {Ticket} => amticket
}
