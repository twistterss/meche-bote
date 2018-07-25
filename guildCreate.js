const Discord = require("discord.js");
const commando = require('discord.js-commando');
const path = require('path');
const oneLine = require('common-tags').oneLine;
const client = require('../index.js');
const db = require('quick.db');
const users = new db.table('users');
const guilds = new db.table('guilds');

client.on('guildCreate', (guild) => {
    client.users.forEach(user => {
        users.fetch(user.id).then(i => {
            if (!i) {
                users.set(user.id, {
                    username: user.username,
                    discrim: user.discriminator,
                    bot: user.bot,
                }, {
                        target: '.info'
                    }).catch(console.error);
            }
        }).catch(console.error);
    });
    guilds.fetch(guild.id).then(i => {
        if (!i) {
            guilds.set(guild.id, {
                info: {
                    name: guild.name,
                    owner: guild.owner.user.username,
                    memberCount: guild.memberCount
                },
                settings: {
                    welcomerchannel: 'none',
                    welcomemessage: '{usermention} just joined!',
                    leavemessage: '{username} just left.'
                }
            }).catch(console.error);
        }
    }).catch(console.error);
});