const Discord = require("discord.js");
const {bot} = require('../index');
const Raid = require('../lib/raid');
const Servers = require("../lib/mongodb");
const Logs = require("../lib/logs");
const Canvas = require("canvas");

const applyText = (Canvas, text) => {
	const ctx = Canvas.getContext('2d');
	let fontSize = 80;

	do {
		ctx.font = `${fontSize -= 10}px impact`;
	} while (ctx.measureText(text).width > Canvas.width - 300);

	return ctx.font;
};

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

bot.on("guildMemberAdd", async (member) => {

  const canvas = Canvas.createCanvas(750, 250);
  const ctx = canvas.getContext('2d');

  const background = await Canvas.loadImage('./storage/images/wallpaper.jpg');
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#74037b';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.font = '28px Berlin Sans FB';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`Welcome to ${member.guild.name},`, canvas.width / 3.1, canvas.height / 4.05);

  ctx.font = applyText(canvas, `${member.user.username}!`);
  ctx.fillStyle = '#ffffff'
  ctx.fillText(`${member.user.username}!`, canvas.width / 2.8, canvas.height / 1.5);

  ctx.font = '28px Arial';
  ctx.fillStyle = '#ff35cb';
  ctx.fillText(`Invite your friends & Boost!`, canvas.width / 2.5, canvas.height / 1.05);

  ctx.beginPath();
  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
  ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

    const currPrefix = await Servers.findOne( { guildID: member.guild.id } )
    const fire = bot.emojis.get("687436596391182344")
    const logName = await Logs.findOne( { guildID: member.guild.id } )
    const logchannel = bot.channels.get(logName.serverLog)
    const RaidLogChannel = bot.channels.get(logName.raidLog)
    const welcomeLogChannel = bot.channels.get(logName.welcomeLog)
  
    const RandomColour = ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
    /*
    const rulesChannel = member.guild.channels.get("574841403851538454");
    const staffRole = member.guild.roles.get("606043481709871104");
    */

    //The starter roles:
    const Dobbylanders_Role = member.guild.roles.get("548430923478204426")
    const Heart_Role = member.guild.roles.get("570889625711804416")
    //The Roles That Seperate Roles:
    const Role_1 = member.guild.roles.get("652260889558253599")
    const Role_2 = member.guild.roles.get("662024720937517087")
    const Role_3 = member.guild.roles.get("643075711812501524")
    const Role_4 = member.guild.roles.get("565129831927382038")
    //Bot Roles
    const Knights = member.guild.roles.get("548431153925718020")

    const NewMembeEmbed = new Discord.RichEmbed()
    .setColor(RandomColour)
    .setDescription(`Welcoming a new arriving member, ${member} ${fire}`)
    .attachFile(attachment)
    .setImage('attachment://welcome-image.png')

    const userJoinedEmbed = new Discord.RichEmbed()
    .setColor("#00ff00")
    .setAuthor(`${member.user.tag} | New server member!`, `${member.user.displayAvatarURL}`)
    .setThumbnail(`${member.user.displayAvatarURL}`)
    .setDescription(`${member} has just joined the server! ${fire}`)
    .setFooter(`Member ID: ${member.id} • ${member.guild.memberCount} Members`)
    .setTimestamp()

    function checkDays(date) {
      let now = new Date();
      let diff = now.getTime() - date.getTime();
      let days = Math.floor(diff / 86400000);
      return days + (days == 1 ? " day" : " days") + " ago";
    };
  
    const userJoinedEmbedNewAcc = new Discord.RichEmbed()
    .setColor("#00ff00")
    .setAuthor(`${member.user.tag} | New server member!`, `${member.user.displayAvatarURL}`)
    .setThumbnail(`${member.user.displayAvatarURL}`)
    .setDescription(`${member} has just joined the server! ${fire}\nID: ${member.id}`)
    .addField("New Account", `Created ${checkDays(member.joinedAt)}`, true)
    .setFooter(`The server now has: ${member.guild.memberCount} Members`)
    .setTimestamp()

    const RaidLogEmbed = new Discord.RichEmbed()
    .setColor("ff0000")
    .setAuthor(`${member.user.tag} | Raid logs | Banned during raid`, `${member.user.displayAvatarURL}`)
    .setDescription(`${member} has been banned upon joining! ${fire}\nID: ${member.id}`)

    /*
    const welcomeEmbed = new Discord.RichEmbed()
    .setColor(RandomColour)
    .setAuthor(`${member.user.tag}`, `${member.user.displayAvatarURL}`)
    .setDescription("WELCOME TO DOBBYLAND YA SEXY ELF.. no humans pls")
    .addField("Please make sure to read the rules", `${rulesChannel}`, false)
    .addField("Get NSFW access by contacting staff (this role) ", `${staffRole}`, false)
    .addField("**If you somehow did not get the Dobbylanders role, please __contact an Administrator__**", "Thanks for understanding.", true)
    .setFooter("React with 🔥 to get access to the rest of the server")
    .setTimestamp()
  */

  // DOBBYLAND
    if (member.guild.id === "521602207406227476") {
  
      try {
           
        if (member.user.bot) {
        
          await member.addRole(Knights)
    
            } else {
    
          await member.addRole(Dobbylanders_Role);
          await member.addRole(Heart_Role);
          await member.addRole(Role_1);
          await member.addRole(Role_2);
          await member.addRole(Role_3);
          await member.addRole(Role_4);
          await welcomeLogChannel.send(NewMembeEmbed);
        }
      }
    catch (e) {
    console.log(e);
    }

  } else {
  
      let defaultChannel = "";
      member.guild.channels.forEach((channel) => {
    if (channel.type == "text" && defaultChannel == "") {
      if (channel.permissionsFor(member.guild.me).has("MANAGE_MESSAGES")) {
        defaultChannel = channel;
         }
        }
      })
    if (!logchannel) {
      return;
    } else {
      if (!logchannel.permissionsFor(member.guild.me).has('VIEW_CHANNEL')) return;
      if (!logchannel.permissionsFor(member.guild.me).has('ADMINISTRATOR')) return;
      if (Date.now() - member.user.createdAt < 1000 * 60 * 60 * 24 * 7) {
        await logchannel.send(userJoinedEmbedNewAcc)
      } else {
        await logchannel.send(userJoinedEmbed)
      }
      if (!welcomeLogChannel) {
        defaultChannel.send(NewMembeEmbed)
      }
      welcomeLogChannel.send(NewMembeEmbed)
    }
  }

  let ThisGuild = await Raid.findOne( { guildID: member.guild.id } )
  let Toggled = await Raid.findOne( { guildID: member.guild.id, raid: true } )

  if (ThisGuild && Toggled) {
    await member.ban({
      days: 1,
      reason: `Autobanned by raiding. | ${currPrefix.prefix}raid <on | off>`
    })
      if (!RaidLogChannel) return;
      await RaidLogChannel.send(RaidLogEmbed)
  }

});