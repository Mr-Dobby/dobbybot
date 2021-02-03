const Discord = require("discord.js");
const Ticket = require('../../lib/ticketsys');
const Servers = require("../../lib/mongodb");
const Profile = require("../../lib/profile");
const Logs = require("../../lib/logs");
const bug = require("../../lib/bugs");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } );
  const Failure = bot.emojis.cache.get(require("../../storage/config.json").emojis.Failure); 
  const Success = bot.emojis.cache.get(require("../../storage/config.json").emojis.Success);
  const logName = await Logs.findOne( { guildID: message.guild.id } );
  const logchannel = bot.channels.cache.get(logName.incidentLog);

  let noLogs = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | No Log Channel`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Failure} Reqiures an \`Incident log\` channel. Set one with: \`${currPrefix.prefix}set\``)
      .setColor("#ff4f4f")

  let actionEmbed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | New {Arguement}`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`**Available Commands:**\n
      \`${currPrefix.prefix}new ticket\` - Start a new ticket
      \`${currPrefix.prefix}new profile\` - Replace your profile with a new
      \`${currPrefix.prefix}new bug\` - Report a bug you find
      \nMore to be added soon!`)

  let noTicketRoot = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | No Ticket Category Set`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Failure} <@${message.author.id}> This server does not have a ticket category set.\nSet one with \`${currPrefix.prefix}set ticketsystem\``)
      .setColor("#ff4f4f")

  const action = args[0];
  if (!action) return message.channel.send(actionEmbed)

  switch (action) {

      case 'ticket': 

    let ticketParent = await Ticket.findOne( { guildID: message.guild.id } )
    if (!ticketParent || ticketParent.categoryID === "`Not set`") return message.channel.send(noTicketRoot)
    let ticketid = ticketParent.ticketID;

    let newTicketEmbed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} | New Ticket`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${Success} <@${message.author.id}> you have successfully created a new ticket.\nPlease explain your complaints in details.`)
    .setColor("#ffc500")
    .setFooter(`Thank you for creating a ticket! Please await staff respond.`)
    .setTimestamp()

    let AlreadyStaffEmbed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} | New Ticket`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${Failure} <@${message.author.id}> staff members cannot start new tickets.`)
    .setColor("#ff4f4f")

    let TicketEmbedLog = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} | Ticket Opened 🔒`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`\`${currPrefix.prefix}new ticket\``)
    .addField("Ticket opened by", `${message.author.tag}\n<@${message.author.id}>`, true)
    .setColor("#ffc500")
    .setFooter(`Ticket ID: ${ticketid}`)
    .setTimestamp()

    if (!logchannel) return message.channel.send(noLogs)
    if (message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(AlreadyStaffEmbed);
    let ticketChannel = await message.guild.channels.create(`ticket-${ticketid}`)

      message.delete();
      let newTicketChannel = message.guild.channels.cache.find(c => c.name == `ticket-${ticketid}` && c.type == "text");
      await newTicketChannel.setParent(ticketParent.categoryID)
      await ticketChannel.updateOverwrite(message.guild.roles.everyone, { VIEW_CHANNEL: false });
      await ticketChannel.updateOverwrite(message.author.id, { VIEW_CHANNEL: true });
      await newTicketChannel.send(`${currPrefix.prefix} <@${message.member.id}> ${currPrefix.prefix}`).then(msg => msg.delete({ timeout: 100 }))
      await newTicketChannel.send(newTicketEmbed)
      await logchannel.send(TicketEmbedLog)
      await Ticket.findOneAndUpdate( { guildID: message.guild.id}, { $set: { ticketID: ticketParent.ticketID + 1 } } )

    break;
      case 'profile':

      var doYouConfirm = new Discord.MessageEmbed()
          .setAuthor(`${message.author.tag} | Create New Profile`, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`This will completely remove your current profile, and will replace it with a new, empty one. You can check your current one with: \`${currPrefix.prefix}profile\`\nThis CANNOT be undone.\n\nIf you wish to do this, type: \`${currPrefix.prefix}new profile -y\``)
          .setColor("#ff4f4f")

      let confirm = args[1];
      if (confirm !== `-y`) return message.channel.send(doYouConfirm)
      var newProfileEmbed = new Discord.MessageEmbed()
          .setAuthor(`${message.author.tag} | Profile Created`, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`${Success} <@${message.author.id}> Your old profile is noe COMPLETELY gone, but replaced with a new one.`)
          .setColor("#7aff7a")

          Profile.findOneAndDelete( { user: message.author.id } );
          const newUserProfile = new Profile({
  
              user: message.author.id,
              userName: message.author.tag,
              globalReputation: 0,
              balance: 0,
              globalLevel: 0,
              xp: 0,
              quote: `\`Use ${currPrefix.prefix}quote to assign a quote to your profile.\``,
              thumbnail: message.author.displayAvatarURL({ dynamic: true }),
              inventory: `Nothing has been purchased or given to your inventory yet.`,
              colour: `#525252`
  
          })
          message.channel.send(newProfileEmbed)
          return newUserProfile.save();

    break;
      case 'bug': 

      let BugChannel = bot.channels.cache.get("799797574521061397")
      let blacklisted = [];
      if (blacklisted.includes(message.author.id)) return;
      let hexColor = ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
      let fire = bot.emojis.cache.get("687436596391182344")
  
      let errorMessage = args.splice(1).join(" ");
  
      let bugErrorEmbed = new Discord.MessageEmbed()
      .setColor("#ff4f4f")
      .setTitle(`\`Command: ${currPrefix.prefix}new bug\``)
      .addField("**Description:**", `Help make ${bot.user.toString()} better! Report any bugs you find.`)
      .addField("**Command usage:**", `${currPrefix.prefix}new bug <Error message>`)
      .addField("**Explanation:**", "Error message: Error/ What did not work", true)
      .addField("**Example:**", `${currPrefix.prefix}bug ${currPrefix.prefix}ban Didn't ban specified member.`)
      .setFooter("<> = Required, [] = Optional")
      .setTimestamp()
  
      if (!errorMessage) return message.channel.send(bugErrorEmbed);
  
      function generateBRC() {
        var length = 24,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
      }

      const thisBRC = generateBRC()

      let bugEmbed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | Reported a bug`, message.author.displayAvatarURL({ dynamic: true }))
      .setColor(hexColor)
      .setDescription(`<@${message.author.id}> found a bug! ${fire}\nBRC: \`${thisBRC}\``)
      .addField('Error message', `${errorMessage}`, false)
      .addField("Bug sent from", `${message.channel.toString()} (${message.channel.id})\n**${message.guild.name}** (${message.guild.id})`, false)
      .setFooter(`Author ID: ${message.author.id}`)
      .setTimestamp()
  
      let invite = await bot.channels.cache.get("799793219977871371").createInvite(
        {
          maxAge: 86400, // Time in MS
          maxUses: 1 // Max uses
        }
      ).catch(console.log);

      let successEmbed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | Bug reported`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`<@${message.author.id}>, you successfully reported a bug ${fire}\n\nFollow up on the bug: [Here](${invite})`)
      .setColor("#7aff7a")
      .addField(`Your unique Bug Report Code (BRC)`, `\`${thisBRC}\``, true)
      .setTitle(`Thank you for helping making the bot better!`)
      .setFooter(`Please do not abuse this command. You will be blacklisted.`)
  
      BugChannel.send(bugEmbed);
      message.channel.send(successEmbed);

      const now = new Date()
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: false 
      }

      const newBug = new bug({

        guildID: message.guild.id,
        channelID: message.channel.id,
        authorID: message.author.id,
        bugReportCode: thisBRC,
        bugMessage: errorMessage,
        reportedAt: now.toLocaleDateString('en-GB', options)

      });

      await newBug.save();

    break;

  }

}

module.exports.help = {
  name: "new",
  aliases: []
}
