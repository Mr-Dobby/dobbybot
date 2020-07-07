const Discord = require("discord.js");
const commando = require("discord.js-commando");
const Servers = require("../../lib/mongodb");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

  var action = args[0];

  switch(action) {
    case 'admin':
    case 'ADMIN':
    case 'administration':
    case 'ADMINISTRATION':

      var embed = new Discord.RichEmbed()
          .setAuthor(`${message.author.tag} | Administration Help`, message.author.displayAvatarURL)
          .setDescription(`List of Administration commands.\n(Reqiures \`ADMINISTRATOR\` permissions.)`)
          .addField(`Command`, `
\`${currPrefix.prefix}hackban\`
\`${currPrefix.prefix}logging\`
\`${currPrefix.prefix}nuke\`
\`${currPrefix.prefix}prefix\`
\`${currPrefix.prefix}raid\`
\`${currPrefix.prefix}set\``, true)
          .addField(`Description`, `
\`| Ban a user that is not a part of the server.\`
\`| Create new log channels, with default permissions.\`
\`| Clean up after a raid by banning newly joined members.\`
\`| Change bot prefix to anything you desire.\`
\`| Toggle this to autoban anyone joining, easily stops a raid.\`
\`| Setup logs, a welcome log as well as the ticket system.\``, true)
          
          message.channel.send(embed)

      break;
    case 'fun':
    case 'FUN':

      var embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.tag} | Fun Help`, message.author.displayAvatarURL)
      .setDescription(`List of fun commands.`)
      .addField(`Command`, `
\`${currPrefix.prefix}8ball\`
\`${currPrefix.prefix}clap\`
\`${currPrefix.prefix}fban\`
\`${currPrefix.prefix}flip\`
\`${currPrefix.prefix}fsd\`
\`${currPrefix.prefix}giveaway\`
\`${currPrefix.prefix}hug\`
\`${currPrefix.prefix}kiss\`
\`${currPrefix.prefix}love\`
\`${currPrefix.prefix}meme\`
\`${currPrefix.prefix}memes\`
\`${currPrefix.prefix}rate\`
\`${currPrefix.prefix}say\`
\`${currPrefix.prefix}slots\`
\`${currPrefix.prefix}thisorthat\`
\`${currPrefix.prefix}timer\`
\`${currPrefix.prefix}votekick\`
\`${currPrefix.prefix}whoasked\`
\`${currPrefix.prefix}wouldyourather\``, true)
      .addField(`Description`, `
\`| Ask a question and let Dobby answer you.\`
\`| Put some text and see for yourself.\`
\`| Fake ban someone.\`
\`| Put some text and get it flipped.\`
\`| Just try, for real.\`
\`| Start a giveaway.\`
\`| Hug someone.\`
\`| Kiss Someone.\`
\`| Shows a love parameter between you and someone else.\`
\`| Memes.\`
\`| More memes.\`
\`| Let Dobby Bot rate something for you.\`
\`| Say something through the bot.\`
\`| Gamble, and win TONS of DB.\`
\`| ThisOrThat minigame.\`
\`| Set yourself a timer.\`
\`| Votekick someone out of your current voice chat.\`
\`| EVEN MORE MEMES.\`
\`| WouldYouRather minigame.\``, true)
      
      message.channel.send(embed)

      break;
    case 'info':
    case 'INFO':
    case 'information':
    case 'INFORMATION':

      var embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.tag} | Information Help`, message.author.displayAvatarURL)
      .setDescription(`List of Informative commands.\n(Reqiures no specific permissions.)`)
      .addField(`Command`, `
\`${currPrefix.prefix}botinfo\`
\`${currPrefix.prefix}emojis\`
\`${currPrefix.prefix}memberstats\`
\`${currPrefix.prefix}myid\`
\`${currPrefix.prefix}roleinfo\`
\`${currPrefix.prefix}serverinfo\`
\`${currPrefix.prefix}userid\`
\`${currPrefix.prefix}userinfo\`
\`${currPrefix.prefix}weather\``, true)
      .addField(`Description`, `
\`| Shows info about this bot.\`
\`| List of emojis on the server.\`
\`| Status of the server members.\`
\`| Returns your userID.\`
\`| Shows info on a certain role.\`
\`| Shows info about the server.\`
\`| Returns a pinged user's ID.\`
\`| Shows info about a pinged user.\`
\`| Input a location, and get real life time weather reports.\``, true)
      
      message.channel.send(embed)

      break;
    case 'mod':
    case 'MOD':
    case 'moderation':
    case 'MODERATION':

      var embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.tag} | Moderaton Help`, message.author.displayAvatarURL)
      .setDescription(`List of moderation commands.\n(Reqiures \`MANAGE MESSAGES, ROLES, CHANNELS, KICK, BAN, MUTE\` permissions.)`)
      .addField(`Command`, `
\`${currPrefix.prefix}addrole\`
\`${currPrefix.prefix}ban\`
\`${currPrefix.prefix}chatban\`
\`${currPrefix.prefix}clear\`
\`${currPrefix.prefix}delrole\`
\`${currPrefix.prefix}kick\`
\`${currPrefix.prefix}lockdown\`
\`${currPrefix.prefix}mute\`
\`${currPrefix.prefix}slowmode\`
\`${currPrefix.prefix}softban\`
\`${currPrefix.prefix}unchatban\`
\`${currPrefix.prefix}unmute\``, true)
      .addField(`Description`, `
\`| Create a new role, and assign it to yourself.\`
\`| Ban a member who is in the server.\`
\`| Deny a member access to see any channels.\`
\`| Delete X number of messages (max: 100).\`
\`| Delete a specified role.\`
\`| Kick a member from the server.\`
\`| Lock a channel, deny members from talking.\`
\`| Mute a member, deny them from chatting, reacting & VC.\`
\`| Slowdown a channel for every user.\` 
\`| Soft ban a member, deletes their messages then unbans them.\`
\`| Remove a member from their chatban.\`
\`| Remove a member from their mute.\``, true)
      
      message.channel.send(embed)

      break;
    case 'nsfw':
    case 'NSFW':

      var embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.tag} | NSFW Help`, message.author.displayAvatarURL)
      .setDescription(`List of NSFW commands.\n(Reqiures a NSFW channel.)`)
      .addField(`Command`, `
\`${currPrefix.prefix}nsfwhuh\`
\`${currPrefix.prefix}4k\`
\`${currPrefix.prefix}anal\`
\`${currPrefix.prefix}ass\`
\`${currPrefix.prefix}hentai\`
\`${currPrefix.prefix}holo\`
\`${currPrefix.prefix}pgif\`
\`${currPrefix.prefix}pussy\`
\`${currPrefix.prefix}tits\``, true)
      .addField(`Description`, `
\`| Enable NSFW.\`
\`| 4K quality pictures.\`
\`| Command name says it all.\`
\`| Command name says it all.\`
\`| Command name says it all.\`
\`| Command name says it all.\`
\`| 4K quality GIF.\`
\`| Command name says it all.\`
\`| Command name says it all.\``, true)
      
      message.channel.send(embed)

      break;
    case 'profile':
    case 'PROFILE':

      var embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.tag} | Profile Help`, message.author.displayAvatarURL)
      .setDescription(`List of profile commands.\n(Reqiures no specific permissions.)`)
      .addField(`Command`, `
\`${currPrefix.prefix}colour\`
\`${currPrefix.prefix}daily\`
\`${currPrefix.prefix}quote\`
\`${currPrefix.prefix}rep\`
\`${currPrefix.prefix}profile\``, true)
      .addField(`Description`, `
\`| Change colour of your profile.\`
\`| Get daily rewards.\`
\`| Change quote of your profile.\`
\`| Give reputation point to another member.\`
\`| Display your own or somebody else's profile.\``, true)

      message.channel.send(embed)

      break;
    case 'ticket':
    case 'TICKET':

      var embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.tag} | Ticket Help`, message.author.displayAvatarURL)
      .setDescription(`List of ticket commands.\n(Reqiures \`MANAGE MESSAGES\` permissions.)`)
      .addField(`Command`, `
\`${currPrefix.prefix}new ticket\`
\`${currPrefix.prefix}add\`
\`${currPrefix.prefix}remove\`
\`${currPrefix.prefix}close\``, true)
      .addField(`Description`, `
\`| Create a new ticket.\`
\`| Add a member to a ticket.\`
\`| Remove a member from a ticket.\`
\`| Close a ticket.\``, true)

      message.channel.send(embed)

      break;
    case 'util':
    case 'UTIL':
    case 'utility':
    case 'UTILITY':

      var embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.tag} | Utility Help`, message.author.displayAvatarURL)
      .setDescription(`List of utility commands.\n(Reqiures no specific permissions.)`)
      .addField(`Command`, `
\`${currPrefix.prefix}afk\`
\`${currPrefix.prefix}avatar\`
\`${currPrefix.prefix}calc\`
\`${currPrefix.prefix}new\`
\`${currPrefix.prefix}ping\`
\`${currPrefix.prefix}report\`
\`${currPrefix.prefix}set\``, true)
      .addField(`Description`, `
\`| Add yourself to the AFK map.\`
\`| Shows yours or someone else's avatar.\`
\`| Just a basic calculator.\`
\`| Create a new ticket, or a new profile.\`
\`| Show Discord API response time.\`
\`| Create a report on a server member.\`
\`| Setup log & welcome channels, as well as ticket system.\``, true)

      message.channel.send(embed)

      break;
    default:

      var embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.tag} | Help Section`, message.author.displayAvatarURL)
      .setDescription(`List of sub commands.`)
      .addField(`Command`, `
\`${currPrefix.prefix}help admin\`
\`${currPrefix.prefix}help fun\`
\`${currPrefix.prefix}help info\`
\`${currPrefix.prefix}help mod\`
\`${currPrefix.prefix}help nsfw\`
\`${currPrefix.prefix}help profile\`
\`${currPrefix.prefix}help ticket\`
\`${currPrefix.prefix}help utility\``, true)
      .addField(`Description`, `
\`| Get the Admin help section\`
\`| Get the Fun help section\`
\`| Get the Info help section\`
\`| Get the Mod help section\`
\`| Get the NSFW help section\`
\`| Get the Profile help section\`
\`| Get the Ticket help section\`
\`| Get the Utility help section\``, true)

      message.channel.send(embed)

  }

}

module.exports.help = {
  name: "help",
  aliases: ["h", "welp"]
}


/*

OLD EMBED:

        .setTitle("Invite the Bot to your server!")
        .setDescription("-help")
        .setAuthor("Dobby Bot  |  Help Section")
        .addField(`Prefix in ${message.guild.name}:`, "`-`")
        .addField("*Fun* commands:", "\n`say` `rmemes` `meme` `kiss` `hug` `roles` `av` `snek` `timer`")
        .addField("*Info* commands:", "\n`botinfo` `serverinfo` `userinfo` `ping` `invite`")
        .addField("*NSFW* commands:", "\n`ass` `boobs` `sexy` `dick` `pussy`")
        .addField("*Moderation:* ", "\n`addrole` `takerole` `kick` `ban` `mute`\n `report` `warn` `unmute` `clear` `softban` `hackban`")
        .addField("Dobby Bot's Server", `Link: [Click here!](https://discord.gg/Xyk2Jkj)`)
        .setFooter("Creator: " + "Mr. Dobby ♛#0001")
        .setURL("https://discordapp.com/oauth2/authorize?client_id=570525775351119872&scope=bot&permissions=268443694")
        .setColor("#010000")
        .setThumbnail(botIcon)
        .setTimestamp()

*/

//EMBED HELP:

/*
EMBEDS SHOWCASE!

EMBED #1:
const embed = new Discord.RichEmbed()
  .setTitle("This is your title, it can hold 256 characters")
  .setAuthor("Author Name", "https://i.imgur.com/lm8s41J.png")
  .setColor(0x00AE86)
  .setDescription("This is the main body of text, it can hold 2048 characters.")
  .setFooter("This is the footer text, it can hold 2048 characters", "http://i.imgur.com/w1vhFSR.png")
  .setImage("http://i.imgur.com/yVpymuV.png")
  .setThumbnail("http://i.imgur.com/p2qNFag.png")

  .setTimestamp()
  .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
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