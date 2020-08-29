const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let reason = args.join(' ') ? args.join(' ') : "AFK";
    let afklist = bot.afk.get(message.author.id);

    if (!afklist) {
        let construct = {
            id: message.author.id,
            usertag: message.author.tag,
            reason: reason
        };

        let embed = new Discord.MessageEmbed()
            .setDescription(`<@${message.author.id}> is now AFK: ${reason}`)
        bot.afk.set(message.author.id, construct);
        message.delete();
        return message.channel.send(embed).then(msg => msg.delete(5000));
    }

};

module.exports.help = {
    name: 'afk',
    aliases: []
};