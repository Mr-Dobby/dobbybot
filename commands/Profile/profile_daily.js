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

    function randomNumber(min, max) {  
        min = Math.ceil(min); 
        max = Math.floor(max); 
        return Math.floor(Math.random() * (max - min + 1)) + min; 
      }
    let randomAmount = randomNumber(450, 650)

    let currPrefix = await Servers.findOne( { guildID: message.guild.id } )
    let userProfile = await Profile.findOne( { user: message.author.id } )
    const Failure = bot.emojis.get("697388354689433611");
    const Sucess = bot.emojis.get("697388354668462110");

    noProfile = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag} | Missing profile`, message.author.displayAvatarURL)
    .setDescription(`${Failure} You have no profile yet! Create one with \`${currPrefix.prefix}new profile\` to get DB 💸`)
    .setColor("#ff4f4f")

    dailyEmbed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag} | Daily DB`, message.author.displayAvatarURL)
    .setDescription(`${Sucess} <@${message.author.id}> You have been given **${randomAmount}** DB 💸`)
    .setColor("#7aff7a")

    if (!userProfile) return message.channel.send(noProfile)

    let timeout = 86400000;

    let timeError = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag} | Daily DB`, message.author.displayAvatarURL)
    .setDescription(`${Failure} You have already collected your daily reward!`)

        if (CoolDown.has(message.author.id)) {
            return message.channel.send(timeError);
        }
        CoolDown.add(message.author.id);

        await Profile.updateOne( { user: message.author.id }, { $set: { balance: userProfile.balance + randomAmount } } )
        await message.channel.send(dailyEmbed)

        if (CoolDown.has(message.author.id))
        setTimeout(() => {
            CoolDown.delete(message.author.id);
    }, timeout);
  
}

module.exports.help = {
  name: "daily",
  aliases: ["pd"]
}
