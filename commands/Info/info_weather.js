const Discord = require("discord.js");
var weather = require('weather-js');

module.exports.run = async (bot, message, args) => {

    weather.find({ search: args.join(" "), degreeType: 'C' }, function(err, result) {
      if (err) message.channel.send(err);
      if (result.length === 0) {
        message.channel.send('Please enter a valid location.')
      }

      var current = result[0].current;
      var location = result[0].location;

      // °C => °F
      tempF = (current.temperature * 9 / 5 ) + 32;
      tempF_Feelslike = (current.feelslike * 9 / 5 ) + 32;

      function formatDate (input) {
        var datePart = input.match(/\d+/g),
        year = datePart[0].substring(2), // get only two digits 
        month = datePart[1], day = datePart[2];
      
        return day + '/' + month + '/20' + year;
      }
      
      const theDate = formatDate (`${current.date}`);

      const weatherEmbed = new Discord.MessageEmbed()
        .setDescription(`It is currently: ${current.skytext}`)
        .setAuthor(`Weather for ${current.observationpoint}`, message.author.displayAvatarURL({ dynamic: true }))
        .setThumbnail(current.imageUrl)
        .setColor(`RANDOM`)
        .addField("Observation time", `${current.observationtime}`, true)
        .addField("Temperature", `${current.temperature} °C | ${tempF} °F`, true)
        .addField("Winds", `${current.winddisplay}`, true)
        .addField("Date", `${current.day}, ${theDate}`, true)
        .addField("Feels like", `${current.feelslike} °C | ${tempF_Feelslike} °F`, true)
        .addField("Humidity", `${current.humidity}%`, true)

      message.channel.send(weatherEmbed)
  })
  
}

module.exports.help = {
  name: "weather",
  aliases: []
}
