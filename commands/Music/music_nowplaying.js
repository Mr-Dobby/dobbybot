module.exports.run = async (bot, message, args, client) => {

        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`You are not in the same voice channel!`);

        if (!bot.player.getQueue(message)) return message.channel.send(`No music currently playing!`);

        const track = bot.player.nowPlaying(message);
        const filters = [];

        Object.keys(bot.player.getQueue(message).filters).forEach((filterName) => bot.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;

        message.channel.send({
            embed: {
                color: 'RED',
                author: { name: track.title },
                description: `[YouTube Link](${track.url})`,
                fields: [
                    { name: 'Channel', value: track.author, inline: true },
                    { name: 'Requested by', value: track.requestedBy.toString(), inline: true },
                    { name: 'Duration', value: track.duration, inline: true },

                    { name: 'Views', value: track.views, inline: true },
                    { name: 'Filters activated', value: filters.length + '/' + bot.filters.length, inline: true },
                    { name: 'From playlist', value: track.fromPlaylist ? 'Yes' : 'No', inline: true },

                    { name: 'Volume', value: bot.player.getQueue(message).volume + "%/100%", inline: true },
                    { name: 'Repeat mode', value: bot.player.getQueue(message).repeatMode ? 'Yes' : 'No', inline: true },
                    { name: 'Currently paused', value: bot.player.getQueue(message).paused ? 'Yes' : 'No', inline: true },

                    { name: 'Progress bar', value: bot.player.createProgressBar(message, { timecodes: true }), inline: true }
                ],
                thumbnail: { url: track.thumbnail }
        }  
    });
};

module.exports.help = {
    name: "nowplaying",
    aliases: ["np"]
}