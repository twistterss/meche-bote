const Discord = require('discord.js');
const commando = require('discord.js-commando')
const oneLine = require('common-tags').oneLine;

module.exports = class AboutCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'embed',
            aliases: ['embed', 'embed', 'ed'],
            group: 'fun',
            memberName: 'embed',
            description: "Embeds a message you put in. E.G >embed Hi how are you?",
            details: oneLine`
            Sends juicy memes, directly from r/memes..
			`,
            examples: ['+embed', '+Embed'],
            args: [
                {
                    key: 'guild',
                    prompt: 'What text would you like to embed??',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, args) {
        let msg = new Discord.RichEmbed()
            .setDescription(args.guild);
        message.channel.send(msg);
    }
};