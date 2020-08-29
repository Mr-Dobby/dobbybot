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
    const Failure = bot.emojis.cache.get("697388354689433611");
    const Sucess = bot.emojis.cache.get("697388354668462110");

    let currQuoteEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Profile Colour`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Your current profile quote: **${userProfile.quote}**\nChange quote with: \`${currPrefix.prefix}quote <Quote>\`\nMin. length: **3** characters. Max length: **100** characters`)

    let newQuote = args.join(" ")
    if (!newQuote || newQuote.length <= 2 || newQuote.length >= 100) return message.channel.send(currQuoteEmbed)

    await Profile.findOneAndUpdate( { user: message.author.id }, { $set: { quote: newQuote }  } )

    let newColourEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Profile Colour`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Sucess} New profile quote set to: **${newQuote}**`)
        .setColor("#7aff7a")

    message.channel.send(newColourEmbed)

}

module.exports.help = {
  name: "quote",
  aliases: ["pq"]
}
