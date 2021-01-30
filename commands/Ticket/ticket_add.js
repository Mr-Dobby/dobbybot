const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

    const member = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.cache.get(args[1]));
    const logName = await Logs.findOne( { guildID: message.guild.id } );
    if (!logName) { return; }
    const logchannel = bot.channels.cache.get(logName.serverLog);
    const Failure = bot.emojis.cache.get("697388354689433611");
    const Sucess = bot.emojis.cache.get("697388354668462110");
    
    let OnlyStaff = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Add Member to Ticket`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} <@${message.author.id}> only staff can add members to tickets`)
        .setColor("#ffc500")

    let noLogs = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | No Log Channel`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} Reqiures a \`Server log\` channel. Set one with: \`${currPrefix.prefix}set\``)
        .setColor("#ff4f4f")

    if (!logchannel) return message.channel.send(noLogs)
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(OnlyStaff)

    let AMTicketEmbedError = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Add Member to Ticket`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} Command usage: \`${currPrefix.prefix}add <Ticket ID> <User>\``)
        .setColor("#ffc500")

    const ticketNumber = args[0];
    const ticketChannel = message.guild.channels.cache.find(c => c.name == `ticket-${ticketNumber}`);
    if (!ticketChannel) return message.channel.send(AMTicketEmbedError)

    let TicketEmbedLog = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Added Member to Ticket 🔒`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`\`${currPrefix.prefix}add <Ticket ID> <User ID>\``)
        .setColor("#ffc500")
        .addField("Added member to ticket", `<@${member.user.id}>`, true)
        .addField("Moderator", `<@${message.author.id}>`, true)
        .setFooter(`Ticket ID: ${ticketNumber}`)
        .setTimestamp()

    if (!member) return message.channel.send(AMTicketEmbedError);

    let AMTicketEmbedSuccess = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Add Member to Ticket`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Sucess} <@${message.author.id}> added <@${member.id}> to ticket \`#${ticketNumber}\`!`)
        .setColor("#ffc500")

    if (member) {
        await ticketChannel.overwritePermissions([
            {
                id: member.id,
                allow: ['VIEW_CHANNEL'],
            },
        ])
    }
    await message.delete()
    await logchannel.send(TicketEmbedLog)
    await ticketChannel.send(AMTicketEmbedSuccess)

}

module.exports.help = {
  name: "add",
  aliases: ["amticket"] //{Add} {Member} (to) {Ticket} => amticket
}
