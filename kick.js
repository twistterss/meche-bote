const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class ModKickCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            aliases: ['mod-kick'],
            group: 'mod',
            memberName: 'kick',
            description: 'Kicks the mentioned user',
            details: oneLine`
                Kicks the mentioned user
			`,
            examples: ['?kick @ExampleUser#1234 "this is a reason"'],

            args: [{
                key: 'member',
                label: 'member',
                prompt: 'What member would you like to ban?',
                type: 'member',
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
        if (args.member.kickable) {
            args.member.kick()
                .catch(console.error);
            msg.reply(`I Kicked **${args.member}** because "**${args.reason}**"!`)
        } else {
            msg.reply(`Sorry I couldn't kick that user, maybe my role is under the role of the mentioned user? (thats usually the problem)`);
        }
    }
};