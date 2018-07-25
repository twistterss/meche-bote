const commando = require('discord.js-commando');
const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const oneLine = require('common-tags').oneLine;

module.exports = class AboutCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'meme',
            aliases: ['memes', 'mems', 'mem'],
            group: 'fun',
            memberName: 'meme',
            description: "Sends juciy memes, directly from r/memes.",
            details: oneLine`
            Sends juicy memes, directly from r/memes..
			`,
            examples: ['+meme', '+mems'],
        });
    }

    async run(msg) {
        if (msg.author.bot) return;
        try {
            let { body } = await snekfetch
                .get(`https://www.reddit.com/r/memes.json`)
                .query({ limit: 400 });
            const allowed = msg.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
            if (!allowed.length) return msg.say('Hmm... It seems the memes are all gone right now. Try again later!');
            const post = allowed[Math.floor(Math.random() * allowed.length)].data;
            let memembed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setTitle(post.title)
                .setURL("https://www.reddit.com" + post.permalink)
                .setImage(post.url)
                .setFooter("👍 " + post.ups + " |👎 " + post.downs + " |💬 " + post.num_comments);
            return msg.channel.send(memembed);
        } catch (err) {
            return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
        }
    }
};