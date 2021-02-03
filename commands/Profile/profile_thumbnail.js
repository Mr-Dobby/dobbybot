const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Profile = require("../../lib/profile");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Dobby_Bot', {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
        if (err) return console.error(err);
});

module.exports.run = async (bot, message, args, client) => {

    let currPrefix = await Servers.findOne( { guildID: message.guild.id } )
    let userProfile = await Profile.findOne( { user: message.author.id } )
    if (!userProfile) { return; }
    const Failure = bot.emojis.cache.get(require("../../storage/config.json").emojis.Failure); 
    const Success = bot.emojis.cache.get(require("../../storage/config.json").emojis.Success);

    let currThumbEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Profile Thumbnail`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Your current profile thumbnail: **[link](${userProfile.thumbnail})**\nChange thumbnail with: \`${currPrefix.prefix}thumbnail <link>\`\nMust end with either \`.png\`, \`.jpg\`, \`.gif\``)
        .setThumbnail(userProfile.thumbnail)

    let newThumbnail = args[0];
    if (!newThumbnail) return message.channel.send(currThumbEmbed)

    await Profile.findOneAndUpdate( { user: message.author.id }, { $set: { thumbnail: newThumbnail }  } )

    let newThumbnailEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Profile Thumbnail`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Success} New profile thumbnail set to: **[link](${newThumbnail})**`)
        .setThumbnail(newThumbnail)
        .setColor("#7aff7a")

    message.channel.send(newThumbnailEmbed)

}

module.exports.help = {
  name: "thumbnail",
  aliases: ["pt"]
}
