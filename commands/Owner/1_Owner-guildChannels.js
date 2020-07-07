const Discord = require("discord.js");

module.exports.run = async (bot, message, args, client) => {

    let owner = message.author;
      if (owner.id !== "441478072559075328" && owner.id !== "329354230861398016") return message.channel.send("You found an **owner only command** somehow!\nGuess you're not my developer, so I won't allow you to use this command!")
          .then(message => message.delete(5000));
          let types = {
            "text"      : "Text channel",
            "voice"     : "Voice channel",
            "category"  : "Category"
          };
          
          let TestChannel = bot.guilds.get("608552515155263498").channels.get("672092493688471592")
          
          TestChannel.send("Servers:")
              bot.guilds.forEach((guild) => {
                TestChannel.send(`__**${guild.name}**__ | __**${guild.id}**__`);
          
                  // List all channels
                  guild.channels.forEach((channel) => {
                    TestChannel.send(` --- (${types[channel.type]}) | ${channel.name} | ${channel.id}`)
              })
            })
    TestChannel.send("__**FINISHED**__")
}
          
module.exports.help = {
    name: "guildchannels",
    aliases: []
}