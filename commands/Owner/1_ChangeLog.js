const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");

module.exports.run = async (bot, message, args, client) => {

  let owner = message.author;
    if (owner.id !== "441478072559075328" && owner.id !== "329354230861398016") return message.channel.send("You found an **owner only command** somehow!\nGuess you're not my developer, so I won't allow you to use this command!")
        .then(message => message.delete({ timeout: 5000 }));

      message.delete();
      let currPrefix = await Servers.findOne( { guildID: message.guild.id } )
      var Plus = bot.emojis.cache.get("749391997890068491");
      var Minus = bot.emojis.cache.get("749391998137401424");
      var fire = bot.emojis.cache.get("689493462835396718");
      var meeeeDobbyyyyy = bot.users.cache.get("441478072559075328") || await bot.users.fetch("441478072559075328");

      let changeLog = new Discord.MessageEmbed()
          .setAuthor(`Dobby Bot Update! | 22/9 - 2020`, bot.user.displayAvatarURL({ dynamic: true }))
          .setImage("https://cdn.discordapp.com/attachments/682717976771821646/706952175225667655/rainbow.gif")
          .setDescription(`${fire} **Profile Update ・ Game Update ・ Log Update** ${fire}`)
          .addField(`Profile`, `${Plus} XP now works as intended.\n${Minus} Still no cooldown on XP, so you can spam it. On that note though, you need **A LOT** more xp to level up.`, true)
          .addField(`Game`, `${Plus} Added new game, ${currPrefix.prefix}hangman\n${Minus} Hangman is for now, a simple none debugged game.`, true)
          .addField(`Log`, `${Plus} Added timer on all logs, instead of date.`, true)
          .setFooter(`↳ Want to support this project? Simply just be a nice human being (:`)
          .setColor("#f1c40f")

            message.channel.send(changeLog)

}

module.exports.help = {
  name: "changelog",
  aliases: ["cl"]
}

// CHANGE LOG EMBED HISTORY

/*       


            .setTitle(`Dobby Bot Update! | 04/05-2020 - 21:00 (9 PM) UTC: 0`)
            .setImage("https://cdn.discordapp.com/attachments/682717976771821646/706952175225667655/rainbow.gif")
            .setDescription(`**・Ticket System**\n**・Ranking System**\n**・Reputation Point System**`)
            .addField("For Members (In Dobbyland Only)", `↳ \`-new\` - Open a **new** ticket\n↳ \`-rank\` - Shows your **rank** card from the server!\n↳ \`-rep\` - Give a **reputation point** to a fellow member`, false)
            .addField("For Moderators (In Dobbyland Only)", `↳ \`-add\` - **Add** a member to the ticket\n↳ \`-remove\` - **Remove** a member from this ticket\n↳ \`-close\` - **Close** a ticket`, false)
            .addField("Bug Fixes/Features (Overall)", `↳ \`Embeds\` - Better looking embeds.\n↳ \`Errors\` - Error messages makes sense now.. Finally. \n↳ \`Bug Reports\` - You can now do \`-bug\` in any server to report a bug.`)


            .setAuthor(`Dobby Bot Update! | 30/7 - 2020`, bot.user.displayAvatarURL({ dynamic: true }))
            .setImage("https://cdn.discordapp.com/attachments/682717976771821646/706952175225667655/rainbow.gif")
            .setDescription(`${partySmiley} **Libary Update ・ Administration Update ・ Profile Update** ${partySmiley}`)
            .addField(`Libary`, `${Plus} Updated all libaries for the bot.\n${Plus} During this update, a lot of things work smoother\n${Plus} Updating libaries also gave dev (${meeeeDobbyyyyy}) more knowledge!\n${Minus} Still might issue some bugs - please report any found!\n\`-new bug\``, true)
            .addField(`Administration`, `${Plus} Administration & Moderation section has been completely reworked.\n${Plus} A lot more stuff is saved on the database, for customisable purposes.\n${Plus} More Admin commands added!\n\`-raid ignore\`, \`-nuke\`\n${Minus} Warning system is not in its place - working on it weekly.`, true)
            .addField(`Profile`, `${Plus} Added more options for personal customisation.\n${Plus} Added commands\n\`-daily\`, \`-colour\`, \n\`-thumbnail\`\n${Plus} Profiles are now automatically created.\n${Minus} Still some bugs with the XP counter.`, true)
            .setFooter(`↳ Want to support this project? Simply just be a nice human being (:`)
            .setColor("#f1c40f")

*/