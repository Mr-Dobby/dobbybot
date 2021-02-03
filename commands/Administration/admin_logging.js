const Discord = require("discord.js");
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
  const Failure = bot.emojis.cache.get(require("../../storage/config.json").emojis.Failure); 
  const Success = bot.emojis.cache.get(require("../../storage/config.json").emojis.Success);

  var noPermsEmbed = new Discord.MessageEmbed()
      .setDescription(`${Failure} Creating new logs requires you to have \`ADMINISTRATOR\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.MessageEmbed()
      .setDescription(`${Failure} Creating new logs requires me to have \`MANAGE CHANNELS\` and \`MANAGE ROLES\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission("MANAGE_CHANNELS" && "MANAGE_ROLES")) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission("MANAGE_CHANNELS" && "MANAGE_ROLES")) {
    return message.channel.send(noPermsEmbed);
  }

let fire = bot.emojis.cache.get("687436596391182344");
let CurrentChannel = message.channel;

let AreYouSureBoutDat = new Discord.MessageEmbed()
.setAuthor(`${message.author.tag} | You are about to create logs for this server.`, `${message.author.displayAvatarURL({ dynamic: true })}`)
.setColor("#ff4f4f")
.setDescription("**You have __20 seconds__ to respond. This will create 3 new channels.**\nTo accept the creation of logs, type `Y`.\nTo decline the creation of logs, type `N`.")
.setFooter(`If you already have log channels set up, you can set logs to those channels with ${currPrefix.prefix}set`)

let LogsCreatedIncident = new Discord.MessageEmbed()
.setAuthor(`${message.author.tag} | #incident-logs successfully created`, `${message.author.displayAvatarURL({ dynamic: true })}`)
.setColor("#4fff7f")
.setDescription(`${Success} This is the incident logging channel. All moderative command usages, used via me, will be logged to this channel. ${fire}\n
You can set a new channel to be logging with \`${currPrefix.prefix}set\``)
.setFooter(`This channel has been saved in the database, you can now change the channels name.`)
     
let LogsCreatedServer = new Discord.MessageEmbed()
.setAuthor(`${message.author.tag} | #server-logs successfully created`, `${message.author.displayAvatarURL({ dynamic: true })}`)
.setColor("#4fff7f")
.setDescription(`${Success} This is the server logging channel. All server changes, member updates, roles update etc., will be logged to this channel. ${fire}\n
You can set a new channel to be logging with \`${currPrefix.prefix}set\``)
.setFooter(`This channel has been saved in the database, you can now change the channels name.`)

let LogsCreatedRaid = new Discord.MessageEmbed()
.setAuthor(`${message.author.tag} | #raid-logs successfully created`, `${message.author.displayAvatarURL({ dynamic: true })}`)
.setColor("#4fff7f")
.setDescription(`${Success} This is the raid logging channel. All members banned upon joining when the raid function is enabled, will be logged to this channel. ${fire}\n
You can set a new channel to be logging with \`${currPrefix.prefix}set\``)
.setFooter(`This channel has been saved in the database, you can now change the channels name.`)

const DeclinedLogsEmbed = new Discord.MessageEmbed()
.setColor("#ff4f4f")
.setAuthor(`${message.author.tag} | Logs were not created`, `${message.author.displayAvatarURL({ dynamic: true })}`)
.setDescription(`<@${message.author.id}> declined the creation of logs. ${fire}`)

const AcceptedLogsEmbed = new Discord.MessageEmbed()
.setColor("#7aff7a")
.setAuthor(`${message.author.tag} | Logs were created`, `${message.author.displayAvatarURL({ dynamic: true })}`)
.setDescription(`<@${message.author.id}> accepted the creation of logs. ${fire}`)

await message.channel.send(AreYouSureBoutDat)
await message.channel.awaitMessages(m => m.author.id === message.author.id, {
    errors : ['time'],
    max : 1,
    time : 20000 //in ms
  }).then(async (resp) => {

    if (!resp) return;

    resp = resp.array()[0];

    let validAnswers = ['y','n'];

      if (validAnswers.includes(resp.content)) {

        if (resp.content === 'n') {

          return message.channel.send(DeclinedLogsEmbed)

          } else if (resp.content === 'y') {
        
          const IC = await message.guild.channels.create('incident-logs', {
              type: 'text',
              permissionOverwrites: [
                {
                  id: message.guild.roles.everyone,
                  denied: ['MANAGE_MESSAGES', 'SEND_MESSAGES', 'READ_MESSAGES']
              },
            ],
          })

        const SC = await message.guild.channels.create('server-logs', {
            type: 'text',
            permissionOverwrites: [
              {
                id: message.guild.roles.everyone,
                denied: ['MANAGE_MESSAGES', 'SEND_MESSAGES', 'READ_MESSAGES']
            },
          ],
        })

        const RC = await message.guild.channels.create('raid-logs', {
          type: 'text',
          permissionOverwrites: [
            {
              id: message.guild.roles.everyone,
              denied: ['MANAGE_MESSAGES', 'SEND_MESSAGES', 'READ_MESSAGES']
          },
        ],
      })

        let CreatedIncident = message.guild.channels.cache.get(IC.id);
        let CreatedServer = message.guild.channels.cache.get(SC.id);
        let CreatedRaid = message.guild.channels.cache.get(RC.id);

          await CreatedIncident.send(LogsCreatedIncident).catch();
          await CreatedServer.send(LogsCreatedServer).catch();
          await CreatedRaid.send(LogsCreatedRaid).catch();
          await CurrentChannel.send(AcceptedLogsEmbed).catch();

          if (logName) {

              await Logs.findOneAndUpdate( { guildID: message.guild.id}, { $set: { incidentLog: CreatedIncident } } );
              await Logs.findOneAndUpdate( { guildID: message.guild.id}, { $set: { serverLog: CreatedServer } } );
              await Logs.findOneAndUpdate( { guildID: message.guild.id}, { $set: { raidLog: CreatedRaid } } );

            } else {

            const newLogs = new Logs({

              _id: mongoose.Types.ObjectId(),
              guildID: message.guild.id,
              incidentLog: CreatedIncident,
              serverLog: CreatedServer,
              raidLog: CreatedRaid
        
          });
  
            await newLogs.save();

      }
    }
  }
}, 20000).catch((error) => {
      message.channel.send(`Error: ${error}`)
      if (err) {
    console.log(`Error occurred in ${message.guild.name} (ID: ${message.guild.id}), ${error} | Command executed, -logging `)
    }
  })

}

module.exports.help = {
  name: "logging",
  aliases: ["logs"]
}
