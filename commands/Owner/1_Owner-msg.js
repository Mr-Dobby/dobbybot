const Discord = require("discord.js");
const owners = require("../../storage/config.json")

module.exports.run = async (bot, message, args, client) => {

  let owner = message.author;
    if (owner.id !== owners.owner) return message.channel.send("You found an **owner only command** somehow!\nGuess you're not my developer, so I won't allow you to use this command!")
        .then(message => message.delete({ timeout: 5000 }));

  var member2message = bot.users.cache.get(args[0]);
  var msgContent = args.slice(1).join(" ");
  const Failure = bot.emojis.cache.get(require("../../storage/config.json").emojis.Failure); 
  const Success = bot.emojis.cache.get(require("../../storage/config.json").emojis.Success);

  var embed = new Discord.MessageEmbed()
      .setTitle(`I've got something to tell you . . .`)
      .setDescription(`${member2message}, ${msgContent}`)
      .setFooter("If you reply it won't be forwarded back!")

  var SuccessEmbed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | Message users`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Success} Delivered your message to ${member2message}.`)
      .setColor("#7aff7a")

  var FailureEmbed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | Message users`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Failure} Couldn't deliver your message to the user.`)
      .setColor("#7aff7a")

  try {
      await member2message.send(embed)
      await message.channel.bulkDelete(1, true)
      await message.channel.send(SuccessEmbed)
        } catch(e) {
    message.channel.send(FailureEmbed)
  }

}

module.exports.help = {
  name: "msg",
  aliases: []
}
