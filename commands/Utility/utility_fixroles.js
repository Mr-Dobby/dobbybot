const Discord = require("discord.js");
const Profile = require("../../lib/profile");

module.exports.run = async (bot, message, args, client) => {

    if (message.guild.id !== "521602207406227476") return;
    let userProfile = await Profile.findOne( { user: message.author.id } )
    let member = message.guild.member(message.mentions.users.last() || message.guild.members.cache.get(args[0]) || message.author);
    const Failure = bot.emojis.cache.get("697388354689433611");
    const Sucess = bot.emojis.cache.get("697388354668462110");
    //The starter roles:
    const Dobbylanders_Role = message.guild.roles.cache.get("548430923478204426")
    const Heart_Role = message.guild.roles.cache.get("570889625711804416")
    //The Roles That Seperate Roles:
    const Role_1 = message.guild.roles.cache.get("652260889558253599")
    const Role_2 = message.guild.roles.cache.get("662024720937517087")
    const Role_3 = message.guild.roles.cache.get("643075711812501524")
    const Role_4 = message.guild.roles.cache.get("565129831927382038")

    const Stranger = message.guild.roles.cache.get("596271509136343050") // Level 5

    const lvl10 = message.guild.roles.cache.get("571663507838468126") // Level 10
    const Laughing = message.guild.roles.cache.get("552537841071161345")

    const Ordinary = message.guild.roles.cache.get("572916835725344768") // Level 15

    const lvl20 = message.guild.roles.cache.get("576038069908668426") // Level 20
    const Premium = message.guild.roles.cache.get("565516362303275029")

    const Exclusive = message.guild.roles.cache.get("576037505284177920") // Level 25

    const lvl30 = message.guild.roles.cache.get("662049478747881472") // Level 30
    const Beauty = message.guild.roles.cache.get("586517431741186064") 

    const Proficient = message.guild.roles.cache.get("693131508067598427") // Level 35

    const lvl40 = message.guild.roles.cache.get("690532063832703026") // Level 40
    const Champ = message.guild.roles.cache.get("693130807564435536")

    const Awesomenesses = message.guild.roles.cache.get("548445001252601865") // Level 45

    const lvl50 = message.guild.roles.cache.get("690532046657028186") // Level 50
    const Noob = message.guild.roles.cache.get("571264005033820200")


    var successEmbed = new Discord.MessageEmbed()
        .setAuthor(`${member.user.tag} | Fix Member Roles.`, member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Sucess} ${member} has been given the roles they needed.`)
        .setColor("#7aff7a")

    var failureEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Fix Member Roles.`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Failure} Provided user is either a bot or not a member.`)
        .setColor("#ff4f4f")

    try {

        await member.roles.add([Dobbylanders_Role, Heart_Role, Role_1, Role_2, Role_3, Role_4])

            if (userProfile.globalLevel >= 5) {
                await message.member.roles.add(Stranger)
            }
            if (userProfile.globalLevel >= 10) {
                await message.member.roles.add(lvl10)
                await message.member.roles.add(Laughing)
            }
            if (userProfile.globalLevel >= 15) {
                await message.member.roles.add(Ordinary)
            }
            if (userProfile.globalLevel >= 20) {
                await message.member.roles.add(lvl20)
                await message.member.roles.add(Premium)
            }
            if (userProfile.globalLevel >= 25) {
                await message.member.roles.add(Exclusive)
            }
            if (userProfile.globalLevel >= 30) {
                await message.member.roles.add(lvl30)
                await message.member.roles.add(Beauty)
            }
            if (userProfile.globalLevel >= 35) {
                await message.member.roles.add(Proficient)
            }
            if (userProfile.globalLevel >= 40) {
                await message.member.roles.add(lvl40)
                await message.member.roles.add(Champ)
            }
            if (userProfile.globalLevel >= 45) {
                await message.member.roles.add(Awesomenesses)
            }
            if (userProfile.globalLevel >= 50) {
                await message.member.roles.add(lvl50)
                await message.member.roles.add(Noob)
            }

            await message.channel.send(successEmbed)
            
        } catch (err) { 

        console.error(err)
        message.channel.send(failureEmbed) 
    }

}

module.exports.help = {
  name: "fixroles",
  aliases: []
}
