const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");
const moment = require("moment");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

async function report() {

  let target = message.guild.member(message.mentions.users.last() || message.mentions.users.first());
  let reason = args.slice(1).join(' ');
  const Failure = bot.emojis.cache.get(require("../../storage/config.json").emojis.Failure); 
  const Success = bot.emojis.cache.get(require("../../storage/config.json").emojis.Success);

  if (!target) return message.channel.send(`Please mention a member to report!\nExample: \`${currPrefix.prefix}report @user\``);
  if (!reason) return message.channel.send(`Please specify a reason for this report!\nExample: \`${currPrefix.prefix}report @user Spam\``);

  if (target.id === message.author.id) {
    return message.channel.send("Imagine trying to report yourself.. ");
  }

  if (target === message.guild.me) {
    return message.channel.send("Not gonna report myself with this command, fella.")
  }
  
    function makeid(length) {
       var result           = '';
       var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
       var charactersLength = characters.length;
       for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return result;
    };

    moment.locale("en-gb");
    let time = moment(message.createdAt).format('L');

    const reportEmbed = new Discord.MessageEmbed()
          .setAuthor(`${message.author.tag} | Report 📝`, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`\`${currPrefix.prefix}report <@User> <Reason>\``)
          .setColor("#ffc500")
          .addField("Reported User", `<@${target.id}>`, true)
          .addField("Report ID", (makeid(8)), true)
          .addField("Reported for", `${reason}`, false)
          .addField("Report made", `US logic: ${message.createdAt.toLocaleString().substr(0, 24)} | Rest of the world logic: ${time}\n${message.channel.toString()}`, false)
          .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))

    let reportschannel = message.guild.channels.find(channel => channel.name === "reports");
    if (!reportschannel) {

    const logName = await Logs.findOne( { guildID: message.guild.id } )
    const logchannel = bot.channels.get(logName.incidentLog)

    if (!logchannel) return;

    const reportEmbedLog = new Discord.MessageEmbed()
        .setAuthor(`${target.user.tag} | Report Failed`, target.user.displayAvatarURL({ dynamic: true }))
        .setColor("#ff0000")
        .addField("Reported for", `${reason}`, true)
        .setDescription(`${Failure} Missing a report channel. Create a channel, and name it \`reports\``)
        .setFooter(`Reported by: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()

    message.channel.send(`${Success} Report has been accepted, and sent to the staff team.`).then(message => {message.delete(5000)})
    return logchannel.send(reportEmbedLog);

  };

    message.delete();
    message.channel.send(`${Success} Report has been accepted, and sent to the staff team.`).then(message => {message.delete(5000)})
    reportschannel.send(reportEmbed);

  }
  report();
}

module.exports.help = {
  name: "report",
  aliases: []
}
