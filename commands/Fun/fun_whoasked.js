const Discord = require("discord.js");

module.exports.run = async (bot, message, args, client) => {

    const random = [
        "https://cdn.discordapp.com/attachments/682717976771821646/701796414782701628/who-cares.jpg",
        "https://cdn.discordapp.com/attachments/682717976771821646/701796416103645555/who-cares1.jpg",
        "https://cdn.discordapp.com/attachments/682717976771821646/701796417542291506/who-cares2.jpg",
        "https://cdn.discordapp.com/attachments/682717976771821646/701796418901246022/who-cares3.jpg",
        "https://cdn.discordapp.com/attachments/682717976771821646/701796423116652584/who-cares4.jpg",
        "https://cdn.discordapp.com/attachments/682717976771821646/701800000614826055/who-cares5.jpg",
        "https://cdn.discordapp.com/attachments/682717976771821646/701800001940226148/who-cares6.jpg",
        "https://cdn.discordapp.com/attachments/682717976771821646/701800003215032350/who-cares7.jpg",
        "https://cdn.discordapp.com/attachments/682717976771821646/701807801688653884/who-cares8.gif",
        "https://cdn.discordapp.com/attachments/682717976771821646/701804272148414624/who-cares9.jpg"
      ]
      
      var result = random[Math.floor(Math.random() * random.length)]
      
      let embed = new Discord.MessageEmbed()
      .setAuthor(`Who the hell was asking . . ? Nobody cares!!`, message.author.displayAvatarURL({ dynamic: true }))
      .setColor(`RANDOM`)
      .setImage(result)
      
      message.channel.send(embed)

}

module.exports.help = {
  name: "whoasked",
  aliases: ["whocares", "nobodyasked"]
}
