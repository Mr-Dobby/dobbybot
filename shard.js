const { ShardingManager } = require('discord.js');
require('dotenv').config();
const manager = new ShardingManager('./index.js', { token: process.env.TOKEN });

manager.on('launch', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();