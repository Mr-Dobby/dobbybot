const Discord = require("discord.js");

module.exports.run = async (bot, message, args, client) => {

    let owner = message.author;
      if (owner.id !== "441478072559075328" && owner.id !== "329354230861398016") return message.channel.send("You found an **owner only command** somehow!\nGuess you're not my developer, so I won't allow you to use this command!")
          .then(message => message.delete({ timeout: 5000 }));
          let types = {
            "text"      : "Text channel",
            "voice"     : "Voice channel",
            "category"  : "Category"
          };
          
          let TestChannel = bot.channels.cache.get("749029203764052048")
          message.channel.send(`Starting . . .`)
          TestChannel.send("Servers:")
              bot.guilds.cache.forEach((guild) => {
                TestChannel.send(`__**${guild.name}**__ | __**${guild.id}**__`);
          
                  // List all channels
                  guild.channels.cache.forEach((channel) => {
                    TestChannel.send(` --- (${types[channel.type]}) | ${channel.name} | ${channel.id}`)
              })
            })
    TestChannel.send("__**FINISHED**__")
}
          
module.exports.help = {
    name: "allguilds",
    aliases: []
}