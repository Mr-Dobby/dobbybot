const Discord = require("discord.js");
const beautify = require("beautify");

module.exports.run = async (bot, message, args, client) => {

  let owner = message.author;
    if (!owner.id == "441478072559075328" && !owner.id == "329354230861398016") return message.channel.send("You found an **owner only command** somehow!\nGuess you're not my developer, so I won't allow you to use this command!")
        .then(message => message.delete(5000));

    if (!args[0]) return;

  const Failure = bot.emojis.get("697388354689433611"); 
  const Sucess = bot.emojis.get("697388354668462110");

  try {
      if (args.join(" ").toLowerCase().includes("token") || args.join(" ").toUpperCase().includes("token")) return;

      const toEvaluate = args.join(" ");
      const evaluated = eval(toEvaluate);

      var embed = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Evaluate`, message.author.displayAvatarURL)
        .setDescription(`Evaluate code through this command`)
        .addField(`To Evalutate`, `\`\`\`fix\n${beautify(toEvaluate, { format: "js" })}\`\`\``, false)
        .addField(`Evaluated`, evaluated, false)
        .addField(`Type`, typeof(evaluated), false)
        .setColor("#7aff7a")

        message.channel.send(embed);

  } catch (error) {
      
      var embed = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Evaluate`, message.author.displayAvatarURL)
        .setDescription(`${Failure} Error evalutating code\n\`\`\`diff\n- ${error}\`\`\``)
        .setColor("#ff4f4f")

        message.channel.send(embed);

  }

}

module.exports.help = {
  name: "eval",
  aliases: ["evaluate"]
}