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

    function randomNumber(min, max) {  
        min = Math.ceil(min); 
        max = Math.floor(max); 
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    let randomAmount = randomNumber(450, 650)

    let currPrefix = await Servers.findOne( { guildID: message.guild.id } )
    let userProfile = await Profile.findOne( { user: message.author.id } )
    const Failure = bot.emojis.cache.get("697388354689433611");
    const Sucess = bot.emojis.cache.get("697388354668462110");

    noProfile = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} | Missing profile`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${Failure} You have no profile yet! Create one with \`${currPrefix.prefix}new profile\` to get DC 💸`)
    .setColor("#ff4f4f")

    dailyEmbed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} | Daily DC`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${Sucess} <@${message.author.id}> You have been given **${numberWithCommas(randomAmount)}** DC 💸`)
    .setColor("#7aff7a")

    if (!userProfile) return message.channel.send(noProfile)

    const timeout = 86399999;

    const cooldown = CoolDown.get(message.author.id)
        if (cooldown) {
                const timeRemain = Duration(cooldown - Date.now(), { units: [ 'h', 'm' ], round: true })
    
                let timeError = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag} | Daily DC`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`${Failure} You have already collected your daily reward! Please wait **${timeRemain}**`)
                .setColor("#ff4f4f")

            return message.channel.send(timeError);

    } else {

        await Profile.updateOne( { user: message.author.id }, { $set: { balance: userProfile.balance + randomAmount } } )
        await message.channel.send(dailyEmbed)
        CoolDown.set(message.author.id, Date.now() + timeout);
        setTimeout( () => {
            CoolDown.delete(message.author.id)
        }, timeout)
    }
}

module.exports.help = {
  name: "daily",
  aliases: ["pd"]
}