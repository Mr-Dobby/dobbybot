const Discord = require("discord.js");
const owners = require("../../storage/config.json")

module.exports.run = async (bot, message, args, client) => {

  let owner = message.author;
    if (owner.id !== owners.owners) return message.channel.send("You found an **owner only command** somehow!\nGuess you're not my developer, so I won't allow you to use this command!")
        .then(message => message.delete({ timeout: 5000 }));
/*
  message.channel.send("Yes, I can talk\nTest Completed.")


let color = ((1 << 24) * Math.random() | 0).toString(16); //Generates random hex value.
      let embed = new Discord.MessageEmbed() //Embeds.
            .setTitle(`#${color}`)
            .setColor(`#${color}`);

            message.channel.send(embed)

*/

/*
try {

  var guildList = bot.guilds.array();
  var channelID;
  guildList.forEach(guild => {
    let channels = guild.channels;
    channelLoop:
    for (let c of channels) {
        let channelType = c[1].type;
        if (channelType === "text") {
            channelID = c[0];
            break channelLoop;.play
        }
    }
    var channel = bot.channels.get(guild.systemChannelID || channelID);
    channel.send(`Test Message.`).then(message => message.delete(1000))
  })

} catch (e) {
  console.log(e)
}
*/


  message.channel.send(`Yes, I can talk.`)

}

module.exports.help = {
  name: "test",
  aliases: []
}
