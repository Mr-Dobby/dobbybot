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
    if (!userProfile) return;
    const Failure = bot.emojis.get("697388354689433611");
    const Sucess = bot.emojis.get("697388354668462110");

    if (!userProfile) return;

    let currColourEmbed = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Profile Colour`, message.author.displayAvatarURL)
        .setDescription(`Your current profile colour: **${userProfile.colour}**\nChange colour with: \`${currPrefix.prefix}colour <Hex number>\`\nExample: ${currPrefix.prefix}colour #FF0000`)
        .setColor(userProfile.colour)

    let newColour = args[0];
    if (!newColour) return message.channel.send(currColourEmbed)

    await Profile.findOneAndUpdate( { user: message.author.id }, { $set: { colour: newColour }  } )

    let newColourEmbed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag} | Profile Colour`, message.author.displayAvatarURL)
    .setDescription(`${Sucess} New profile colour set to: **${newColour}**`)
    .setColor(newColour)

    message.channel.send(newColourEmbed)

}

module.exports.help = {
  name: "colour",
  aliases: ["color", "pc"]
}
