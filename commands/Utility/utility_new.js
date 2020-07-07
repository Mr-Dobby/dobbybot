const Discord = require("discord.js");
const Ticket = require('../../lib/ticketsys');
const Servers = require("../../lib/mongodb");
const Profile = require("../../lib/profile");
const Logs = require("../../lib/logs");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Dobby_Bot', {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
        if (err) return console.error(err);
});

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )
  const Failure = bot.emojis.get("697388354689433611");
  const Sucess = bot.emojis.get("697388354668462110");
  const logName = await Logs.findOne( { guildID: message.guild.id } );
  const logchannel = bot.channels.get(logName.serverLog);

  let noLogs = new Discord.RichEmbed()
      .setAuthor(`${message.author.tag} | No Log Channel`, message.author.displayAvatarURL)
      .setDescription(`${Failure} Reqiures a \`Server log\` or \`Action log\` channel. Set one with \`${currPrefix.prefix}set\``)
      .setColor("#ff4f4f")

  let actionEmbed = new Discord.RichEmbed()
      .setAuthor(`${message.author.tag} | New {Arguement}`, message.author.displayAvatarURL)
      .setDescription(`**Available Commands:**\n
      \`${currPrefix.prefix}new ticket\` - Start a new ticket
      \`${currPrefix.prefix}new profile\` - Create a profile on the bot
      \`${currPrefix.prefix}new bug\` - Report a bug you find
      \nMore to be added soon!`)

  let noTicketRoot = new Discord.RichEmbed()
      .setAuthor(`${message.author.tag} | No Ticket Category Set`, message.author.displayAvatarURL)
      .setDescription(`${Failure} <@${message.author.id}> This server does not have a ticket category set.\nSet one with \`${currPrefix.prefix}set ticketsystem\``)
      .setColor("#ff4f4f")

  const action = args[0];
  if (!action) return message.channel.send(actionEmbed)

  switch (action) {

      case 'ticket': 

    let ticketParent = await Ticket.findOne( { guildID: message.guild.id } )
    if (!ticketParent || ticketParent.categoryID === "`Not set`") return message.channel.send(noTicketRoot)
    let ticketid = ticketParent.ticketID;

    let newTicketEmbed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag} | New Ticket`, message.author.displayAvatarURL)
    .setDescription(`${Sucess} <@${message.author.id}> you have successfully created a new ticket.\nPlease explain your complaints in details.`)
    .setColor("#ffc500")
    .setFooter(`Thank you for creating a ticket! Please await staff respond.`)
    .setTimestamp()

    let AlreadyStaffEmbed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag} | New Ticket`, message.author.displayAvatarURL)
    .setDescription(`${Failure} <@${message.author.id}> you are already a staff member of **${message.guild.name}**.`)
    .setColor("#ff4f4f")

    let TicketEmbedLog = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag} | Ticket Opened 🔒`, message.author.displayAvatarURL)
    .setDescription(`\`${currPrefix.prefix}new ticket\``)
    .addField("Ticket opened by", `${message.author.tag}\n<@${message.author.id}>`, true)
    .setColor("#ffc500")
    .setFooter(`Ticket ID: ${ticketid}`)
    .setTimestamp()

    if (!logchannel) return message.channel.send(noLogs)
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.author.send(AlreadyStaffEmbed);
    await message.guild.createChannel(`ticket-${ticketid}`, { type: "text" }).then(async (channel) => {
        await channel.overwritePermissions(message.member.id, { 'VIEW_CHANNEL' : true })
        await channel.overwritePermissions(message.guild.id, { 'VIEW_CHANNEL' : false })
      }
    )

      message.delete();
      let newTicketChannel = message.guild.channels.find(c => c.name == `ticket-${ticketid}` && c.type == "text");
      await newTicketChannel.setParent(ticketParent.categoryID)
      await newTicketChannel.send(`${currPrefix.prefix} <@${message.author.id}> ${currPrefix.prefix}`).then(m => m.delete(1000))
      await newTicketChannel.send(newTicketEmbed)
      await logchannel.send(TicketEmbedLog)
      await Ticket.findOneAndUpdate( { guildID: message.guild.id}, { $set: { ticketID: ticketParent.ticketID + 1 } } )

    break;
      case 'profile': 

      let userProfile = await Profile.findOne( { user: message.author.id } )
  
      var newProfileEmbed = new Discord.RichEmbed()
          .setAuthor(`${message.author.tag} | Profile Created`)
          .setDescription(`${Sucess} <@${message.author.id}> Your profile was created.`)
          .setColor("#7aff7a")

      var AlreadyHasProfileEmbed = new Discord.RichEmbed()
          .setAuthor(`${message.author.tag} | Profile Creation`)
          .setDescription(`${Failure} <@${message.author.id}> You already have a profile. \`${currPrefix.prefix}profile\``)
          .setColor("#ff4f4f")
  
      if (userProfile) return message.channel.send(AlreadyHasProfileEmbed)
      if (!userProfile) {
          const newUserProfile = new Profile({
  
              user: message.author.id,
              userName: message.author.tag,
              globalReputation: 0,
              balance: 0,
              globalLevel: 0,
              xp: 0,
              quote: `\`Use ${currPrefix.prefix}quote to assign a quote to your profile.\``,
              thumbnail: message.author.displayAvatarURL,
              inventory: `Nothing has been purchased or given to your inventory yet.`,
              colour: `#525252`
  
          })
          message.channel.send(newProfileEmbed)
          return newUserProfile.save();
      }

    break;
      case 'bug': 

      let BugChannel = bot.guilds.get("521602207406227476").channels.get("691650704330326077")
      let blacklisted = [];
      if (blacklisted.includes(message.author.id)) return;
      let hexColor = ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
      let fire = bot.emojis.get("687436596391182344")
  
      let errorMessage = args.splice(1).join(" ");
  
      let bugErrorEmbed = new Discord.RichEmbed()
      .setColor("#ff4f4f")
      .setTitle(`\`Command: ${currPrefix.prefix}new bug\``)
      .addField("**Description:**", "Help make Dobby bot better! Report any bugs you find.")
      .addField("**Command usage:**", `${currPrefix.prefix}bug <Error message>`)
      .addField("**Explanation:**", "Error message: Error/ What did not work", true)
      .addField("**Example:**", `${currPrefix.prefix}bug ${currPrefix.prefix}ban Didn't ban specified member.`)
      .setFooter("<> = Required, [] = Optional")
      .setTimestamp()
  
      if (!errorMessage) return message.channel.send(bugErrorEmbed);
  
      let bugEmbed = new Discord.RichEmbed()
      .setAuthor(`${message.author.tag} | Reported a bug`, message.author.displayAvatarURL)
      .setColor(hexColor)
      .setDescription(`<@${message.author.id}> found a bug! ${fire}`)
      .addField('Error message', `${errorMessage}`, true)
      .addBlankField(false)
      .addField("Bug sent from", `${message.guild.name}\n(ID: ${message.guild.id})`)
      .setFooter(`Author ID: ${message.author.id}`)
      .setTimestamp()
  
      let invite = await BugChannel.createInvite(
        {
          maxAge: 86400, // Time in MS
          maxUses: 1 // Max uses
        }
      ).catch(console.log);
  
      let successEmbed = new Discord.RichEmbed()
      .setAuthor(`${message.author.tag} | Bug reported`, message.author.displayAvatarURL)
      .setDescription(`<@${message.author.id}>, you successfully reported the bug ${fire}\n\nFollow up on the bug: [Here](${invite})`)
      .setColor("#7aff7a")
      .setTitle(`Thank you for helping making the bot better!`)
      .setFooter(`Please do not abuse this command. You will be blacklisted.`)
  
      BugChannel.send(bugEmbed);
      message.channel.send(successEmbed);

    break;

  }

}

module.exports.help = {
  name: "new",
  aliases: []
}
