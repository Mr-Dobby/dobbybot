module.exports.run = async (bot, message, args) => {

        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`You are not in the same voice channel!`);

        if (!bot.player.getQueue(message)) return message.channel.send(`No music currently playing!`);

        if (args.join(" ").toLowerCase() === 'queue') {
            if (bot.player.getQueue(message).loopMode) {
                bot.player.setLoopMode(message, false);
                return message.channel.send(`Repeat mode **disabled**!`);
            } else {
                bot.player.setLoopMode(message, true);
                return message.channel.send(`Repeat mode **enabled** the whole queue will be repeated endlessly!`);
            };
        } else {
            if (bot.player.getQueue(message).repeatMode) {
                bot.player.setRepeatMode(message, false);
                return message.channel.send(`Repeat mode **disabled**!`);
            } else {
                bot.player.setRepeatMode(message, true);
                return message.channel.send(`Repeat mode **enabled** the current music will be repeated endlessly!`);
        };
    }
};

module.exports.help = {
    name: "loop",
    aliases: []
}
