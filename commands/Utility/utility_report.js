const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");
const moment = require("moment");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

async function report() {

  let target = message.guild.member(message.mentions.users.last() || message.mentions.users.first());
  let reason = args.slice(1).join(' ');
  const Failure = bot.emojis.get("697388354689433611");
  const Sucess = bot.emojis.get("697388354668462110");

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

    const reportEmbed = new Discord.RichEmbed()
          .setAuthor(`${message.author.tag} | Report 📝`, message.author.displayAvatarURL)
          .setDescription(`\`${currPrefix.prefix}report <@User> <Reason>\``)
          .setColor("#ffc500")
          .addField("Reported User", `<@${target.id}>`, true)
          .addField("Report ID", (makeid(8)), true)
          .addField("Reported for", `${reason}`, false)
          .addField("Report made", `US logic: ${message.createdAt.toLocaleString().substr(0, 24)} | Rest of the world logic: ${time}\n${message.channel.toString()}`, false)
          .setThumbnail(target.user.displayAvatarURL)

    let reportschannel = message.guild.channels.find(channel => channel.name === "reports");
    if (!reportschannel) {

    const logName = await Logs.findOne( { guildID: message.guild.id } )
    const logchannel = bot.channels.get(logName.incidentLog)

    if (!logchannel) return;

    const reportEmbedLog = new Discord.RichEmbed()
        .setAuthor(`${target.user.tag} | Report Failed`, target.user.displayAvatarURL)
        .setColor("#ff0000")
        .addField("Reported for", `${reason}`, true)
        .setDescription(`${Failure} Missing a report channel. Create a channel, and name it \`reports\``)
        .setFooter(`Reported by: ${message.author.tag}`, message.author.displayAvatarURL)
        .setTimestamp()

    message.channel.send(`${Sucess} Report has been accepted, and sent to the staff team.`).then(message => {message.delete(5000)})
    return logchannel.send(reportEmbedLog);

  };

    message.delete();
    message.channel.send(`${Sucess} Report has been accepted, and sent to the staff team.`).then(message => {message.delete(5000)})
    reportschannel.send(reportEmbed);

  }
  report();
}

module.exports.help = {
  name: "report",
  aliases: []
}
