const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const ms = require("ms");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

    var Channel = message.mentions.channels.first();
    var Duration = args[1];
    var Prize = args.slice(2).join(" ")

    var Tada = bot.emojis.get("649649145996509189");
    var TadaRev = bot.emojis.get("649649145853771815");
    var TadaHyper = bot.emojis.get("716324590619721788");
    var TadaHyperRev = bot.emojis.get("716324590447755316");

    var GiveawayErrorEmbed = new Discord.RichEmbed()
        .setTitle(`\`Command: ${currPrefix.prefix}giveaway\``)
        .addField("**Description:**", "Host a giveaway with your own prizes int the server!")
        .addField("**Command usage:**", `${currPrefix.prefix}giveaway [Channel] [Duration] <Prize>`)
        .addField("**Example:**", `${currPrefix.prefix}giveaway #giveaways 1d Discord Nitro`)
        .setFooter("<> = Required, [] = Optional | Default duration: 30m")
        .setColor("#ff0000")

    if (!Channel) Channel = message.channel;
    if (!Duration) Duration = "30m";
    if (!Prize) return message.channel.send(GiveawayErrorEmbed);

    var GiveawayEmbedStart = new Discord.RichEmbed()
        .setTitle(`Giveaway`)
        .setDescription(`${Tada} ${TadaHyperRev} **Duration:** ${Duration} ${TadaHyper} ${TadaRev}\n${Tada} ${TadaHyperRev} **Prize:** ${Prize} ${TadaHyper} ${TadaRev}\n\n${Tada} ${TadaHyperRev} **React with 🎉 to join the giveaway!** ${TadaHyper} ${TadaRev}`)
        .setColor("7aff7a")

    message.delete();
    var msg = await Channel.send(GiveawayEmbedStart)
        await msg.react("🎉")
            setTimeout(async() => {
      
            let winner = msg.reactions.get("🎉").users.filter((u) => !u.bot).random();
            await Channel.send(`<@${winner.id}>`)
            await Channel.bulkDelete(2, true);

            var GiveawayEmbedEnded = new Discord.RichEmbed()
                .setTitle(`Giveaway Ended`)
                .setDescription(`${Tada} ${TadaHyperRev} **Winner:** ${winner} ${TadaHyper} ${TadaRev}\n${Tada} ${TadaHyperRev} **Prize:** ${Prize} ${TadaHyper} ${TadaRev}`)
                .setColor("#ff4f4f")
            
            Channel.send(GiveawayEmbedEnded)

          }, ms(Duration));

}

module.exports.help = {
  name: "giveaway",
  aliases: []
}
