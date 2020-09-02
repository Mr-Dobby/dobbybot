const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");

module.exports.run = async (bot, message, args, client) => {

        let currPrefix = await Servers.findOne( { guildID: message.guild.id } )
        let heartEmoji = bot.emojis.cache.get("704132846125842463");

        var embed = new Discord.MessageEmbed()
            .setDescription(`Quick setup tour from le dev!\n\nLet's start very basic. The bot needs permissions to work proper; And for EVERYTHING to work, the bot needs \`Administrator\` permissions.
            Now, now! I understand you might think; *Why should I trust this?* - Good question! No, honestly, good question. It just does. But that's for **fully** functionality. For it to work, it only needs:
            \`View Channel\` \`Send Messages\` \`Embed Links\` \`Read Message History\` \`Use External Emojis\` & \`Add Reactions\`\nAll of this, and every moderative permission, if that's what the bot will be used for.
            Thank you for understanding. Now to the importance;`)
            .addField(`Setting up logs.`, `You got two options here: Let the bot do it for you, or set already created channels up. Confused? Well, you can execute \`${currPrefix.prefix}logging\` and you'll be given a choice to either reply with \`Y\` (yes) or \`N\` (no).
            For Y, it will create 3 new channels; an incident log (moderation activity log), an action log (server event log) and a raid log (explained later). If you choose N it will finish without any changes. It needs \`Administrator\` permissions here, for functionality reasons.`, false)
            .addField(`*... a raid log (explained later)...*. yes.`, `The raid log says itself (in my opninion). A log of all banned users while the raid toggle is **ON**. To toggle this, all you need to type is \`${currPrefix.prefix}raid on|true\` and \`off|false\` to toggle off again.
            By default, which is right now, it is off. When on, not only will it ban every member joining, but will also lockdown every **text** channel, that isn't on the ignore list. *"Ignore list? what explain!"* - with pleasure!
            The channel ignore list, is a list of text channels you create that shouldn't be locked down during the time raid is **on**. \`${currPrefix.prefix}raid ignore\` is the root command. Subcommands are \`list\` - show list of channels, \`clear\` - clear that list, and \`<Channel ID> <Channel ID>\` - Add channels to the list.
            Makes sense? I hope. Great! Moving on...`, false)
            .addField(`"sOmEtHiNg iSnT wOrkInG"`, `Thanks for letting me know in advance! If any erros are to occour, or if anything isn't working as intended, I'll greatly appreciate if \n1). You use the \`${currPrefix.prefix}new bug\` command to report it directly to the support server. Please make this detailed. \n2). Because troubleshooting excites me, for now, I'll gladly join your server for help, personally. Just drop me an invite in DM with the issues!`, false)
            .addField(`"So that was moderation.. right?"`, `Nah. It is never enough!!1!. Could make hours of presentations for this but I chose to let you discover it yourself. \`${currPrefix.prefix}help mod\` it is. It will make sense once you get the hang of it, I promise!`, false)
            .addField(`"Booooooooooring. What about us normal members?"`, `Glad you're saying it. Depending on what you're into, we got \`${currPrefix.prefix}help fun\` & \`${currPrefix.prefix}help nsfw\`. Name says it all. For these, the bot just needs the basic permissions as listed above - NSFW commands are strcitly in NSFW channels, ONLY. no, that will never change.`, false)
            .addField(`"Lovely innit. Now what?"`, `who says "innit" you lil Brit. Anyway, not much else to say other than try out the rest for yourself. I still didn't mention the profile commands \`(${currPrefix.prefix}help profile)\`, ticket system \`(${currPrefix.prefix}help ticket)\` or the info commands \`(${currPrefix.prefix}help info)\` so that's for you to discover! Enjoy! ${heartEmoji} - Quick note, updates are displayed in the \`${currPrefix.prefix}cl\``, false)       
            .setFooter(`OKAY I PROMISE THIS IS IT. THANKS FOR YOUR TIME YOU TOOK TO READ THIS YOU GET A COOKIE <3`)

        message.channel.send(embed)

}

module.exports.help = {
  name: "aqg",
  aliases: []
}