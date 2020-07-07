const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports.run = async (bot, message, args, client) => {

    if (!message.channel.nsfw) return message.channel.send(":underage: You need to be in an NSFW channel to use this command.\nCheck `-nsfwhuh`").then(message => {message.delete(5000)})

    const id = [Math.floor(Math.random() * 10930)];
    const res = await snekfetch.get(`http://api.oboobs.ru/boobs/${id}`);
    const preview = res.body[0]["PREVIEW".toLowerCase()];
    const image = `http://media.oboobs.ru/${preview}`;

    const RandomColour = ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
    const embed = new Discord.RichEmbed()
        .setColor(RandomColour)
        .setDescription("Now that's some hot quality porn!")
        .setImage(image)
        .setFooter("Free porn thanks to oboobs.ru")
    message.channel.send(embed);

}

module.exports.help = {
name: "tits",
aliases: ["boobs"]
}
