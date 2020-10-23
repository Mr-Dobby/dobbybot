const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

  let logName = await Logs.findOne( { guildID: message.guild.id } )
  const logchannel = bot.channels.get(logName.incidentLog)

  const Failure = bot.emojis.cache.get("697388354689433611");
  const Sucess = bot.emojis.cache.get("697388354668462110");

  var noPermsEmbed = new Discord.MessageEmbed()
      .setDescription(`${Failure} Deleting roles requires you to have \`MANAGE ROLES\` and \`MANAGE CHANNELS\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.MessageEmbed()
      .setDescription(`${Failure} Deleting roles requires me to have \`MANAGE ROLES\` and \`MANAGE CHANNELS\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission("MANAGE_ROLES" && "MANAGE_CHANNELS")) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission(["MANAGE_ROLES" && "MANAGE_CHANNELS"])) {
    return message.channel.send(noPermsEmbed);
  }

  if (logchannel) {

        let delRoleErrorEmbed = new Discord.MessageEmbed()
            .setColor("#ff4f4f")
            .setTitle(`\`Command: ${currPrefix.prefix}delrole\` | Alias: \`removerole\``)
            .addField("**Description:**", "Deletes a role. (By name or ID)")
            .addField("**Command usage:**", `${currPrefix.prefix}delrole <Role Name | Role ID>`)
            .addField("**Example:**", `${currPrefix.prefix}delrole Test Role`)
            .setFooter("<> = Required, [] = Optional")

        roleName = args.join(" ")
        let delRole = (message.guild.roles.cache.find(role => role.name === roleName) || message.guild.roles.cache.get(args[0]))
        if (!delRole) return message.channel.send(delRoleErrorEmbed);

        let botRole = message.guild.roles.cache.find(r => r.name === "Dobby Bot");
        if (delRole.position >= botRole.position) {
          return await message.channel.send(`My highest role needs to be higher than the role you're trying to delete.`);
        }

        if (message.member.highestRole.position <= delRole.position) return message.channel.send("Can't delete a role you're lower than.")
        if (message.guild.me.highestRole.position <= delRole.position) return message.channel.send("Can't delete a role I'm lower than.")

        let delRoleEmbed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} | Deleted role`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`\`${currPrefix.prefix}delrole\` | Aliases: \`removerole\``)
            .setColor("#ff4f4f")
            .addField("Deleted role name", `${roleName}`, true)
            .addField("Moderator", `<@${message.author.id}>`, true)
            .setFooter(`ID: ${message.author.id}`)
            .setTimestamp();

        delRole.delete();
        logchannel.send(delRoleEmbed)

        let successEmbed = new Discord.MessageEmbed()
        .setDescription("**Role deleted.**")

        message.channel.send(successEmbed)

    } else {

      let delRoleErrorEmbed = new Discord.MessageEmbed()
      .setColor("#ff4f4f")
      .setTitle(`\`Command: ${currPrefix.prefix}delrole\` | Alias: \`removerole\``)
      .addField("**Description:**", "Deletes a role. (By name or ID)")
      .addField("**Command usage:**", `${currPrefix.prefix}delrole <Role Name | Role ID>`)
      .addField("**Example:**", `${currPrefix.prefix}delrole Test Role`)
      .setFooter("<> = Required, [] = Optional")

  roleName = args.join(" ")
  let delRole = (message.guild.roles.cache.find(role => role.name === roleName) || message.guild.roles.cache.get(args[0]))
  if (!delRole) return message.channel.send(delRoleErrorEmbed);

  let botRole = message.guild.roles.cache.find(r => r.name === "Dobby Bot");
  if (delRole.position >= botRole.position) {
    return await message.channel.send(`My highest role needs to be higher than the role you're trying to delete.`);
  }

  if (message.member.highestRole.position <= delRole.position) return message.channel.send("Can't delete a role you're lower than.")
  if (message.guild.me.highestRole.position <= delRole.position) return message.channel.send("Can't delete a role I'm lower than.")

  delRole.delete();
  message.channel.send(successEmbed)

    }
}

module.exports.help = {
  name: "delrole",
  aliases: ["removerole"]
}
