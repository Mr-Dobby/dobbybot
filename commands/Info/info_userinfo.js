const Discord = require("discord.js");
const moment = require("moment");
const { clientMap } = require('../../storage/config.json')

module.exports.run = async (bot, message, args, client) => {

      let user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author);

        // The maths behind Account Creation & Joined Guild
      function checkDays(date) {
          let now = new Date();
          let diff = now.getTime() - date.getTime();
          let days = Math.floor(diff / 86400000);
          return days + (days == 1 ? " day" : " days") + " ago";
      };

      var permissions = [];

      if (user.hasPermission("ADMINISTRATOR")) {
          permissions.push("Administrator");
      }

      if (user.hasPermission("KICK_MEMBERS")) {
          permissions.push("Kick Members");
      }
      
      if (user.hasPermission("BAN_MEMBERS")) {
          permissions.push("Ban Members");
      }
  
      if (user.hasPermission("MANAGE_MESSAGES")) {
          permissions.push("Manage Messages");
      }
      
      if (user.hasPermission("MANAGE_CHANNELS")) {
          permissions.push("Manage Channels");
      }

      if (user.hasPermission("MANAGE_ROLES")) {
          permissions.push("Manage Roles");
      }
      
      if (user.hasPermission("MENTION_EVERYONE")) {
          permissions.push("Mention Everyone");
      }
  
      if (user.hasPermission("MANAGE_NICKNAMES")) {
          permissions.push("Manage Nicknames");
      }
  
      if (user.hasPermission("MANAGE_WEBHOOKS")) {
          permissions.push("Manage Webhooks");
      }
  
      if (user.hasPermission("MANAGE_EMOJIS")) {
          permissions.push("Manage Emojis");
      }

      if (user.hasPermission("MUTE_MEMBERS")) {
          permissions.push("Server Mute");
      }

      if (user.hasPermission("DEAFEN_MEMBERS")) {
          permissions.push("Server Deafen");
      }

      if (user.hasPermission("MOVE_MEMBERS")) {
          permissions.push("Move Members");
      }
  
      if (permissions.length == 0) {
          permissions.push("• No Key Permissions Found");
      }

      let Online = bot.emojis.cache.get("691958418180800553");
      let Idle = bot.emojis.cache.get("691958427496480824");
      let DnD = bot.emojis.cache.get("691958436539400233");
      let Offline = bot.emojis.cache.get("691961517050036225");
      let Bot = bot.emojis.cache.get("686870651620950040");

      let status = {
            "online"   : `${Online} Online`,
            "idle"     : `${Idle} Idle/AFK`,
            "dnd"      : `${DnD} DnD`,
            "offline"  : `${Offline} Offline`
      };

      //SERVER PERMISSIONS
      if (user === message.guild.owner) {
          serverPerms = "Owner"
        } else if (user.user.bot) {
          serverPerms = `Bot ${Bot}`
        } else if (user.hasPermission("ADMINISTRATOR")) {
          serverPerms = "Administrator"
        } else if (user.hasPermission(["KICK_MEMBERS" || "BAN_MEMBERS" || "MANAGE_MESSAGES" || "MANAGE_ROLES_OR_PERMISSIONS" || "MANAGE_CHANNELS" || "MUTE_MEMBERS" || "DEAFEN_MEMBERS" || "MOVE_MEMBERS" || "MANAGE_GUILD"])) {
          serverPerms = "Moderator"
        } else {
          serverPerms = "Member"
        }

        const clients = Object.keys(
          (user.user && user.user.presence.clientStatus) || {}
        )
          .map((client) => clientMap[client])
          .join("");

      let userRoles = user.roles.cache.filter(r => r.id !== message.guild.id).sort((a, b) => b.position - a.position).map(g => g.toString()).join(" ");
      if (!userRoles) userRoles = `No roles assigned.`

      let roleCount = `${user.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}`
      if (!roleCount) roleCount = "0"

      moment.locale("en-gb");
      let created = moment(user.user.createdAt).format('L');
      let joined = moment(user.joinedAt).format('L');

      let UREmbed = new Discord.MessageEmbed()
          .setDescription(`Roles [${roleCount}]\n${userRoles}`)
          .setColor("#010000")

      //  var highestRole = member.highestRole.id !== '@everyone' ? member.highestRole.id : 'User doesn\'t have any roles';

      await message.channel.send({embed: {

            author: { name: `${user.user.tag} | Information`, icon_url: user.user.displayAvatarURL({ dynamic: true }) },
            thumbnail: { url: user.user.displayAvatarURL({ dynamic: true }) },
            description: `<@${user.user.id}> | ID: ${user.user.id}`,
            color: 0x01000,
            fields: [

              { name: `➞ Client Status`, value: `• ${clients}`, inline: true },
              { name: `➞ Presence Status`, value: `• ${status[user.presence.status]}`, inline: true },
              { name: `➞ Server Position`, value: `• ${serverPerms}`, inline: true },
              { name: `➞ Account created`, value: `• ${created}\n• ${checkDays(user.user.createdAt)}\n`, inline: true },
              { name: `➞ Joined the server`, value: `• ${joined}\n• ${checkDays(user.joinedAt)}`, inline: true },
              { name: `➞ Special Permissions`, value: `\`${permissions.join(', ')}\``, inline: false }

          ]
        }
      })
    await message.channel.send(UREmbed)

}

module.exports.help = {
  name: "userinfo",
  aliases: ["whois", "uinfo"]
}

//IF DISCORD EVER GOES BACK TO OLD LOOK; THROW `userRoles` AT BOTTOM; CHANGE ORDER: USERNAME, CURRENT STATUS, ACCOUNT CREATED AT, SERVER STATUS, JOINED THE SERVER AT!

/*
OLD EMBED:
      // The userinfo Embed itself.
      let userURL = user.user.displayAvatarURL({ dynamic: true });
      let userEmbed = new Discord.MessageEmbed()
            .setTitle("User Information :bust_in_silhouette:")
            .setDescription("**-userinfo @User**")
            .setColor("#010000")
            .setThumbnail(userURL)
            .addField("➞ Username", `<@${member.id}> | ${member.user.tag}`)
            .addField("➞ Account creation date ", `${user.user.createdAt.toUTCString().substr(0, 16)} (${checkDays(user.user.createdAt)})`, true)
            .addField("➞ User's status", `${status[user.presence.status]}`, true)
            .addField("➞ User joined", `${user.joinedAt.toLocaleString().substr(0, 16)} (${checkDays(user.joinedAt)})`, true)
            .addField("➞ User's server roles", `${member.roles.filter(r => r.id !== message.guild.id).sort((a, b) => b.position - a.position).map(g => g.toString()).join(' **|** ')}`, true)
            .setFooter(`ID: ${user.user.id}`)
            .setTimestamp()

          message.channel.send(userEmbed);
*/

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
