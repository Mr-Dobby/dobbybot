const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

  let logName = await Logs.findOne( { guildID: message.guild.id } )
  const logchannel = bot.channels.cache.get(logName.incidentLog)
  const Failure = bot.emojis.cache.get("697388354689433611");
  const Sucess = bot.emojis.cache.get("697388354668462110");

  var noPermsEmbed = new Discord.MessageEmbed()
      .setDescription(`${Failure} Hackban requires you to have \`ADMINISTRATOR\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.MessageEmbed()
      .setDescription(`${Failure} Hackban requires me to have \`BAN MEMBERS\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return message.channel.send(noPermsEmbed);
  }

  if (!logchannel) {

    let noIDErrorhackbanEmbed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle(`\`Command: ${currPrefix.prefix}hackban\``)
        .addField("**Description:**", "Ban a user, __before they join__. That, or __after they left__")
        .addField("**Command usage:**", `${currPrefix.prefix}hackban <ID>`, false)
        .addField("**Example:**", `${currPrefix.prefix}hackban 12345678987654321`, false) 
        .setFooter("<> = Required, [] = Optional")

  let banid = args.join(' ');
  if (!banid) return message.channel.send(noIDErrorhackbanEmbed)

  let hackbanEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setAuthor(`Successfully hackbanned`)
      .setDescription(`${Sucess} Hackbanned \`${banid}\``)

  if (banid === "570525775351119872") {
    return message.channel.send("Not gonna harm myself with this command, fella.")
  }

  let inGuild = message.guild;
  if (inGuild.member(banid)) return message.channel.send("The user with this ID is already in this server. Please use `ban <@User> [Reason]` instead.")

  //Check if given ID is a number (isNaN = Is Not a Number | Default = true;)
  if (isNaN(banid)) {
    return message.channel.send("An ID of a user is a string of **18 numbers**. You can hop into Developer Mode, Right-Click a user, and select `Copy ID`, and simply paste it within the `-hackban` command.")
  }

  if (banid === message.author.id) {
    return message.channel.send("Imagine trying to hackban yourself.. ")
  }

  let DidYouKnow = new Discord.MessageEmbed()
      .setDescription(`Did you know you can log these actions?\nTry out \`${currPrefix.prefix}logging\``)
  
      await bot.users.fetch(banid).then(async () => {
        await message.guild.members.ban(banid).catch(err => {

          let unhackbanEmbedFail = new Discord.MessageEmbed()
              .setColor("#ff0000")
              .setAuthor(`Failed to unhackban`)
              .setDescription(`${Failure} Failed to unhackban\nError: ${err}`)

          message.channel.send(unhackbanEmbedFail)
        })

        message.delete();
        message.channel.send(hackbanEmbed)
        message.channel.send(DidYouKnow).then(message => message.delete({ timeout: 10000 }))

   }).catch(err => {

    let unhackbanEmbedFail = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setAuthor(`${message.author.tag} | Hackban Error`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} This user is either not "hackbanable" or this isn't a user's ID.`)

    message.channel.send(unhackbanEmbedFail)
    
  })

  } else {

    let noIDErrorhackbanEmbed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle(`\`Command: ${currPrefix.prefix}hackban\``)
        .addField("**Description:**", "Ban a user, __before they join__. That, or __after they left__")
        .addField("**Command usage:**", `${currPrefix.prefix}hackban <ID>`, false)
        .addField("**Example:**", `${currPrefix.prefix}hackban 12345678987654321`, false)
        .setFooter("<> = Required, [] = Optional")

  let banid = args.join(' ')    
  if (!banid) return message.channel.send(noIDErrorhackbanEmbed)

  if (banid === "570525775351119872") {
      return message.channel.send("Not gonna harm myself with this command, fella.")
  }
  
  //Check if given ID is a number (isNaN = Is Not a Number | Default = true;)
  if (isNaN(banid)) {
      return message.channel.send("An ID of a user is a string of **X numbers**. You can hop into Developer Mode, Right-Click a user, and select `Copy ID`, and simply paste it within the `-hackban` command.")
  }
  
  if (banid === message.author.id) {
      return message.channel.send("Imagine trying to hackban yourself.. ")
  }

  const banPermErrorAdminEmbed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setAuthor(`${message.author.tag} | Hackban Error`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} Member is an Administrator for this server.`)

    if (message.guild.members.cache.get(banid) && message.guild.members.cache.get(banid).hasPermission("ADMINISTRATOR")) {

      return message.channel.send(banPermErrorAdminEmbed)

  } else {

  await bot.users.fetch(banid).then(async () => {
    await message.guild.members.ban(banid).catch(err => {

      let unhackbanEmbedFail = new Discord.MessageEmbed()
          .setColor("#ff0000")
          .setAuthor(`${message.author.tag} | Hackban Error`, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`${Failure} Failed to hackban user.`)

      message.channel.send(unhackbanEmbedFail)
      
    })

const bannedUser = await message.guild.fetchBan(banid);

let hackbanEmbed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setAuthor(`Successfully hackbanned`, bannedUser.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`${Sucess} Hackbanned <@${bannedUser.user.id}>`)

let hackbanEmbedLog = new Discord.MessageEmbed()
    .setAuthor(`${bannedUser.user.tag} | Hackban`, bannedUser.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`\`${currPrefix.prefix}hackban <ID>\``)
    .setColor("#ff0000")
    .addField("Hackbanned user", `<@${banid}>`, true)
    .addField("Administrator", `<@${message.author.id}>`, true)
    .setFooter(`ID: ${banid}`)
    .setTimestamp()

    await message.delete();
    await message.channel.send(hackbanEmbed)
    await logchannel.send(hackbanEmbedLog)
    }).catch(err => {

      let unhackbanEmbedFail = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setAuthor(`${message.author.tag} | Hackban Error`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} This user is either not "hackbanable" or it's not a user ID.`)

      message.channel.send(unhackbanEmbedFail)

    })
  }
}

}

module.exports.help = {
  name: "hackban",
  aliases: []
}
