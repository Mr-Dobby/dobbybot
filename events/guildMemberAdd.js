const Discord = require("discord.js");
const {bot} = require('../index');
const Raid = require('../lib/raid');
const Profile = require("../lib/profile");
const Servers = require("../lib/mongodb");
const Logs = require("../lib/logs");
const colour = require('../storage/colours.json')
//const Canvas = require("canvas");
/*
const applyText = (Canvas, text) => {
	const ctx = Canvas.getContext('2d');
	let fontSize = 80;

	do {
		ctx.font = `${fontSize -= 10}px impact`;
	} while (ctx.measureText(text).width > Canvas.width - 300);

	return ctx.font;
};
*/
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
/*
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

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ dynamic: true }));
  ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');
/*
  
    /*
    const rulesChannel = member.guild.channels.get("574841403851538454");
    const staffRole = member.guild.roles.cache.get("606043481709871104");
    */
    const currPrefix = await Servers.findOne( { guildID: member.guild.id } )
    const fire = bot.emojis.cache.get("687436596391182344")
    const logName = await Logs.findOne( { guildID: member.guild.id } )
    const logchannel = bot.channels.cache.get(logName.serverLog)
    const RaidLogChannel = bot.channels.cache.get(logName.raidLog)
    const welcomeLogChannel = bot.channels.cache.get(logName.welcomeLog)

    Profile.findOne({ 
      user: member.user.id
  }, (err, cunt) => {
      if (err) console.error(err);
      if (!cunt) {
          const newUserProfile = new Profile({

              user: member.user.id,
              userName: member.user.tag,
              globalReputation: 0,
              balance: 0,
              globalLevel: 0,
              xp: 0,
              quote: `\`Use ${currPrefix.prefix}quote to assign a quote to your profile.\``,
              thumbnail: member.user.displayAvatarURL(),
              inventory: `Nothing has been purchased or given to your inventory yet.`,
              colour: `#525252`

          })

      newUserProfile.save().catch(err => console.error(err))

      }
  })

  let ThisGuild = await Raid.findOne( { guildID: member.guild.id } )
  let Toggled = await Raid.findOne( { guildID: member.guild.id, raid: true } )

  if (ThisGuild && Toggled) {
    await member.ban({
      days: 1,
      reason: `Autobanned during raid.`
    })
      if (!RaidLogChannel) return;
      await RaidLogChannel.send(RaidLogEmbed)
  }

    const RandomColour = ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
    //The starter roles:
    const Members_Role = member.guild.roles.cache.get("783356010999185410")
    //The Roles That Seperate Roles:
    const Role_1 = member.guild.roles.cache.get("783356928205651979")
    const Role_2 = member.guild.roles.cache.get("783359087818702848")
    const Role_3 = member.guild.roles.cache.get("783359124087111730")
    const Role_4 = member.guild.roles.cache.get("783359131524137072")
    const Role_5 = member.guild.roles.cache.get("783359132785836062")

    var date = new Date();
    var hs = String(date.getHours()).padStart(2, '0');
    var min = String(date.getMinutes()).padStart(2, '0');
    var sec = String(date.getSeconds()).padStart(2, '0');

    const NewMembeEmbed = new Discord.MessageEmbed()
    .setColor(RandomColour)
    .setAuthor(`${member.user.tag} | New member`, member.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`Welcoming a new arriving member, ${member} ${fire}`)

    const userJoinedEmbed = new Discord.MessageEmbed()
    .setColor(colour.members)
    .setAuthor(`${member.user.tag} | New server member!`, `${member.user.displayAvatarURL({ dynamic: true })}`)
    .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}`)
    .setDescription(`${member} has just joined the server! ${fire}`)
    .setFooter(`Member ID: ${member.id} • ${member.guild.memberCount} Members • ${hs}:${min}:${sec}`)

    function checkDays(date) {
      let now = new Date();
      let diff = now.getTime() - date.getTime();
      let days = Math.floor(diff / 86400000);
      return days + (days == 1 ? " day" : " days") + " ago";
    };
  
    const userJoinedEmbedNewAcc = new Discord.MessageEmbed()
    .setColor(colour.members)
    .setAuthor(`${member.user.tag} | New server member!`, `${member.user.displayAvatarURL({ dynamic: true })}`)
    .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}`)
    .setDescription(`${member} has just joined the server! ${fire}\nID: ${member.id}`)
    .addField("New Account", `Created ${checkDays(member.joinedAt)}`, true)
    .setFooter(`The server now has: ${member.guild.memberCount} Members • ${hs}:${min}:${sec}`)

    const RaidLogEmbed = new Discord.MessageEmbed()
    .setColor("#A50505")
    .setAuthor(`${member.user.tag} | Raid logs | Banned during raid`, `${member.user.displayAvatarURL({ dynamic: true })}`)
    .setDescription(`${member} has been banned upon joining! ${fire}\nID: ${member.id}`)

      try {
          await member.roles.add(Members_Role);
          await member.roles.add(Role_1);
          await member.roles.add(Role_2);
          await member.roles.add(Role_3);
          await member.roles.add(Role_4);
          await member.roles.add(Role_5)
      } catch (e) {
    return;
  }
  
      let defaultChannel = "";
      member.guild.channels.cache.forEach((channel) => {
    if (channel.type == "text" && defaultChannel == "") {
      if (channel.permissionsFor(member.guild.me).has(["EMBED_LINKS" && "SEND_MESSAGES" && "VIEW_CHANNEL"])) {
        defaultChannel = channel;
         }
        }
      })
    if (logchannel) {
      if (!logchannel.permissionsFor(member.guild.me).has('VIEW_CHANNEL')) return;
      if (!logchannel.permissionsFor(member.guild.me).has('SEND_MESSAGES')) return;
      if (!logchannel.permissionsFor(member.guild.me).has('EMBED_LINKS')) return;
      if (Date.now() - member.user.createdAt < 1000 * 60 * 60 * 24 * 7) {
        await logchannel.send(userJoinedEmbedNewAcc)
          } else {
        await logchannel.send(userJoinedEmbed)
      }
      if (!welcomeLogChannel) {
        return defaultChannel.send(NewMembeEmbed)
      }
      welcomeLogChannel.send(NewMembeEmbed)
    }

});