const Discord = require("discord.js");
const commando = require('discord.js-commando');
const path = require('path');
const oneLine = require('common-tags').oneLine;
const db = require('quick.db');
const users = new db.table('users');
const sqlite = require('sqlite');
const guilds = new db.table('guilds');
const client = new commando.CommandoClient({
  owner: ['315960765112647690'],
  commandPrefix: 'm.',
  unknownCommandResponse: false,
  selfbot: false
});
module.exports = client; // for events in seperate files

module.exports.credits = {
  "Twistters": "Creator"
}
// please fill this in with your contributions.^^^^^

//events & other files
require('./events/commando');
require('./events/guildCreate');
require('./events/guildMemberAdd');
require('./events/guildMemberRemove');
require('./events/ready');

require('./other/databases');


client.registry
  .registerGroups([
    ['admin', 'Admin'],
    ['mod', 'Moderation'],
    ['fun', 'Fun'],
    ['owner', ':no_entry: Bot Owner :no_entry:'],
    ['conf', 'Config commands']
  ])
  .registerDefaults()
  .registerCommandsIn(path.join(__dirname, 'commands'));

sqlite.open(path.join(__dirname, "settings.sqlite3")).then((db) => {
    client.setProvider(new commando.SQLiteProvider(db));
});

client.dispatcher.addInhibitor(msg => {
	const blacklist = client.provider.get('global', 'blacklist', []);
	if (!blacklist.includes(msg.author.id)) return false;
  if(msg.author.bot) return;
  msg.authour.send('Sorry, but you can\'t use this command since you have been blacklisted.')
	return 'Blacklisted.';
});

client.on('message', (msg) => {
  if (msg.content.includes('m.fakejoinevent')) {
    client.emit('guildMemberAdd', msg.member);
  } else if (msg.content.includes('m.fakeleaveevent')) {
    client.emit('guildMemberRemove', msg.member);
  }
});

client.on('ready', () => {
  console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
  
  setInterval(() => {
    client.user.setActivity(`${client.users.size} users from ${client.guilds.size} servers`, { type: 'WATCHING' });
    setTimeout(() => {
      client.user.setActivity(`"m.help" 🤖👀`, { type: 'WATCHING' });
    }, 30000);
  }, 60000);
  /*client.user.setActivity(`Twistters for updates`, { type: 'WATCHING' });*/
});

client.login("NDcxNDI3OTA4MzkzNTAwNjcz.DjndoA.D3OrtpXzbGPvtfJCuTKS6TAH-Yg");

