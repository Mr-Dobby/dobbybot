const {bot} = require('../index');
const Discord = require("discord.js");

bot.on("raw", async (event) => {

    const eventName = event.t;
    if (eventName === 'MESSAGE_REACTION_ADD') {
        if (event.d.message_id === '') {
            var reactionChannel = bot.channels.cache.get(event.d.channel_id);
            if (reactionChannel.messages.has(event.d.message_id)) {
                return;
            } else {
                reactionChannel.fetchMessage(event.d.message_id).then(message => {
                    var messageReaction = message.reactions.get(event.d.emoji.name + ':' + event.d.emoji.id);
                    var user = bot.users.get(event.d.user_id);
                    bot.emit('messageReactionAdd', messageReaction, user);
                }).catch(err => console.error(err));
            }
        }
    } else if (eventName === 'MESSAGE_REACTION_REMOVE') {
        if (event.d.message_id === '') {
            var reactionChannel = bot.channels.cache.get(event.d.channel_id);
            if (reactionChannel.messages.has(event.d.message_id)) {
                return;
            } else {
                reactionChannel.fetchMessage(event.d.message_id).then(message => {
                    var messageReaction = message.reactions.get(event.d.emoji.name + ':' + event.d.emoji.id);
                    var user = bot.users.get(event.d.user_id);
                    bot.emit('messageReactionRemove', messageReaction, user);
                }).catch(err => console.error(err));
            }
        }
    }

});