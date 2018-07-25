const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class MuteCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            aliases: ['m'],
            group: 'mod',
            memberName: 'mute',
            description: "Mute's mentioned user for a set about of time.",
            details: oneLine`
            Mute's mentioned user for a set about of time.
			`,
            examples: ['?mute @ExampleUser#1234 "Reason"'],
            args: [{
                key: 'member',
                label: 'member',
                prompt: 'What member would you like to mute?',
                type: 'member',
                infinite: false
            },
            {
                key: 'reason',
                label: 'reason',
                prompt: 'Why do you want to mute this member?',
                type: 'string',
                infinite: true
            }
            ]
        });
    }

    async run(msg, args) {
        if (msg.author.bot) return;
        if (!msg.member.hasPermission("MANAGE_MESSAGES") && msg.author.id !== '221524691079266314') {
            msg.channel.send("Error!! You don't have the Manage Messages permission!!");
            return;
        }
        let muterole = msg.guild.roles.find(`name`, "Muted");
        if (!muterole) {
            msg.channel.send("Error!! Please create a Muted role.");
            return;
        }

        args.member.addRole(muterole)
            .catch(console.error);

        msg.channel.send(`Successfully muted ${args.member}. Reason: ${args.reason}.`);
    }
};