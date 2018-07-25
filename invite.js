const commando = require('discord.js-commando');
const Discord = require('discord.js');
const oneLine = require('common-tags').oneLine;
const db = require('quick.db')
const guilds = new db.table('guilds');

module.exports = class InviteCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            group: 'util',
            memberName: 'invite',
            description: 'Get the invite for Mech!'
        });
    }

    async run(msg, args) {
        msg.channel.send('https://discordapp.com/api/oauth2/authorize?client_id=471427908393500673&permissions=8&scope=bot');
    }
}