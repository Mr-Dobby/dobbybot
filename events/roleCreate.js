
const Discord = require("discord.js");
const {bot} = require('../index');
const Logs = require('../lib/logs');

bot.on("roleCreate", async (role) => {

    let fire = bot.emojis.get("687436596391182344")
    let logName = await Logs.findOne( { guildID: role.guild.id } )
    const logchannel = bot.channels.get(logName.serverLog)
    const status = {
        false: "No",
        true: "Yes"
      }

    let roleCreateEmbed = new Discord.RichEmbed()
    .setColor("#00ff00")
    .setAuthor(`${role.guild.name} | Role create`, role.guild.iconURL)
    .setDescription(`A new role has been created ${fire}`)
    .addField("Role name", `<@&${role.id}>`, true)
    .addField("Hex", role.hexColor, true)
    .addField("Members", role.members.size, true)
    .addField("Position", `${role.guild.roles.size - role.position} out of ${role.guild.roles.size}`, true)
    .addField("Hoisted", status[role.hoist], true)
    .addField("Mentionable", status[role.mentionable], true)
    .setFooter(`Role ID: ${role.id}`)
    .setTimestamp()

    if (!logchannel) return;
    if (!logchannel.permissionsFor(role.guild.me).has('VIEW_CHANNEL')) return;
    if (!logchannel.permissionsFor(role.guild.me).has('ADMINISTRATOR')) return;

    await logchannel.send(roleCreateEmbed).catch(error => console.log(error))

});