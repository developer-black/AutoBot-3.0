import Discord from 'discord.js';
import Client from './client';

function EventHandler<K extends keyof Discord.ClientEvents>(eventType: K) {
    return function (constructFN: Function) {
        
    };
}

interface Listener {
    listen(client: Client, args: any[]): void;
}

interface EventDescription {

}

type TListen = (client: Client, args: any[]) => void;

export { EventHandler, Listener, TListen };