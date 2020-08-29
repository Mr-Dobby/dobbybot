const Discord = require("discord.js");
const {bot} = require('../index');
const Logs = require('../lib/logs')

bot.on("roleDelete", async (role) => {

    let fire = bot.emojis.cache.get("687436596391182344")
    let logName = await Logs.findOne( { guildID: role.guild.id } )
    const logchannel = bot.channels.cache.get(logName.serverLog)
    const status = {
        false: "No",
        true: "Yes"
      }

    let roleDeleteEmbed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setAuthor(`${role.guild.name} | Role delete`, role.guild.iconURL({ dynamic: true }))
    .setDescription(`A role has been deleted ${fire}`)
    .addField("Role name", `${role.name}`, true)
    .addField("Hex", role.hexColor, true)
    .addField("Members", role.members.size, true)
    .addField("Hoisted", status[role.hoist], true)
    .addField("Mentionable", status[role.mentionable], true)
    .setFooter(`Role ID: ${role.id}`)
    .setTimestamp()

    if (!logchannel) return;
    if (!logchannel.permissionsFor(role.guild.me).has('VIEW_CHANNEL')) return;
    if (!logchannel.permissionsFor(role.guild.me).has('ADMINISTRATOR')) return;

    await logchannel.send(roleDeleteEmbed).catch(error => console.log(error))

});
