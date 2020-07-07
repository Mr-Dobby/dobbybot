const Discord = require("discord.js");

module.exports.run = async (bot, message, args, client) => {

/*
const emojis = message.guild.emojis.filter(emoji => emoji.type === 'animated' ? emoji.animated : !emoji.animated);
if (!emojis.size) return message.channel.send(`This server has no custom emojis.`);
return message.channel.send(emojis.map(emoji => emoji.toString()).sort().join(' '), { split: { char: ' ' } });
*/

    let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;
    function Emoji(id) {
      return bot.emojis.get(id).toString();
  }

  message.guild.emojis.forEach((emoji) => {
    OverallEmojis++;
    if (emoji.animated) {
      Animated++;
      EmojisAnimated += Emoji(emoji.id);
    } else {
      EmojiCount++;
      Emojis += Emoji(emoji.id);
    }
  });

  let Embed1 = new Discord.RichEmbed()
  .setTitle(`Emojis in ${message.guild.name}`)
  .setDescription(`**Over all emojis [${OverallEmojis}]**`)

  let Embed2 = new Discord.RichEmbed()
  .setDescription(`**Animated [${Animated}]**:\n${EmojisAnimated}`)

  let Embed3 = new Discord.RichEmbed()
  .setDescription(`**Standard [${EmojiCount}]**:\n${Emojis}`)
  
  await message.channel.send(Embed1)
  await message.channel.send(Embed2)
  await message.channel.send(Embed3)

}

module.exports.help = {
  name: "emojis",
  aliases: ["emotes"]
}
