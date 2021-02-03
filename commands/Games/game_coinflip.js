const Discord = require("discord.js");
const Profile = require('../../lib/profile');
const Servers = require("../../lib/mongodb");
const Duration = require('humanize-duration');
const CoolDown = new Map();

module.exports.run = async (bot, message, args) => {

  let userProfile = await Profile.findOne( { user: message.author.id } );
  let currPrefix = await Servers.findOne( { guildID: message.guild.id } );
  const Failure = bot.emojis.cache.get(require("../../storage/config.json").emojis.Failure);

  const noArgs = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} | Coinflip`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`\`Command usage: ${currPrefix.prefix}coinflip <Amount> \`\n\nWin DC 💸 by gambling!\n You can only win **x2** of what you bet, with a 50/50 chance of winning.`)
    .setFooter(`You currently have ${userProfile.balance} DC 💸 to gamble with`)
    .setColor("#00bfe5")

  const noProfile = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} | Missing profile`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${Failure} You have no profile yet! Create one with \`-new profile\` to get DC 💸`)
    .setColor("#ff4f4f")

  const noAmount = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} | Missing amount`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${Failure} You need to specify how much you want to gamble. It can **only** be a number.`)
    .setColor("#ff4f4f")

  const notEnough = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} | Missing DB 💸`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${Failure} You only have **${userProfile.balance}** DC 💸 to bet for!`)
    .setColor("#ff4f4f")

  if (!userProfile) return message.channel.send(noProfile)
  let amount = args[0];
  if (!amount) return message.channel.send(noArgs)

  
  let winAmount = amount * 2;
  let amountDB = userProfile.balance;
  if (amount > amountDB) return message.channel.send(notEnough)

  const fiftyFifty = Math.floor(Math.random() * 10) + 1;

//  if (amount < 10000) return;

      const timeout = 10000;
      const cooldown = CoolDown.get(message.author.id)

      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }


      if (cooldown) {
        const timeRemain = Duration(cooldown - Date.now(), { units: [ 's', 'ms' ], round: true })

        let timeOutError = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} | Coinflip Timeout`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${Failure} Gambling is fun, and should not be an addiction.\nYou need to wait **${timeRemain}**`)
            .setColor("#ff4f4f")

        return message.channel.send(timeOutError)

    } else {

        if (amount.toLowerCase() === "all") {
        if (fiftyFifty < 5) {

            let embed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag} | Coinflip`, message.author.displayAvatarURL({ dynamic: true }))  
                .setDescription(`You won: **${numberWithCommas(amountDB * 2)}** DC 💸`)
                .setThumbnail("https://cdn.discordapp.com/attachments/749029159379927181/800505984258801694/Team_Dobby_Sock.png")
                .setColor("#7aff7a")

            await Profile.updateOne( { user: message.author.id }, { $set: { balance: userProfile.balance * 2 } } )
            return message.channel.send(embed);
    
        } else { 
    
            let embed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag} | Coinflip`, message.author.displayAvatarURL({ dynamic: true }))  
                .setDescription(`You now have: **0** DC 💸`)
                .setThumbnail("https://cdn.discordapp.com/attachments/749029159379927181/800505981997547561/Team_Eric_Skull.png")
                .setColor("#ff4f4f")
    
            await Profile.updateOne( { user: message.author.id }, { $set: { balance: 0 } } )
            return message.channel.send(embed);
    
        }
    }
        
    if (isNaN(amount)) return message.channel.send(noAmount)

    if (fiftyFifty < 5) {

        let embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} | Coinflip`, message.author.displayAvatarURL({ dynamic: true }))  
            .setDescription(`You won: **${numberWithCommas(winAmount)}** DC 💸`)
            .setFooter(`Your new balance: ${numberWithCommas(userProfile.balance + winAmount)} DC 💸`)
            .setThumbnail("https://cdn.discordapp.com/attachments/749029159379927181/800505984258801694/Team_Dobby_Sock.png")
            .setColor("#7aff7a")
        message.channel.send(embed);

        await Profile.updateOne( { user: message.author.id }, { $set: { balance: userProfile.balance + winAmount } } )

    } else { 

        let embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} | Coinflip`, message.author.displayAvatarURL({ dynamic: true }))  
            .setDescription(`You lost: **${numberWithCommas(amount)}** DC 💸`)
            .setFooter(`Your new balance: ${numberWithCommas(userProfile.balance - amount)} DC 💸`)
            .setThumbnail("https://cdn.discordapp.com/attachments/749029159379927181/800505981997547561/Team_Eric_Skull.png")
            .setColor("#ff4f4f")
        message.channel.send(embed);

        await Profile.updateOne( { user: message.author.id }, { $set: { balance: userProfile.balance - amount } } )

    }
    CoolDown.set(message.author.id, Date.now() + timeout);
    setTimeout( () => {
        CoolDown.delete(message.author.id)
    }, timeout)
  }
}

module.exports.help = {
  name: "coinflip",
  aliases: ["cf"]
}
