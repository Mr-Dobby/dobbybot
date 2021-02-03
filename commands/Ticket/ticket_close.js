const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

  const Failure = bot.emojis.cache.get(require("../../storage/config.json").emojis.Failure); 
  const Success = bot.emojis.cache.get(require("../../storage/config.json").emojis.Success);

    const ticketNumber = args[0];
    const ticketChannel = message.guild.channels.cache.find(c => c.name == `ticket-${ticketNumber}`);
    const logName = await Logs.findOne( { guildID: message.guild.id } );
    if (!logName) { return; }
    const logchannel = bot.channels.cache.get(logName.serverLog);

    let noLogs = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | No Log Channel`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} Reqiures a \`Server log\` channel. Set one with: \`${currPrefix.prefix}set\``)
        .setColor("#ff4f4f")

    if (!logchannel) return message.channel.send(noLogs)

    let TicketEmbedLog = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Ticket Closed 🔒`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`\`${currPrefix.prefix}close <Ticket ID>\``)
        .setColor("#ffc500")
        .addField("Closed by Moderator", `<@${message.author.id}>`, true)
        .setFooter(`Ticket ID: ${ticketNumber}`)
        .setTimestamp()

    let TicketClosedEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Close Ticket`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Success} <@${message.author.id}> you successfully closed \`ticket #${ticketNumber}\`!`)
        .setColor("#ffc500")

    let CloseTicketErrorEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Close Ticket`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} Command usage: \`${currPrefix.prefix}close <Ticket ID>\``)
        .setColor("#ffc500")

    let OnlyStaff = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Close Ticket`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} <@${message.author.id}> only staff can close tickets`)
        .setColor("#ffc500")

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(OnlyStaff)
    if (ticketChannel) {
        try {
            await message.member.send(TicketClosedEmbed);
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
