const Discord = require(`discord.js`);
const commando = require(`discord.js-commando`);
const Servers = require(`../../lib/mongodb`);
const Logs = require(`../../lib/logs`);

module.exports.run = async (bot, message, args, client) => {

  const Failure = bot.emojis.cache.get(`697388354689433611`);
  const Sucess = bot.emojis.cache.get(`697388354668462110`);
  var noPermsEmbed = new Discord.MessageEmbed()
      .setDescription(`${Failure} Creating new logs requires you to have \`ADMINISTRATOR\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.MessageEmbed()
      .setDescription(`${Failure} Creating new logs requires me to have \`MANAGE CHANNELS\` and \`MANAGE ROLES\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission(["MANAGE_ROLES" && "MANAGE_CHANNELS"])) {
    return message.channel.send(noPermsEmbed);
  }

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } );
  let logName = await Logs.findOne( { guildID: message.guild.id } );

  let member = message.member;
  if (!member.hasPermission(`ADMINISTRATOR`)) return message.channel.send(`Woah, hold it there.\nYou actually need to be a Server Administrator to execute \`${currPrefix.prefix}takeallrole\`.`)

    const takeallroleErrorEmbed = new Discord.MessageEmbed()
          .setColor(`#ff4f4f`)
          .setTitle(`\`Command: ${currPrefix.prefix}giveallrole\``)
          .addField(`**Description:**`, `From **EVERY** user the bot controls, it will remove specified role.`)
          .addField(`**Command usage:**`, `${currPrefix.prefix}takeallrole <role ID>`)
          .addField(`**Example:**`, `${currPrefix.prefix}takeallrole Member`)
          .setFooter(`<> = Required | [] = Optional`)

    const roleID = args.join(` `);
    if (!roleID) return message.channel.send(takeallroleErrorEmbed)
    let roleByID = message.guild.roles.cache.get(roleID)

    try {
    
      let attemptingEmbed = new Discord.MessageEmbed()
        .setColor("#ffc500")
        .setAuthor(`${message.author.tag} | Take All Role`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Attempting to remove everyone from the ${roleByID.toString()} role...`)

      message.channel.send(attemptingEmbed)

      const list = bot.guilds.cache.get(message.guild.id); 
      await list.members.cache.filter(member => !member.user.bot).forEach(member => member.roles.remove(roleByID)); 

      let successEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Take All Role`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Sucess} Successfully removed everyone from the ${roleByID.toString()} role.`)
        .setColor("#7aff7a")

      await message.channel.send(successEmbed)

    } catch(e) {

      var failEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Take All Role`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} Something went wrong: ${e}`)
        .setColor("#ff0000")

      message.channel.send(failEmbed)

    }

}

module.exports.help = {
  name: `takeallrole`,
  aliases: []
}
