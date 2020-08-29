const Discord = require("discord.js");

module.exports.run = async (bot, message, args, client) => {

  let owner = message.author;
    if (!owner.id == "441478072559075328" && !owner.id == "329354230861398016" && !owner.id == "254134528942014465") return message.channel.send("You found an **owner only command** somehow!\nGuess you're not my developer, so I won't allow you to use this command!")
        .then(message => message.delete({ timeout: 5000 }));

  var member2message = bot.users.get(args[0]);
  var msgContent = args.slice(1).join(" ");
  const Failure = bot.emojis.cache.get("697388354689433611");
  const Sucess = bot.emojis.cache.get("697388354668462110");

  var embed = new Discord.MessageEmbed()
      .setTitle(`I've got something to tell you . . .`)
      .setDescription(`${member2message}, ${msgContent}`)
      .setFooter("You cannot reply to this thank you!!!!")

  var SuccessEmbed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | Message users`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Sucess} Delivered your message to ${member2message}.`)
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
