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

    function generateXP() {
        var min = 10;
        var max = 25;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    Profile.findOne({ 
        user: message.author.id
    }, (err, cunt) => {
        if (err) console.error(err);
        if (!cunt) {
            const newUserProfile = new Profile({

                user: message.author.id,
                userName: message.author.tag,
                globalReputation: 0,
                balance: 0,
                globalLevel: 0,
                xp: generateXP(),
                quote: `\`Use ${currPrefix.prefix}quote to assign a quote to your profile.\``,
                thumbnail: message.author.displayAvatarURL(),
                inventory: `Nothing has been purchased or given to your inventory yet.`,
                colour: `#525252`

            })

        newUserProfile.save().catch(err => console.error(err))

        } else {
            
            cunt.xp = cunt.xp + generateXP()
            cunt.save();

        }
    })

        let prefixEmbed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} | Prefix`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Current prefix of this server: \`${currPrefix.prefix}\``)
    
        const prefixMention = new RegExp(`^<@!?${bot.user.id}>( |)$`)
        if (message.content.match(prefixMention)) return message.channel.send(prefixEmbed)  
        let userProfile = await Profile.findOne( { user: message.author.id } )
        const nxtLvl =  5 * Math.pow(userProfile.globalLevel, 2) + 50 * userProfile.globalLevel + 100;
        const currXp = await userProfile.xp;

        if (nxtLvl <= currXp) {

            await Profile.findOneAndUpdate( { user: message.author.id }, { $set: { globalLevel: userProfile.globalLevel + 1 } }, { new: true } )
            await Profile.findOneAndUpdate( { user: message.author.id }, { $set: { xp: 0 } }, { new: true } )

                if (currPrefix.lvlmsg === true) {

                    let lvlUpEmbed = new Discord.MessageEmbed()
                        .setAuthor(`${message.author.tag} | Level up!`, message.author.displayAvatarURL({ dynamic: true }))
                        .setDescription(`**Congratulations** <@${message.author.id}>, you have leveled up!\nYou are now level ${userProfile.globalLevel + 1}`)
                        .setThumbnail("https://cdn.discordapp.com/attachments/682717976771821646/705125856455950496/Levelup.png")
                        .setFooter(`Disable this message for all members within the server with: ${currPrefix.prefix}disable lvlmsg`)
                        .setColor("#00cbe5")

                    message.channel.send(lvlUpEmbed).then(message => message.delete({ timeout: 10000 }))

            }
        }

        let prefix = currPrefix.prefix;
        let args = message.content.slice(prefix.length).trim().split(' ');
        let cmd = args.shift().toLowerCase();
        let command;

        if (!message.content.startsWith(prefix)) return;
    
        if (bot.commands.has(cmd)) {
            command = bot.commands.get(cmd);
        } else {
            command = bot.commands.get(bot.aliases.get(cmd));
        }
    
        if (command) command.run(bot, message, args, client);

});
