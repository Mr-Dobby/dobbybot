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
          defaultChannel.send({
            embed: {
              author: {
                name: 'A Wild Server Elf Appeared!',
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
        }
      }
    })

      await Config.findOne({ 
          guildID: guild.id
      }, (err, cunt) => {
          if (err) console.error(err);
          if (!cunt) {
              const newSchema = new Config({
  
                guildID: guild.id,
                prefix: config.prefix,
                muteRole: "",
                chatbanRole: "",
                lvlmsg: true,
                lockdown: false,
                nsfw: false
  
              })
  
              newSchema.save().catch(err => console.error(err))
  
          }
      })

      await Raid.findOne({ 
        guildID: guild.id
    }, (err, cunt) => {
        if (err) console.error(err);
        if (!cunt) {
            const newSchema = new Raid({

              guildID: guild.id,
              raid: false,
              ignoredChannels: "`Not set`"

            })

            newSchema.save().catch(err => console.error(err))

        }
    })

      await Logs.findOne({ 
        guildID: guild.id
    }, (err, cunt) => {
        if (err) console.error(err);
        if (!cunt) {
            const newSchema = new Logs({

              guildID: guild.id,
              incidentLog: "`Not set`",
              serverLog: "`Not set`",
              raidLog: "`Not set`",
              welcomeLog: "`Not set`"

            })

            newSchema.save().catch(err => console.error(err))

        }
    })

      await Ticket.findOne({ 
        guildID: guild.id
    }, (err, cunt) => {
        if (err) console.error(err);
        if (!cunt) {
            const newSchema = new Ticket({

              guildID: guild.id,
              ticketID: 0,
              categoryID: "`Not set`"

            })

            newSchema.save().catch(err => console.error(err))

        }
    })
    
    //    guild.owner.send("Hello! I'm Dobby Bot.\nI is glad you chose me!")  //Send guild owner a DM when bot joins.
    
};