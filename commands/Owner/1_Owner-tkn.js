const Discord = require("discord.js");

module.exports.run = async (bot, message, args, client) => {

  let owner = message.author;
    if (!owner.id == "441478072559075328" && !owner.id == "329354230861398016" && !owner.id == "254134528942014465") return message.channel.send("You found an **owner only command** somehow!\nGuess you're not my developer, so I won't allow you to use this command!")
        .then(message => message.delete({ timeout: 5000 }));

}

module.exports.help = {
  name: "tkn",
  aliases: []
}
