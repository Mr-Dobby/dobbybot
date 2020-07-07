const {bot} = require('../index');
const Discord = require("discord.js");
const client = new Discord.Client();
const Config = require('../lib/mongodb');
const Profile = require("../lib/profile");
const Servers = require("../lib/mongodb");
const Raid = require("../lib/raid");

bot.on("message", async (message) => {

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let ThisGuild = await Raid.findOne( { guildID: message.guild.id } )
    let Toggled = await Raid.findOne( { guildID: message.guild.id, raid: true } )
  
    if (ThisGuild && Toggled) {
//        bot.emit('checkMessage', message);
    }

    let userProfile = await Profile.findOne( { user: message.author.id } )
    if (userProfile) {

        function generateXP() {
            let min = 30;
            let max = 50;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        //const xpAdd = Math.floor(Math.random() * 100) + 10;
        const currXp = userProfile.xp;
        const nxtLvl = 5 * Math.pow(userProfile.globalLevel, 2) + 50 * userProfile.globalLevel + 100;

        let lvlUpEmbed = new Discord.RichEmbed()
            .setAuthor(`${message.author.tag} | Level up!`, message.author.displayAvatarURL)
            .setDescription(`**Congratulations** <@${message.author.id}>, you have leveled up!`)
            .setThumbnail("https://cdn.discordapp.com/attachments/682717976771821646/705125856455950496/Levelup.png")
            .setFooter(`You are now level ${userProfile.globalLevel + 1}`)
            .setColor("#00cbe5")

        await Profile.findOneAndUpdate( { user: message.author.id }, { $set: { xp: currXp + generateXP() } } )
        //await Profile.updateOne( { user: message.author.id }, { $set: { xp:  + xpAdd } } )
        if (currXp >= nxtLvl) {

            await Profile.findOneAndUpdate( { user: message.author.id }, { $set: { globalLevel: userProfile.globalLevel + 1 } } )
            await Profile.findOneAndUpdate( { user: message.author.id }, { $set: { xp: 0 } } )
            message.channel.send(lvlUpEmbed).then(message => message.delete(10000))

        }

        const Stranger = message.guild.roles.get("596271509136343050") // Level 5

        const lvl10 = message.guild.roles.get("571663507838468126") // Level 10
        const Laughing = message.guild.roles.get("552537841071161345")

        const Ordinary = message.guild.roles.get("572916835725344768") // Level 15

        const lvl20 = message.guild.roles.get("576038069908668426") // Level 20
        const Premium = message.guild.roles.get("565516362303275029")

        const Exclusive = message.guild.roles.get("576037505284177920") // Level 25

        const lvl30 = message.guild.roles.get("662049478747881472") // Level 30
        const Beauty = message.guild.roles.get("586517431741186064") 

        const Proficient = message.guild.roles.get("693131508067598427") // Level 35

        const lvl40 = message.guild.roles.get("690532063832703026") // Level 40
        const Champ = message.guild.roles.get("693130807564435536")

        const Awesomenesses = message.guild.roles.get("548445001252601865") // Level 45

        const lvl50 = message.guild.roles.get("690532046657028186") // Level 50
        const Noob = message.guild.roles.get("571264005033820200")

            if (message.guild.id === "521602207406227476") {
                if (userProfile.globalLevel >= 5) {
                    await message.member.addRole(Stranger)
                }
                if (userProfile.globalLevel >= 10) {
                    await message.member.addRole(lvl10)
                    await message.member.addRole(Laughing)
                }
                if (userProfile.globalLevel >= 15) {
                    await message.member.addRole(Ordinary)
                }
                if (userProfile.globalLevel >= 20) {
                    await message.member.addRole(lvl20)
                    await message.member.addRole(Premium)
                }
                if (userProfile.globalLevel >= 25) {
                    await message.member.addRole(Exclusive)
                }
                if (userProfile.globalLevel >= 30) {
                    await message.member.addRole(lvl30)
                    await message.member.addRole(Beauty)
                }
                if (userProfile.globalLevel >= 35) {
                    await message.member.addRole(Proficient)
                }
                if (userProfile.globalLevel >= 40) {
                    await message.member.addRole(lvl40)
                    await message.member.addRole(Champ)
                }
                if (userProfile.globalLevel >= 45) {
                    await message.member.addRole(Awesomenesses)
                }
                if (userProfile.globalLevel >= 50) {
                    await message.member.addRole(lvl50)
                    await message.member.addRole(Noob)
                }
            }
        }

    Config.findOne({
        guildID: message.guild.id
    }, async (err, guild) => {

        if (err) console.error(err);

        let currPrefix = await Servers.findOne( { guildID: message.guild.id } )
        let prefixEmbed = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} | Prefix`, message.author.displayAvatarURL)
        .setDescription(`Current prefix of this server: \`${currPrefix.prefix}\``)
    
        const prefixMention = new RegExp(`^<@!?${bot.user.id}>( |)$`)
        if (message.content.match(prefixMention)) return message.channel.send(prefixEmbed)  

        // return message.channel.send(`**${user_tag}** is currently afk. Reason: ${key.reason}`);
        // return message.reply(`you have been removed from the afk list!`).then(msg => msg.delete(5000));
    
        if (message.content.includes(message.mentions.users.first())) {
            let mentioned = bot.afk.get(message.mentions.users.first().id);
            message.delete();
            if (mentioned) return;
        }
        let afkcheck = bot.afk.get(message.author.id);
        let embed = new Discord.RichEmbed()
        .setDescription(`<@${message.author.id}> you have been removed from the AFK list!`)
        if (afkcheck) return [bot.afk.delete(message.author.id), message.channel.send(embed).then(message => message.delete(5000))];
    
        let prefix = guild.prefix;
        let args = message.content.slice(prefix.length).trim().split(' ');
        let cmd = args.shift().toLowerCase();
        let command;

        if (!message.content.startsWith(prefix)) return;
        if (message.author.id == "254134528942014465") return message.channel.send("You're a cheating whore, Litia, and I will not obey you. You have been blacklisted from this bot.")
    
        if (bot.commands.has(cmd)) {
            command = bot.commands.get(cmd);
        } else {
            command = bot.commands.get(bot.aliases.get(cmd));
        }
    
        if (command) command.run(bot, message, args, client);

    });
});
