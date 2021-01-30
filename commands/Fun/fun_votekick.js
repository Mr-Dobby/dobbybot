const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");

module.exports.run = async (bot, message, args, client) => {

    let currPrefix = await Servers.findOne( { guildID: message.guild.id } )
    const Failure = bot.emojis.cache.get("697388354689433611");
    const Sucess = bot.emojis.cache.get("697388354668462110");

    noMember = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Vote Kick`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Vote kick a member out of the Voice Channel!\n\nUsage: \`${currPrefix.prefix}votekick <@Member>\``)
        .setColor("#ff4f4f")

    NotInVC = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Vote Kick`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} Either you, or the member you're trying to kick out isn't in a voice channel`)
        .setColor("#ff4f4f")

    noPerms = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Vote Kick`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} I need \`MOVE MEMBERS\` permissions`)
        .setColor("#ff4f4f")

    let member = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.cache.get(args[0]));
//    if (member.id == message.author.id) return;
    if (!member) return message.channel.send(noMember)
    if (!member.voice.channel || !message.member.voice.channel) return message.channel.send(NotInVC)
    if (!message.guild.me.hasPermission("MOVE_MEMBERS")) return message.channel.send(noPerms)

    voteFailed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Vote Kick`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} Not enough reacted with ${Sucess} to disconnect ${member}`)
        .setColor("#ff4f4f")

    SuccessfullyDisconnected = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Vote Kick`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Sucess} ${member} Was successfully disconnected!`)
        .setColor("#7aff7a")

    VoteKickEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Vote Kick`, message.author.displayAvatarURL({ dynamic: true }))
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`VOTE KICK STARTED ON ${member}`)
        .setFooter(`The time will expire in 20 seconds.`)

    var VOTE_TEXT = await message.channel.send(VoteKickEmbed);
        await VOTE_TEXT.react(Sucess);
        await VOTE_TEXT.react(Failure);
return
    const reactions = await VOTE_TEXT.awaitReactions((reaction, user) => user.id !== message.author.id && (reaction.emoji.id == Sucess.id || reaction.emoji.id == Failure.id), { time: 5000 })
  
    const NO_Count = reactions.get(Failure.id).map(s => s.count);
    const YES_Count = reactions.get(Sucess.id).map(s => s.count);

    VOTE_TEXT.delete();
    var ResultEmbed = new Discord.MessageEmbed()
            .setAuthor(`${member.user.tag} | Vote Kick`, member.user.displayAvatarURL({ dynamic: true }))
            .addField("Voting Finished:", "----------------------------------------\n" +
                                          `Total votes (NO ${Failure}): ` + `${NO_Count}\n` +
                                          `Total votes (YES ${Sucess}): ` + `${YES_Count}\n` +
                                          "----------------------------------------\n", true)
            .setColor("000001")
  
    await message.channel.send(ResultEmbed);
//
    if (YES_Count >= 2 && YES_Count > NO_Count) {
        // If enough Yes'es
        try {
            await member.voice.connection.disconnect()
            await message.channel.send(SuccessfullyDisconnected).then(message => message.delete({ timeout: 5000 }))
        } catch (e) {
            //message.channel.send(`I require permission to disconnect members for this to work.`)
        }
            } else {
        // If not enough Yes'es
        await message.channel.send(voteFailed).then(message => message.delete({ timeout: 5000 }))
    }
}

module.exports.help = {
  name: "votekick",
  aliases: ["vk", "disconnect"]
}


//❌ | ✔️