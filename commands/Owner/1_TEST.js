const Discord = require("discord.js");

module.exports.run = async (bot, message, args, client) => {

  let owner = message.author;
    if (owner.id !== "441478072559075328" && owner.id !== "329354230861398016") return message.channel.send("You found an **owner only command** somehow!\nGuess you're not my developer, so I won't allow you to use this command!")
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
            break channelLoop;
        }
    }
    var channel = bot.channels.get(guild.systemChannelID || channelID);
    channel.send(`Test Message.`).then(message => message.delete(1000))
  })

} catch (e) {
  console.log(e)
}
*/

var number2guess = Math.ceil(Math.random() * 1000) + 1;
var humanGuess = args.join(' ');
var botGuess = Math.floor(Math.random() * 1000) + 1;
console.log(number2guess)
console.log(humanGuess)
console.log(botGuess)

const closest = [humanGuess, botGuess].reduce((humanGuess, botGuess) => {
  let aDiff = Math.abs(humanGuess - number2guess);
  let bDiff = Math.abs(botGuess - number2guess);

  if (aDiff == bDiff) {
      // Choose largest vs smallest (> vs <)
      return humanGuess > botGuess ? humanGuess : botGuess;
  } else {
      return bDiff < aDiff ? botGuess : humanGuess;
  }

});

console.log(closest);



}

module.exports.help = {
  name: "test",
  aliases: []
}
