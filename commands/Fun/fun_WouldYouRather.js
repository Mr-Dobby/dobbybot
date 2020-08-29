const Discord = require("discord.js");
let question = require("../../storage/WouldYouRather.json")

module.exports.run = async (bot, message, args) => {

    var result = question[Math.floor(Math.random() * question.length)]
    let RandomColour = Math.floor(Math.random() * Math.floor(16777215));
    let embed = new Discord.MessageEmbed()
    .setColor(RandomColour)
    .setDescription(result)

    await message.channel.send(embed)

}
module.exports.help = {
  name: "wouldyourather",
  aliases: ["wyr"]
}
