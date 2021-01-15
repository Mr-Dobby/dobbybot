const Discord = require("discord.js");
const {bot} = require('../index');
const config = require('../storage/config.json');
const Config = require('../lib/mongodb');
const Raid = require('../lib/raid');
const Logs = require('../lib/logs');
const Ticket = require('../lib/ticketsys');

module.exports = async (bot, guild) => {

    if (!guild.available) {
      return;
    }

    let defaultChannel = "";
    guild.channels.cache.forEach((channel) => {
      if (channel.type == "text" && defaultChannel == "") {
        if (channel.permissionsFor(guild.me).has(["SEND_MESSAGE" && "EMBED_LINKS"])) {
          defaultChannel = channel;
        }
      }
    })

        defaultChannel.send({
          embed: {
            author: {
              name: 'A Wild Dobby Bot Appeared!',
              icon_url: bot.user.avatarURL({ dynamic: true })
            },
            color: 0x000001,
            description: `Default Prefix: \`-\` | Set new with \`-prefix <prefix>\``,
            fields: [
              {
                name: "Help",
                value: `Root of the help section: \`-help\`.`
              },  
              {
                name: "Links",
                value: `Support Server: *[Click Here](https://discord.gg/hAAYCS8WBN)*\n Invite the bot: *[Click Here](https://discord.com/api/oauth2/authorize?client_id=786264014682324992&permissions=290843734&scope=bot)*`
              }
            ],
            timestamp: new Date(),
            footer: {
              text: `Thank you for adding me to your server!`
            }
          }
        })
/*
        if (Config.findOne( { guildID: guild.id } )) { return; }
        if (Raid.findOne( { guildID: guild.id } )) { return; }
        if (Logs.findOne( { guildID: guild.id } )) { return; }
        if (Ticket.findOne( { guildID: guild.id } )) { return; }
*/
              const newConfig = new Config({

                  guildID: guild.id,
                  prefix: config.prefix,
                  muteRole: "",
                  chatbanRole: "",
                  lvlmsg: true,
                  lockdown: false,
                  nsfw: false

              });

              await newConfig.save();
          
              const RaidFunc = new Raid({

                  guildID: guild.id,
                  raid: false,
                  ignoredChannels: "`Not set`"

              });

              await RaidFunc.save();


              const newLogs = new Logs({

                  guildID: guild.id,
                  incidentLog: "`Not set`",
                  serverLog: "`Not set`",
                  raidLog: "`Not set`",
                  welcomeLog: "`Not set`"
            
              });

              await  newLogs.save();

              const ticketSys = new Ticket({

                guildID: guild.id,
                ticketID: 0,
                categoryID: "`Not set`"
          
              });

              await ticketSys.save();
    
    //    guild.owner.send("Hello! I'm Dobby Bot.\nI is glad you chose me!")  //Send guild owner a DM when bot joins.
    
};