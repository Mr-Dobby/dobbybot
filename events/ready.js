const {bot} = require('../index');
const Discord = require("discord.js");
const config = require("../storage/config.json");
const antispam = require("better-discord-antispam");
const Config = require('../lib/mongodb');
const Raid = require('../lib/raid');
const Logs = require("../lib/logs");
const Ticket = require("../lib/ticketsys");
const Servers = require("../lib/mongodb");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Dobby_Bot', {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
        if (err) return console.error(err);
    });

bot.on("ready", async () => {

console.log(`
__________________________________________
|                                        |
|    All commands have loaded.           |
|    Connected to MongoDB.               |
|    Dobby Bot is Online!                |
|________________________________________|
`);

antispam(bot, {
    limitUntilWarn: 3, // The amount of messages allowed to send within the interval(time) before getting a warn.
    limitUntilMuted: 5, // The amount of messages allowed to send within the interval(time) before getting a muted.
    interval: 2000, // The interval(time) where the messages are sent. Practically if member X sent 5+ messages within 2 seconds, he get muted. (1000 milliseconds = 1 second, 2000 milliseconds = 2 seconds etc etc)
    warningMessage: "| Warned due to spam.", // Message you get when you are warned!
    muteMessage: "| Muted due to spam.", // Message sent after member X was punished(muted).
    maxDuplicatesWarning: 5,// When people are spamming the same message, this will trigger when member X sent over 7+ messages.
    maxDuplicatesMute: 10, // The limit where member X get muted after sending too many messages(10+).
    ignoredRoles: [], // The members with this role(or roles) will be ignored if they have it. Suggest to not add this to any random guys. Also it's case sensitive.
    ignoredMembers: [], // These members are directly affected and they do not require to have the role above. Good for undercover pranks.
    mutedRole: "🔇 Muted", // Here you put the name of the role that should not let people write/speak or anything else in your server. If there is no role set, by default, the module will attempt to create the role for you & set it correctly for every channel in your server. It will be named "muted".
    timeMuted: 1000 * 600, // This is how much time member X will be muted. if not set, default would be 10 min.
});
/*
    setInterval(async () => {

        const statusList = [
    //      { name: 'Dobbyland', type: 'WATCHING'},
    //      { name: 'the lovely world of Dobbylanders', type: 'WATCHING'},
    //      { name: 'porn probably', type: 'WATCHING'},
    //      { name: 'Moody Music', type: 'LISTENING'},
    //      { name: 'with my owner', type: 'PLAYING'},
    //      { name: '-help', type: 'PLAYING'},
    //      { name: '-help', type: 'WATCHING'},
          { name: `-help`, type: 'LISTENING'}
        ]
      
          const index = Math.floor(Math.random() * statusList.length + 1) - 1;
          //set `${activities_list[index]}`
          await bot.user.setActivity(statusList[index].name, {
            type: statusList[index].type
          })
          bot.user.setStatus('online') // Can be 'online', 'idle', 'dnd', or 'invisible'
      
        }, 1000000); // 5 Minutes = 300000
*/
        await bot.user.setActivity('-help', { type: 'LISTENING'} );
        bot.user.setStatus('online');
        bot.guilds.cache.keyArray().forEach(async (id) => {

        await Config.findOne({
            guildID: id
        }, (err, guild) => {
            if (err) console.error(err);

            if (!guild) {
                const newConfig = new Config({

                    guildID: id,
                    prefix: config.prefix

                });

                return newConfig.save();
            }
        });

        await Raid.findOne({
            guildID: id
        }, (err, guild) => {
            if (err) console.error(err);
            
            if (!guild) {
                const RaidFunc = new Raid({

                    guildID: id,
                    raid: false,
                    ignoredChannels: "`Not set`"

                })

                return RaidFunc.save();
            }
        });

        await Logs.findOne({
            guildID: id
        }, (err, guild) => {
            if (err) console.error(err);
            
            if (!guild) {
                const newLogs = new Logs({

                    guildID: id,
                    incidentLog: "`Not set`",
                    serverLog: "`Not set`",
                    raidLog: "`Not set`",
                    welcomeLog: "`Not set`"
            
                });

                return newLogs.save();
            }
        });

        await Ticket.findOne({
            guildID: id
        }, (err, guild) => {
            if (err) console.error(err);
            
            if (!guild) {
                const ticketSys = new Ticket({

                    guildID: id,
                    ticketID: 0,
                    categoryID: "`Not set`"
            
                });

                return ticketSys.save();
            }
        });

        await Servers.findOne({
            guildID: id
        }, (err, guild) => {
            if (err) console.error(err);
            
            if (!guild) {
                const newServers = new Servers({

                    guildID: id,
                    prefix: "-"
            
                });

                return newServers.save();
            }
        });
    }); 
});
