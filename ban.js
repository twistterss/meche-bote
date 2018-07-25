const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class ModBanCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            aliases: ['mod-ban'],
            group: 'mod',
            memberName: 'ban',
            description: 'Bans the mentioned user',
            details: oneLine`
                Bans the mentioned user
			`,
            examples: ['?ban @ExampleUser#1234 1 "this is a reason"'],

            args: [{
                key: 'member',
                label: 'member',
                prompt: 'What member would you like to ban?',
                type: 'member',
                infinite: false
            },
            {
                key: 'amount',
                label: 'amount',
                prompt: 'How long would you like to ban this member for?',
                type: 'integer',
                infinite: false
            },
            {
                key: 'reason',
                label: 'reason',
                prompt: 'Why do you want to ban this member?',
                type: 'string',
                infinite: true
            }
            ]
        });
    }

    async run(msg, args) {
        if (args.member.bannable) {
            args.member.ban(7, args.amount, args.reason)
                .catch(console.error);
            msg.reply(`I Banned **${args.member}** because "**${args.reason}**" for **${args.amount}** days!`)
        } else {
            msg.reply(`Sorry I couldn't ban that user, maybe my role is under the role of the mentioned user? (thats usually the problem)`);
        }
    }
};