const Discord = require("discord.js");
const talkedRecently = new Set();
const Profile = require('../../lib/profile');
const Servers = require("../../lib/mongodb");

module.exports.run = async (bot, message, args) => {

  const Failure = bot.emojis.get("697388354689433611");
  const Sucess = bot.emojis.get("697388354668462110");
  let userProfile = await Profile.findOne( { user: message.author.id } )
  let currPrefix = await Servers.findOne( { guildID: message.guild.id } );

  let timeOutError = new Discord.RichEmbed()
      .setAuthor(`${message.author.tag} | Slots Timeout`, message.author.displayAvatarURL)
      .setDescription(`${Failure} Gambling is fun, and should not be an addiction.\nYou need to wait 10 seconds.`)
      .setThumbnail("https://cdn.discordapp.com/attachments/682717976771821646/722422705189683250/10_seconds.gif")

  if (talkedRecently.has(message.author.id)) {

             message.channel.send(timeOutError).then(message => message.delete(10000))

     } else {

    noArgs = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Slot Machine`, message.author.displayAvatarURL)
        .setDescription(`\`Command usage: ${currPrefix.prefix}slots <Amount> \`\n\nWin DB 💸 by gambling!\nYou can win up to **x10** as much as you bet!`)
  
    noProfile = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Missing profile`, message.author.displayAvatarURL)
        .setDescription(`${Failure} You have no profile yet! Create one with \`-new profile\` to get DB 💸`)
        .setColor("#ff4f4f")

    noAmount = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Missing amount`, message.author.displayAvatarURL)
        .setDescription(`${Failure} You need to specify how much you want to gamble. It can **only** be a number.`)
        .setColor("#ff4f4f")

    notEnough = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Missing DB 💸`, message.author.displayAvatarURL)
        .setDescription(`${Failure} You only have **${userProfile.balance}** DB 💸 to bet for!`)
        .setColor("#ff4f4f")

    if (!userProfile) return message.channel.send(noProfile)
    let amount = args[0];
    if (!amount) return message.channel.send(noArgs)
    if (isNaN(amount)) return message.channel.send(noAmount)

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

        let embed = new Discord.RichEmbed()
            .setAuthor(`${message.author.tag} | Slot Machine`, message.author.displayAvatarURL)  
            .setDescription(`${Sucess} You won: **${winAmount}** DB 💸 \n\n**「** ${slots[result1]} **」「** ${slots[result2]} **」「** ${slots[result3]} **」**`)
            .setFooter(`Your new balance: ${userProfile.balance + winAmount}`)
            .setColor("#7aff7a")
        message.channel.send({embed});

        await Profile.updateOne( { user: message.author.id }, { $set: { balance: userProfile.balance + winAmount } } )

    } else { 

        let embed = new Discord.RichEmbed()
            .setAuthor(`${message.author.tag} | Slot Machine`, message.author.displayAvatarURL)  
            .setDescription(`${Failure} You lost: **${amount}** DB 💸 \n\n**「** ${slots[result1]} **」「** ${slots[result2]} **」「** ${slots[result3]} **」**`)
            .setFooter(`Your new balance: ${userProfile.balance - amount}`)
            .setColor("#ff4f4f")
        message.channel.send({embed});

        await Profile.updateOne( { user: message.author.id }, { $set: { balance: userProfile.balance - amount } } )

    }

  // Adds the user to the set so that they can't talk for x
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    // Removes the user from the set after x
    talkedRecently.delete(message.author.id);
    }, 10000);
  }
}

module.exports.help = {
  name: "slots",
  aliases: []
}
