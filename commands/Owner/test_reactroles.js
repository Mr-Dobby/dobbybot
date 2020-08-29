const Discord = require("discord.js");

module.exports.run = async (bot, message, args, client) => {

  const reactionRoles = [

    {
      name: 'Black',
      reaction: '⬛',
      reactionRole: message.guild.roles.cache.get('595509263754067969'),
    },
    {
      name: 'White',
      reaction: '⬜',
      reactionRole: message.guild.roles.cache.get('595510495902040074'),
    },
    {
      name: 'Grey',
      reaction: bot.emojis.cache.get("726404996383637514"),
      reactionRole: message.guild.roles.cache.get('701023701566750781')
    },
    {
      name: 'Magenta',
      reaction: '💟',
      reactionRole: message.guild.roles.cache.get('595507447112925204'),
    },
    {
      name: 'Purple',
      reaction: '🟪',
      reactionRole: message.guild.roles.cache.get('595507863355654154'),
    },
    {
      name: 'Red',
      reaction: '🟥',
      reactionRole: message.guild.roles.cache.get('595506989212106802'),
    },
    {
      name: 'Orange',
      reaction: '🟧',
      reactionRole: message.guild.roles.cache.get('595507331396009986'),
    },
    {
      name: 'Yellow',
      reaction: '🟨',
      reactionRole: message.guild.roles.cache.get('595507180183093248'),
    },
    {
      name: 'Green',
      reaction: '🟩',
      reactionRole: message.guild.roles.cache.get('595507124574879744'),
    },
    {
      name: 'Cyan',
      reaction: bot.emojis.cache.get("726404996358340608"),
      reactionRole: message.guild.roles.cache.get('701023419931820052')
    },
    {
      name: 'Blue',
      reaction: '🟦',
      reactionRole: message.guild.roles.cache.get('595507043629268993'),
    },

  ];

const RandomColour = Math.floor(Math.random() * Math.floor(16777215));
const embed = new Discord.MessageEmbed()
    .setAuthor('Available Roles')
    .setDescription(`${reactionRoles.map(r => `${r.reactionRole.toString()} | ${r.reaction} | ${r.name}`).join('\n')}`)
    .setFooter('React on the right emoji to get a colour.')
    .setColor(RandomColour)
    .setTimestamp();

  message.channel.send(embed)
    .then(async msg => {
        for (const r of reactionRoles) {
            await msg.react(r.reaction);
        }
        const filter = (reaction, user) => reactionRoles.map(r => r.reaction).includes(reaction.emoji.name) && user.id === message.author.id;
        msg.awaitReactions(filter)
            .then(collected => {
                let role = reactionRoles.reactionRole;
                if (message.member.roles.has(role)) message.channel.send('You already have this role role').then(message => message.delete(2000));
                message.member.addRole(role.reactionRole);
                
            }).catch(collected => {
              message.channel.send("I couldn't add you to this role. If this keeps occouring, contact staff.").then(message => message.delete(2000));
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));

}

module.exports.help = {
  name: "react",
  aliases: []
}
