const math = require('mathjs');
const Discord = require("discord.js");

module.exports.run = async (bot, message, args, client) => {

  async function calc() {

            if (!args[0]) return;

            let resp;
            try {
                resp = math.evaluate(args.join(' '));
            } catch (error) {

              const mathEmbed = new Discord.MessageEmbed()
                .setColor("#010000")
                .setAuthor(`${message.author.tag} | Calculator`, message.author.displayAvatarURL({ dynamic: true }))
                .addField('Input', `\`\`\`\n${args.join(' ')}\`\`\``)
                .addField('Result', `\`\`\`diff\n- Something went wrong. Try something else.\`\`\``)
    
              return message.channel.send(mathEmbed)

            }

              const mathEmbed = new Discord.MessageEmbed()
                .setColor("#010000")
                .setAuthor(`${message.author.tag} | Calculator`, message.author.displayAvatarURL({ dynamic: true }))
                .addField('Input', `\`\`\`\n${args.join(' ')}\`\`\``)
                .addField('Result', `\`\`\`js\n${resp}\`\`\``)

                message.channel.send(mathEmbed)

          }
    calc();
}

module.exports.help = {
  name: "calc",
  aliases: ["calculate", "math"]
}
