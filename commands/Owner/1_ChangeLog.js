const Discord = require("discord.js");

module.exports.run = async (bot, message, args, client) => {

  let owner = message.author;
    if (owner.id !== "441478072559075328" && owner.id !== "329354230861398016") return message.channel.send("You found an **owner only command** somehow!\nGuess you're not my developer, so I won't allow you to use this command!")
        .then(message => message.delete(5000));

        let channel = bot.guilds.get("521602207406227476").channels.get("616947219790037014")

        let changeLog = new Discord.RichEmbed()
            .setTitle(`Dobby Bot Update! | 04/05-2020 - 21:15 (9 PM) UTC: 0`)
            .setImage("https://cdn.discordapp.com/attachments/682717976771821646/706952175225667655/rainbow.gif")
            .setDescription(`**・Ticket System**\n**・Ranking System**\n**・Reputation Point System**`)
            .addField("For Members (In Dobbyland Only)", `↳ \`-new\` - Open a **new** ticket\n↳ \`-rank\` - Shows your **rank** card from the server!\n↳ \`-rep\` - Give a **reputation point** to a fellow member`, false)
            .addField("For Moderators (In Dobbyland Only)", `↳ \`-add\` - **Add** a member to the ticket\n↳ \`-remove\` - **Remove** a member from this ticket\n↳ \`-close\` - **Close** a ticket`, false)
            .addField("Bug Fixes/Features (Overall)", `↳ \`Embeds\` - Better looking embeds.\n↳ \`Errors\` - Error messages makes sense now.. Finally. \n↳ \`Bug Reports\` - You can now do \`-bug\` in any server to report a bug.`)
        
            channel.send(changeLog)

}

module.exports.help = {
  name: "changelog",
  aliases: ["cl"]
}

// CHANGE LOG EMBED HISTORY

/*
let changeLog = new Discord.RichEmbed()            
            .setTitle(`Dobby Bot Update! | 04/05-2020 - 21:00 (9 PM) UTC: 0`)
            .setImage("https://cdn.discordapp.com/attachments/682717976771821646/706952175225667655/rainbow.gif")
            .setDescription(`**・Ticket System**\n**・Ranking System**\n**・Reputation Point System**`)
            .addField("For Members (In Dobbyland Only)", `↳ \`-new\` - Open a **new** ticket\n↳ \`-rank\` - Shows your **rank** card from the server!\n↳ \`-rep\` - Give a **reputation point** to a fellow member`, false)
            .addField("For Moderators (In Dobbyland Only)", `↳ \`-add\` - **Add** a member to the ticket\n↳ \`-remove\` - **Remove** a member from this ticket\n↳ \`-close\` - **Close** a ticket`, false)
            .addField("Bug Fixes/Features (Overall)", `↳ \`Embeds\` - Better looking embeds.\n↳ \`Errors\` - Error messages makes sense now.. Finally. \n↳ \`Bug Reports\` - You can now do \`-bug\` in any server to report a bug.`)
channel.send(changeLog)
*/