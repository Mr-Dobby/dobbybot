const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

      let item = message.content.split(/\s+/g).slice(1).join(" "); //The item
      if (!item) return message.channel.send('Please specify something for me to rate!').then(message => message.delete(5000));

      const rating = Math.floor(Math.random() * 100) + 0; //Random number 0-100

      return message.channel.send(`I'd give **${item.toLowerCase()}** a **${rating}/100!**`)
}

module.exports.help = {
  name: "rate",
  aliases: []
}
