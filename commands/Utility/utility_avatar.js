const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
  let member = message.mentions.users.last() || message.guild.members.cache.get(args[0])
/*
  const formats = ['png'];
  if (member.avatar) formats.push('jpg', 'webp');
  const format = member.avatar && member.avatar.startsWith('a_') ? 'gif' : 'png';
  if (format === 'gif') formats.push('gif');
*/

if (!member) {

  const embed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} | Avatar`)
      .setImage(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))

        message.channel.send(embed)

} else {

  const embed = new Discord.MessageEmbed()
        .setTitle(`${member.user.tag} | Avatar`)
        .setImage(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))

        message.channel.send(embed)
  }

}

module.exports.help = {
  name: "av",
  aliases: ["avatar"]
}
