const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const moment = require("moment");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } );
  const Failure = bot.emojis.cache.get("697388354689433611");

  var noPermsEmbedBot = new Discord.MessageEmbed()
      .setDescription(`${Failure} To see all server info, I requires \`ADMINISTRATOR\` permissions.`)
      .setColor("#ff0000")

    if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
        return message.channel.send(noPermsEmbedBot)
    }

    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };

        let verifLevels = {
        NONE:       'None\n(^.^)', 
        LOW:        'Low\n┬─┬ ノ( ゜-゜ノ)', 
        MEDIUM:     'Medium\nヽ(ຈل͜ຈ)ﾉ︵ ┻━┻ ', 
        HIGH:       'High\n(╯°□°）╯︵ ┻━┻', 
        VERY_HIGH:  'Extreme\n┻━┻彡ヽ(ಠ益ಠ)ノ彡┻━┻'
      };
        let region = {
            "brazil": ":flag_br: Brazil",
            "eu-central": ":flag_eu: Central Europe",
            "singapore": ":flag_sg: Singapore",
            "us-central": ":flag_us: U.S. Central",
            "sydney": ":flag_au: Sydney",
            "us-east": ":flag_us: U.S. East",
            "us-south": ":flag_us: U.S. South",
            "us-west": ":flag_us: U.S. West",
            "eu-west": ":flag_eu: Western Europe",
            "vip-us-east": ":flag_us: VIP U.S. East",
            "london": ":flag_gb: London",
            "amsterdam": ":flag_nl: Amsterdam",
            "hongkong": ":flag_hk: Hong Kong",
            "russia": ":flag_ru: Russia",
            "southafrica": ":flag_za: South Africa"
        };

        let Members = bot.emojis.cache.get("691958461885579304")
        let Online = bot.emojis.cache.get("691958418180800553");
        let Idle = bot.emojis.cache.get("691958427496480824");
        let DnD = bot.emojis.cache.get("691958436539400233");
        let Offline = bot.emojis.cache.get("691961517050036225");
        let Bot = bot.emojis.cache.get("686870651620950040");
        let tier1 = bot.emojis.cache.get("726523029085225081");
        let tier2 = bot.emojis.cache.get("726523029143945247");
        let tier3 = bot.emojis.cache.get("726523029127036928");
        let nsfw = bot.emojis.cache.get("731864615482425426");
        let owner = bot.emojis.cache.get("726527275255726230");
        let news = bot.emojis.cache.get("726528322770829365");
        let partnered = bot.emojis.cache.get("731928768708345976");

    let Total = message.guild.memberCount;
    let OnlineMembers = message.guild.members.cache.filter(member => member.presence.status !== 'offline').filter(member => !member.user.bot).size;
    let IdleMembers = message.guild.members.cache.filter(member => member.presence.status == 'idle').filter(member => !member.user.bot).size;
    let DnDMembers = message.guild.members.cache.filter(member => member.presence.status == 'dnd').filter(member => !member.user.bot).size;
    let OfflineMembers = message.guild.members.cache.filter(member => member.presence.status == 'offline').filter(member => !member.user.bot).size;
    let TotalBots = message.guild.members.cache.filter((m) => m.user.bot).size;

    let VoiceChannels = message.guild.channels.cache.filter(channel => channel.type === "voice").size;
    let TextChannels = message.guild.channels.cache.filter(channel => channel.type === "text").size;
    let nsfwChannels = message.guild.channels.cache.filter(channel => channel.nsfw).size;
    let newsChannels = message.guild.channels.cache.filter(channel => channel.news).size;
    let TotalRoles = message.guild.roles.cache.size - 1 - message.guild.members.cache.filter(m => m.user.bot).size;

    moment.locale("en-gb");
    let time = moment(message.channel.guild.createdAt).format('L');

    let BoostEmoji = bot.emojis.cache.get("731867569077616672");
    let TierCount = {
      0 : `None`,
      1 : `1st`,
      2 : `2nd`,
      3 : `3rd` 
    }
    let TierCountEmote = {
      0 : `${BoostEmoji}`,
      1 : `${tier1}`,
      2 : `${tier2}`,
      3 : `${tier3}` 
    }
    let partneredGuild = {
      true        : `${partnered} Discord Partner`,
      false       : `${partnered} Not Partnered`,
      null        : `${partnered} Not Partnered`,
      undefined   : `${partnered} Not Partnered`
    }

    const serverInfoEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.guild.name} | Server Information (bot prefix: ${currPrefix.prefix})`, message.guild.iconURL({ dynamic: true }))
        .setDescription(`Server Owner ${owner} ${message.guild.owner} | ${partneredGuild[message.guild.partnered]}`)
        .addField("➞ Server info", `Region: \n${region[message.guild.region]}\nMod level: ${verifLevels[message.guild.verificationLevel]}`, true)
        .addField(`➞ Members`, `${Members} \`${Total}\` ${Bot} \`${TotalBots}\` ${Online} \`${OnlineMembers}\`\n ${Idle} \`${IdleMembers}\` ${DnD} \`${DnDMembers}\` ${Offline} \`${OfflineMembers}\``, true)
        .addField("➞ Server Creation", `${time}\n${checkDays(message.channel.guild.createdAt)}`, true)
        .addField("➞ Roles", `🧝 Human \`${TotalRoles}\`\n🤖 Bot \`${message.guild.members.cache.filter((m) => m.user.bot).size}\``, true)
        .addField("➞ Channels", `💬 \`${TextChannels}\` 🔊 \`${VoiceChannels}\`\n${nsfw} \`${nsfwChannels}\`${news} \`${newsChannels}\``, true)
        .addField("➞ Nitro Boosters", `${BoostEmoji} Boosts \`${message.guild.premiumSubscriptionCount}\`\n${TierCountEmote[message.guild.premiumTier]} Boost tier \`${TierCount[message.guild.premiumTier]}\``, true)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setFooter(`Server ID: ${message.guild.id}`)
        .setColor("#010000")
        .setTimestamp()

        message.channel.send(serverInfoEmbed)

        /*
        EMBEDS SHOWCASE!

        EMBED #1:
        const embed = new Discord.MessageEmbed()
          .setTitle("This is your title, it can hold 256 characters")
          .setAuthor("Author Name", "https://i.imgur.com/lm8s41J.png")
          .setColor(0x00AE86)
          .setDescription("This is the main body of text, it can hold 2048 characters.")
          .setFooter("This is the footer text, it can hold 2048 characters", "http://i.imgur.com/w1vhFSR.png")
          .setImage("http://i.imgur.com/yVpymuV.png")
          .setThumbnail("http://i.imgur.com/p2qNFag.png")
          .setTimestamp()
          .setURL("https://discord.js.org/#/docs/main/indev/class/MessageEmbed")
          .addField("This is a field title, it can hold 256 characters",
            "This is a field value, it can hold 1024 characters.")
          .addField("Inline Field", "They can also be inline.", true)
          .addBlankField(true)
          .addField("Inline Field 3", "You can have a maximum of 25 fields.", true);
          message.channel.send({embed});

        WILL LOOK LIKE: http://prntscr.com/oy5h2g (source: https://anidiots.guide/first-bot/using-embeds-in-messages)

        EMBED #2
        message.channel.send({embed: {
            color: 3447003,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            title: "This is an embed",
            url: "http://google.com",
            description: "This is a test embed to showcase what they look like and what they can do.",
            fields: [{
                name: "Fields",
                value: "They can have different fields with small headlines."
              },
              {
                name: "Masked links",
                value: "You can put [masked links](http://google.com) inside of rich embeds."
              },
              {
                name: "Markdown",
                value: "You can put all the *usual* **__Markdown__** inside of them."
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Example"
            }
          }
        });

        WILL LOOK LIKE: http://prntscr.com/oy5hmc (source: https://anidiots.guide/first-bot/using-embeds-in-messages)

        */


}

module.exports.help = {
  name: "serverinfo",
  aliases: ["sinfo"]
}
