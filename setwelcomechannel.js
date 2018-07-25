const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const db = require('quick.db')
const guilds = new db.table('guilds');

module.exports = class ConfJoinLogChannelCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'set-welcomechannel',
            aliases: ['set-joinlogc', 'set-joinlogchannel', 'set-wc', 'change-wc'],
            group: 'conf',
            memberName: 'set-welcomechannel',
            description: 'Set the welcome channel for the server',
            details: oneLine`
                Set the welcome channel for the server
			`,
            examples: ['>set-welcomechannel <channel-name OR channel-mention>'],

            args: [{
                key: 'channel',
                label: 'channel',
                prompt: 'What channel would you like as your welcomer channel?',
                type: 'channel',
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
                guilds.set(msg.guild.id, args.channel.id, {
                    target: '.settings.welcomerchannel'
                }).catch(console.error);
                msg.reply(`the join log channel for this server is now ${this.client.channels.get(args.channel.id)}`);
            }
        });
    }
};