const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

return;
let roles = message.guild.roles.cache.filter(r => r.position !== 0).sort((a, b) => b.position - a.position).map(r => `${r.toString()} - ${r.id}`).map((r, i) => `${i + 1}. ${r}`);

let noOfPages = roles.length / 20;
let i = (args.page > 0 && args.page < noOfPages + 1) ? args.page : 1;
i = i - 1;

let embed1 = new Discord.MessageEmbed()
    .setColor("#000001")
    .setTitle("Roles")
    .setDescription(`${roles.slice(i * 20, (i * 20) + 20).join('\n')}`)
    .setFooter(`Page: ${i + 1} of ${noOfPages > parseInt(noOfPages) ? parseInt(noOfPages) + 1 : parseInt(noOfPages)}`)

let embed2 = new Discord.MessageEmbed()
    .setColor("#000001")
    .setTitle("Roles")
    .setDescription(`${roles.slice(i * 40, (i * 40) + 40).join('\n')}`)
    .setFooter(`Page: ${i + 2} of ${noOfPages > parseInt(noOfPages) ? parseInt(noOfPages) + 1 : parseInt(noOfPages)}`)

    message.channel.send(embed1).then(async (m) => {
    await m.react("◀")
    await m.react("❌")
    await m.react("▶")

    const collector = message.createReactionCollector((reaction, user) => 
    user.id === message.author.id &&
    reaction.emoji.name === "◀" ||
    reaction.emoji.name === "▶" ||
    reaction.emoji.name === "❌"
).once("collect", reaction => {
    const chosen = reaction.emoji.name;
    if (chosen === "◀")   {
        // Prev page

    } else if (chosen === "▶") {
        // Next page
        message.edit(embed2)
    } else {
        // Stop navigating pages
    }
    collector.stop();
    });
  })

}

module.exports.help = {
  name: "roles",
  aliases: []
}
