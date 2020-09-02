const Discord = require("discord.js");
const {bot} = require('../index');

let options = { 
    total: "667335552558956554",
    users: "667335645894541331",
    bots: "667337560179343374",
    boosters: "723638087929823233"
  }
  
  //Juicy Bad Girls
  let options1 = {
    total: "687332936936063033",
    users: "687333066934714490",
    bots: "687333146613776424"
  }


bot.on('presenceUpdate', async (oldPresence, newPresence) => {

    // Check if someone is streaming, give them the "LIVE RIGHT NOW" role, & let everyone know in general!
    // Dobbyland only

    /*
    
    if (!newMember.guild.id === "521602207406227476") return;
    const StreamerRole = newMember.guild.roles.get("674956529438425089");
    const GeneralChat = newMember.guild.channels.get("616947219790037014");
  
    let oldStreamingStatus = oldMember.presence.game ? oldMember.presence.game.streaming : false;
    let newStreamingStatus = newMember.presence.game ? newMember.presence.game.streaming : false;
  
    let streamingEmbed = new Discord.MessageEmbed()
    .setColor("#6441A4")
    .setAuthor(`Streamer ${newMember.user.username}`)
    .setThumbnail(`${newMember.user.displayAvatarURL}`)
    .setDescription(`<@${newMember.user.id}> is live on Twitch! Come & show some support! `)
    .addField("What is being streamed", `${newMember.presence.game.details}`, true)
    .addField(`URL`, `${newMember.presence.game.url}`)
    .setFooter(`ID: ${newMember.id} 🔥`)
  
    if (oldStreamingStatus !== newStreamingStatus) {
      if (newMember.presence.game || newMember.presence.game.details.match(/keywords in stream/gi)) {
        newMember.addRole(StreamerRole);
        GeneralChat.send(streamingEmbed)
        return;
      }
    }
  
    *//*
    if (oldPresence !== newPresence) {
  
      try {
          
        bot.channels.cache.get(options.total).edit({ name: `Total Elves: ${newPresence.guild.memberCount}` }); // You can change this text, but still keep ${guild.memberCount}, as it defines total members.
        bot.channels.cache.get(options.users).edit({ name: `Online Elves: ${newPresence.guild.members.cache.filter(a => a.presence.status !== 'offline').filter(member => !member.user.bot).size}` }); // This text is also changeable, still keep the code in ${}
        bot.channels.cache.get(options.boosters).edit({ name: `Boosting Elves: ${newPresence.guild.premiumSubscriptionCount}` })
        bot.channels.cache.get(options.bots).edit({ name: `Bots: ${newPresence.guild.members.cache.filter((m) => m.user.bot).size}` }); // This text is also changeable, still keep the code in ${}
  
        bot.channels.cache.get(options1.total).edit({ name: `Total Cuties: ${newPresence.guild.memberCount} ❤️` }); // You can change this text, but still keep ${guild.memberCount}, as it defines total members.
        bot.channels.cache.get(options1.users).edit({ name: `Online Cuties: ${newPresence.guild.members.cache.filter(a => a.presence.status !== 'offline').filter(member => !member.user.bot).size} ❤️` }); // This text is also changeable, still keep the code in ${}
        bot.channels.cache.get(options1.bots).edit({ name: `Bots: ${newPresence.guild.members.cache.filter((m) => m.user.bot).size}` }); // This text is also changeable, still keep the code in ${}

        } catch (err) {
      console.error(err)
    }
  }
*/
});