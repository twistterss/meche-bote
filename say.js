const Discord = require('discord.js');
const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class AboutCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'say',
            aliases: ['s', 'say', 'say'],
            group: 'admin',
            memberName: 'say',
            description: "This can be used for announcements (makes the bot copy your message).",
            details: oneLine`
            Sends juicy memes, directly from r/memes..
			`,
            examples: ['+embed', '+Embed'],
            args: [
                {
                    key: 'guild',
                    prompt: 'What would you like mech to say???',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, args) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You do not have the right permission to use this command.");
        let botmessage = args.guild;
        message.delete().catch();
        message.channel.send(botmessage)
    }
};