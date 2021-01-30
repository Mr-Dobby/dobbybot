const Discord = require("discord.js");
const Profile = require('../../lib/profile');
const Servers = require("../../lib/mongodb");

module.exports.run = async (bot, message, args) => {

  let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  let amount = args.splice(1).join(' ')
  let userProfile = await Profile.findOne( { user: message.author.id } );
  let currPrefix = await Servers.findOne( { guildID: message.guild.id } );
  let amountDB = userProfile.balance;
  const Failure = bot.emojis.cache.get("697388354689433611");
  const Sucess = bot.emojis.cache.get("697388354668462110");

  let noArgs = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} | Generosity`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`\`Command usage: ${currPrefix.prefix}give <@User> <Amount> \``)
    .setFooter(`You currently have ${userProfile.balance} DC 💸 to give away`)
    .setColor("#00bfe5")

  let noProfile = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} | Missing profile`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${Failure} You have no profile yet!`)
    .setColor("#ff4f4f")

  let noAmount = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} | Missing amount`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${Failure} You need to specify how much you want give away. Numbers only.`)
    .setColor("#ff4f4f")

  let notEnough = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} | Missing DC 💸`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${Failure} You only have **${userProfile.balance}** DC 💸 to give away!`)
    .setColor("#ff4f4f")

  if (!userProfile) return message.channel.send(noProfile)
  if (!member || !amount) return message.channel.send(noArgs)
  if (member.id === message.author.id) return;
  if (member.bot) return;
  if (amount > amountDB) return message.channel.send(notEnough)
//  if (amount < 10000) return;

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

   let giveEmbed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} | Given DC 💸`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${Sucess} You have given **${numberWithCommas(amount)}** DC 💸 to <@${member.user.id}>!`)
    .setColor("#7aff7a")

    if (amount.toLowerCase() === "all") {

      let targetUserProfile = await Profile.findOne( { user: member.id } );
      await Profile.updateOne( { user: message.author.id }, { $set: { balance: 0 } } );
      await Profile.updateOne( { user: member.id }, { $set: { balance: targetUserProfile.balance + userProfile.balance } } );
  
      return message.channel.send(giveEmbed)

    }

   if (isNaN(amount)) return message.channel.send(noAmount)

    try {

        let targetUserProfile = await Profile.findOne( { user: member.id } );
        await Profile.updateOne( { user: message.author.id }, { $set: { balance: userProfile.balance - amount } } );
        await Profile.updateOne( { user: member.id }, { $set: { balance: targetUserProfile.balance + amount } } );
    
        return message.channel.send(giveEmbed)

    } catch (e) {

      let noProfile = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Missing Profile`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} Doesn't look like that user has a profile! It will be created upon their first few messages.`)
        .setColor("#ff4f4f")

        return message.channel.send(noProfile)

    }

}

module.exports.help = {
  name: "give",
  aliases: ["share"]
}
