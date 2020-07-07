const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Profile = require("../../lib/profile");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Dobby_Bot', {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
        if (err) return console.error(err);
});

module.exports.run = async (bot, message, args, client) => {

    let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]) || message.author);

    let currPrefix = await Servers.findOne( { guildID: message.guild.id } )
    let userProfile = await Profile.findOne( { user: member.id } )
    const Failure = bot.emojis.get("697388354689433611");
    const Sucess = bot.emojis.get("697388354668462110");

//    let curxp = userProfile.xp;
//    let nxtLvl = 30 * (Math.pow(2, userProfile.globalLevel) - 1);
//    let Difference = nxtLvl - curxp;

    noProfile = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Missing profile`, message.author.displayAvatarURL)
        .setDescription(`${Failure} You have no profile yet! Create one with \`${currPrefix.prefix}new profile\``)
        .setColor("#ff4f4f")

    noProfile1 = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Missing profile`, message.author.displayAvatarURL)
        .setDescription(`${Failure} ${member} doesn't have a profile yet!`)
        .setColor("#ff4f4f")

        if (member.id === message.author.id && !userProfile) return message.channel.send(noProfile)
        if (!userProfile) return message.channel.send(noProfile1)

    var profileEmbed = new Discord.RichEmbed()
        .setAuthor(`${userProfile.userName} | Profile`, member.user.displayAvatarURL)
        .setThumbnail(userProfile.thumbnail)
        .setDescription(`**Quote:** ${userProfile.quote}\n\n\n💖 Reputation Points: **${userProfile.globalReputation}**\n💸 Balance: **${userProfile.balance}**\n💯 Level: **${userProfile.globalLevel}**`)
        .addField(`Items & Inventory`, userProfile.inventory, true)
        .setColor(userProfile.colour)

    await message.channel.send(profileEmbed)

}

module.exports.help = {
  name: "profile",
  aliases: ["p"]
}
