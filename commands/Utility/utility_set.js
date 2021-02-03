const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");
const Ticket = require("../../lib/ticketsys");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Dobby_Bot', {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
        if (err) return console.error(err);
});

module.exports.run = async (bot, message, args, client) => {

    let currPrefix = await Servers.findOne( { guildID: message.guild.id } )
    const Failure = bot.emojis.cache.get(require("../../storage/config.json").emojis.Failure); 
    const Success = bot.emojis.cache.get(require("../../storage/config.json").emojis.Success);
  
    var noPermsEmbed = new Discord.MessageEmbed()
        .setDescription(`${Failure} Setting up the logs and ticket system requires you to have \`ADMINISTRATOR\` permissions.`)
        .setColor("#ff0000")
      
    var noPermsEmbedBot = new Discord.MessageEmbed()
        .setDescription(`${Failure} Setting up the logs and ticket system requires me to have \`ADMINISTRATOR\` permissions.`)
        .setColor("#ff0000")
  
    if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(noPermsEmbedBot)
    }
  
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(noPermsEmbed);
    }

    let incidentError = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Set Incident Log`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} Error setting the incident log. Must be a text channel.\nCommand usage: \`${currPrefix.prefix}set incidentlog <Channel ID>\``)
        .setColor("#ff4f4f")

    let serverError = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Set Server Log`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} Error setting the server log. Must be a text channel.\nCommand usage: \`${currPrefix.prefix}set serverlog <Channel ID>\``)
        .setColor("#ff4f4f")

    let raidError = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Set Raid Log`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} Error setting the raid log. Must be a text channel.\nCommand usage: \`${currPrefix.prefix}set raidlog <Channel ID>\``)
        .setColor("#ff4f4f")

    let welcomeError = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Set Welcome Log`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} Error setting the welcome log. Must be a text channel.\nCommand usage: \`${currPrefix.prefix}set welcomelog <Channel ID>\``)
        .setColor("#ff4f4f")

    let ticketsysError = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Set Ticket System`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} Error setting the ticket system. Must be a category.\nCommand usage: \`${currPrefix.prefix}set ticketsys <Category ID>\``)
        .setColor("#ff4f4f")

    let a = await Logs.findOne( { guildID: message.guild.id } )
    if (!a) {

        const newLogs = new Logs({

            _id: mongoose.Types.ObjectId(),
            guildID: message.guild.id,
            incidentLog: "`Not set`",
            serverLog: "`Not set`",
            raidLog: "`Not set`"
      
        });

        await newLogs.save();
    }

    let b = await Ticket.findOne( { guildID: message.guild.id } )
    if (!b) {

        const newTicketSys = new Ticket({

            _id: mongoose.Types.ObjectId(),
            guildID: message.guild.id,
            ticketID: 0,
            categoryID: "`Not set`"
      
        });

        await newTicketSys.save();
    }

    const action = args[0];

  switch (action) {
        case 'modlog': 
        case 'incidentlog': 
            var newLog = (args[1]);
            var Channel = message.guild.channels.cache.get(newLog)
            if (!Channel || isNaN(newLog) || Channel.type !== 'text') return message.channel.send(incidentError)

            await Logs.findOneAndUpdate({ guildID: message.guild.id }, { $set: { incidentLog: newLog } }, { new: true})

            let incidentSuccess = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag} | Setup Incident Logging`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`${Success} <@${message.author.id}> Successfully set the **<#${newLog}>** channel as the incident log.`)
                .setColor("#7aff7a")

            return message.channel.send(incidentSuccess)

    break;
        case 'actionlog':
        case 'serverlog': 
            var newLog = (args[1]);
            var Channel = message.guild.channels.cache.get(newLog)
            if (!Channel || isNaN(newLog) || Channel.type !== 'text') return message.channel.send(serverError)

            await Logs.findOneAndUpdate({ guildID: message.guild.id }, { $set: { serverLog: newLog } }, { new: true})

            let serverSuccess = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag} | Setup Server Logging`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`${Success} <@${message.author.id}> Successfully set the **<#${newLog}>** channel as the server log.`)
                .setColor("#7aff7a")

            return message.channel.send(serverSuccess)

    break;
        case 'massbanlog':
        case 'raidlog': 
            var newLog = (args[1]);
            var Channel = message.guild.channels.cache.get(newLog)
            if (!Channel || isNaN(newLog) || Channel.type !== 'text') return message.channel.send(raidError)

            await Logs.findOneAndUpdate({ guildID: message.guild.id }, { $set: { raidLog: newLog } }, { new: true})

            let raidSuccess = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag} | Setup Raid Logging`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`${Success} <@${message.author.id}> Successfully set the **<#${newLog}>** channel as the raid log.`)
                .setColor("#7aff7a")

            return message.channel.send(raidSuccess)
    break;
        case 'wlclog':
        case 'welcomelog': 
            var newLog = (args[1]);
            var Channel = message.guild.channels.cache.get(newLog)
            if (!Channel || isNaN(newLog) || Channel.type !== 'text') return message.channel.send(welcomeError)

            await Logs.findOneAndUpdate({ guildID: message.guild.id }, { $set: { welcomeLog: newLog } }, { new: true})

            let welcomeSuccess = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag} | Setup Welcome Logging`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`${Success} <@${message.author.id}> Successfully set the **<#${newLog}>** channel as the welcome log.`)
                .setColor("#7aff7a")

            return message.channel.send(welcomeSuccess)
    break;
        case 'ticketsystem': 
        case 'ticketsys':

        let x = await Ticket.findOne( { guildID: message.guild.id } )
        if (!x) return;

        let categoryid = args[1];
        let Category = message.guild.channels.cache.get(categoryid)
        if (!Category || Category.type !== 'category') return message.channel.send(ticketsysError)

        let ticketsysSuccess = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} | Setup Ticket System`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${Success} <@${message.author.id}> Successfully set the **<#${categoryid}>** category as the ticket system root.`)
            .setColor("#7aff7a")

        await Ticket.findOneAndUpdate( { guildID: message.guild.id }, { $set: { categoryID: categoryid } } )
        return message.channel.send(ticketsysSuccess)

    break;
        default:

        let guildSettingsLogs = await Logs.findOne( { guildID: message.guild.id } )
        let guildSettingsTicket = await Ticket.findOne( { guildID: message.guild.id } )

        let actionEmbed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} | Set / Setup`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`**Available Commands:**
            \`${currPrefix.prefix}set incidentlog | modlog\` - Set the incident/mod log for the server
            \`${currPrefix.prefix}set serverlog | actionlog\` - Set the server/action log for the server
            \`${currPrefix.prefix}set raidlog | massbanlog\` - Set the raid log for the server
            \`${currPrefix.prefix}set welcomelog | wlclog\` - Set the welcome channel for the server
            \`${currPrefix.prefix}set ticketsys | ticketsystem\` - Setup the ticket systems category`)

        let action2Embed = new Discord.MessageEmbed()
            .setDescription(`**Current configuration:**\n\nIncident log: <#${guildSettingsLogs.incidentLog}>\nServer log: <#${guildSettingsLogs.serverLog}>\nRaid log: <#${guildSettingsLogs.raidLog}>\nWelcome log: <#${guildSettingsLogs.welcomeLog}>\nTicket Root: <#${guildSettingsTicket.categoryID}>`)

        await message.channel.send(actionEmbed).then(message.channel.send(action2Embed))
  }

}

module.exports.help = {
  name: "set",
  aliases: ["setup"]
}
