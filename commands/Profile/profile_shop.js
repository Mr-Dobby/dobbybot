const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Profile = require("../../lib/profile");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Dobby_Bot', {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
        if (err) return console.error(err);
});

module.exports.run = async (bot, message, args, client) => {

  const currPrefix = await Servers.findOne( { guildID: message.guild.id } )
  const userProfile = await Profile.findOne( { user: message.author.id } )
  if (!userProfile) { return; }
  const oldInventory = userProfile.inventory;
  const Failure = bot.emojis.cache.get(require("../../storage/config.json").emojis.Failure); 
  const Success = bot.emojis.cache.get(require("../../storage/config.json").emojis.Success);

  FailEmbed = new Discord.MessageEmbed()
  .setAuthor(`${message.author.tag} | Purchase item`, message.author.displayAvatarURL({ dynamic: true }))
  .setColor("#ff4f4f")

  SuccessEmbed = new Discord.MessageEmbed()
  .setAuthor(`${message.author.tag} | Purchase item`, message.author.displayAvatarURL({ dynamic: true }))
  .setColor("#7aff7a")

  const action = args[0];

  switch(action) {
        case 'cake': 
            if (!userProfile.balance > 10) {
                FailEmbed.setDescription(`${Failure} <@${message.author.id}> You don't that enough DC 💸`)
                return message.channel.send(FailEmbed)
            }
            if (userProfile.inventory.match(`Nothing has been purchased or given to your inventory yet.`)) {
                await Profile.updateOne( { user: message.author.id }, { $set: { balance: userProfile.balance - 10 } } )
                await Profile.updateOne( { user: message.author.id }, { $set: { inventory: `🎂; ` } } )
                SuccessEmbed.setDescription(`${Success} <@${message.author.id}> You successfully purchased a **🎂 Cake** for **10 DC** 💸`)
                await message.channel.send(SuccessEmbed)
                    return;
            }

            await Profile.updateOne( { user: message.author.id }, { $set: { balance: userProfile.balance - 10 } } )
            await Profile.updateOne( { user: message.author.id }, { $set: { inventory: oldInventory + `🎂; ` } } )
                SuccessEmbed.setDescription(`${Success} <@${message.author.id}> You successfully purchased a **🎂 Cake** for **10 DC** 💸`)
                await message.channel.send(SuccessEmbed)
                    return;
    break;
        case 'cookie': 
            if (!userProfile.balance > 2) {
                FailEmbed.setDescription(`${Failure} <@${message.author.id}> You don't that enough DC 💸`)
                return message.channel.send(FailEmbed)
            }
            if (userProfile.inventory.match(`Nothing has been purchased or given to your inventory yet.`)) {
                await Profile.updateOne( { user: message.author.id }, { $set: { balance: userProfile.balance - 2 } } )
                await Profile.updateOne( { user: message.author.id }, { $set: { inventory: `🍪; ` } } )
                SuccessEmbed.setDescription(`${Success} <@${message.author.id}> You successfully purchased a **🎂 Cake** for **10 DB** 💸`)
                await message.channel.send(SuccessEmbed)
                    return;
            }

            await Profile.updateOne( { user: message.author.id }, { $set: { balance: userProfile.balance - 2 } } )
            await Profile.updateOne( { user: message.author.id }, { $set: { inventory: oldInventory + `🍪; ` } } )
                SuccessEmbed.setDescription(`${Success} <@${message.author.id}> You successfully purchased a **🍪 Cookie** for **2 DB** 💸`)
                await message.channel.send(SuccessEmbed)
    break;
        default: 
            let entireShopEmbed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} | Dobby Bot Shop`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`This is the shop for the bot. To purchase an item, type \`${currPrefix.prefix}shop <Item>\`\nYou also need a profile \`(${currPrefix.prefix}profile)\` to store items in, and the required DB 💸`)
            .addField(`Purchase a Cookie!`, `🍪 **Cookie** | **2** DC 💸`, true)
            .addField(`Purchase a Cake!`, `🎂 **Cake** | **10** DC 💸`, true)
            .setFooter(`More items will be added eventually!`)

            message.channel.send(entireShopEmbed)
  }

}

module.exports.help = {
  name: "66666666666666",
  aliases: ["99999999999999999"]
}
