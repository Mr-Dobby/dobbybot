const Discord = require("discord.js");
const puppy = require('random-puppy');
const request = require('snekfetch');
const fs = require("fs")

module.exports.run = async (bot, message, args) => {
  
const kiss_gifs = [
    'https://media.giphy.com/media/108M7gCS1JSoO4/giphy.gif',
    'https://media.giphy.com/media/lTQF0ODLLjhza/giphy.gif',
    'https://media.giphy.com/media/rGkrMvDZwkCuA/giphy.gif',
    'https://media.giphy.com/media/7OXlVr1yctkNFErQb6/giphy.gif',
    'https://media.giphy.com/media/YDB4EF3U6i6IM/giphy.gif',
    'https://media.giphy.com/media/5GdhgaBpA3oCA/giphy.gif',
    'https://cdn.discordapp.com/attachments/588764515462545424/593219519003230238/kiss-Hkt-nTOwW.gif',
    'https://cdn.discordapp.com/attachments/588764515462545424/593219461327224832/kiss-r1cB3aOwW.gif',
    'https://cdn.discordapp.com/attachments/588764515462545424/593219197987979264/kiss-HJYghpOP-.gif',
    'https://cdn.discordapp.com/attachments/588764515462545424/593206400893583360/kiss-ry9uXAFKb.gif',
    'https://cdn.discordapp.com/attachments/588764515462545424/593196356449861662/kiss-B12g3TOPZ.gif',
    'https://cdn.discordapp.com/attachments/588764515462545424/593030531784900608/kiss-S1qZksSXG.gif',
    'https://cdn.discordapp.com/attachments/588764515462545424/593019404485132328/kiss-rypMnpuvW.gif',
    'https://cdn.discordapp.com/attachments/588764515462545424/593019213879181355/kiss-r1H42advb.gif',
    'https://cdn.discordapp.com/attachments/588764515462545424/592852543835602966/kiss-HJmunTOw-.gif'
]

var result = kiss_gifs[Math.floor(Math.random()*kiss_gifs.length)]
        let member = message.guild.member(message.mentions.users.first());
        if (!member) return message.channel.send("Please @ a user to kiss! :kiss:")

          var kissEmbed = new Discord.RichEmbed()
          .setTitle("Kissies")
          .setDescription(`Awwwwe, <@${message.author.id}> kisses `+member+ " UwU")
          .setImage(result)
          .setTimestamp()
          .setColor(`RANDOM`);
          message.delete()
          message.channel.send({embed: kissEmbed})

  };

  module.exports.help = {
    name: "kiss",
    aliases: []
  }
