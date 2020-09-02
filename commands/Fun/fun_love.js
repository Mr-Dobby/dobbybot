const Discord = require('discord.js')
const Servers = require("../../lib/mongodb");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

  var heartEmoji = bot.emojis.cache.get("704125939172376617");
  var heartEmoji1 = bot.emojis.cache.get("704132846125842463");
  var heartEmoji2 = "https://cdn.discordapp.com/emojis/721011000328847461.gif?v=1"

  var love = [
      "**420%** | :smoking::smoking::smoking::smoking::smoking::smoking::smoking::smoking::smoking::smoking: | **420%** \n\n\`TOO MUCH LOVE\`",
      "**0%** | :broken_heart::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart: | **0%** \n\n\`To put it simple, just don't.\`",
      "**10%** | :heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart: | **10%** \n\n\`Terrible Match\`",
      "**20%** | :heart::heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart: | **20%** \n\n\`Awful Match\`",
      "**30%** | :heart::heart::heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart: | **30%** \n\n\`Could be better\`",
      "**40%** | :heart::heart::heart::heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart: | **40%** \n\n\`Could be worse\`",
      "**50%** | :heart::heart::heart::heart::heart::black_heart::black_heart::black_heart::black_heart::black_heart: | **50%** \n\n\`Decent Match\`",
      "**60%** | :heart::heart::heart::heart::heart::heart::black_heart::black_heart::black_heart::black_heart: | **60%** \n\n\`Good Match\`",
      "**69%** | :eggplant::eggplant::eggplant::eggplant::eggplant::eggplant::eggplant::eggplant::eggplant::eggplant: | **69%** \n\n\`Perfection\`",
      "**70%** | :heart::heart::heart::heart::heart::heart::heart::black_heart::black_heart::black_heart: | **70%** \n\n\`Great Match\`",
      "**80%** | :heart::heart::heart::heart::heart::heart::heart::heart::black_heart::black_heart: | **80%** \n\n\`Amazing Match\`",
      "**90%** | :heart::heart::heart::heart::heart::heart::heart::heart::heart::black_heart: | **90%** \n\n\`Lovely Match\`",
      "**99%** | :beers::beers::beers::beers::beers::beers::beers::beers::beers::beers: | **99%** \n\n\`Fantastic Match\`",
      "**100%** | :heart::heart::heart::heart::heart::heart::heart::heart::heart::heart: | **100%** \n\n\`So.. when is the wedding?\`",
];

  var loveyourself = ["**101%** | :sparkling_heart::sparkling_heart::sparkling_heart::sparkling_heart::sparkling_heart::sparkling_heart::sparkling_heart::sparkling_heart::sparkling_heart::sparkling_heart: | **101%** \`MAXIMUM LOVE\`"]

  var loveyourselfEmbed = new Discord.MessageEmbed()
        .setThumbnail("https://media.discordapp.net/attachments/427168044528173056/436659295598280725/meterheart.png?width=344&height=344")
        .setDescription(" " + " " + `__**${heartEmoji}:heartpulse::heartbeat::bow_and_arrow: MATCHMAKING :bow_and_arrow::heartbeat::heartpulse:${heartEmoji}**__` + "" + `\n\n          :small_red_triangle_down:**[ You ] ${heartEmoji1}**` + "" + `\n          :small_red_triangle:**[ Yourself ] ${heartEmoji1}**` + "\n\n" + loveyourself)
        .setColor("#f385ff")
        .setFooter(`Always love yourself the most! | Try ${currPrefix.prefix}love <@user> to see your match with someone else`, heartEmoji2)

  var user2 = message.mentions.users.first() || message.guild.members.cache.get(args[0])
      if (!user2) {
          return message.channel.send(loveyourselfEmbed)
      }

        var embed = new Discord.MessageEmbed()
            .setThumbnail("https://media.discordapp.net/attachments/427168044528173056/436659295598280725/meterheart.png?width=344&height=344")
            .setDescription(" " + " " + `__**${heartEmoji}:heartpulse::heartbeat::bow_and_arrow: MATCHMAKING :bow_and_arrow::heartbeat::heartpulse:${heartEmoji}**__` + "" + `\n\n          :small_red_triangle_down:**[` + message.author.username + `] ${heartEmoji1}**` + "" + "\n          :small_red_triangle:**[" + user2.username + `] ${heartEmoji1}**` + "\n\n" + love[Math.floor(Math.random() * love.length)])
            .setColor("#f385ff")

        message.channel.send(embed)

}

module.exports.help = {
    name: "love",
    aliases: ["ship"]
}
