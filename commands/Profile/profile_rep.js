const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Profile = require("../../lib/profile");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Dobby_Bot', {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
        if (err) return console.error(err);
});
const Duration = require('humanize-duration');
const CoolDown = new Map();

module.exports.run = async (bot, message, args, client) => {

    const Failure = bot.emojis.cache.get("697388354689433611");
    const Sucess = bot.emojis.cache.get("697388354668462110");

    let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if (!member) return;
    if (member.id === message.author.id) return;
    if (member.bot) return;

    noProfile = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Missing profile`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} ${member} has no profile to add reputation points to.`)
        .setColor("#ff4f4f")

    RepEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Reputation Point`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Sucess} You've given a reputation point to ${member}`)
        .setColor("#7aff7a")

        let userProfile = await Profile.findOne( { user: member.id } )
        if (!userProfile) return message.channel.send(noProfile)

        const timeout = 21599999;
        const cooldown = CoolDown.get(message.author.id)
        if (cooldown) {
            const timeRemain = Duration(cooldown - Date.now(), { units: [ 'h', 'm' ], round: true })

            let repErrpr = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} | Reputation Point`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${Failure} You given a reputation point lately! Please wait **${timeRemain}**`)
            .setColor("#ff4f4f")

        return message.channel.send(repErrpr);

} else {

    await Profile.updateOne( { user: member.id }, { $set: { globalReputation: userProfile.globalReputation + 1 } } )
    await message.channel.send(RepEmbed)
    CoolDown.set(message.author.id, Date.now() + timeout);
        setTimeout( () => {
            CoolDown.delete(message.author.id)
        }, timeout)
    }
}

module.exports.help = {
  name: "rep",
  aliases: []
}
