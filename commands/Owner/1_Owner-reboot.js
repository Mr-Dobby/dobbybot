const Discord = require("discord.js");
const commando = require('discord.js-commando');

module.exports.run = async (bot, message, args, client) => {

let owner = message.author;
    if (owner.id !== "441478072559075328" && owner.id !== "329354230861398016") return message.channel.send("You found an **owner only command** somehow!\nGuess you're not my developer, so I won't allow you to use this command!")
        .then(message => message.delete(5000));

    const Failure = bot.emojis.get("697388354689433611");
    const Sucess = bot.emojis.get("697388354668462110");

    if (!args[0]) return message.channel.send("Input valid command to reload.")

    let cmdName = args[0];

    try {
      delete require.cache[require.resolve()];
      bot.commands.delete(cmdName);
      const pull = reqiure();
      bot.commands.set(cmdName, pull)
      await message.react(Sucess)
    } catch (e) {
      await message.react(Failure)
      console.error(e)
    }

}

module.exports.help = {
  name: "reboot",
  aliases: ["reload", "restart"]
}