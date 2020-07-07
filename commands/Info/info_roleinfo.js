const Discord = require("discord.js");

module.exports.run = async (bot, message, args, client) => {

    let IDs = message.guild.roles.filter(r => r.id !== message.guild.id)
    .filter(r => r.hasPermission("SEND_MESSAGES"))
    .sort((a, b) => b.position - a.position)
    .map(i => i.id)
    .slice(0)
    .join("\n");

    let names = message.guild.roles.filter(r => r.id !== message.guild.id)
    .filter(r => r.hasPermission("SEND_MESSAGES"))
    .sort((a, b) => b.position - a.position)
    .map(role => role.toString())
    .slice(0)
    .join("\n");

        const errorEmbed = new Discord.RichEmbed()
        .setColor("#ff0000")
        .setAuthor("ARGUMENT ERROR")
        .setTitle(":x: **Please specify a role name or a role ID** :x:")
/*
        let allRolesEmbed = new Discord.RichEmbed()
        .setAuthor(`${message.guild.name}'s Roles`, message.guild.iconURL)
        .setColor('#807A8F')
        .addField("Roles: ", names, true)
        .addField("IDs: ", IDs, true)
        .setFooter(`These are the roles you can check info on`)
        .setTimestamp()
*/

const RandomColour = ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);

        let roleNames = new Discord.RichEmbed()
        .setAuthor(`Available roles in ${message.guild.name}`, message.guild.iconURL)
        .setDescription("Only roles with `SEND MESSAGES` permission enabled")
        .setColor(RandomColour)
        .addField("Roles:", names, true)
        .addField("IDs:", IDs, true)
        .setFooter(`These are the roles you can check info on`)
        .setTimestamp()

        let role = args.join(" ");
        if (!role) {
          if (!message.guild.member(message.author).hasPermission("MANAGE_ROLES")) {
            return message.channel.send(errorEmbed)
            } if (!message.guild.roles <= 30) {
                return message.channel.send(roleNames)
                  } else {
                      return message.channel.send(roleNames)
                  }
                }

        let gRole = message.guild.roles.find(r => r.name === role) || message.guild.roles.get(role);
        if (!gRole) return message.channel.send(errorEmbed)

        const status = {
            false: "No",
            true: "Yes"
          }

        hexColor = gRole.hexColor;
        if (hexColor === "#000000") {
          hexColor === "#99AAB5"
        }

        const permsObj = gRole.serialize();
        var permissions = Object.keys(permsObj).filter(perm => permsObj[perm]).sort((a, b) => b.position - a.position).map(g => g.toString()).join(', ');
        if (!permissions) permissions = "This role doesn't have a single permission."

        let roleemebed0 = new Discord.RichEmbed()
        .setColor(hexColor)
        .setAuthor(`${gRole.toString()} | Information`, message.guild.iconURL)
        .addField("Name", `${gRole.toString()}`, true)  
        .addField("Hex", gRole.hexColor, true)
        .addField("Members", gRole.members.size, true)
        .addField("Position", `${message.guild.roles.size - gRole.position} out of ${message.guild.roles.size}`, true)
        .addField("Hoisted", status[gRole.hoist], true)
        .addField("Mentionable", status[gRole.mentionable], true)
        .setFooter("Note: Permissions are only displayed if you've key permissions.")
        .setTimestamp()
        
        let roleemebed1 = new Discord.RichEmbed()
        .setColor(hexColor)
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setDescription("`-roleinfo` | Alias: `rinfo`")
        .addField("Name", `${gRole.toString()}`, true)  
        .addField("Hex", gRole.hexColor, true)
        .addField("Members", gRole.members.size, true)
        .addField("Position", `${message.guild.roles.size - gRole.position} out of ${message.guild.roles.size}`, true)
        .addField("Hoisted", status[gRole.hoist], true)
        .addField("Mentionable", status[gRole.mentionable], true)

        let roleemebed2 = new Discord.RichEmbed()
        .setColor(hexColor)
        .setDescription(`Permissions for ${gRole.toString()}`)
        //.addField("Permissions0", permissions0)
        .addField("Permissions:", permissions)
        .setFooter("Note: Permissions are only displayed if you've Moderator permissions yourself.")
        .setTimestamp()

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
