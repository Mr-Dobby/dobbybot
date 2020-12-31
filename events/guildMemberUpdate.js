const Discord = require("discord.js");
const {bot} = require('../index');
const Logs = require('../lib/logs');
const colour = require('../storage/colours.json')

bot.on("guildMemberUpdate", async (oldMember, newMember) => {

  var date = new Date();
  var hs = String(date.getHours()).padStart(2, '0');
  var min = String(date.getMinutes()).padStart(2, '0');
  var sec = String(date.getSeconds()).padStart(2, '0');
  
    let fire = bot.emojis.cache.get("687436596391182344")
    let logName = await Logs.findOne( { guildID: oldMember.guild.id } )
    if (!logName) return;
    const logchannel = bot.channels.cache.get(logName.serverLog)
    if (!logchannel) return;
    if (!logchannel.permissionsFor(oldMember.guild.me).has('VIEW_CHANNEL')) return;
    if (!logchannel.permissionsFor(oldMember.guild.me).has('SEND_MESSAGES')) return;
    if (!logchannel.permissionsFor(oldMember.guild.me).has('EMBED_LINKS')) return;

    if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
      if (oldMember.roles.cache.size > newMember.roles.cache.size) {
        //Lost
        let dif = oldMember.roles.cache.filter(r => !newMember.roles.cache.has(r.id)).first()
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${oldMember.user.tag} | Lost a role`, `${oldMember.user.displayAvatarURL({ dynamic: true })}`)
        .setColor(colour.members)
        .setDescription(`**<@${newMember.id}> has lost the ${dif.toString()} role** ${fire}`)
        .setFooter(`Member ID: ${newMember.id} • Role ID: ${dif.id} • ${hs}:${min}:${sec}`)

        await logchannel.send(embed).catch()

    } else if (oldMember.roles.cache.size < newMember.roles.cache.size) {
        //Given
        let dif = newMember.roles.cache.filter(r => !oldMember.roles.cache.has(r.id)).first()
        const embed2 = new Discord.MessageEmbed()
        .setAuthor(`${oldMember.user.tag} | Gained a role`, `${oldMember.user.displayAvatarURL({ dynamic: true })}`)
        .setColor(colour.members)
        .setDescription(`**<@${newMember.id}> was given the ${dif.toString()} role** ${fire}`)
        .setFooter(`Member ID: ${newMember.id} • Role ID: ${dif.id} • ${hs}:${min}:${sec}`)

        await logchannel.send(embed2).catch()

    }
  }
});