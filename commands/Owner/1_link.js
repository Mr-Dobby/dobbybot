const Discord = require("discord.js");
//const Servers = require("../../lib/mongodb");

module.exports.run = async (bot, message, args) => {

//  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

      let botIcon = bot.user.displayAvatarURL({ dynamic: true });
      let inviteEmbed = new Discord.MessageEmbed()
          .setAuthor(`Le Links of Le ${bot.user.username}!`)
          .setColor("#010000")
          .setThumbnail(botIcon)
          .addField(`Invite ${bot.user.username} to your server:`, " → *[Click Here](https://discord.com/api/oauth2/authorize?client_id=786264014682324992&permissions=290843734&scope=bot)* ←")
          .addField(`Join the support server:`, " → *[Click Here](https://discord.gg/hAAYCS8WBN)* ←")
          .setTimestamp();

      message.channel.send(inviteEmbed)
}

module.exports.help = {
  name: "link",
  aliases: ["inv", "invite"]
}
