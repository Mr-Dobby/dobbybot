const Discord = require("discord.js");
const superagent = require('superagent')

module.exports.run = (bot, message, args) => {

        if (!message.channel.nsfw) return message.channel.send(":underage: You need to be in an NSFW channel to use this command.\nCheck `-nsfwhuh`").then(message => {message.delete(5000)})

        superagent.get('https://nekobot.xyz/api/image')
        .query({ type: 'pgif'})
        .end((err, response) => {
          const RandomColour = ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
          const embed = new Discord.RichEmbed()
              .setColor(RandomColour)
              .setDescription("Now that's some hot quality porn!")
              .setImage(response.body.message)
              .setFooter("Free porn thanks to nekobot.xyz")
          message.channel.send(embed);
        });
}

module.exports.help = {
  name: "pgif",
  aliases: []
}
