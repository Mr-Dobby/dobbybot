const Servers = require("../../lib/mongodb");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

    const Failure = bot.emojis.cache.get("697388354689433611");
    const Sucess = bot.emojis.cache.get("697388354668462110");

        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`You are not in the same voice channel!`);

        if (!bot.player.getQueue(message)) return message.channel.send(`No music currently playing!`);

        const filtersStatuses = [[], []];

        bot.filters.forEach((filterName) => {
            const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
            array.push(filterName.charAt(0).toUpperCase() + filterName.slice(1) + " : " + (bot.player.getQueue(message).filters[filterName] ? Sucess : Failure));
        });

        message.channel.send({
            embed: {
                color: 'ORANGE',
                fields: [
                    { name: 'Filters', value: filtersStatuses[0].join('\n'), inline: true },
                    { name: '** **', value: filtersStatuses[1].join('\n'), inline: true },
                ],
                description: `List of all filters enabled or disabled.\nUse \`${currPrefix.prefix}filter\` to add a filter to a song.`,
        },
    });
};

module.exports.help = {
    name: "w-filters",
    aliases: ["wf"]
}