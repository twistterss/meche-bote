const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const Discord = require('discord.js');

module.exports = class UtilInfoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'info',
            aliases: ['inf'],
            group: 'util',
            memberName: 'info',
            description: 'Returns information about the specified type',
            details: oneLine`
                Returns information about the specified type
			`,
            examples: ['>info uptime'],

            args: [{
                key: 'type',
                label: 'type',
                prompt: 'What type of info would you like to view? (bot, uptime, server, user)',
                type: 'string',
                infinite: false
            }, {
                key: 'member',
                label: 'member',
                prompt: 'What member would you like to view info on?',
                type: 'member',
                infinite: false,
                default: 'none'
            }]
        });
    }

    async run(msg, args) {
        if (args.type == 'uptime') {
            let totalSeconds = (this.client.uptime / 1000);
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;
            let uptime = `${hours} hours, ${minutes} minutes and ${seconds} seconds`;
            msg.reply(uptime);
        } else if (args.type == 'server') {
            let offline = Array.from(msg.guild.members.values()).filter(mem => mem.user.presence.status !== 'online' && !mem.user.bot).length;
           	let onlineMembers = Array.from(msg.guild.members.values()).filter(mem => mem.user.presence.status !== 'offline' && !mem.user.bot).length;
          	let channels = Array.from(msg.guild.channels.values()).filter(channel => channel.type !== null).length;
           let bots = Array.from(msg.guild.members.values()).filter(mem => mem.user.bot).length;
            let serverinfo = new Discord.RichEmbed()
                .setTitle(`Server Info`)
                .setAuthor(msg.guild.name, msg.guild.iconURL)
                .setColor(16744448)
                .setDescription(`${msg.guild.name} is ${words.posadj[Math.floor(Math.random() * 9)]}`)
                .setFooter(`i like ${msg.guild.name}`, msg.guild.iconURL)
              // .setImage("https://cdn.discordapp.com/attachments/471415792223780877/471606674956877825/Mech_Bot.png")
               .setThumbnail("https://cdn.discordapp.com/attachments/471415792223780877/471606674956877825/Mech_Bot.png")
                .setTimestamp()
                 .setURL("https://discord.gg/jp3djac")
              	.addField('Name', `${msg.guild.name} (${msg.guild.nameAcronym})`, true)
                .addField('Id', msg.guild.id, true)
                .addField("Member Count", msg.guild.memberCount, true)
            	  .addField('Channels', channels, true)
                .addField('Bots', bots, true)
                .addField('Online Members', onlineMembers, true)
                .addField('Offline Members', offline, true)
                .addField("Owner", msg.guild.owner, true);        
            return msg.channel.send({
                embed: serverinfo
            });
        } else if (args.type == 'bot') {
            let botinfo = new Discord.RichEmbed()
                .setTitle(`Bot Info`)
                .setAuthor(this.client.user.username, this.client.user.avatarURL)
                .setColor(16744448)
                .setDescription(`I am ${words.posadj[Math.floor(Math.random() * 9)]}`)
                .setFooter(`Hmm, I'm bored`, this.client.user.avatarURL)
                // .setImage("http://i.imgur.com/yVpymuV.png")
                // .setThumbnail("http://i.imgur.com/p2qNFag.png")
                .setTimestamp()
                // .setURL("https://discord.gg/tyAUAP5")
                .addField("Name", `${this.client.user.username}`, true)
                .addField("Server Count", this.client.guilds.size, true)
                .addField("Member Count", this.client.users.size)
                .addField("Owner(s)", this.client.owners, true)
            return msg.channel.send({
                embed: botinfo
            });
        } else if (args.type == 'user') {
          let user = new Discord.RichEmbed()
                .setTitle(`UserInfo Guideliness`)
                .setColor(16744448)
                .addField("ReadBeneath", `Sorry Userinfo is coming in the future pdates. We cannot provide fast updates all the time please be patient!`, true)
          
        return msg.channel.send({
                embed: user
           });
        } else {
            return msg.channel.send(`Sorry ${args.type} isn't a valid type. (bot, uptime, server,user)`);
        }
    }
};