const Discord = require('discord.js')

module.exports.run = async(client, message, args) => {

    var choices = [

        '● **It is certain**',
        '● **It is decidedly so**',
        '● **Without a doubt**',
        '● **Yes definitely**',
        '● **You may rely on it**',
        '● **You can count on it**',
        '● **As I see it, yes**',
        '● **Most likely**',
        '● **Outlook good**',
        '● **Do you really want the answer?**',
        '● **Signs point to yes**',
        '● **Absolutely**',
        '● **Reply hazy try again**',
        '● **Ask again later**',
        '● **Better not tell you now**',
        '● **Cannot predict now**',
        '● **Concentrate and ask again**',
        "● **Don't count on it**",
        '● **My reply is no**',
        '● **My sources say no**',
        '● **Outlook not so good**',
        '● **Very doubtful**',
        "● **Chances aren't good**",
        "● **Most would say no, but I'd say it's a __Yes__**",
        "● **Sounds like fun**",

        // Yes
        "● **Well... yeah. It's kinda obvious.**",
        "● **Sure, I guess.**",
        "● **uhm... duh??**",
        "● **How could I ever say no to you?** :heart:",
        "● **Ye.**",
        "● **Very, very likely**",
        "● **I'm betting my life on it**",
        "● **Yup yup**",
        "● **I'd not do it, but it's worth a try, right?**",

        // Maybe
        "● **Maybe. Perhaps. I guess.**",
        "● **Yes. Well, yes *and* no.**",
        "● **No. Well, no *and* yes.**",,
        "● **Just... I mean, if you want to?**",
        "● **I suppose. It's not the first thing that comes to my mind though**",
        "● **I *GUESS***",
        "● **I don't know, maybe?**",
        "● **It's not *impossible*, it's just not likely.**",
        "● **Possibly.**",
        "● **Ask again later. I need to think about this one.**",

        // No
        "● **NO! NEVER!**",
        "● **Uhm... I don't think so**",
        "● **Yeah, no, definitely not.**",
        "● **Not. A. Chance.**",
        "● **No.**",
        "● **GOD NO**",
        "● **I am certain that is not the case, no.**",
        "● **Oh, no no no no no. Just no.**",
        "● **Another question you don't want the answer to..**",

        // Unspecified
        "● **Ehh...**",
        "● **I'm kinda busy here, can't you figure it out yourself?**",
        "● **I don't think I wanna give my opinion on this.**",
        "● **LEAVE ME ALONE REEEEEEE**",
        "● **It Depends™**",
        "● **On times like this, I like to ask myself: what would Jesus say?**",
        "● **Great question. Just wonderful. I love it. Ask me again.**",
        "● **Huh. Never thought of it that way. I'll sleep on it and get back to you tomorrow, 'k?**",
        "● **Good fucking question.**",
        "● **Don't ask me!**",
        "● **I'd agree with you, but I don't feel like it. I don't care honestly.**"
    ]

    let question = args.join(" ")
    if (!question) return message.channel.send(`You need to ask me a question, sir or ma'am or loser <@${message.author.id}>, in order to roll the 8Ball.`)

    var embed = new Discord.RichEmbed()
    .setAuthor('8ball','http://www.pngmart.com/files/3/8-Ball-Pool-PNG-Photos.png')
    .setThumbnail('https://vignette.wikia.nocookie.net/uncyclopedia/images/4/40/8ball.png/revision/latest?cb=20131030182451')
    .setDescription(`${choices[Math.floor(Math.random() * choices.length)]}`)
    .setColor(000000)

    message.channel.send(embed)

}

module.exports.help = {
    name: "8ball",
    aliases: []
}
