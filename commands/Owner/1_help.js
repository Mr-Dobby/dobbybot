const Discord = require("discord.js");
const commando = require("discord.js-commando");
const Servers = require("../../lib/mongodb");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } );

  var action = args[0];
  if (!action) {
    if (message.author.id == '441478072559075328') {

      var embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | Help Section`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`List of sub-help commands.`)
      .addField(`Command`, `
\`${currPrefix.prefix}help admin\`
\`${currPrefix.prefix}help fun\`
\`${currPrefix.prefix}help info\`
\`${currPrefix.prefix}help mod\`
\`${currPrefix.prefix}help music\`
\`${currPrefix.prefix}help nsfw\`
\`${currPrefix.prefix}help profile\`
\`${currPrefix.prefix}help ticket\`
\`${currPrefix.prefix}help utility\`
\`${currPrefix.prefix}help dev\``, true)
      .addField(`Description`, `
\`| Get the Admin help section\`
\`| Get the Fun help section\`
\`| Get the Info help section\`
\`| Get the Mod help section\`
\`| Get the NSFW help section\`
\`| Get the Profile help section\`
\`| Get the Ticket help section\`
\`| Get the Utility help section\`
\`| Get the Developer help section\``, true)

      message.channel.send(embed)

    } else {

      var embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | Help Section`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`List of sub-help commands.`)
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

  switch (action) {
    case 'admin':
    case 'administration':

      var embed = new Discord.MessageEmbed()
          .setAuthor(`${message.author.tag} | Administration Help`, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`List of Administration commands.\n(Reqiures \`ADMINISTRATOR\` permissions.)`)
          .addField(`Command`, `
\`${currPrefix.prefix}hackban\`
\`${currPrefix.prefix}logging\`
\`${currPrefix.prefix}nuke\`
\`${currPrefix.prefix}prefix\`
\`${currPrefix.prefix}raid\`
\`${currPrefix.prefix}set\`
\`${currPrefix.prefix}enable\`
\`${currPrefix.prefix}disable\``, true)
          .addField(`Description`, `
\`| Ban a user that is not a part of the server.\`
\`| Create new log channels, with default permissions.\`
\`| Clean up after a raid by banning newly joined members.\`
\`| Change bot prefix to anything you desire.\`
\`| Toggle this to autoban anyone joining, easily stops a raid.\`
\`| Setup logs, a welcome log as well as the ticket system.\`
\`| Enable server functions.\`
\`| Disable server functions.\``, true)
          
          message.channel.send(embed)

      break;
    case 'fun':

      var embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | Fun Help`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`List of fun commands.\n(Reqiures no special permissions.)`)
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
\`${currPrefix.prefix}owo\`
\`${currPrefix.prefix}rate\`
\`${currPrefix.prefix}say\`
\`${currPrefix.prefix}slots\`
\`${currPrefix.prefix}thisorthat\`
\`${currPrefix.prefix}timer\`
\`${currPrefix.prefix}votekick\`
\`${currPrefix.prefix}whoasked\`
\`${currPrefix.prefix}wouldyourather\``, true)
      .addField(`Description`, `
\`| Ask a question and let ${bot.user.username} answer you.\`
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
\`| OwOify some text uwu\` 
\`| Let ${bot.user.username} rate something for you.\`
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
    case 'information':

      var embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | Information Help`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`List of Informative commands.\n(Reqiures no special permissions.)`)
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
    case 'moderation':

      var embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | Moderaton Help`, message.author.displayAvatarURL({ dynamic: true }))
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
    case 'music':

      var embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | Music Help`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`List of musical commands.\n(Reqiures permission to join your voice channel)`)
      .addField(`Command`, `
\`${currPrefix.prefix}clearqueue\`
\`${currPrefix.prefix}filter\`
\`${currPrefix.prefix}loop\`
\`${currPrefix.prefix}nowplaying\`
\`${currPrefix.prefix}pause\`
\`${currPrefix.prefix}play\`
\`${currPrefix.prefix}queue\`
\`${currPrefix.prefix}resume\`
\`${currPrefix.prefix}search\`
\`${currPrefix.prefix}shuffle\`
\`${currPrefix.prefix}skip\`
\`${currPrefix.prefix}stop\`
\`${currPrefix.prefix}volume\`
\`${currPrefix.prefix}wfilter\``, true)
      .addField(`Description`, `
\`| Clear the music queue.\`
\`| Filter the music.\`
\`| Loop the current playing song/queue.\`
\`| Show what's currently playing.\`
\`| Pause the music.\`
\`| Play some music.\`
\`| Reesume music when it's stopped.\`
\`| Search for music without playing it.\`
\`| Shuffle the queue of music.\` 
\`| Skip to the next song in the queue.\`
\`| Change the volume of the playing music.\`
\`| Show enabled/disabled filters.\``, true)

      break;
    case 'nsfw':

      var embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | NSFW Help`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`List of NSFW commands.\n(Reqiures a NSFW channel.)`)
      .addField(`Command`, `
\`${currPrefix.prefix}nsfwhuh\`
\`${currPrefix.prefix}4k\`
\`${currPrefix.prefix}anal\`
\`${currPrefix.prefix}ass\`
\`${currPrefix.prefix}blowjob\`
\`${currPrefix.prefix}boobs\`
\`${currPrefix.prefix}hentai\`
\`${currPrefix.prefix}holo\`
\`${currPrefix.prefix}neko\`
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
\`| Command name says it all.\`
\`| Command name says it all.\`
\`| Command name says it all.\`
\`| 4K quality GIFs.\`
\`| Command name says it all.\`
\`| Command name says it all.\``, true)
      
      message.channel.send(embed)

      break;
    case 'profile':

      var embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | Profile Help`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`List of profile commands.\n(Reqiures no special permissions.)`)
      .addField(`Command`, `
\`${currPrefix.prefix}colour\`
\`${currPrefix.prefix}daily\`
\`${currPrefix.prefix}give\`
\`${currPrefix.prefix}quote\`
\`${currPrefix.prefix}rep\`
\`${currPrefix.prefix}steal\`
\`${currPrefix.prefix}thumbnail\`
\`${currPrefix.prefix}profile\``, true)
      .addField(`Description`, `
\`| Change colour of your profile.\`
\`| Get daily rewards.\`
\`| Give DB to another server member.\`
\`| Change quote of your profile.\`
\`| Give reputation point to another server member.\`
\`| Try to steal DB from another server member.\`
\`| Change thumbnail of your profile.\`
\`| Display your own or somebody else's profile.\``, true)

      message.channel.send(embed)

      break;
    case 'ticket':

      var embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | Ticket Help`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`List of ticket commands.\n(Reqiures \`MANAGE MESSAGES, CHANNELS\` permissions.)`)
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
    case 'utility':

      var embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | Utility Help`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`List of utility commands.\n(Reqiures no special permissions.)`)
      .addField(`Command`, `
\`${currPrefix.prefix}afk\`
\`${currPrefix.prefix}avatar\`
\`${currPrefix.prefix}calc\`
\`${currPrefix.prefix}new\`
\`${currPrefix.prefix}ping\`
\`${currPrefix.prefix}report\``, true)
      .addField(`Description`, `
\`| Add yourself to the AFK map.\`
\`| Shows yours or someone else's avatar.\`
\`| Just a basic calculator.\`
\`| Create a new ticket, or a new profile.\`
\`| Show Discord API response time.\`
\`| Create a report on a server member.\``, true)

      message.channel.send(embed)

      break;
    case 'dev':
    case 'developer':
    case 'owner':

      if (!message.author.id == '441478072559075328') return;

      var embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | Owner Help`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`List of owner commands.\n(Reqiures BOT DEV permissions.)`)
      .addField(`Command`, `
\`${currPrefix.prefix}allguilds\`
\`${currPrefix.prefix}blacklist\`
\`${currPrefix.prefix}canvas\`
\`${currPrefix.prefix}eval\`
\`${currPrefix.prefix}guildbanrandom\`
\`${currPrefix.prefix}guildleave\`
\`${currPrefix.prefix}guildlist\`
\`${currPrefix.prefix}msg\`
\`${currPrefix.prefix}reboot\`
\`${currPrefix.prefix}shutdown\`
\`${currPrefix.prefix}spam\`
\`${currPrefix.prefix}test\`
\`${currPrefix.prefix}rr\``, true)
      .addField(`Description`, `
\`| Logs all channels the bot can see.\`
\`| Blacklist any member from usage of the bot (rework).\`
\`| Test of canvas commands and edits.\`
\`| Evaluate code/input and get results.\`
\`| Randomly ban a member of a guild.\`
\`| Force leave any guild using ID.\`
\`| Shows a list of servers the bot is in.\`
\`| Message any user across Discord via IDs.\`
\`| Restart the bot or seperate command (rework).\`
\`| Stop the proccess of the bot, and shut it off.\`
\`| Spam any user accross Discord via IDs.\`
\`| Test command, used to any quick tests needed.\`
\`| Reaction Roles, test command (rework).\``, true)

      message.channel.send(embed)

      break;

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