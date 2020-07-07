const Discord = require("discord.js");
const commando = require('discord.js-commando');
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Dobby_Bot', {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
        if (err) return console.error(err);
});

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } );
  let logName = await Logs.findOne( { guildID: message.guild.id } );
  const Failure = bot.emojis.get("697388354689433611");
  const Sucess = bot.emojis.get("697388354668462110");

  var noPermsEmbed = new Discord.RichEmbed()
      .setDescription(`${Failure} Creating new logs requires you to have \`ADMINISTRATOR\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.RichEmbed()
      .setDescription(`${Failure} Creating new logs requires me to have \`ADMINISTRATOR\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return message.channel.send(noPermsEmbed);
  }

let fire = bot.emojis.get("687436596391182344")
const logsExistIncident = bot.channels.get(logName.incidentLog)
const logsExistServerlogs = bot.channels.get(logName.serverLog)
const logsExistRaidlogs = bot.channels.get(logName.raidLog)
let CurrentChannel = message.channel;

if (logsExistIncident || logsExistServerlogs || logsExistRaidlogs) {
  return message.channel.send("This log already exist." + `\n${logsExistIncident} - Please delete it, or change to a new with \`${currPrefix.prefix}set\`.`);
}

if (logsExistServerlogs) {
  return message.channel.send("This log already exist." + `\n${logsExistServerlogs} - Please delete it, or change to a new with \`${currPrefix.prefix}set\`.`);
}

if (logsExistRaidlogs) {
  return message.channel.send("This log already exist." + `\n${logsExistRaidlogs} - Please delete it, or change to a new with \`${currPrefix.prefix}set\`.`);
}

let AreYouSureBoutDat = new Discord.RichEmbed()
.setAuthor(`${message.author.tag} | You are about to create logs for this server.`, `${message.author.displayAvatarURL}`)
.setColor("#ff4f4f")
.setDescription("**You have 60 seconds to respond**\nTo accept the creation of logs, type `Y`.\nTo decline the creation of logs, type `N`.")
.setFooter(`If you already have logs set up, you can set logs to those channels with -set`)
.setTimestamp()

let LogsCreatedIncident = new Discord.RichEmbed()
.setAuthor(`${message.author.tag} | #incident-logs successfully created`, `${message.author.displayAvatarURL}`)
.setColor("#4fff7f")
.setDescription(`${Sucess} This is the incident logging channel. All moderative command usages, used via me, will be logged to this channel. ${fire}\n
You can set a new channel to be logging with \`${currPrefix.prefix}set\``)
.setFooter(`This channel has been saved in the database, you can now change the channels name.`)
     
let LogsCreatedServer = new Discord.RichEmbed()
.setAuthor(`${message.author.tag} | #server-logs successfully created`, `${message.author.displayAvatarURL}`)
.setColor("#4fff7f")
.setDescription(`${Sucess} This is the server logging channel. All server changes, member updates, roles update etc., will be logged to this channel. ${fire}\n
You can set a new channel to be logging with \`${currPrefix.prefix}set\``)
.setFooter(`This channel has been saved in the database, you can now change the channels name.`)

let LogsCreatedRaid = new Discord.RichEmbed()
.setAuthor(`${message.author.tag} | #raid-logs successfully created`, `${message.author.displayAvatarURL}`)
.setColor("#4fff7f")
.setDescription(`${Sucess} This is the raid logging channel. All members banned upon joining when the raid function is enabled, will be logged to this channel. ${fire}\n
You can set a new channel to be logging with \`${currPrefix.prefix}set\``)
.setFooter(`This channel has been saved in the database, you can now change the channels name.`)

const DeclinedLogsEmbed = new Discord.RichEmbed()
.setColor("#ff4f4f")
.setAuthor(`${message.author.tag} | Logs were not created`, `${message.author.displayAvatarURL}`)
.setDescription(`<@${message.author.id}> declined the creation of logs. ${fire}`)

const AcceptedLogsEmbed = new Discord.RichEmbed()
.setColor("#7aff7a")
.setAuthor(`${message.author.tag} | Logs were created`, `${message.author.displayAvatarURL}`)
.setDescription(`<@${message.author.id}> accepted the creation of logs. ${fire}`)

await message.channel.send(AreYouSureBoutDat)
await message.channel.awaitMessages(m => m.author.id === message.author.id, {
    errors : ['time'],
    max : 1,
    time : 60000 //in ms
  }).then(async (resp) => {

    if (!resp) return;

    resp = resp.array()[0];

    let validAnswers = ['y','n'];

      if (validAnswers.includes(resp.content)) {

        if (resp.content === 'n') {

          return message.channel.send(DeclinedLogsEmbed)

          } else if (resp.content === 'y') {

            var server = message.guild;
        
            await server.createChannel('incident-logs', {
              type: 'text',
              permissionOverwrites: [{
                id: message.guild.defaultRole.id,
                denied: ['MANAGE_MESSAGES', 'SEND_MESSAGES', 'READ_MESSAGES']
              }]
            })

            await server.createChannel('server-logs', {
              type: 'text',
              permissionOverwrites: [{
                id: message.guild.defaultRole.id,
                denied: ['MANAGE_MESSAGES', 'SEND_MESSAGES', 'READ_MESSAGES']
              }]
            })

            await server.createChannel('raid-logs', {
              type: 'text',
              permissionOverwrites: [{
                id: message.guild.defaultRole.id,
                denied: ['MANAGE_MESSAGES', 'SEND_MESSAGES', 'READ_MESSAGES']
              }]
            }).then(async function (message) {
                    
            let CreatedIncident = message.guild.channels.find(channel => channel.name === "incident-logs");
            let CreatedServer = message.guild.channels.find(channel => channel.name === "server-logs");
            let CreatedRaid = message.guild.channels.find(channel => channel.name === "raid-logs");

            await CreatedIncident.send(LogsCreatedIncident).catch();
            await CreatedServer.send(LogsCreatedServer).catch();
            await CreatedRaid.send(LogsCreatedRaid).catch();
            await CurrentChannel.send(AcceptedLogsEmbed).catch();

            const newLogs = new Logs({

              _id: mongoose.Types.ObjectId(),
              guildID: message.guild.id,
              incidentLog: CreatedIncident.id,
              serverLog: CreatedServer.id,
              raidLog: CreatedRaid.id
        
          });
  
          await newLogs.save();

        })
     }
  }
}, 60000).catch((error) => {
      message.channel.send(`Error: ${error}`)
    console.log(`Error occurred in ${message.guild.name} (ID: ${message.guild.id}), ${error} | Command executed, -logging `)
  })

}

module.exports.help = {
  name: "logging",
  aliases: ["logs"]
}
