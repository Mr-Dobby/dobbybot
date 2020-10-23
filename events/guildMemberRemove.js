const Discord = require("discord.js");
const {bot} = require('../index');
const Logs = require("../lib/logs")
const colour = require('../storage/colours.json')

//Dobbyland
let options = { 
    total: "667335552558956554",
    users: "667335645894541331",
    bots: "667337560179343374"
  }
  
  //Juicy Bad Girls
  let options1 = {
    total: "687332936936063033",
    users: "687333066934714490",
    bots: "687333146613776424"
  }

bot.on("guildMemberRemove", async (member) => {

  var date = new Date();
  var hs = String(date.getHours()).padStart(2, '0');
  var min = String(date.getMinutes()).padStart(2, '0');
  var sec = String(date.getSeconds()).padStart(2, '0');

    const banList = await member.guild.fetchBans();
    const bannedUser = banList.find(user => user.id === member.id);
    if (bannedUser) return;

    let fire = bot.emojis.cache.get("687436596391182344")
    let logName = await Logs.findOne( { guildID: member.guild.id } )
    const logchannel = bot.channels.cache.get(logName.serverLog)
  
  if (member.bot) return;

          const userLeftEmbed = new Discord.MessageEmbed()
              .setColor(colour.members)
              .setAuthor(`${member.user.tag} | Left the server`, `${member.user.displayAvatarURL({ dynamic: true })}`)
              .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}`)
              .setDescription(`${member} has taken their leave ${fire}`)
              .setFooter(`Member ID: ${member.id} • ${member.guild.memberCount} Members • ${hs}:${min}:${sec}`)

    if (logchannel) {
      if (!logchannel.permissionsFor(member.guild.me).has('VIEW_CHANNEL')) return;
      if (!logchannel.permissionsFor(member.guild.me).has('SEND_MESSAGES')) return;
      if (!logchannel.permissionsFor(member.guild.me).has('EMBED_LINKS')) return;
          logchannel.send(userLeftEmbed)
      }

});
