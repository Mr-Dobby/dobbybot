const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } );
  const Failure = bot.emojis.cache.get("697388354689433611");
  const Sucess = bot.emojis.cache.get("697388354668462110");

  var noPermsEmbedBot = new Discord.MessageEmbed()
      .setDescription(`${Failure} To see all roles, I requires \`ADMINISTRATOR\` permissions.`)
      .setColor("#ff0000")

    if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
        return message.channel.send(noPermsEmbedBot)
    }

    let IDs = message.guild.roles.cache.filter(r => r.id !== message.guild.id)
    .filter(r => r.permissions.has("SEND_MESSAGES"))
    .sort((a, b) => b.position - a.position)
    .map(i => i.id)
    .slice(0)
    .join("\n");

    let names = message.guild.roles.cache.filter(r => r.id !== message.guild.id)
    .filter(r => r.permissions.has("SEND_MESSAGES"))
    .sort((a, b) => b.position - a.position)
    .map(role => role.toString())
    .slice(0)
    .join("\n");

        const errorEmbed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setAuthor(`${message.author.tag} | Role Information`)
        .setTitle(`${Failure} Invalid role name or role ID`)
/*
        let allRolesEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.guild.name}'s Roles`, message.guild.iconURL)
        .setColor('#807A8F')
        .addField("Roles: ", names, true)
        .addField("IDs: ", IDs, true)
        .setFooter(`These are the roles you can check info on`)
        .setTimestamp()
*/

const RandomColour = ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);

        let roleNames = new Discord.MessageEmbed()
        .setAuthor(`Available roles in ${message.guild.name}`, message.guild.iconURL)
        .setDescription("Only roles with `SEND MESSAGES` permission enabled")
        .setColor(RandomColour)
        .addField("Roles:", names, true)
        .addField("IDs:", IDs, true)

        let role = args.join(" ");
          if (!role && [message.guild.roles.cache.find(r => r.name === role) || message.guild.roles.cache.get(role.id)]) {
              return message.channel.send(roleNames)
          }

        let gRole = message.guild.roles.cache.find(r => r.name === role) || message.guild.roles.cache.get(role);
        if (!gRole) return message.channel.send(errorEmbed)

        const status = {
            false: "No",
            true: "Yes"
        }

        const hexColor = gRole.hexColor;
        if (hexColor === "#000000") {
          hexColor === "#99AAB5"
        }

        const permsObj = gRole.permissions.serialize();
        var permissions = Object.keys(permsObj).filter(perm => permsObj[perm]).sort((a, b) => b.position - a.position).map(g => g.toString()).join(', ');
        if (!permissions) permissions = "This role doesn't have a single permission."

        let roleemebed0 = new Discord.MessageEmbed()
        .setColor(hexColor)
        .setAuthor(`${message.guild.name} | Role Information`, message.guild.iconURL)
        .setDescription(`\`${currPrefix.prefix}roleinfo\` | Alias: \`rinfo\``)
        .addField("Name", `${gRole.toString()}`, true)  
        .addField("Hex", gRole.hexColor, true)
        .addField("Members", gRole.members.size, true)
        .addField("Position", `${message.guild.roles.cache.size - gRole.position} out of ${message.guild.roles.cache.size}`, true)
        .addField("Hoisted", status[gRole.hoist], true)
        .addField("Mentionable", status[gRole.mentionable], true)
        .setFooter("Note: Permissions are only displayed if you've key permissions.")
        .setTimestamp()
        
        let roleemebed1 = new Discord.MessageEmbed()
        .setColor(hexColor)
        .setAuthor(`${message.guild.name} | Role Information`, message.guild.iconURL)
        .setDescription(`\`${currPrefix.prefix}roleinfo\` | Alias: \`rinfo\``)
        .addField("Name", `${gRole.toString()}`, true)  
        .addField("Hex", gRole.hexColor, true)
        .addField("Members", gRole.members.size, true)
        .addField("Position", `${message.guild.roles.cache.size - gRole.position} out of ${message.guild.roles.cache.size}`, true)
        .addField("Hoisted", status[gRole.hoist], true)
        .addField("Mentionable", status[gRole.mentionable], true)

        let roleemebed2 = new Discord.MessageEmbed()
        .setColor(hexColor)
        //.addField("Permissions0", permissions0)
        .setDescription(`**Permissions for role ${gRole.toString()}**\n\n${permissions}`)
        .setFooter("Note: Permissions are only displayed if you've Moderator permissions yourself.")

        let user = message.guild.member(message.author)

        if (user.hasPermission([("KICK_MEMBERS") || ("BAN_MEMBERS") || ("MANAGE_MESSAGES") || ("MANAGE_ROLES_OR_PERMISSIONS") || ("MANAGE_CHANNELS") || ("MUTE_MEMBERS") || ("DEAFEN_MEMBERS") || ("MOVE_MEMBERS") || ("MANAGE_GUILD")])) {
          message.channel.send(roleemebed1)
          message.channel.send(roleemebed2)
        } else {
          message.channel.send(roleemebed0)
        }
}

module.exports.help = {
  name: "roleinfo",
  aliases: ["rinfo"]
}
