const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {

  var heartEmoji = bot.emojis.get("704125939172376617");
  var heartEmoji1 = bot.emojis.get("704132846125842463");

  var love = [
      "**420%** | :smoking::smoking::smoking::smoking::smoking::smoking::smoking::smoking::smoking::smoking: | **420%** \`TOO MUCH LOVE\`",
      "**0%** | :broken_heart::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart: | **0%** \`Horrible Match\`",
      "**10%** | :heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart: | **10%** \`Terrible Match\`",
      "**20%** | :heart::heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart: | **20%** \`Awful Match\`",
      "**30%** | :heart::heart::heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart: | **30%** \`Could be worse\`",
      "**40%** | :heart::heart::heart::heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart: | **40%** \`Could be better\`",
      "**50%** | :heart::heart::heart::heart::heart::black_heart::black_heart::black_heart::black_heart::black_heart: | **50%** \`Decent Match\`",
      "**60%** | :heart::heart::heart::heart::heart::heart::black_heart::black_heart::black_heart::black_heart: | **60%** \`Good Match\`",
      "**69%** | :eggplant::eggplant::eggplant::eggplant::eggplant::eggplant::eggplant::eggplant::eggplant::eggplant: | **69%** \`Perfection\`",
      "**70%** | :heart::heart::heart::heart::heart::heart::heart::black_heart::black_heart::black_heart: | **70%** \`Great Match\`",
      "**80%** | :heart::heart::heart::heart::heart::heart::heart::heart::black_heart::black_heart: | **80%** \`Amazing Match\`",
      "**90%** | :heart::heart::heart::heart::heart::heart::heart::heart::heart::black_heart: | **90%** \`Lovely Match\`",
      "**99%** | :beers::beers::beers::beers::beers::beers::beers::beers::beers::beers: | **99%** \`Fantastic Match\`",
      "**100%** | :heart::heart::heart::heart::heart::heart::heart::heart::heart::heart: | **100%** \`Perfect Match\`",
];

  var loveyourself = ["**101%** | :sparkling_heart::sparkling_heart::sparkling_heart::sparkling_heart::sparkling_heart::sparkling_heart::sparkling_heart::sparkling_heart::sparkling_heart::sparkling_heart: | **101%** \`MAXIMUM LOVE\`"]

  var loveyourselfEmbed = new Discord.RichEmbed()
        .setThumbnail("https://media.discordapp.net/attachments/427168044528173056/436659295598280725/meterheart.png?width=344&height=344")

        .setDescription(" " + " " + `       __**${heartEmoji}:heartpulse::heartbeat::bow_and_arrow: MATCHMAKING :bow_and_arrow::heartbeat::heartpulse:${heartEmoji}**__` + "" + `\n\n          :small_red_triangle_down:**[ You ] ${heartEmoji1}**` + "" + `\n          :small_red_triangle:**[ Yourself ] ${heartEmoji1}**` + "\n\n" + loveyourself)

        .setColor("#f385ff")

        .setFooter('Always love yourself the most! | Try -love <@user> to see your match with someone else')

    var user2 = message.mentions.members.last();
                        if (!user2) {
                                message.channel.send(loveyourselfEmbed)
                                return;
                        }
                        /*
                        if(!user) return message.channel.send("Can't find user!");
                        if(!user2) return message.channel.send("Can't find user!");
                        */
                        var embed = new Discord.RichEmbed()
                                .setThumbnail("https://media.discordapp.net/attachments/427168044528173056/436659295598280725/meterheart.png?width=344&height=344")

                                .setDescription(" " + " " + `       __**${heartEmoji}:heartpulse::heartbeat::bow_and_arrow: MATCHMAKING :bow_and_arrow::heartbeat::heartpulse:${heartEmoji}**__` + "" + `\n\n          :small_red_triangle_down:**[` + message.author.username + `] ${heartEmoji1}**` + "" + "\n          :small_red_triangle:**[" + user2.user.username + `] ${heartEmoji1}**` + "\n\n" + love[Math.floor(Math.random() * love.length)])

                                .setColor("#f385ff")

                                message.channel.send(embed)
}

module.exports.help = {
    name: "love",
    aliases: ["ship"]
}
