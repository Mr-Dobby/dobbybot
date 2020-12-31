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
let menu1 = new Discord.MessageEmbed()
.setTitle(`Role menu for: Gender`)
.setDescription(`♂️ | <@&792033845448278016>\n♀️ | <@&792033941871263744>\n⚧ | <@&792033986342944818>\n<:Dobby:702591726560346205> | <@&792034032699047936>`)
.setColor("#f1c40f")

let menu2 = new Discord.MessageEmbed()
.setTitle(`Role menu for: Age`)
.setDescription(`1️⃣ | <@&792032828526559244>\n2️⃣ | <@&792033330991857714>\n3️⃣ | <@&792032895547080754>\n4️⃣ | <@&792032970059153470>\n5️⃣ | <@&792033097671639060>\n6️⃣ | <@&792033396054032464>`)
.setColor("#e67e22")

let menu3 = new Discord.MessageEmbed()
.setTitle(`Role menu for: Location`)
.setDescription(`🇺🇸 | <@&792031879472611350>\n🇧🇷 | <@&792032006606422036>\n🇪🇺 | <@&792032198176800778>\n🇿🇦 | <@&792032243076956200>\n🇨🇳 | <@&792032385113915412>\n🇦🇺 | <@&792032422308347914>`)
.setColor("#2ecc71")

message.channel.send(menu1)
message.channel.send(menu2)
message.channel.send(menu3)



}

module.exports.help = {
  name: "test",
  aliases: []
}
