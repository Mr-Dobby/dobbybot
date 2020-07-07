const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Profile = require("../../lib/profile");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Dobby_Bot', {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
        if (err) return console.error(err);
});
const CoolDown = new Set();

module.exports.run = async (bot, message, args, client) => {

    const Failure = bot.emojis.get("697388354689433611");
    const Sucess = bot.emojis.get("697388354668462110");

    MentionSomeoneyaclown = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Reputate Someone`, message.author.displayAvatarURL)
        .setDescription(`${Failure} You've got to @ someone to rep ya clown.`)
        .setColor("#ff4f4f")

    let member = message.mentions.users.first();
    if (!member) return message.channel.send(MentionSomeoneyaclown);
    if (member.id === message.author.id) return;
    if (message.author.bot) return;
    
    let currPrefix = await Servers.findOne( { guildID: message.guild.id } );

    RepEmbedCooldown = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Reputation Point Cooldown`, message.author.displayAvatarURL)
        .setDescription(`${Failure} There's cooldown on this command, smartass`)
        .setColor("#ff4f4f")

    noProfile = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Missing profile`, message.author.displayAvatarURL)
        .setDescription(`${Failure} ${member} has no profile to add reputation points to.`)
        .setColor("#ff4f4f")

        let userProfile = await Profile.findOne( { user: member.id } )
        if (!userProfile) return message.channel.send(noProfile)

    if (CoolDown.has(message.author.id)) {
        return message.channel.send(RepEmbedCooldown);
    }
    CoolDown.add(message.author.id);

    await Profile.updateOne( { user: member.id }, { $set: { globalReputation: userProfile.globalReputation + 1 } } )

    RepEmbed = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Reputation Point`, message.author.displayAvatarURL)
        .setDescription(`${Sucess} You've given a reputation point to ${member}`)
        .setColor("#7aff7a")

    message.channel.send(RepEmbed)

    if (CoolDown.has(message.author.id))
        setTimeout(() => {
            CoolDown.delete(message.author.id);
    }, 10800 * 1000);

}

module.exports.help = {
  name: "rep",
  aliases: []
}
