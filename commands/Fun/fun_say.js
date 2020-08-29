const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("SEND_MESSAGES")) return message.channel.send("No");
  var smthng2say = args.join(" ");
  if (!smthng2say) return;
  message.delete();

  const RandomColour = ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
    if (args[0].toLowerCase() === "embed") {
      if (args.slice(1).length <= 2000) {

      const embed = new Discord.MessageEmbed()
          .setDescription(args.slice(1).join(" "))
          .setColor(RandomColour);
  
        message.channel.send(embed);
      } else {
        message.channel.send(smthng2say);
      }
    } else {
      message.channel.send(smthng2say);
  }

}

module.exports.help = {
  name: "say",
  aliases: []
}
