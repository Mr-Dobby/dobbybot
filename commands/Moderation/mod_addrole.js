const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

  let logName = await Logs.findOne( { guildID: message.guild.id } )
  const logchannel = bot.channels.get(logName.incidentLog)

  const Failure = bot.emojis.get("697388354689433611");
  const Sucess = bot.emojis.get("697388354668462110");

  var noPermsEmbed = new Discord.RichEmbed()
      .setDescription(`${Failure} Creating a role requires you to have \`MANAGE ROLES\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.RichEmbed()
      .setDescription(`${Failure} Creating a role requires me to have \`MANAGE ROLES\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
    return message.channel.send(noPermsEmbed);
  }

  if (logchannel) {

    const addRoleErrorEmbed = new Discord.RichEmbed()
        .setColor("#ff4f4f")
        .setTitle(`\`Command: ${currPrefix.prefix}addrole\` | Alias: \`makerole\``)
        .addField("**Description:**", "Creates, and gives a user a role.")
        .addField("**Command usage:**", `${currPrefix.prefix}addrole <@User> <Role Name>`)
        .addField("**Example:**", `${currPrefix.prefix}addrole @Mr.Dobby#0001 Members`)
        .setFooter("<> = Required | [] = Optional")

        let rMember = message.guild.member(message.mentions.users.last()) || message.guild.members.get(args[0]);
        if (!rMember) return message.channel.send(addRoleErrorEmbed);

        let roleName = args.join(" ").slice(22)
        if (!roleName) return message.channel.send(addRoleErrorEmbed);

        let botRole = message.guild.roles.find(r => r.name === "Dobby Bot");
        if (rMember.highestRole.position <= botRole.position) {
          return await message.channel.send(`My highest role needs to be higher than their highest.`);
        }

        let gRole = message.guild.roles.find(r => r.name === roleName);
        if (!gRole) {
          try {
            gRole = await message.guild.createRole({
              name: roleName,
              permissions: ["SEND_MESSAGES"]
            })
          } catch(err) {
            message.channel.send(`Error: ${err}`)
          }
        } else {
          return message.channel.send("Role has not been created.");
        }

        if (rMember.roles.has(gRole.id)) return message.channel.send("They already have that role.");
        await (rMember.addRole(gRole.id)).catch(console.error);

        try {
          await rMember.send(`Congrats, you have been given the role **${gRole.name}** in ${message.guild.name}`)
        } catch(e) {
          return;
        }

        const addroleEmbed = new Discord.RichEmbed()
              .setAuthor(`${rMember.user.tag} | Added role ✔️`, rMember.user.displayAvatarURL)
              .setDescription(`\`${currPrefix.prefix}addrole\` | Aliases: \`makerole\``)
              .setColor("#4fff7f")
              .addField("Created role", `${roleName}`, true)
              .addField(`User given the role`, `${rMember.user.tag} | <@${rMember.id}>`)
              .addField("Moderator", `${message.author.tag} | <@${message.author.id}>`, true)
              .setFooter(`ID: ${rMember.user.id}`)
              .setTimestamp();

        message.channel.send(`**Role added, and given to ${rMember.user.tag}**`)
        logchannel.send(addroleEmbed)

    } else {

        let rMember = message.guild.member(message.mentions.users.last()) || message.guild.members.get(args[0]);
        if (!rMember) return message.channel.send(addRoleErrorEmbed);

        let roleName = args.join(" ").slice(22)
        if (!roleName) return message.channel.send(addRoleErrorEmbed);

        let botRole = message.guild.roles.find(r => r.name === "Dobby Bot");
        if (rMember.highestRole.position <= botRole.position) {
          return await message.channel.send(`My highest role needs to be higher than their highest.`);
        }

        let gRole = message.guild.roles.find(r => r.name === roleName);
        if (!gRole) {
          try {
            gRole = await message.guild.createRole({
              name: roleName,
              permissions: ["SEND_MESSAGES"]
            })
          } catch(err) {
            message.channel.send(`Error: ${err}`)
          }
        } else {
          return message.channel.send("**Task Failed Successfully... wait**");
        }

        if (rMember.roles.has(gRole.id)) return message.channel.send("They already have that role.");
        await (rMember.addRole(gRole.id)).catch(console.error);

        try {
          await rMember.send(`Congrats, you have been given the role **${gRole.name}** in ${message.guild.name}`)
        } catch(e) {
          return;
        }

        message.channel.send(`**Role added, and given to ${rMember.user.tag}**`)

    }    
}

module.exports.help = {
name: "addrole",
aliases: ["makerole"]
}
