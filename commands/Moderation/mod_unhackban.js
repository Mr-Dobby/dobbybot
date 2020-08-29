const Discord = require ('discord.js');
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

  let logName = await Logs.findOne( { guildID: message.guild.id } )
  const logchannel = bot.channels.cache.get(logName.incidentLog)

  const Failure = bot.emojis.cache.get("697388354689433611");
  const Sucess = bot.emojis.cache.get("697388354668462110");

  var noPermsEmbed = new Discord.MessageEmbed()
      .setDescription(`${Failure} Unhackbanning members requires you to have \`BAN MEMBERS\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.MessageEmbed()
      .setDescription(`${Failure} Unhackbanning members requires me to have \`BAN MEMBERS\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission("BAN_MEMBERS")) {
    return message.channel.send(noPermsEmbed);
  }
  
  let banid = args.join(' ');

  if (!logchannel) {

      let noIDErrorunhackbanEmbed = new Discord.MessageEmbed()
      .setColor("#ff4f4f")
      .setTitle(`\`Command: ${currPrefix.prefix}unhackban\` | Alias: \`unban\``)
      .addField("**Description:**", "Unban a user via ID", false)
      .addField("**Command usage:**", `${currPrefix.prefix}unhackban <ID>`, false)
      .addField("**Example:**", `${currPrefix.prefix}unhackban 00000000000000001`, false)
      .setFooter("<> = Required, [] = Optional")

      if (!banid) return message.channel.send(noIDErrorunhackbanEmbed)

      if (isNaN(banid)) {
        return message.channel.send("An ID of a user is a string of **18 numbers**. You can hop into Developer Mode, Right-Click a user, and select `Copy ID`, and simply paste it within the `-unhackban` command.")
      }
    
      let unhackbanEmbed = new Discord.MessageEmbed()
      .setColor("#7aff7a")
      .setAuthor(`Successfully unhackbanned`)
      .setDescription(`${Sucess} Unhackbanned \`${banid}\``)

      await bot.users.fetch(banid).then(async () => {
        await message.guild.members.unban(banid).catch(err => {

          let unhackbanEmbedFail = new Discord.MessageEmbed()
          .setColor("#ff0000")
          .setAuthor(`Failed to unhackban`)
          .setDescription(`${Failure} Failed to unhackban\nError: ${err}`)

          message.channel.send(unhackbanEmbedFail)
        })
      message.channel.send(unhackbanEmbed)
    })

  } else {

    let noIDErrorunhackbanEmbed = new Discord.MessageEmbed()
    .setColor("#ff4f4f")
    .setTitle(`\`Command: ${currPrefix.prefix}unhackban\` | Alias: \`unban\``)
    .addField("**Description:**", "Unban a user via ID", false)
    .addField("**Command usage:**", `${currPrefix.prefix}unhackban <ID>`, false)
    .addField("**Example:**", `${currPrefix.prefix}unhackban 00000000000000001`, false)
    .setFooter("<> = Required, [] = Optional")

    if (!banid) return message.channel.send(noIDErrorunhackbanEmbed)

    if (isNaN(banid)) {
      return message.channel.send("An ID of a user is a string of **18 numbers**. You can hop into Developer Mode, Right-Click a user, and select `Copy ID`, and simply paste it within the `-unhackban` command.")
    }

    const bannedUser = await message.guild.fetchBan(banid);
    if (!bannedUser) return;

    await bot.users.fetch(banid).then(async () => {
      await message.guild.members.unban(banid).catch(err => {

        let unhackbanEmbedFail = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setAuthor(`${message.author.tag} | Unhackban Error`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} Failed to unhackban user.`)

        return message.channel.send(unhackbanEmbedFail)

      })

      let unhackbanEmbed = new Discord.MessageEmbed()
      .setColor("#7aff7a")
      .setAuthor(`Successfully unhackbanned`, bannedUser.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Sucess} Unhackbanned <@${bannedUser.user.id}>`)
  
      let unhackBanEmbedLog = new Discord.MessageEmbed()
      .setAuthor(`${bannedUser.user.tag} | Unhackban`, bannedUser.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`\`${currPrefix.prefix}unhackban <ID>\``)
      .setColor("#7aff7a")
      .addField("Unhackbanned user", `<@${banid}>`, true)
      .addField("Moderator", `<@${message.author.id}>`, true)
      .setFooter(`ID: ${banid}`)
      .setTimestamp()

    message.channel.send(unhackbanEmbed)
    logchannel.send(unhackBanEmbedLog)

    }).catch(err => {

      let unhackbanEmbedFail = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setAuthor(`${message.author.tag} | Unhackban Error`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Failure} This user is not even banned.`)

      return message.channel.send(unhackbanEmbedFail)

    })
  }
}

module.exports.help = {
  name: "unhackban",
  aliases: ["unban"]
}
