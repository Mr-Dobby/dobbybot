const Discord = require("discord.js");

module.exports.run = async (bot, message, args, client) => {

/*
const emojis = message.guild.emojis.filter(emoji => emoji.type === 'animated' ? emoji.animated : !emoji.animated);
if (!emojis.size) return message.channel.send(`This server has no custom emojis.`);
return message.channel.send(emojis.map(emoji => emoji.toString()).sort().join(' '), { split: { char: ' ' } });
*/

const Failure = bot.emojis.cache.get(require("../../storage/config.json").emojis.Failure); 
const Success = bot.emojis.cache.get(require("../../storage/config.json").emojis.Success);

var noPermsEmbedBot = new Discord.MessageEmbed()
    .setDescription(`${Failure} To see all emojis, I requires \`MANAGE EMOJIS\` permissions.`)
    .setColor("#ff0000")

    if (!message.guild.me.hasPermission("MANAGE_EMOJIS")) {
        return message.channel.send(noPermsEmbedBot)
    }

    let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;
    function Emoji(id) {
      return bot.emojis.cache.get(id).toString();
  }

  message.guild.emojis.cache.forEach((emoji) => {
    OverallEmojis++;
    if (emoji.animated) {
      Animated++;
      EmojisAnimated += Emoji(emoji.id);
    } else {
      EmojiCount++;
      Emojis += Emoji(emoji.id);
    }
  });

  let Embed1 = new Discord.MessageEmbed()
  .setAuthor(`Emojis of ${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
  .setDescription(`**The server currently has ${OverallEmojis} emojis**`)

  let Embed2 = new Discord.MessageEmbed()
  .setDescription(`**Animated [${Animated}]**:\n${EmojisAnimated}`)

  let Embed3 = new Discord.MessageEmbed()
  .setDescription(`**Standard [${EmojiCount}]**:\n${Emojis}`)
  
  await message.channel.send(Embed1)
  await message.channel.send(Embed2)
  await message.channel.send(Embed3)

}

module.exports.help = {
  name: "emojis",
  aliases: ["emotes"]
}
