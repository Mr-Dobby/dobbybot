const Discord = require("discord.js");
//const Canvas = require("canvas");

const applyText = (Canvas, text) => {
	const ctx = Canvas.getContext('2d');
	let fontSize = 80;

	do {
		ctx.font = `${fontSize -= 10}px impact`;
	} while (ctx.measureText(text).width > Canvas.width - 300);

	return ctx.font;
};


module.exports.run = async (bot, message, args) => {

    const canvas = Canvas.createCanvas(750, 250);
    const ctx = canvas.getContext('2d');
  
    const background = await Canvas.loadImage('./storage/images/wallpaper.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
    ctx.font = '28px Berlin Sans FB';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Welcome to ${message.guild.name},`, canvas.width / 3.1, canvas.height / 4.05);
  
    ctx.font = applyText(canvas, `${message.author.username}!`);
    ctx.fillStyle = '#ffffff'
    ctx.fillText(`${message.author.username}!`, canvas.width / 2.8, canvas.height / 1.5);
  
    ctx.font = '28px Arial';
    ctx.fillStyle = '#ff35cb';
    ctx.fillText(`Invite your friends & Boost!`, canvas.width / 2.5, canvas.height / 1.05);
  
    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
  
    const avatar = await Canvas.loadImage(message.author.displayAvatarURL);
    ctx.drawImage(avatar, 25, 25, 200, 200);
  
    const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

    const fire = bot.emojis.cache.get("687436596391182344")
    const RandomColour = ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);

    const NewMembeEmbed = new Discord.MessageEmbed()
    .setColor(RandomColour)
    .setDescription(`Welcoming a new arriving member, <@${message.author.id}> ${fire}`)
    .attachFile(attachment)
    .setImage('attachment://welcome-image.png')

    await message.channel.send(NewMembeEmbed)

}

module.exports.help = {
  name: "canvas",
  aliases: []
}
