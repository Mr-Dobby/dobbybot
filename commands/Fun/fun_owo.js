const Discord = require("discord.js");
const Neko = require('nekos.life');
const neko = new Neko();

module.exports.run = async (bot, message, args, client) => {

    var owoifyThis = args.join(" ");
    if (!owoifyThis) return;

    var owo = await neko.sfw.OwOify({ text: owoifyThis })
    message.channel.send(owo.owo)

}

module.exports.help = {
  name: "owo",
  aliases: []
}
