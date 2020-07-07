const Discord = require("discord.js");
const commando = require("discord.js-commando");

module.exports.run = async (bot, message, args, client) => {

  if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
    return message.channel.send("I require Administrative permissions to run this command.")
  }

  if (message.author) return;

  let member = message.member;
  if (!member.hasPermission("ADMINISTRATOR")) return message.channel.send("Woah, hold it there.\nYou actually need to be a Server Administrator to execute `-takeallrole`.")

    const takeallroleErrorEmbed = new Discord.RichEmbed()
          .setColor ("#ff4f4f")
          .setTitle ("`Command: -giveallrole`")
          .addField ("**Description:**", "From **EVERY** user the bot controls, it will remove specified role.")
          .addField ("**Command usage:**", "-takeallrole <role ID>")
          .addField ("**Example:**", "-takeallrole Member")
          .setFooter("<> = Required | [] = Optional")

    const roleID = args.join(" ");
    if (!roleID) return message.channel.send(takeallroleErrorEmbed)
    let roleByID = message.guild.roles.get(roleID)
    let botRole = message.guild.roles.find(r => r.name == "Dobby Bot")

    if (!roleByID.position > botRole.position) return message.channel.send("I need to be higher than this role in order to control it.\nRemember this happens to **all** members. Assign to a few mantually, or move `Dobby Bot` role up!");

    let logs = message.guild.channels.find(channel => channel.name === "incident-logs" || channel.name === "dobby-logs");
    if (!logs) return message.channel.send("I require logs for this command to be used. Try `-logs`")

    let AllMembers = [];

    for (const member of AllMembers) {
      member.removeRole(roleByID)
      console.log("Success!");
  }
  
}

module.exports.help = {
  name: "takeallrole",
  aliases: []
}
