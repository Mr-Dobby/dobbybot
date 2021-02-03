# Dobby Bot Set Up Guide

Made with:   
discord.js@12.5.1  
Nodejs@14.4  
Mongodb

> [Invite](https://bit.ly/2KzZSbV) a permanent running version of this bot, with 99% uptime.

## Installation 🤖

You need to install [Mongodb Local Server](https://www.mongodb.com/try/download/shell) and [Nodejs (v14+)](https://nodejs.org/en/). In this, I use [Nodemon](https://www.npmjs.com/package/nodemon) for easier editing and autorestart when files are saved. Once done, make a directory and open either a terminal or powershell. Type the following:

```shell
git clone https://github.com/Mr-Dobby/dobbybot.git
cd .\dobbybot\
npm install
```

## Configuration ⚙️

Make a new file in the root directory called `.env`  
Fill in `TOKEN=YOUR_BOT_TOKEN` - Bot token can be found on the Discord dev portal  
All configurations and permanent data are stored in dobbybot/storage
###### Fill out the two config.json and colours.json
config.json - Put default prefix here and/or emojis.
```json
{
  "prefix" : "-",
  "owner" : "INSERT YOUR USER ID HERE",
  "emojis" : {
    "Success" : "✅", // Emoji IDs also work.
    "Failure" : "❌", // Emoji IDs also work.
  },
  "clientMap" : { 
    "web"     : "🌐 Browser", 
    "mobile"  : "📱 Mobile", 
    "desktop" : "💻 Desktop" 
  }
}
```
colours.json - Colours for logs. Default once are already put
```json
{
    "channels"  :   "#45ff8f",
    "roles"     :   "#f5ff45",
    "members"   :   "#dd45ff",
    "messages"  :   "#45bbff",
    "bans"      :   "#ff4545",
    "invites"   :   "#15028c"   
}
```

## Features & Commands 📝

> Default prefix is `-`  
> Change this in the config.json, in Mongodb or use `-prefix <new prefix>`

### Music 🎶
* -play <Song title/ YouTube link>

Using discord-player. Code taken and modifed from [Here](https://github.com/ZerioDev/Music-bot)

### Administration 🛡️

* -enable <server_function>  
* -disable <server_function>  
* -raid <on/off>  
* -set <log_type> <channel_id>  

Powerful administration commands to keep your server secure, and running smoothly.

### Moderation ⚔️

* -ban <user_id/@>  
* -mute <user_id/@>  
* -chatban <user_id/@>  

And the commands to undo these actions  
*And much more . . .*

![Text](https://cdn.discordapp.com/attachments/565456894819434497/805837960263893063/unknown.png)
