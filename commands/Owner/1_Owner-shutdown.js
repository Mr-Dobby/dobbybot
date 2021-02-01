const Discord = require("discord.js");
const commando = require('discord.js-commando');
const owners = require("../../storage/config.json").owner;

module.exports.run = async (bot, message, args, client) => {

  let owner = message.author;
    if (owner.id == owners) return message.channel.send("You found an **owner only command** somehow!\nGuess you're not my developer, so I won't allow you to use this command!")
        .then(message => message.delete({ timeout: 5000 }));

    const Failure = bot.emojis.cache.get("697388354689433611");
    const Sucess = bot.emojis.cache.get("697388354668462110");

    try {
      await message.react(Sucess)
      await bot.user.setActivity("Dead", { type: 'PLAYING', status: 'invisible' })
      await bot.destroy().then( () => {
        process.exit();
      })
    } catch (e) {
      await message.react(Failure)
      console.error(e)
    }

}

module.exports.help = {
  name: "shutdown",
  aliases: ["killdobby", "diedobby", "die"]
}
