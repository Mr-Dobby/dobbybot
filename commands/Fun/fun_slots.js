const Discord = require("discord.js");
const talkedRecently = new Set();
const Profile = require('../../lib/profile');
const Servers = require("../../lib/mongodb");
const Duration = require('humanize-duration');
const CoolDown = new Map();

module.exports.run = async (bot, message, args) => {

  let userProfile = await Profile.findOne( { user: message.author.id } )
  let currPrefix = await Servers.findOne( { guildID: message.guild.id } );

  noArgs = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} | Slot Machine`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`\`Command usage: ${currPrefix.prefix}slots <Amount> \`\n\nWin DC 💸 by gambling!\nYou can win up to **x10** as much as you bet!`)

  noProfile = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} | Missing profile`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${Failure} You have no profile yet! Create one with \`-new profile\` to get DC 💸`)
    .setColor("#ff4f4f")

  noAmount = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} | Missing amount`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${Failure} You need to specify how much you want to gamble. It can **only** be a number.`)
    .setColor("#ff4f4f")

  notEnough = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} | Missing DB 💸`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${Failure} You only have **${userProfile.balance}** DC 💸 to bet for!`)
    .setColor("#ff4f4f")

  if (!userProfile) return message.channel.send(noProfile)
  let amount = args[0];
  if (!amount) return message.channel.send(noArgs)
  if (isNaN(amount)) return message.channel.send(noAmount)

      const timeout = 10000;
      const cooldown = CoolDown.get(message.author.id)
      if (cooldown) {
        const timeRemain = Duration(cooldown - Date.now(), { units: [ 's', 'ms' ], round: true })

        let timeOutError = new Discord.MessageEmbed()
          .setAuthor(`${message.author.tag} | Slots Timeout`, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`${Failure} Gambling is fun, and should not be an addiction.\nYou need to wait **${timeRemain}**`)
          .setColor("#ff4f4f")

        return message.channel.send(timeOutError)
      
      } else {

    function randomNumber(min, max) {  
      min = Math.ceil(min); 
      max = Math.floor(max); 
      return Math.floor(Math.random() * (max - min + 1)) + min; 
    }
    let randomAmount = randomNumber(2, 10)
    let winAmount = amount * randomAmount;
    let amountDB = userProfile.balance;
    if (amount > amountDB) return message.channel.send(notEnough)

    let slots = ["❤️", "🧡", "💛", "💚", "💙", "💜", "🤎", "🖤", "🤍"];
    let result1 = Math.floor((Math.random() * slots.length));
    let result2 = Math.floor((Math.random() * slots.length));
    let result3 = Math.floor((Math.random() * slots.length));

    if (slots[result1] === slots[result2] && slots[result3] || slots[result2] === slots[result3] && slots[result1]) {

        let embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} | Slot Machine`, message.author.displayAvatarURL({ dynamic: true }))  
            .setDescription(`You won: **${winAmount}** DC 💸 \n\n**「** ${slots[result1]} **」「** ${slots[result2]} **」「** ${slots[result3]} **」**`)
            .setFooter(`Your new balance: ${userProfile.balance + winAmount}`)
            .setColor("#7aff7a")
        message.channel.send({embed});

        await Profile.updateOne( { user: message.author.id }, { $set: { balance: userProfile.balance + winAmount } } )

    } else { 

        let embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} | Slot Machine`, message.author.displayAvatarURL({ dynamic: true }))  
            .setDescription(`You lost: **${amount}** DC 💸 \n\n**「** ${slots[result1]} **」「** ${slots[result2]} **」「** ${slots[result3]} **」**`)
            .setFooter(`Your new balance: ${userProfile.balance - amount}`)
            .setColor("#ff4f4f")
        message.channel.send({embed});

        await Profile.updateOne( { user: message.author.id }, { $set: { balance: userProfile.balance - amount } } )

    }
    CoolDown.set(message.author.id, Date.now() + timeout);
    setTimeout( () => {
        CoolDown.delete(message.author.id)
    }, timeout)
  }
}

module.exports.help = {
  name: "slots",
  aliases: ["bet"]
}
