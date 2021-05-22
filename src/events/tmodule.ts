import Discord, { ClientEvents } from 'discord.js';
import Client from '../client';
import Core from '../core';

export default class TestEvent extends Core.Events.Listener {

    public constructor() {
        super('message');
    }
    
    public listen(client: Client, message: Discord.Message) {
        if(!(message.channel instanceof Discord.GuildChannel) || !message.guild || !message.member) return;
        console.log(`Event Triggered: message (${message.content != '' ? `message '${message.content}', ` : ''}user ${message.member.displayName}(${message.member.id}), at ${message.createdTimestamp}, server ${message.guild.name}(${message.guild.id}), channel ${message.channel.name}(${message.channel.id}))`);
    }
    
}