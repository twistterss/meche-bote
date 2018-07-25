const commando = require('discord.js-commando');
const Discord = require("discord.js");
const oneLine = require('common-tags').oneLine;
const db = require('quick.db');
const users = new db.table('users');

module.exports = class ChangestatusCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'globalannounce',
      aliases: ['ann', 'announce'],
      group: 'owner',
      memberName: 'globalannounce',
      description: 'Sends a message to the channel #mech-updates in all servers the bot is in.',
      details: oneLine`
           Sends a message to the channel #mech-updates in all servers the bot is in.
            `,
      ownerOnly: true,
      examples: [',announce "a title" "a message"'],
      args: [
        {
          key: 'title',
          prompt: 'What would you like the title to be?',
          type: 'string'
        },
        {
          key: 'message',
          prompt: 'What message would you like to send globally?',
          type: 'string'
        },
        {
          key: 'thumbnail',
          prompt: 'What image would you like to set as the thumbnail?',
          type: 'string',
          default: 'none'
        }
      ]
    });
  }
  async run(msg, args) {
    this.client.guilds.forEach(guild => {
      if (guild.channels.find('name', 'mech-updates')) {
        var embed = new Discord.RichEmbed()
          .setTitle(args.title)
          .setDescription(args.message)
          .setAuthor(msg.author.username, msg.author.avatarURL)
          .setColor('random')
          .setTimestamp()
          .setURL('https://discord.gg/jp3djac')
          .setFooter('© Mech Development Team');
        if (args.thumbnail !== 'none') {
          embed.setThumbnail(args.thumbnail)
        }
        guild.channels.find('name', 'mech-updates').send({ embed });
      } else {
        //guild.owner.send("I tried to send an announcement to your server but i couldn't find the channel #mech-updates, please create it or reply 'unsubscribe' to stop getting these messages!");
      }
    });
  }
}