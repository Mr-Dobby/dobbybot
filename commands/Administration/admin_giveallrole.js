const Discord = require(`discord.js`);
const commando = require(`discord.js-commando`);
const Servers = require(`../../lib/mongodb`);
const Logs = require(`../../lib/logs`);

module.exports.run = async (bot, message, args, client) => {

  var noPermsEmbed = new Discord.MessageEmbed()
      .setDescription(`${Failure} Creating new logs requires you to have \`ADMINISTRATOR\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.MessageEmbed()
      .setDescription(`${Failure} Creating new logs requires me to have \`MANAGE ROLES\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission("MANAGE_ROLES")) {
    return message.channel.send(noPermsEmbed);
  }

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } );
  let logName = await Logs.findOne( { guildID: message.guild.id } );
  const Failure = bot.emojis.cache.get(`697388354689433611`);
  const Sucess = bot.emojis.cache.get(`697388354668462110`);

  let member = message.member;
  if (member.roles.highest.position < message.guild.me.roles.highest.position && !member.hasPermission(`ADMINISTRATOR`)) return message.channel.send(`Woah, hold it there.\nYou actually need to be higher than me **AND** be a server Administrator to do this. This is a dangerous command. Contact the server owner.`)

    const giveallroleErrorEmbed = new Discord.MessageEmbed()
          .setColor(`#4fff7f`)
          .setTitle(`\`Command: -giveallrole\``)
          .addField(`**Description:**`, `Gives **EVERY** user a specified role.`)
          .addField(`**Command usage:**`, `${currPrefix.prefix}giveallrole <Role ID>`)
          .addField(`**Example:**`, `${currPrefix.prefix}giveallrole 000000000000000001`)
          .setFooter(`<> = Required | [] = Optional | Bot must control the specified role.`)

    const roleID = args.join(` `);
    if (!roleID) return message.channel.send(giveallroleErrorEmbed);
    let roleByID = message.guild.roles.cache.get(roleID);

    try {
    
      let attemptingEmbed = new Discord.MessageEmbed()
        .setColor("#ffc500")
        .setAuthor(`${message.author.tag} | Give All Role`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Attempting to add everyone to the ${roleByID.toString()} role...`)

      message.channel.send(attemptingEmbed)

      const list = bot.guilds.cache.get(message.guild.id); 
      await list.members.cache.filter(member => !member.user.bot).forEach(member => member.roles.add(roleByID)); 

      let successEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Give All Role`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Sucess} Successfully added everyone to the ${roleByID.toString()} role.`)
        .setColor("#7aff7a")

      await message.channel.send(successEmbed)

    } catch(e) {

      var failEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Give All Role`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} Something went wrong: ${e}`)
        .setColor("#ff0000")

      message.channel.send(failEmbed)

    }

}

module.exports.help = {
  name: `giveallrole`,
  aliases: []
}
