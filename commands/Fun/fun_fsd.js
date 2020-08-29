const Discord = require("discord.js")

module.exports.run = async (bot, message, args, client) => {

  const Attachment = new Discord.MessageAttachment('./storage/images/flushedslutdwop.gif')

  message.channel.send('Flushed Slut Dwop!' , Attachment)

}

module.exports.help = {
  name: "fsd",
  aliases: ["flushedslutdrop", "flushedslutdwop"]
}
