const Discord = require("discord.js");
const commando = require('discord.js-commando');
const owners = require("../../storage/config.json")

module.exports.run = async (bot, message, args, client) => {

  let owner = message.author;
    if (owner.id !== owners.owner) return message.channel.send("You found an **owner only command** somehow!\nGuess you're not my developer, so I won't allow you to use this command!")
        .then(message => message.delete({ timeout: 5000 }));

  const Failure = bot.emojis.cache.get(require("../../storage/config.json").emojis.Failure); 
  const Success = bot.emojis.cache.get(require("../../storage/config.json").emojis.Success);

    try {
      bot.users.cache.delete()
      await message.react(Success)
    } catch (e) {
      await message.react(Failure)
      console.error(e)
    }

}

module.exports.help = {
  name: "reboot",
  aliases: ["reload", "restart"]
}