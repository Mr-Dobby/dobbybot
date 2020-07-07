const Discord = require("discord.js");

module.exports.run = async (bot, message, args, client) => {

    let member = message.guild.member(message.mentions.users.last() || message.guild.members.get(args[0]) || message.author);
    const Failure = bot.emojis.get("697388354689433611");
    const Sucess = bot.emojis.get("697388354668462110");
    //The starter roles:
    const Dobbylanders_Role = message.guild.roles.get("548430923478204426")
    const Heart_Role = message.guild.roles.get("570889625711804416")
    //The Roles That Seperate Roles:
    const Role_1 = message.guild.roles.get("652260889558253599")
    const Role_2 = message.guild.roles.get("662024720937517087")
    const Role_3 = message.guild.roles.get("643075711812501524")
    const Role_4 = message.guild.roles.get("565129831927382038")

    var successEmbed = new Discord.RichEmbed()
        .setAuthor(`${member.user.tag} | Fix Member Roles.`, member.user.displayAvatarURL)
        .setDescription(`${Sucess} ${member} has been given the default roles.`)
        .setColor("#7aff7a")

    var failureEmbed = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Fix Member Roles.`, message.author.displayAvatarURL)
        .setDescription(`${Failure} Provided user is either a bot or not a member.`)
        .setColor("#ff4f4f")

    if (message.guild.id !== "521602207406227476") return;
    if (!member.user.bot) {
        await member.addRoles([Dobbylanders_Role, Heart_Role, Role_1, Role_2, Role_3, Role_4])
        await message.channel.send(successEmbed)
    } else {
        await message.channel.send(failureEmbed)
    }

}

module.exports.help = {
  name: "fixroles",
  aliases: []
}
