const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class PurgeCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            aliases: ['purge', 'delete'],
            group: 'mod',
            memberName: 'clear',
            description: "Deletes a set amount of messages.",
            details: oneLine`
            Deletes a set amount of messages.
			`,
            examples: ['?clear 5'],
            args: [
                {
                    key: 'count',
                    label: 'amount of messages',
                    prompt: 'How many messages do you want to delete? Limit of up to 99.',
                    type: 'integer',
                    min: 1,
                    max: 99
                }
            ]
        });
    }

    async run(msg, args) {
        if (msg.author.bot) return;
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
            msg.channel.send("Error!! You don't have the Manage Messages permission!!");
            return;
        }
        const msgs = await msg.channel.fetchMessages({ limit: args.count + 1 });
        msg.channel.bulkDelete(msgs).then(() => {
            msg.channel.send(`:white_check_mark: Cleared ${args.count} messages.`).then(msg => msg.delete(2000))
        });
    }
};