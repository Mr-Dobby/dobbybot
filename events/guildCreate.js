const Discord = require("discord.js");
const {bot} = require('../index');
const config = require('../storage/config.json');
const Config = require('../lib/mongodb');
const Raid = require('../lib/raid');
const Logs = require('../lib/logs');
const Ticket = require('../lib/ticketsys');
const Servers = require('../lib/mongodb');

bot.on("guildCreate", async (guild) => {

    if (!guild.available) {
      return;
    }

              const newConfig = new Config({

                  guildID: guild.id,
                  prefix: config.prefix

              });

              await newConfig.save();
          
              const RaidFunc = new Raid({

                  guildID: guild.id,
                  raid: false

              });

              await RaidFunc.save();


              const newLogs = new Logs({

                  guildID: guild.id,
                  incidentLog: "`Not set`",
                  serverLog: "`Not set`",
                  raidLog: "`Not set`"
            
              });

              await  newLogs.save();

              const ticketSys = new Ticket({

                guildID: guild.id,
                ticketID: 0,
                categoryID: "`Not set`"
          
            });

              await ticketSys.save();
    
    //    guild.owner.send("Hello! I'm Dobby Bot.\nI is glad you chose me!")  //Send guild owner a DM when bot joins.
    
    let defaultChannel = "";
    guild.channels.forEach((channel) => {
      if (channel.type == "text" && defaultChannel == "") {
        if (channel.permissionsFor(guild.me).has("ADMINISTRATOR")) {
          defaultChannel = channel;
        }
      }
    })
    let currPrefix = await Servers.findOne( { guildID: guild.id } )
        defaultChannel.send(`Thanks for adding me!`, {
          embed: {
            author: {
              name: 'A Wild Dobby Bot Appeared!',
              icon_url: bot.user.avatarURL
            },
            color: 010000,
            description: `Default Prefix: \`-\` | Set new with \`${currPrefix.prefix}prefix <prefix>\``,
            fields: [
              {
                name: "Help:",
                value: `\`${currPrefix.prefix}help\`, \`${currPrefix.prefix}h\` \`${currPrefix.prefix}welp\``
              },
              {
                name: "Get Started",
                value: `\`${currPrefix.prefix}logs\` - Set up logs for the server (plus welcome channel and ticketsystem).\n\`${currPrefix.prefix}new\` - Let members start new tickets (and create a profile!)`
              },
              {
                name: "Links",
                value: `Dobby Bot's Server: *[Click Here](https://discord.gg/HXPCWfv)*\n Invite the bot: *[Click Here](https://discordapp.com/oauth2/authorize?client_id=570525775351119872&scope=bot&permissions=268443694)*`
              }
            ],
            timestamp: new Date(),
            footer: {
              text: `ID: ${bot.user.id}`
            }
          }
  })
});