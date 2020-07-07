const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

  let logName = await Logs.findOne( { guildID: message.guild.id } )
  const logchannel = bot.channels.get(logName.incidentLog)
  const Failure = bot.emojis.get("697388354689433611");
  const Sucess = bot.emojis.get("697388354668462110");

  var noPermsEmbed = new Discord.RichEmbed()
      .setDescription(`${Failure} Hackban requires you to have \`ADMINISTRATOR\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.RichEmbed()
      .setDescription(`${Failure} Hackban requires me to have \`ADMINISTRATOR\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return message.channel.send(noPermsEmbed);
  }

  if (!logchannel) {

    let noIDErrorhackbanEmbed = new Discord.RichEmbed()
        .setColor("#ff0000")
        .setTitle(`\`Command: ${currPrefix.prefix}hackban\``)
        .addField("**Description:**", "Ban a user via ID, __before they join__.\nOr __after they left__, of course")
        .addField("**Command usage:**", `\`${currPrefix.prefix}hackban <ID>\``, false)
        .addField("**Example:**", `\`${currPrefix.prefix}hackban 12345678987654321\``, false)
        .setFooter("<> = Required | [] = Optional")

  let banid = args.join(' ');
  if (!banid) return message.channel.send(noIDErrorhackbanEmbed)

  let hackbanEmbed = new Discord.RichEmbed()
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

  let DidYouKnow = new Discord.RichEmbed()
  .setDescription("Did you know you could log these actions?\nTry out `-logging`")

  message.delete();
  
      bot.fetchUser(banid).then(id => {
        message.guild.ban(id).catch(err => {

          let unhackbanEmbedFail = new Discord.RichEmbed()
          .setColor("#ff0000")
          .setAuthor(`Failed to unhackban`)
          .setDescription(`${Failure} Failed to unhackban\nError: ${err}`)

          message.channel.send(unhackbanEmbedFail)
        })
        message.channel.send(hackbanEmbed)
        message.channel.send(DidYouKnow).then(message => message.delete(5000))
   }).catch(err => {

    let unhackbanEmbedFail = new Discord.RichEmbed()
      .setColor("#ff0000")
      .setAuthor(`${message.author.tag} | Hackban Error`, message.author.displayAvatarURL)
      .setDescription(`${Failure} This user is either not "hackbanable" or this isn't a user's ID.`)

    message.channel.send(unhackbanEmbedFail)
    
  })

  } else {

let banid = args.join(' ');
    
let noIDErrorhackbanEmbed = new Discord.RichEmbed()
    .setColor("#ff0000")
    .setTitle(`\`Command: ${currPrefix.prefix}hackban\``)
    .addField("**Description:**", "Ban a user via ID, __before they join__.\nOr __after they left__, of course")
    .addField("**Command usage:**", `\`${currPrefix.prefix}hackban <ID>\``, false)
    .addField("**Example:**", `\`${currPrefix.prefix}hackban 12345678987654321\``, false)
    .setFooter("<> = Required | [] = Optional")
    
  if (!banid) return message.channel.send(noIDErrorhackbanEmbed)

  if (banid === "570525775351119872") {
      return message.channel.send("Not gonna harm myself with this command, fella.")
  }
  
  //Check if given ID is a number (isNaN = Is Not a Number | Default = true;)
  if (isNaN(banid)) {
      return message.channel.send("An ID of a user is a string of **18 numbers**. You can hop into Developer Mode, Right-Click a user, and select `Copy ID`, and simply paste it within the `-hackban` command.")
  }
  
  if (banid === message.author.id) {
      return message.channel.send("Imagine trying to hackban yourself.. ")
  }

  const banPermErrorAdminEmbed = new Discord.RichEmbed()
    .setColor("#ff0000")
    .setAuthor(`${message.author.tag} | Hackban Error`, message.author.displayAvatarURL)
    .setDescription(`${Failure} Member is an Administrator for this server.`)

    if (message.guild.members.get(banid) && message.guild.members.get(banid).hasPermission("ADMINISTRATOR")) {

      return message.channel.send(banPermErrorAdminEmbed)

  } else {

message.delete();

  bot.fetchUser(banid).then(async (id) => {
    await message.guild.ban(id).catch(err => {

      let unhackbanEmbedFail = new Discord.RichEmbed()
        .setColor("#ff0000")
        .setAuthor(`${message.author.tag} | Hackban Error`, message.author.displayAvatarURL)
        .setDescription(`${Failure} This user is either not "hackbanable" or it's not a user ID.`)

      message.channel.send(unhackbanEmbedFail)
      
    })

const banList = await message.guild.fetchBans();

const bannedUser = await banList.find(user => user.id === banid);

let hackbanEmbed = new Discord.RichEmbed()
    .setColor("#ff0000")
    .setAuthor(`Successfully hackbanned`, bannedUser.displayAvatarURL)
    .setDescription(`${Sucess} Hackbanned ${bannedUser}`)

let hackbanEmbedLog = new Discord.RichEmbed()
    .setAuthor(`${bannedUser.tag} | Hackban 🚫`, bannedUser.displayAvatarURL)
    .setDescription(`\`${currPrefix.prefix}hackban <ID>\``)
    .setColor("#ff0000")
    .addField("Hackbanned user", `<@${banid}>`, true)
    .addField("Administrator", `<@${message.author.id}>\n${message.author.tag}`, true)
    .setFooter(`ID: ${banid}`)
    .setTimestamp()

    message.channel.send(hackbanEmbed)
    await logchannel.send(hackbanEmbedLog)
    }).catch(err => {

      let unhackbanEmbedFail = new Discord.RichEmbed()
        .setColor("#ff0000")
        .setAuthor(`${message.author.tag} | Hackban Error`, message.author.displayAvatarURL)
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
