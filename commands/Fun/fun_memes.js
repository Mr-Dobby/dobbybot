const Discord = require("discord.js");
const puppy = require('random-puppy');

module.exports.run = async (bot, message, args) => {

    let reddit = [
        "meme",
        "animemes",
        "AnimeFunny",
        "dankmemes",
        "dankmeme",
        "wholesomememes",
        "MemeEconomy",
        "meirl",
        "darkhumour",
        "realdarkhumour",
        "funny",
        "GetMotivated",
        "wholesomememes",
        "facepalm",
        "showerthoughts",
        "wtf",
        "insanepeoplefacebook",
        "ComedyCemetery"
    ]

    let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

    puppy(subreddit).then(url => {
          var rmemes = new Discord.RichEmbed()
          .setTitle(`Reddit Meme, (${url})`)
          .setDescription("Random pic or gif from subreddit memes.")
          .setImage(url)
          .setTimestamp()
          .setColor(`RANDOM`)
          .setFooter(`Requested by ${message.author.username}`)
          message.channel.send({embed: rmemes})
      })
  }

module.exports.help = {
    name: 'memes',
    aliases: []
}
