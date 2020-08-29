const Discord = require("discord.js");
const Neko = require('nekos.life');
const neko = new Neko();

module.exports.run = async (bot, message, args) => {

        let member = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if (!member) return;
        if (!message.author.id == member.id) return;
        let result = await neko.sfw.hug()

        var randomEnd = [
          "Isn't this just cute!!",
          "Aren't they just adorable ❤️",
          "Lovely... just lovely..",
          "Better get them strong arms ready",
          `SO TIGHT HUGGIES`,
          "THAT. IS. JUST. SO. SWEET!"
        ]

        var RandomEnd = randomEnd[Math.floor(Math.random() * randomEnd.length)]

          var hugEmbed = new Discord.MessageEmbed()
          .setTitle("Hugz & Cuddlez")
          .setDescription(`Aww, **${message.author.username}** hugs **${member.username}** • ${RandomEnd}`)
          .setImage(result.url)
          .setColor(`RANDOM`)

          message.channel.send(hugEmbed)

};

module.exports.help = {
  name: "hug",
  aliases: []
}
