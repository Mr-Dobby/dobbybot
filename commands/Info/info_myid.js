const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  var myid = message.author.id
  let MyIDEmbed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | User ID`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`<@${message.author.id}>, your ID is ${myid}`)

  message.channel.send(MyIDEmbed)

}

module.exports.help = {
  name: "myid",
  aliases: []
}
