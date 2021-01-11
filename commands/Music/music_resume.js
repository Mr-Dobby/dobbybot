module.exports.run = async (bot, message, args) => {

        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`You are not in the same voice channel!`);

        if (!bot.player.getQueue(message)) return message.channel.send(`No music currently playing!`);

        if (!bot.player.getQueue(message).paused) return message.channel.send(`The music is already playing!`);

        bot.player.resume(message);

        message.channel.send(`Song ${bot.player.getQueue(message).playing.title} resumed!`);
    
};

module.exports.help = {
    name: "resume",
    aliases: ["res", "continue"]
}