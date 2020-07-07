const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  message.delete();

  if (!message.member.hasPermission("SEND_MESSAGES")) return message.channel.send("No");
  if (args.length < 0) {
    return;
  }

  const RandomColour = ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
  if (message.author) {
    if (args[0].toLowerCase() === "embed") {
      const embed = new Discord.RichEmbed()
          .setDescription(args.slice(1).join(" "))
          .setColor(RandomColour);
  
        message.channel.send(embed);
      }
    } else {
      message.channel.send(args.join(" "));
    }

}

module.exports.help = {
  name: "say",
  aliases: []
}
