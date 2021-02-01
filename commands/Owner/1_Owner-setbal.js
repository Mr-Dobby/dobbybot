const Discord = require("discord.js");
const Profile = require('../../lib/profile');
const owners = require("../../storage/config.json").owner;

module.exports.run = async (bot, message, args, client) => {

  let owner = message.author;
    if (owner.id == owners) return message.channel.send("You found an **owner only command** somehow!\nGuess you're not my developer, so I won't allow you to use this command!")
        .then(message => message.delete({ timeout: 5000 }));

    const Failure = bot.emojis.cache.get("697388354689433611");
    const Sucess = bot.emojis.cache.get("697388354668462110");

    let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    let amount = args[1];

    //-setbal @Dobby 999999999

    try {
        await Profile.updateOne( { user: member.id }, { $set: { balance: amount } } );
        message.react(Sucess)
    } catch(e) {
        message.react(Failure)
    }

}

module.exports.help = {
  name: "setbal",
  aliases: []
}
