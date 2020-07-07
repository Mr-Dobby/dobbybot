const Discord = require("discord.js");
const blacklist = require("../../storage/blacklist.json");
const fs = require("fs");

module.exports.run = async (bot, message, args, client) => {

        let owner = message.author;
        if (owner.id !== "441478072559075328" && owner.id !== "329354230861398016") return message.channel.send("You found an **owner only command**, somehow!\nGuess you're not my creator, so I won't allow you to use this command!")
        .then(message => message.delete(5000))

        const Failure = bot.emojis.get("697388354689433611");
        const Sucess = bot.emojis.get("697388354668462110");

        let BLError = new Discord.RichEmbed()
            .setAuthor(`${message.author.tag} | Blacklist user from command usage`, message.author.displayAvatarURL)
            .setDescription(`${Failure} Command usage: \`-blacklist add/del <User ID>\``)
            .setColor("#ff0000")

        let BLNOT = new Discord.RichEmbed()
            .setAuthor(`${message.author.tag} | Blacklist user from command usage`, message.author.displayAvatarURL)
            .setDescription(`${Failure} This user is not on the blacklist`)
            .setColor("#ff0000")

        let BLEmpty = new Discord.RichEmbed()
            .setAuthor(`${message.author.tag} | Blacklist user from command usage`, message.author.displayAvatarURL)
            .setDescription(`${Failure} The blacklist is empty`)
            .setColor("#ff0000")

        let BLSuccessAdd = new Discord.RichEmbed()
            .setAuthor(`${message.author.tag} | Blacklist user from command usage`, message.author.displayAvatarURL)
            .setDescription(`${Sucess} You successfully blacklisted a user.`)
            .setColor("#ff0000")

        let BLSuccessDel = new Discord.RichEmbed()
            .setAuthor(`${message.author.tag} | Blacklist user from command usage`, message.author.displayAvatarURL)
            .setDescription(`${Sucess} You successfully removed a blacklisted user`)
            .setColor("#ff0000")

    const action = args[0];
      let user = args[1];
      let answer;
      let BL_ID = 0
      switch (action) {
        case 'add':
            user = bot.users.get(args[1]) || message.mentions.users.first();
            if (!user) return message.channel.send(BLError);
            blacklist[user.id] = {
              id: `${BL_ID + 1}`
            }
            fs.writeFile("./storage/blacklist.json", JSON.stringify(blacklist), (err) => {
                if (err) {
                    console.log(err);
                }
            })
          message.channel.send(BLSuccessAdd)
          answer = BLSuccessAdd
          break;
        case 'remove':
        case 'del':
          user = bot.users.get(args[1]) || message.mentions.users.first();
          if (!user) return message.channel.send(BLError);
          if (blacklist[BL_ID] = {
            user: user.id
          }) {
            fs.writeFile("./storage/blacklist.json", JSON.stringify(`// DELETED BL MEMBER ${user.tag} (${user.id})`), (err) => {
              if (err) {
                  console.log(err);
              }
          })
            message.channel.send(BLSuccessDel)
            answer = BLSuccessDel
          } else {
            message.channel.send(BLNOT)
            answer = BLNOT
          }
          break;
        case 'view':
          const list = blacklist[BL_ID] = {
            user: user.id
          }
          if (!list.length) {
            answer = BLEmpty
          } else {
            answer = [`\`\`\`${list}\`\`\``, null];
          }
          break;
        default:
          answer = BLError
      }
      return answer;

}

module.exports.help = {
  name: "blacklist",
  aliases: ["bl"]
}
