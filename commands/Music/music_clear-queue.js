module.exports.run = async (bot, message, args) => {

        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id!== message.guild.me.voice.channel.id) return message.channel.send(`You are not in the same voice channel!`);

        if (!bot.player.getQueue(message)) return message.channel.send(`No music currently playing!`);

        if (bot.player.getQueue(message).tracks.length <= 1) return message.channel.send(`There is only one song in the queue.`);

        bot.player.clearQueue(message);

        message.channel.send(`The queue has just been **removed**!`);

}

module.exports.help = {
    name: "clearqueue",
    aliases: ["cl"]
}
  