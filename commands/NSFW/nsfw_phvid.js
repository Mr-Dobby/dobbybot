const Discord = require("discord.js");
const commando = require('discord.js-commando');
//const Pornsearch = require('pornsearch');

module.exports.run = async (bot, message, args) => {

  if (!message.channel.nsfw) {
      message.react('💢');
      return message.channel.send(":underage: You need to be in an NSFW channel to use this command.\nCheck `-nsfwhuh`").then(message => {message.delete(5000)})
    }

    return message.channel.send("Command Disabled.")

          var s = message.content.split(/\s+/g).slice(1).join(" ");

          if (!s) {
              return message.channel.send('Please provide me something to search for!')
          }

          var Searcher = new Pornsearch();

          try {
              Searcher.videos()
                .then(videos => {
                    let embed = new Discord.RichEmbed()
                        .setAuthor(`${message.author.tag} | Porn search`, message.author.displayAvatarURL)
                        .setDescription(`**${videos[1].title}** [URL](${videos[1].url})`)
                        //.setThumbnail(videos[1].thumbnail)
                        .setFooter(`This video is ${videos[1].duration} long`)
                    message.channel.send(embed)
                })
              return null;

          } catch (err) {
              return message.channel.send(`No results found for **${s}**`)
          }

}

module.exports.help = {
  name: "phvid",
  aliases: []
}
