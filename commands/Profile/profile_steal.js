const Discord = require("discord.js");
const Profile = require('../../lib/profile');
const Servers = require("../../lib/mongodb");
const Duration = require('humanize-duration');
const CoolDown = new Map();

module.exports.run = async (bot, message, args) => {

  let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  let userProfile = await Profile.findOne( { user: message.author.id } );
  let currPrefix = await Servers.findOne( { guildID: message.guild.id } );
  const Failure = bot.emojis.cache.get("697388354689433611");
  const Sucess = bot.emojis.cache.get("697388354668462110");

  let noArgs = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} | Filthy Thief`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`\`Command usage: ${currPrefix.prefix}steal <@User>\``)
    .setFooter(`You can only steal 10% of their total. If caught, you will pay a fee of 20% of your total.`)
    .setColor("#00bfe5")

  let noProfile = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} | Missing DB 💸`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${Failure} They cannot be stolen from if they got nothing, you bastard.`)
    .setColor("#ff4f4f")

  if (!member) return message.channel.send(noArgs)
  let memberProfile = await Profile.findOne( { user: member.id } );
  if (!memberProfile || memberProfile.balance <= 99) return message.channel.send(noProfile)
  if (member.id === message.author.id) return;
  if (member.bot) return;

  const timeout = 300000;
  const cooldown = CoolDown.get(message.author.id)
  if (cooldown) {
        const timeRemain = Duration(cooldown - Date.now(), { units: [ 'm', 's' ], round: true })

        let coolDownError = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Stealing Cooldown`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} You cannot continously steal! Please wait **${timeRemain}**`)
        .setColor("#ff4f4f")

        return message.channel.send(coolDownError); 

    } else {

    let userBalance = userProfile.balance;
    let memberBalance = memberProfile.balance;

    let availableAmountToSteal = Math.round((5 / 100) * memberBalance); //Get 10% of total memberBalance
    let availableAmountToLose = Math.round((10 / 100) * userBalance);

    function randomNumber(min, max) {  
        min = Math.ceil(min); 
        max = Math.floor(max); 
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    var RN = randomNumber(1, 100)
    if (RN >= 80) {

        let stealEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Steal DC 💸`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Sucess} You stole **${numberWithCommas(availableAmountToSteal)}** DC 💸 from <@${member.id}>!`)
        .setColor("#7aff7a")

        message.channel.send(stealEmbed)

        await Profile.updateOne( { user: message.author.id }, { $set: { balance: userProfile.balance + availableAmountToSteal } } );
        await Profile.updateOne( { user: member.id }, { $set: { balance: memberProfile.balance - availableAmountToSteal } } );
        
    } else {

        if (userBalance <= availableAmountToLose) {

            let caughtEmbed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} | Caught stealing DB 💸`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${Failure} You were caught stealing. You don't have enough to pay your fee, so now you're really broke.`)
            .setColor("#ff4f4f")
    
            message.channel.send(caughtEmbed)

            await Profile.updateOne( { user: message.author.id }, { $set: { balance: 0 } } );
            await Profile.updateOne( { user: member.id }, { $set: { balance: memberProfile.balance + availableAmountToLose } } );

        } else {

            let caughtEmbed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} | Caught stealing DB 💸`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${Failure} You were caught stealing and ended up paying **${numberWithCommas(availableAmountToLose)}** DC 💸 to <@${member.id}>!`)
            .setColor("#ff4f4f")

            message.channel.send(caughtEmbed)
        
            await Profile.updateOne( { user: message.author.id }, { $set: { balance: userProfile.balance - availableAmountToLose } } );
            await Profile.updateOne( { user: member.id }, { $set: { balance: memberProfile.balance + availableAmountToLose } } );

            }
        }

        CoolDown.set(message.author.id, Date.now() + timeout);
        setTimeout( () => {
            CoolDown.delete(message.author.id)
        }, timeout)
    }

}

module.exports.help = {
  name: "steal",
  aliases: []
}
