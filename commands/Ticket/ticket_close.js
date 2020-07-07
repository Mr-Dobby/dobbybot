const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

    const Failure = bot.emojis.get("697388354689433611");
    const Sucess = bot.emojis.get("697388354668462110");

    const ticketNumber = args[0];
    const ticketChannel = message.guild.channels.find(c => c.name == `ticket-${ticketNumber}`);
    const logName = await Logs.findOne( { guildID: message.guild.id } );
    const logchannel = bot.channels.get(logName.serverLog);

    let noLogs = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | No Log Channel`, message.author.displayAvatarURL)
        .setDescription(`${Failure} Reqiures a \`Server log\` or \`Action log\` channel. Set one with \`${currPrefix.prefix}set\``)
        .setColor("#ff4f4f")

    if (!logchannel) return message.channel.send(noLogs)

    let TicketEmbedLog = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Ticket Closed 🔒`, message.author.displayAvatarURL)
        .setDescription(`\`${currPrefix.prefix}close <Ticket ID>\``)
        .setColor("#ffc500")
        .addField("Closed by Moderator", `${message.author.tag}\n<@${message.author.id}>`, true)
        .setFooter(`Ticket ID: ${ticketNumber}`)
        .setTimestamp()

    let TicketClosedEmbed = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Close Ticket`, message.author.displayAvatarURL)
        .setDescription(`${Sucess} <@${message.author.id}> you successfully closed \`ticket #${ticketNumber}\`!`)
        .setColor("#ffc500")

    let CloseTicketErrorEmbed = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Close Ticket`, message.author.displayAvatarURL)
        .setDescription(`${Failure} Command usage: \`${currPrefix.prefix}close <Ticket ID>\``)
        .setColor("#ffc500")

    let OnlyStaff = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Close Ticket`, message.author.displayAvatarURL)
        .setDescription(`${Failure} <@${message.author.id}> only staff can close tickets`)
        .setColor("#ffc500")

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(OnlyStaff)
    if (ticketChannel) {
        try {
            await message.author.send(TicketClosedEmbed);
            await ticketChannel.delete();
            await logchannel.send(TicketEmbedLog)
                } catch(e) {
            console.log(`Error executing: -close | ${e}`)
            }
        } else {
    message.channel.send(CloseTicketErrorEmbed)
    }

}

module.exports.help = {
  name: "close",
  aliases: ["clticket"]
}
