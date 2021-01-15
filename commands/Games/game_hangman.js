const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Profile = require("../../lib/profile");
const urban = require('urban');
const playing = new Set();
const { stripIndents } = require('common-tags');

module.exports.run = async (bot, message, args, client) => {

  let owner = message.author;
    if (!owner.id == "441478072559075328" && !owner.id == "329354230861398016") return message.channel.send("You found an **owner only command** somehow!\nGuess you're not my developer, so I won't allow you to use this command!")
        .then(message => message.delete({ timeout: 5000 }));

        let currPrefix = await Servers.findOne( { guildID: message.guild.id } )
        let userProfile = await Profile.findOne( { user: message.author.id } ) 

        if (playing.has(message.guild.id)) return message.channel.send('Only one game may be occurring per server.');
		playing.add(message.guild.id);
		try {
            urban.random().first(async json => {
                const word = json.word.toLowerCase().replace(/ /g, '-');
                let points = 0;
                let displayText = null;
                let guessed = false;
                const confirmation = [];
                const incorrect = [];
                const display = new Array(word.length).fill('_');
                while (word.length !== confirmation.length && points < 6) {
                    await message.channel.send(stripIndents`
                        ${displayText === null ? 'Here we go!' : displayText ? 'Good job!' : 'Nope!'}
                        \`${display.join(' ')}\`. Which letter do you choose?
                        Incorrect Tries: ${incorrect.join(', ') || 'None'}
                        \`\`\`
                        ___________
                        |     |
                        |     ${points > 0 ? 'O' : ''}
                        |    ${points > 2 ? '—' : ' '}${points > 1 ? '|' : ''}${points > 3 ? '—' : ''}
                        |    ${points > 4 ? '/' : ''} ${points > 5 ? '\\' : ''}
                        |
                        ===========
                        \`\`\`
                    `);
                    const filter = res => {
                        const choice = res.content.toLowerCase();
                        return res.author.id === message.author.id && !confirmation.includes(choice) && !incorrect.includes(choice);
                    };
                    const guess = await message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 30000
                    });
                    if (!guess.size) {
                        await message.channel.send('Sorry, time is up!');
                        break;
                    }
                    const choice = guess.first().content.toLowerCase();
                    if (choice === 'end') break;
                    if (choice.length >= 1 && (choice === word || choice === body.word.toLowerCase())) {
                        guessed = true;
                        break;
                    } else if (word.includes(choice)) {
                        displayText = true;
                        for (let i = 0; i < word.length; i++) {
                            if (word[i] !== choice) continue; // eslint-disable-line max-depth
                            confirmation.push(word[i]);
                            display[i] = word[i];
                        }
                    } else {
                        displayText = false;
                        if (choice.length === 1) incorrect.push(choice);
                        points++;
                    }
                }
                playing.delete(message.guild.id);
                if (word.length === confirmation.length || guessed) return message.channel.send(`You won, it was ${word}!`);
                return message.channel.send(`Too bad... It was ${word}...`);
            });
        } catch (err) {
            playing.delete(message.guild.id);
            return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
        }


}

module.exports.help = {
  name: "hangman",
  aliases: []
}
