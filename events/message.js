const {bot} = require('../index');
const Discord = require("discord.js");
const client = new Discord.Client();
const Profile = require("../lib/profile");
const Servers = require("../lib/mongodb");
const ms = require('ms');
const coolDownXP = new Set();

module.exports = async (bot, message) => {

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

//    let ThisGuild = await Raid.findOne( { guildID: message.guild.id } )
//    let Toggled = await Raid.findOne( { raid: true } )
    const currPrefix = await Servers.findOne( { guildID: message.guild.id } );

    await Profile.findOne({ 
        user: message.author.id
    }, (err, cunt) => {
        if (err) console.error(err);
        if (!cunt) {
            const newUserProfile = new Profile({

                user: message.author.id,
                userName: message.author.tag,
                globalReputation: 0,
                balance: 10,
                globalLevel: 0,
                xp: 1,
                quote: `\`Use ${currPrefix.prefix}quote to assign a quote to your profile.\``,
                thumbnail: message.author.displayAvatarURL(),
                inventory: `Nothing has been purchased or given to your inventory yet.`,
                colour: `#525252`

            })

        newUserProfile.save().catch(err => console.error(err))

        }
    })

    const userProfile = await Profile.findOne( { user: message.author.id } );
    if (userProfile) { 
        var currXp = userProfile.xp; 
        var nxtLvl = 5 * Math.pow(userProfile.globalLevel, 2) + 50 * userProfile.globalLevel + 100; 
    };

    if (!message.content.startsWith(currPrefix.prefix)) {
        if (coolDownXP.has(message.author.id)) {

            return;

        } else {

            if (nxtLvl <= currXp) {

                function randomNumber(min, max) {  
                    min = Math.ceil(min); 
                    max = Math.floor(max); 
                    return Math.floor(Math.random() * (max - min + 1)) + min; 
                }

                let randomAmount = randomNumber(450, 650)

                await Profile.findOneAndUpdate( { user: message.author.id }, { $set: { xp: 0 } }, { new: true } )
                await Profile.findOneAndUpdate( { user: message.author.id }, { $set: { globalLevel: userProfile.globalLevel + 1 } }, { new: true } )
                await Profile.findOneAndUpdate( { user: message.author.id }, { $set: { balance: userProfile.balance + randomAmount } }, { new: true } )

                if (currPrefix.lvlmsg === true) {

                    let lvlUpEmbed = new Discord.MessageEmbed()
                        .setAuthor(`${message.author.tag} | Level up!`, message.author.displayAvatarURL({ dynamic: true }))
                        .setDescription(`**Congratulations** <@${message.author.id}>, you have leveled up!\n\nNew Level: **${userProfile.globalLevel + 1}**\nDC: **+ ${randomAmount} DC** 💸`)
                        .setThumbnail("https://cdn.discordapp.com/attachments/682717976771821646/705125856455950496/Levelup.png")
                        .setFooter(`Disable this message for all members within the server with: ${currPrefix.prefix}disable lvlmsg`)
                        .setColor("#00cbe5")

                    message.channel.send(lvlUpEmbed).then(message => message.delete({ timeout: 10000 }))

                }
            } else {

            function generateXP() {
                var min = 10;
                var max = 35;
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            await Profile.findOneAndUpdate( { user: message.author.id }, { $set: { xp: userProfile.xp + generateXP() } }, { new: true } )
        
        }
        coolDownXP.add(message.author.id);
        setTimeout(() => {
            coolDownXP.delete(message.author.id);
        }, ms('30s'));
    }

} else {

/*
        let prefixEmbed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} | Prefix`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Current prefix of this server: \`${currPrefix.prefix}\``)
    
        const prefixMention = new RegExp(`^<@!?${bot.user.id}>( |)$`)
        if (message.content.match(prefixMention)) return message.channel.send(prefixEmbed)  
*/    

        const args = message.content.split(/\s+/g); 
        let cmd = args.shift().slice(currPrefix.prefix.length).toLowerCase();
        let command;

        if (bot.commands.has(cmd)) {
            command = bot.commands.get(cmd);
        } else {
            command = bot.commands.get(bot.aliases.get(cmd));
        }

        if (command) command.run(bot, message, args, client);
    }
};
