const Discord = require("discord.js");
const commando = require("discord.js-commando");

module.exports.run = async (bot, message, args, client) => {

  if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
    return message.channel.send("I require Administrative permissions to run this command.");
  }

  if (message.author) return;

  let member = message.member;
  if (member.highestRole.position < message.guild.me.highestRole.position && !member.hasPermission("ADMINISTRATOR")) return message.channel.send("Woah, hold it there.\nYou actually need to be higher than me **AND** be a server Administrator to do this. This is a dangerous command. Contact the server owner.")

    const giveallroleErrorEmbed = new Discord.RichEmbed()
          .setColor ("#4fff7f")
          .setTitle ("`Command: -giveallrole`")
          .addField ("**Description:**", "Gives **EVERY** user a specified role.")
          .addField ("**Command usage:**", "-giveallrole <Role ID>")
          .addField ("**Example:**", "-giveallrole 000000000000000001")
          .setFooter("<> = Required | [] = Optional | Bot must control the specified role.")

    const roleID = args.join(" ");
    if (!roleID) return message.channel.send(giveallroleErrorEmbed);
    let roleByID = message.guild.roles.get(roleID);
    let botRole = message.guild.roles.find(r => r.name === "Dobby Bot");

  if (!roleByID) {
      return message.channel.send("This role isn't in this server.")
    }

  if (!roleByID.position > botRole.position) {
      return await message.channel.send(`I need to be higher than this role in order to control it.\nRemember this happens to **all** members. Assign **${roleByID.name}** role mantually, or move `+"`Dobby Bot`"+` role up!`);
    }
    
    message.channel.send(`Role **${roleByID.name}** will be added to all members\nPlease be patient`);
    let logs = message.guild.channels.find(channel => channel.name === "incident-logs" || channel.name === "dobby-logs");

    if (!logs) return message.channel.send("I require logs for this command to be used. Try `-logs`")

    for (const member of roleByID) {
        member.addRole(roleByID)
        console.log("Success!");
    }
  
}

module.exports.help = {
  name: "giveallrole",
  aliases: []
}
