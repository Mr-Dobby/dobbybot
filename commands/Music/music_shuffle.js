module.exports.run = async (bot, message, args) => {

        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`You are not in the same voice channel!`);

        if (!bot.player.getQueue(message)) return message.channel.send(`No music currently playing!`);

        bot.player.shuffle(message);

        return message.channel.send(`Queue shuffled **${bot.player.getQueue(message).tracks.length}** song(s)!`);

};

module.exports.help = {
    name: "shuffle",
    aliases: []
}