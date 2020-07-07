const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");

module.exports.run = async (bot, message, args, client) => {

    let currPrefix = await Servers.findOne( { guildID: message.guild.id } )
    const Failure = bot.emojis.get("697388354689433611");
    const Sucess = bot.emojis.get("697388354668462110");

    noMember = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Vote Kick`, message.author.displayAvatarURL)
        .setDescription(`Vote kick a member out of the Voice Channel!\n\nUsage: \`${currPrefix.prefix}votekick <@Member>\``)
        .setColor("#ff4f4f")

    NotInVC = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Vote Kick`, message.author.displayAvatarURL)
        .setDescription(`${Failure} Either you, or the member you're trying to kick out isn't in a voice channel`)
        .setColor("#ff4f4f")

    noPerms = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Vote Kick`, message.author.displayAvatarURL)
        .setDescription(`${Failure} I need \`MOVE MEMBERS\` permissions`)
        .setColor("#ff4f4f")

    let member = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.get(args[0]));
//    if (member.id == message.author.id) return;
    if (!member) return message.channel.send(noMember)
    if (!member.voiceChannel || message.author.voiceChannel) return message.channel.send(NotInVC)
    if (!message.guild.me.hasPermission("MOVE_MEMBERS")) return message.channel.send(noPerms)

    voteFailed = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Vote Kick`, message.author.displayAvatarURL)
        .setDescription(`${Failure} Not enough reacted with ${Sucess} to disconnect ${member}`)
        .setColor("#ff4f4f")

    SuccessfullyDisconnected = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Vote Kick`, message.author.displayAvatarURL)
        .setDescription(`${Sucess} ${member} Was successfully disconnected!`)
        .setColor("#7aff7a")

    VoteKickEmbed = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Vote Kick`, message.author.displayAvatarURL)
        .setThumbnail(member.user.displayAvatarURL)
        .setDescription(`VOTE KICK STARTED ON ${member}`)
        .setFooter(`The time will expire in 15 seconds.`)

    var VOTE_TEXT = await message.channel.send(VoteKickEmbed);
        await VOTE_TEXT.react("✔️");
        await VOTE_TEXT.react("❌");

    const reactions = await VOTE_TEXT.awaitReactions(reaction => reaction.emoji.name === "✔️" || reaction.emoji.name === "❌", { time: 15000 });
    VOTE_TEXT.delete();

    var NO_Count = reactions.get("❌").count;
    var YES_Count = reactions.get("✔️");
  
    if (YES_Count == undefined) {
      var YES_Count = 1;
        } else {
      var YES_Count = reactions.get("✔️").count;
    }
  
    var ResultEmbed = new Discord.RichEmbed()
            .setAuthor(`${member.user.tag} | Vote Kick`, member.user.displayAvatarURL)
            .addField("Voting Finished:", "----------------------------------------\n" +
                                          `Total votes (NO ${Failure}): ` + `${NO_Count - 1}\n` +
                                          `Total votes (YES ${Sucess}): ` + `${YES_Count - 1}\n` +
                                          "----------------------------------------\n", true)
            .setColor("000001")
  
    await message.channel.send(ResultEmbed);

    if (YES_Count <= 2 && YES_Count > NO_Count) {
        // If enough Yes'es
        await member.disconnect()
        await message.channel.send(SuccessfullyDisconnected).then(message => message.delete(5000))
            } else {
        // If not enough Yes'es
        await message.channel.send(voteFailed).then(message => message.delete(5000))
        await message.channel.send("Oof")
    }
}

module.exports.help = {
  name: "votekick",
  aliases: ["vk", "disconnect"]
}


//❌ | ✔️