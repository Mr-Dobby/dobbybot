const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");

module.exports.run = async (bot, message, args) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

      let botIcon = bot.user.displayAvatarURL;
      let inviteEmbed = new Discord.RichEmbed()
          .setTitle(`Important ${bot.user.username} links!`)
          .setDescription(`**${currPrefix.prefix}link** | Aliases: \`inv\`, \`invite\``)
          .setColor("#010000")
          .setThumbnail(botIcon)
          .addField(`Invite ${bot.user.username} to your server:`, " → *[Click Here](https://discordapp.com/oauth2/authorize?client_id=570525775351119872&scope=bot&permissions=268443694)* ←")
          .addField(`Join ${bot.user.username}'s server:`, " → *[Click Here](https://discord.gg/HXPCWfv)* ←")
          .setFooter("Don't trust these links?: http://tiny.cc/Dobbyland | http://tiny.cc/Dobbybot")
          .setTimestamp();

      message.channel.send(inviteEmbed)
}

module.exports.help = {
  name: "link",
  aliases: ["inv", "invite"]
}
