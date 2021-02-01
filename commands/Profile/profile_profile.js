const Discord = require("discord.js");
const Profile = require("../../lib/profile");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Dobby_Bot', {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
        if (err) return console.error(err);
});

module.exports.run = async (bot, message, args, client) => {

    let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author);

    let userProfile = await Profile.findOne( { user: member.id } )
    const Failure = bot.emojis.cache.get("697388354689433611");
    const Sucess = bot.emojis.cache.get("697388354668462110");

    let noProfile = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Missing profile`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} ${member} doesn't have a profile yet!`)
        .setColor("#ff4f4f")

    if (!userProfile) return message.channel.send(noProfile)

    const curxp = userProfile.xp;
    const nxtLvl =  5 * Math.pow(userProfile.globalLevel, 2) + 50 * userProfile.globalLevel + 100;

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    var profileEmbed = new Discord.MessageEmbed()
        .setAuthor(`${member.user.username}'s profile`, member.user.displayAvatarURL({ dynamic: true }))
        .setThumbnail(userProfile.thumbnail)
        .setDescription(`**Quote:** ${userProfile.quote}`)
        .addField(`Statistics`, `💖 Reputation Points: **${userProfile.globalReputation}**\n💸 Balance: **${numberWithCommas(userProfile.balance)}**\n`, false)
        .addField(`Level`, `💯 Level: \`${userProfile.globalLevel}\`\n🆙 Level up: \`${curxp}/${nxtLvl}\` XP`, false)
        .addField(`Items & Inventory`, userProfile.inventory, false)
        .setColor(userProfile.colour)

    await message.channel.send(profileEmbed)

}

module.exports.help = {
  name: "profile",
  aliases: ["p"]
}
