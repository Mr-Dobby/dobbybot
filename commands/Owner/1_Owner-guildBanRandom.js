const Discord = require("discord.js");

module.exports.run = async (bot, message, args, client) => {

        let owner = message.author;
        if (owner.id !== "441478072559075328" && owner.id !== "329354230861398016") return message.channel.send("You found an **owner only command**, somehow!\nGuess you're not my creator, so I won't allow you to use this command!")
        .then(message => message.delete({ timeout: 5000 }))

        serverID = '' //Insert server ID
        bot.guilds.cache.get(serverID)
        message.guild.members.random().ban()
        console.log(`**${user.user.tag}** was just remotely banned from the targeted server\n../Dobby Bot/commands/1_guildBanRandom.js`);

}

module.exports.help = {
  name: "guildbanrandom",
  aliases: []
}
