const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let userID = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!userID) return message.channel.send("Please mention a user.");
  let UserIDEmbed = new Discord.RichEmbed()
      .setAuthor(`${userID.user.tag} | User ID`, userID.user.displayAvatarURL)
      .setDescription(`<@${userID.user.id}>'s ID is ${userID.user.id}`)

  message.channel.send(UserIDEmbed)

}

module.exports.help = {
  name: "userid",
  aliases: []
}
