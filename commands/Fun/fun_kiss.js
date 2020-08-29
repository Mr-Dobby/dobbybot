const Discord = require("discord.js");
const Neko = require('nekos.life');
const neko = new Neko();

module.exports.run = async (bot, message, args) => {

        let member = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if (!member) return;
        if (!message.author.id == member.id) return;
        let result = await neko.sfw.kiss()

        var randomEnd = [
          "Isn't this just cute!!",
          "Aren't they just adorable ❤️",
          "Lovely... just lovely..",
          "Better get them lips ready",
          `Where are you kissing gonna ${member.username}? Lips perhaps?`,
          "THAT. IS. SO. SWEET!"
        ]

        var RandomEnd = randomEnd[Math.floor(Math.random() * randomEnd.length)]

          var kissEmbed = new Discord.MessageEmbed()
          .setTitle("Kissies & Lickies")
          .setDescription(`Aww, **${message.author.username}** kisses **${member.username}** • ${RandomEnd}`)
          .setImage(result.url)
          .setColor(`RANDOM`)

          message.channel.send(kissEmbed)

};

module.exports.help = {
  name: "kiss",
  aliases: []
}
