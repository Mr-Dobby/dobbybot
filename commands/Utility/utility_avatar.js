const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
  let user = message.guild.member(message.mentions.users.last()) || message.guild.members.get(args[0]) || message.author;

  const formats = ['png'];
  if (user.avatar) formats.push('jpg', 'webp');
  const format = user.avatar && user.avatar.startsWith('a_') ? 'gif' : 'png';
  if (format === 'gif') formats.push('gif');

  const embed = new Discord.RichEmbed()
        .setAuthor(`${user.tag} | Avatar`)
        .setImage(user.displayAvatarURL)

        message.channel.send(embed)

}

module.exports.help = {
  name: "av",
  aliases: ["avatar"]
}
