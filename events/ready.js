const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/Dobby_Bot', {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
        if (err) return console.error(err);
});


module.exports = async (bot) => {

    console.log(`\n${bot.user.tag} IS ONLINE`)
    await bot.user.setActivity('-help', { type: 'LISTENING'} );
    await bot.user.setStatus('online');   

};