const Discord = require("discord.js");
const puppy = require('random-puppy');
const request = require('snekfetch');
const fs = require("fs")

module.exports.run = async (bot, message, args) => {

const hug_gifs = [
    'https://media.giphy.com/media/CZpro4AZHs436/giphy.gif',
    'https://media.giphy.com/media/xT39CXg70nNS0MFNLy/giphy.gif',
    'https://media.giphy.com/media/EvYHHSntaIl5m/giphy.gif',
    'https://cdn.discordapp.com/attachments/320909154216706048/328086603471781888/giphy_4.gif',
    'https://media.giphy.com/media/yidUzriaAGJbsxt58k/giphy.gif',
    'https://media.giphy.com/media/3oEhmDMA4r9GxhwEqA/giphy.gif',
    'https://media.giphy.com/media/uORtt9NyW3WW4/giphy.gif',
    'https://media.giphy.com/media/11QQfJOKlh739e/giphy.gif',
    'https://media.giphy.com/media/sqbxK8itWs41i/giphy.gif',
    'https://media.giphy.com/media/3EJsCqoEiq6n6/giphy.gif',
    'https://media.giphy.com/media/l0HlGu6yGT8X51Gko/giphy.gif',
    'https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif',
    'https://media.giphy.com/media/j9Gjky23Qkc8xFdM68/giphy.gif',
    'https://media.giphy.com/media/yPjxAzSkVFgZO/giphy.gif',
    'https://media.giphy.com/media/xT4uQzQonigoNfse7C/giphy.gif',
    'https://cdn.discordapp.com/attachments/588764515462545424/593399803107475467/hug-S1qhfy2cz.gif',
    'https://cdn.discordapp.com/attachments/588764515462545424/593198108075229195/hug-rJaog0FtZ.gif',
    'https://cdn.discordapp.com/attachments/588764515462545424/593198038919413770/hug-HkzndOXvZ.gif',
    "https://i.imgur.com/wOmoeF8.gif", 
    "https://i.imgur.com/ntqYLGl.gif", 
    "https://i.imgur.com/nrdYNtL.gif", 
    "https://media1.tenor.com/images/49a21e182fcdfb3e96cc9d9421f8ee3f/tenor.gif?itemid=3532079", 
    "https://media1.tenor.com/images/b0de026a12e20137a654b5e2e65e2aed/tenor.gif?itemid=7552093", 
    "https://media1.tenor.com/images/7db5f172665f5a64c1a5ebe0fd4cfec8/tenor.gif?itemid=9200935", 
    "https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif", 
    "https://thumbs.gfycat.com/GleamingHandyAmoeba-size_restricted.gif", 
    "http://i.imgur.com/rlOJqHL.gif", 
    "https://data.whicdn.com/images/112409418/original.gif", 
    "https://i.pinimg.com/originals/fd/ff/96/fdff96422a17aaaf09faabca8af593f2.gif", 
    "https://media.tenor.com/images/2e1d34d002d73459b6119d57e6a795d6/tenor.gif", 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAQKySHZVJ-sCrb0VF-qdmngzxr_B0u_exdgvtA4d9fFaN4Hfd", 
    "https://www.wykop.pl/cdn/c3201142/comment_zravsKyrGXo6VOPAxA4xUAgJXDpX0fLZ.gif", 
    "https://img.gifmagazine.net/gifmagazine/images/545859/original.gif", 
    "https://lh3.googleusercontent.com/-3odb_qDB-C0/WNGqher3TSI/AAAAAAAAEbo/XnrxiwvNJKUKUFczHjNfyDVer-wn9Sx3wCJoC/w500-h346/tumblr_n9tj4oCzzk1rbnx7io1_500.gif"
]

var result = hug_gifs[Math.floor(Math.random() * hug_gifs.length)]

        let member = message.guild.member(message.mentions.users.first());
        if (!member) return message.channel.send("Please @ someone to hug! :heart:")

          var hugEmbed = new Discord.RichEmbed()
          .setTitle("Hugz & Cuddlez")
          .setDescription(`Aww, <@${message.author.id}> hugs `+member+"")
          .setImage(result)
          .setTimestamp()
          .setColor(`RANDOM`);
          message.delete()
          message.channel.send({embed: hugEmbed})

  };

  module.exports.help = {
    name: "hug",
    aliases: []
  }
