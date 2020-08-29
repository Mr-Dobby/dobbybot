const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");

module.exports.run = async (bot, message, args, client) => {

    var currPrefix = await Servers.findOne( { guildID: message.guild.id } )
    const Failure = bot.emojis.cache.get("697388354689433611");
    const Sucess = bot.emojis.cache.get("697388354668462110");
  
    var noPermsEmbed = new Discord.MessageEmbed()
        .setDescription(`${Failure} Nuking new members requires you to have \`ADMINISTRATOR\` permissions.`)
        .setColor("#ff0000")
      
    var noPermsEmbedBot = new Discord.MessageEmbed()
        .setDescription(`${Failure} Nuking new members requires me to have \`ADMINISTRATOR\` permissions.`)
        .setColor("#ff0000")
  
    if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(noPermsEmbedBot)
    }
  
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(noPermsEmbed);
    }

    var noLogsEmbed = new Discord.MessageEmbed()
        .setDescription(`${Failure} Nuking new members requires a raid log channel. Set one with \`${currPrefix.prefix}set\``)
        .setColor("#ff0000")

    var CancelledEmbed = new Discord.MessageEmbed()
        .setDescription(`${Failure} Nuke was cancelled.`)
        .setColor("#ff0000")

    var Nobody2Nuke = new Discord.MessageEmbed()
        .setDescription(`${Failure} No members to nuke.`)
        .setColor("#ff0000")

    var BuhBye = new Discord.MessageEmbed()
        .setDescription(`You where banned in ${message.guild.toString()} during a clean up after a raid. \nIf you believe you were unfairly banned, contact <@${message.author.id}>, ${message.author.tag}`)
        .setColor("#ff0000")

    var LaunchedEmbed = new Discord.MessageEmbed()
        .setDescription(`${Sucess} Nuke has been launched`)
        .setColor("#7aff7a")

    var logName = await Logs.findOne( { guildID: message.guild.id } )
    const logchannel = bot.channels.cache.get(logName.raidLog)
    if (!logchannel) return message.channel.send(noLogsEmbed)

    let mems = await bot.guilds.cache.first().members.fetch();
    const memberCutoff = Date.now() - (mems * 60000);
    const ageCutoff = Date.now() - (mems * 60000);
    const members = message.guild.members.cache.filter(
        mem => mem.joinedTimestamp > memberCutoff && mem.user.createdTimestamp > ageCutoff
    );

    let NukePrep = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle(`\`Command: ${currPrefix.prefix}nuke\``)
        .addField("**Description:**", "Clean up after a raid, bans newly joined members.")
        .addField("**Command usage:**", `\`${currPrefix.prefix}nuke\` *then* \`y\``, false)
        .addField("**Nuke:**", `This nuke will hit **${members.size}** members. Proceed? \`y\` or \`n\``, false)
        .setFooter("<> = Required, [] = Optional")

        await message.channel.send(NukePrep)
        let response;
        let statusMsg2;

    while (!statusMsg2) {
            const msgs = await message.channel.awaitMessages(res => res.author.id === message.author.id, {
                max: 1,
                time: 15000
            });

            if (!msgs.size || !['y', 'yes'].includes(msgs.first().content.toLowerCase())) return message.channel.send(CancelledEmbed).then(message => message.delete({ timeout: 5000 }));
            if (['n', 'no'].includes(msgs.first().content.toLowerCase())) return message.channel.send(CancelledEmbed).then(message => message.delete({ timeout: 5000 }));
            if (members.size == 0) return message.channel.send(Nobody2Nuke);

            statusMsg2 = await message.channel.send(LaunchedEmbed);
    }

    const fatalities = [];
    const survivors = [];
    const promises = [];

    for (const member of members.values()) {
        promises.push(
            member.send(BuhBye)
        ).catch().then(() => member.ban()).then(() => {
            fatalities.push(member)
        })                        .catch(err => {
            console.log(err);
            survivors.push({
                member: member.id,
                error: err
            });
        })
        .then(() => {
            if (members.size <= 5) return;
            if (promises.length % 5 === 0) {

                var LaunchedEmbed = new Discord.MessageEmbed()
                    .setDescription(`${Sucess} Launching nuke. (${Math.round(promises.length / members.size * 100)}%)...`)
                    .setColor("#7aff7a")

                statusMsg2.edit(LaunchedEmbed);
            }
        })
    }

    var nukeLog = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} | Nuke landed`)
    .addField(`__**Fatalities**__ [${fatalities.length}]`, `${fatalities.map(fat => `**-**${fat.username} \`${fat.id}\``).join(`\n`)}`, true)
    .addField(`__**Survivors**__ [${survivors.length}]`, `${survivors.map(srv => `**-**${srv.username} \`${srv.id}\``).join(`\n`)}`, true)
    .setColor("#ff0000")

    await Promise.all(promises);
    await logchannel.send(nukeLog)

}

module.exports.help = {
  name: "nuke",
  aliases: []
}
