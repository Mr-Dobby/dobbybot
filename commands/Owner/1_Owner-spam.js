const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args, client) => {

  let owner = message.author;
    if (owner.id !== "441478072559075328" && owner.id !== "329354230861398016") return message.channel.send("You found an **owner only command** somehow!\nGuess you're not my developer, so I won't allow you to use this command!")
        .then(message => message.delete(5000));

    var i = 0;
    message.delete();
    let member2spam = message.mentions.members.first();
try {
  if (!member2spam) { 
    return message.author.send("Please mention someone to spam");
        } else {
            for (i=0;i<50;i++)
                member2spam.send(args.join(' ')).catch(error); throw error
      }
    } catch (error) {
      return;
  }
}

module.exports.help = {
  name: "spam",
  aliases: []
}
