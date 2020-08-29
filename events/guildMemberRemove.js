const Discord = require("discord.js");
const {bot} = require('../index');
const Logs = require("../lib/logs")

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

    const banList = await member.guild.fetchBans();
    const bannedUser = banList.find(user => user.id === member.id);
    if (bannedUser) return;

    let fire = bot.emojis.cache.get("687436596391182344")
    let logName = await Logs.findOne( { guildID: member.guild.id } )
    const logchannel = bot.channels.cache.get(logName.serverLog)
  
  if (member.bot) return;

          const userLeftEmbed = new Discord.MessageEmbed()
              .setColor("#ff0000")
              .setAuthor(`${member.user.tag} | Left the server`, `${member.user.displayAvatarURL({ dynamic: true })}`)
              .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}`)
              .setDescription(`${member} has taken their leave ${fire}`)
              .setFooter(`Member ID: ${member.id} • ${member.guild.memberCount} Members`)
              .setTimestamp()

    if (!logchannel) {
      return;
        } else {
          const banList = await member.guild.fetchBans();
          const bannedUser = banList.find(user => user.id === member.id);
          if (bannedUser) return;
      if (!logchannel.permissionsFor(member.guild.me).has('VIEW_CHANNEL')) return;
      if (!logchannel.permissionsFor(member.guild.me).has('ADMINISTRATOR')) return;
      logchannel.send(userLeftEmbed)
  }

});
