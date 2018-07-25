const Discord = require("discord.js");
const commando = require('discord.js-commando');
const path = require('path');
const oneLine = require('common-tags').oneLine;
const client = require('../index.js');
const db = require('quick.db');
const users = new db.table('users');
const guilds = new db.table('guilds');

String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

client.on('guildMemberAdd', (member) => {
  guilds.fetch(member.guild.id).then(i => {
    if (i.settings.welcomerchannel == 'none' || i.modules.welcomer == 'disabled') return;
    var joinmessage = `${i.settings.welcomemessage}`.replaceAll('{usermention}', member).replaceAll('{username}', member.user.username).replaceAll('{membercount}', member.guild.memberCount);
    const embed = new Discord.RichEmbed()
      .setTitle(`New user joined`)
      .setAuthor(member.user.username, member.user.avatarURL)
      .setColor('random')
      .setDescription(joinmessage)
      .setFooter(`© Mech Development Team`, client.user.avatarURL)
      .setTimestamp();

    client.channels.get(i.settings.welcomerchannel).send({ embed })
  }).catch(console.error);
    client.users.forEach(user => {
    users.fetch(user.id).then(i => {
      if (!i) {
        users.set(user.id, {
          info: {
            username: user.username,
            discrim: user.discriminator,
            bot: user.bot,
          },
        }).then(i => console.log(i)).catch(console.error);
      }
    }).catch(console.error);
  });
});