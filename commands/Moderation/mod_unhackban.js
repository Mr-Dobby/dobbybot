const Discord = require ('discord.js');
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

  let logName = await Logs.findOne( { guildID: message.guild.id } )
  const logchannel = bot.channels.get(logName.incidentLog)

  const Failure = bot.emojis.get("697388354689433611");
  const Sucess = bot.emojis.get("697388354668462110");

  var noPermsEmbed = new Discord.RichEmbed()
      .setDescription(`${Failure} Unhackbanning members requires you to have \`BAN MEMBERS\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.RichEmbed()
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

      let noIDErrorunhackbanEmbed = new Discord.RichEmbed()
      .setColor("#ff4f4f")
      .setTitle(`\`Command: ${currPrefix.prefix}unhackban\` | Alias: \`unban\``)
      .addField("**Description:**", "Unban a user via ID", false)
      .addField("**Command usage:**", `${currPrefix.prefix}unhackban <ID>`, false)
      .addField("**Example:**", `${currPrefix.prefix}unhackban 00000000000000001`, false)
      .setFooter("<> = Required, [] = Optional")

      if (!banid) return message.channel.send(noIDErrorunhackbanEmbed)
      if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(unhackbanPermErrorEmbed);

      if (isNaN(banid)) {
        return message.channel.send("An ID of a user is a string of **18 numbers**. You can hop into Developer Mode, Right-Click a user, and select `Copy ID`, and simply paste it within the `-unhackban` command.")
      }
    
      let unhackbanEmbed = new Discord.RichEmbed()
      .setColor("#7aff7a")
      .setAuthor(`Successfully unhackbanned`)
      .setDescription(`${Sucess} Unhackbanned \`${banid}\``)

    bot.fetchUser(banid).then(id => {
        message.guild.unban(id).catch(err => {

          let unhackbanEmbedFail = new Discord.RichEmbed()
          .setColor("#ff0000")
          .setAuthor(`Failed to unhackban`)
          .setDescription(`${Failure} Failed to unhackban\nError: ${err}`)

          message.channel.send(unhackbanEmbedFail)
        })
      message.channel.send(unhackbanEmbed)
    })

  } else {

    let noIDErrorunhackbanEmbed = new Discord.RichEmbed()
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
    
  bot.fetchUser(banid).then(async (id) => {

    const banList = await message.guild.fetchBans();

    const bannedUser = banList.find(user => user.id === banid);

      message.guild.unban(id).catch(err => {

        let unhackbanEmbedFail = new Discord.RichEmbed()
        .setColor("#ff0000")
        .setAuthor(`${message.author.tag} | Unhackban Error`, message.author.displayAvatarURL)
        .setDescription(`${Failure} This user is not even banned.`)

        return message.channel.send(unhackbanEmbedFail)

      })

      let unhackbanEmbed = new Discord.RichEmbed()
      .setColor("#7aff7a")
      .setAuthor(`Successfully unhackbanned`, bannedUser.displayAvatarURL)
      .setDescription(`${Sucess} Unhackbanned ${bannedUser}`)
  
      let unhackBanEmbedLog = new Discord.RichEmbed()
      .setAuthor(`${bannedUser.tag} | Unhackban ✔️`, bannedUser.displayAvatarURL)
      .setDescription(`\`${currPrefix.prefix}unhackban <ID>\``)
      .setColor("#7aff7a")
      .addField("Unhackbanned user", `<@${banid}>`, true)
      .addField("Administrator", `<@${message.author.id}>\n${message.author.tag}`, true)
      .setFooter(`ID: ${banid}`)
      .setTimestamp()

    message.channel.send(unhackbanEmbed)
    logchannel.send(unhackBanEmbedLog)
    })
  }
}

module.exports.help = {
  name: "unhackban",
  aliases: ["unban"]
}
