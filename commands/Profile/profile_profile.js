const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Profile = require("../../lib/profile");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Dobby_Bot', {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
        if (err) return console.error(err);
});

module.exports.run = async (bot, message, args, client) => {

    let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author);

    let currPrefix = await Servers.findOne( { guildID: message.guild.id } )
    let userProfile = await Profile.findOne( { user: member.id } )
    const Failure = bot.emojis.cache.get("697388354689433611");
    const Sucess = bot.emojis.cache.get("697388354668462110");

    const curxp = userProfile.xp;
    const nxtLvl =  5 * Math.pow(userProfile.globalLevel, 2) + 50 * userProfile.globalLevel + 100;

    let noProfile = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Missing profile`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} You have no profile yet! Create one with \`${currPrefix.prefix}new profile\``)
        .setColor("#ff4f4f")

    let noProfile1 = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Missing profile`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} ${member} doesn't have a profile yet!`)
        .setColor("#ff4f4f")

        if (member.id === message.author.id && !userProfile) return message.channel.send(noProfile)
        if (!userProfile) return message.channel.send(noProfile1)

        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

    var profileEmbed = new Discord.MessageEmbed()
        .setAuthor(`${userProfile.userName} | Profile`, member.user.displayAvatarURL({ dynamic: true }))
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
