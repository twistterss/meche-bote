const commando = require('discord.js-commando');
const Discord = require("discord.js");
const { stripIndents } = require('common-tags');
const oneLine = require('common-tags').oneLine;

module.exports = class ChangestatusCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'listguilds',
      aliases: ['listservers', 'guilds', 'listallguilds', 'listallservers', 'serverlist'],
      group: 'owner',
      memberName: 'listguilds',
      description: 'See the servers Mech is on.',
      details: oneLine`
           See the servers Mech is on.
            `,
      ownerOnly: true,
      examples: [',serverlist'],
      args: [
        {
          key: 'guild',
          prompt: 'Which server would you like to see information for?',
          type: 'string',
          default: ''
        }
      ]
    });
  }
  async run(msg, { guild }) {
    if (msg.author.bot) return;
    if (!guild) {
      const messages = [];
      try {
        messages.push(await msg.direct(stripIndents`
__**Servers Mech is on**__
${this.client.guilds.map(g => `**${g.name}** - ${g.memberCount}`).join('\n') || '**None**'}
`, { split: true }))
        if (msg.channel.type !== 'dm') messages.push(await msg.reply('Sent you a DM with information.'));
      } catch (err) {
        messages.push(await msg.reply('Unable to send you the help DM. You probably have DMs disabled.'));
      }
      return messages;
    } else {
      let guildname = this.client.guilds.find(`name`, guild);
      if (!guildname) return msg.channel.send('Sorry, that server dosen\'t exsist.');
      /* let invite = guildname.channels.find(`name`, 'general' || `name`, 'lounge' || `name`, 'roles' || `name`, 'main-chat');
       if(!invite) {
         invite = 'Couldn\'t find an invite'
       }*/
      if (guildname.channels.find(`name`, 'general' || `name`, 'announcements' || `name`, 'rules' || `name`, 'lounge' || `name`, 'main-chat' || `name`, 'bot-commands' || `name`, 'bot-spam' || `name`, 'pokecord' || `name`, 'laws' || `name`, 'world-chat' || `name`, '《world-chat》')) {
        guildname.channels.find(`name`, 'general' || `name`, 'announcements' || `name`, 'rules' || `name`, 'lounge' || `name`, 'main-chat' || `name`, 'bot-commands' || `name`, 'bot-spam' || `name`, 'pokecord' || `name`, 'laws' || `name`, 'world-chat' || `name`, '《world-chat》').createInvite({ maxAge: 86400, unique: true }).then(invite => {
          let guildembed = new Discord.RichEmbed()
            .setTitle(guildname)
            .setColor('RANDOM')
            .addField('Owner', `${guildname.owner.user.username}`)
            .addField('Member Count', `${guildname.memberCount}`)
            .addField('Humans', `${guildname.members.filter(u => !u.user.bot).size}`)
            .addField('Bots', `${guildname.members.filter(u => u.user.bot).size}`)
            .addField('Invite', `${invite.url}`)
          msg.channel.send(guildembed)
        })
      } else {
        let guiildembed = new Discord.RichEmbed()
          .setTitle(guildname)
          .setColor('RANDOM')
          .addField('Owner', `${guildname.owner.user.username}`)
          .addField('Member Count', `${guildname.memberCount}`)
          .addField('Humans', `${guildname.members.filter(u => !u.user.bot).size}`)
          .addField('Bots', `${guildname.members.filter(u => u.user.bot).size}`)
        msg.channel.send(guiildembed)
      }
    }
  }
}
//  
//        });
//    }
// async run(msg, { guild }) {
//   if(msg.author.bot) return;
//   if(!guild) {
//   let embed = new Discord.RichEmbed()
//				.setTitle('Servers Mech Is On')
//			  .setColor('RANDOM')
//        .setFooter(`${this.client.guilds.size} Servers`)
  // for (const servers of this.client.guilds.map) {
//        embed.setDescription('**'+this.client.guilds.map(g => g.name).join('\n')+'**' || 'None')
 //  }
 //  msg.channel.send({embed});
 //  }
 //}
//} 