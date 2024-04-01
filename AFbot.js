const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '!';

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'createchannel') {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('You do not have permission to use this command.');

        let viewRoleID = '1046511349095743589'; // Role ID that can view the channel
        let talkRoleID = '1046511349095743589'; // Role ID that can talk in the channel
        let channelSize = 7; // Max size of the voice channel

        // Creating text channel
        const textChannel = await message.guild.channels.create('new-text-channel', {
            type: 'text',
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL'] // Hide the channel from @everyone
                },
                {
                    id: viewRoleID,
                    allow: ['VIEW_CHANNEL'] // Allow the specified role to view the channel
                }
            ]
        });

        // Creating voice channel
        const voiceChannel = await message.guild.channels.create('new-voice-channel', {
            type: 'voice',
            userLimit: channelSize, // Set max size of the voice channel
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL'] // Hide the channel from @everyone
                },
                {
                    id: viewRoleID,
                    allow: ['VIEW_CHANNEL'] // Allow the specified role to view the channel
                },
                {
                    id: talkRoleID,
                    allow: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK'] // Allow the specified role to view, connect, and speak in the channel
                }
            ]
        });

        message.channel.send('Created new text and voice channels!');
    }
});

client.login('NTIxNzgzOTA2NDUwNjY5NTY4.GpECZH.JXY4Iuijyywayq6o7MpoCBJ9g4SncFbarKpWXs');
