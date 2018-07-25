const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const db = require('quick.db')
const guilds = new db.table('guilds');

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

module.exports = class ConfJoinLogChannelCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'set-welcomemessage',
            aliases: ['set-joinm', 'set-joinmessage', 'set-wm', 'change-wm'],
            group: 'conf',
            memberName: 'set-welcomemessage',
            description: 'Set the welcome message for the server',
            details: oneLine`
                Set the welcome message for the server
			`,
            examples: ['>set-welcomemessage my cool message'],

            args: [{
                key: 'message',
                label: 'message',
                prompt: 'What channel would you like me to send when a user joins? (variables: {usermention}, {username}, {membercount})',
                type: 'string',
                infinite: false
            }]
        });
    }

    async run(msg, args) {
        guilds.fetch(msg.guild.id).then(i => {
            if (i.modules.welcomer == 'disabled') {
                return msg.channel.send('You have welcomer disabled, use `,module welcomer enable` to enable the welcomer module!')
            } else {
                if (!msg.member.hasPermission(['MANAGE_GUILD', 'MANAGE_CHANNELS'])) return;
                guilds.set(msg.guild.id, args.message.replaceAll(',', ' ').replaceAll('  ', ','), {
                    target: '.settings.welcomemessage'
                }).catch(console.error);
                msg.reply(`the welcome message for this server is now ${args.message}`);
            }
        });
    }
};