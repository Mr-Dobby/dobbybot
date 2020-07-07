const Discord = require("discord.js");
const commando = require('discord.js-commando');

module.exports.run = async (bot, message, args, client) => {

  let Members = bot.emojis.get("691958461885579304")
  let Online = bot.emojis.get("691958418180800553");
  let Idle = bot.emojis.get("691958427496480824");
  let DnD = bot.emojis.get("691958436539400233");
  let Offline = bot.emojis.get("691961517050036225");
  let Bot = bot.emojis.get("686870651620950040");

        var resp =
        `${Members} Members: ` + message.guild.memberCount + "\n" +
        `${Online} Online: ` + message.guild.members.filter(o => o.presence.status === 'online').size + "\n" +
        `${Idle} Away: ` + message.guild.members.filter(i => i.presence.status === 'idle').size + "\n" +
        `${DnD} Do not Disturb: ` + message.guild.members.filter(q => q.presence.status === 'dnd').size + "\n" +
        `${Offline} Offline: ` + message.guild.members.filter(a => a.presence.status === 'offline').size + "\n" +
        `${Bot} Bots: ` + message.guild.members.filter(member => member.user.bot).size;

        const membersStatus = new Discord.RichEmbed()
        .setColor(0x010000)
        .setAuthor(`${message.guild.name} | Server Member Stats`, message.guild.iconURL)
        .setDescription(resp)

        message.channel.send(membersStatus)

}

module.exports.help = {
  name: "memberstats",
  aliases: ["stats"]
}
