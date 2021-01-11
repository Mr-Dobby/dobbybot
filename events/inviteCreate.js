const Discord = require("discord.js");
const {bot} = require('../index');
const Logs = require('../lib/logs');
const colour = require('../storage/colours.json')

module.exports = async (bot, invite) => {

  var date = new Date();
  var hs = String(date.getHours()).padStart(2, '0');
  var min = String(date.getMinutes()).padStart(2, '0');
  var sec = String(date.getSeconds()).padStart(2, '0');

    let fire = bot.emojis.cache.get("687436596391182344")
    const logName = await Logs.findOne( { guildID: invite.guild.id } );
    if (!logName) { return; }
    const logchannel = bot.channels.cache.get(logName.serverLog);
    
    if (!logchannel) return;
    if (!logchannel.permissionsFor(invite.guild.me).has('VIEW_CHANNEL')) return;
    if (!logchannel.permissionsFor(invite.guild.me).has('SEND_MESSAGES')) return;
    if (!logchannel.permissionsFor(invite.guild.me).has('EMBED_LINKS')) return;

    let channelCreateEmbed = new Discord.MessageEmbed()
    .setColor(colour.invites)
    .setAuthor(`${invite.guild.name} | Invite create`, invite.guild.iconURL({ dynamic: true }))
    .setDescription(`A new server invite has been created ${fire}`)
    .addField("Inviter", `${invite.inviter}`, true)
    .addField("Invite URL", `Discord.gg/${invite.code}`, true)
    .setFooter(`Inviter ID: ${invite.inviter.id} • ${hs}:${min}:${sec}`)

    await logchannel.send(channelCreateEmbed).catch(error => console.log(error))

};