const {bot} = require('../index');
const Discord = require("discord.js");
const client = new Discord.Client();
const Profile = require("../lib/profile");
const Servers = require("../lib/mongodb");
const Raid = require("../lib/raid");

bot.on("message", async (message) => {

    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    var hs = String(date.getHours()).padStart(2, '0');
    var min = String(date.getMinutes()).padStart(2, '0');
    var sec = String(date.getSeconds()).padStart(2, '0');
//    var ms = String(date.getMilliseconds()).padStart(2);
    date = hs + ':' + min + ':' + sec + ' - ' + dd + '/' + mm + '/' + yyyy + ' | ';

    if (message.author.bot) return;
    if (message.channel.type === "dm") return bot.channels.cache.get("747187965146431659").send(`${date}DM from ${message.author.tag}: ${message.content}`);

    let ThisGuild = await Raid.findOne( { guildID: message.guild.id } )
    let Toggled = await Raid.findOne( { guildID: message.guild.id, raid: true } )
    let currPrefix = await Servers.findOne( { guildID: message.guild.id } )
  
    if (ThisGuild && Toggled) {
//        bot.emit('checkMessage', message);
    }

    let userProfile = await Profile.findOne( { user: message.author.id } )

        if (!userProfile) {
            const newUserProfile = new Profile({
  
                user: message.author.id,
                userName: message.author.tag,
                globalReputation: 0,
                balance: 0,
                globalLevel: 0,
                xp: 0,
                quote: `\`Use ${currPrefix.prefix}quote to assign a quote to your profile.\``,
                thumbnail: message.author.displayAvatarURL({ dynamic: true }),
                inventory: `Nothing has been purchased or given to your inventory yet.`,
                colour: `#525252`

            })
        await newUserProfile.save();
        }
    
        const currXp = await userProfile.xp;
        const nxtLvl = 5 * Math.pow(userProfile.globalLevel, 2) + 50 * userProfile.globalLevel + 100;
        function generateXP() {
            let min = 10;
            let max = 25;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        //const xpAdd = Math.floor(Math.random() * 100) + 10;

        await Profile.findOneAndUpdate( { user: message.author.id }, { $set: { xp: currXp + generateXP() } } )

        if (nxtLvl <= currXp) {

            let lvlUpEmbed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag} | Level up!`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`**Congratulations** <@${message.author.id}>, you have leveled up!\nYou are now level ${userProfile.globalLevel + 1}`)
                .setThumbnail("https://cdn.discordapp.com/attachments/682717976771821646/705125856455950496/Levelup.png")
                .setColor("#00cbe5")

            await Profile.findOneAndUpdate( { user: message.author.id }, { $set: { globalLevel: userProfile.globalLevel + 1, xp: 0 } } )
            message.channel.send(lvlUpEmbed).then(message => message.delete({ timeout: 10000 }))

        }

        let prefixEmbed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} | Prefix`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Current prefix of this server: \`${currPrefix.prefix}\``)
    
        const prefixMention = new RegExp(`^<@!?${bot.user.id}>( |)$`)
        if (message.content.match(prefixMention)) return message.channel.send(prefixEmbed)  

        // return message.channel.send(`**${user_tag}** is currently afk. Reason: ${key.reason}`);
        // return message.reply(`you have been removed from the afk list!`).then(msg => msg.delete(5000));
    
        if (message.content.includes(message.mentions.users.first())) {
            let mentioned = bot.afk.get(message.mentions.users.first().id);
            message.delete({ timeout: 100 });
            if (mentioned) return;
        }
        let afkcheck = bot.afk.get(message.author.id);
        let embed = new Discord.MessageEmbed()
            .setDescription(`<@${message.author.id}> you have been removed from the AFK list!`)
        if (afkcheck) return [bot.afk.delete(message.author.id), message.channel.send(embed).then(message => message.delete({ timeout: 5000 }))];
    
        let prefix = currPrefix.prefix;
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
