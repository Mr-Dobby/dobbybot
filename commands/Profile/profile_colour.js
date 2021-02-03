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
    const Success = bot.emojis.cache.get(require("../../storage/config.json").emojis.Success);

    if (!userProfile) return;

    let currColourEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Profile Colour`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Your current profile colour: **${userProfile.colour}**\nChange colour with: \`${currPrefix.prefix}colour <Hex code>\`\n\nYou can find different hex colours [here](https://www.rapidtables.com/web/color/html-color-codes.html)`)
        .setColor(userProfile.colour)

    let newColour = args[0];
    if (!newColour) return message.channel.send(currColourEmbed)

    await Profile.findOneAndUpdate( { user: message.author.id }, { $set: { colour: newColour }  } )

    let newColourEmbed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} | Profile Colour`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${Success} New profile colour set to: **${newColour}**`)
    .setColor(newColour)

    message.channel.send(newColourEmbed)

}

module.exports.help = {
  name: "colour",
  aliases: ["color", "pc"]
}
