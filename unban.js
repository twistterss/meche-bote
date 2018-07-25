const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class ModUnbanCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'unban',
            aliases: ['mod-unban'],
            group: 'mod',
            memberName: 'unban',
            description: 'Unbans the mentioned user',
            details: oneLine`
                Unbans the mentioned user
			`,
            examples: ['?unban 1234567890 "this is a reason"'],

            args: [{
                key: 'member',
                label: 'member',
                prompt: 'What member would you like to ban?',
                type: 'string',
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
        msg.guild.unban(args.member, args.reason)
            .catch(console.error);
        msg.reply(`I unbanned **${args.member}** because "**${args.reason}**"!`)
    }
};