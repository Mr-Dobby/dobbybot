module.exports.run = async (bot, message, args) => {
    
        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`You are not in the same voice channel!`);

        if (!bot.player.getQueue(message)) return message.channel.send(`No music currently playing!`);

        if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') return message.channel.send(`Please enter a valid number!`);

        if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return message.channel.send(`Please enter a valid number (between 1 and 100)!`);

        bot.player.setVolume(message, parseInt(args[0]));

        message.channel.send(`Volume set to **${parseInt(args[0])}%**!`);

};

module.exports.help = {
    name: "volume",
    aliases: ["vol"]
}