import Discord, { ClientEvents } from 'discord.js';
import fs from 'fs';
import Client from './client';
import Files from './files';
import Utils from './util';

namespace Core {

    export namespace Modules {
        export abstract class ModuleDescription {
            moduleType: string;

            public constructor(moduleType: string) {
                this.moduleType = moduleType;
            }
        }

        @Utils.Decorators.Type('Core.Modules.Module')
        export abstract class Module {
            public description: ModuleDescription;
        }

        export class Manager {
            
            public static loadModule(path: string, ...types: string[]): any {
                path = `${path}`;

                if(!Utils.FileUtils.isFileExist(path)) throw new Error(`Invalid file ${path}`);

                const module = require(path).default;
                console.log(module);
                if(module.prototype?.types?.includes('Core.Modules.Module')) {
                    for(var type of types) {
                        if(!module.prototype?.types?.includes(type)) throw new Error('Invalid module');
                    }
                    return new module();
                }
                throw new Error('Invalid module');
            }

        }
    }

    export namespace Events {

        @Utils.Decorators.Type('Core.Events.Listener')
        export abstract class Listener extends Core.Modules.Module {
            public readonly description: EventDescription;
            
            public constructor(eventType: keyof Discord.ClientEvents) {
                super();
                this.description = new EventDescription(eventType);
            }

            public listen(client: Client, ...args: any): void {

            }
        }
    
        export class EventDescription extends Core.Modules.ModuleDescription {
            public eventType: keyof Discord.ClientEvents;
            public constructor(eventType: keyof Discord.ClientEvents) {
                super('eventListener::1');
                this.eventType = eventType;
            }
        }

        export class Manager {

            public static events = new Array<Listener>();

            public static loadEvents(directory: string) {
                const files = Files.deepSearchFilesSync(`${__dirname}\\${directory}`, (name) => name.endsWith('.ts'));
                
                console.log(files);
                for(const file of files) {
                    const module = this.loadEvent(file);
                    if(!module) continue;
                    this.events.push(module);
                }
            }
            
            public static loadEvent(path: string): Listener | undefined {
                try {
                    const module = Modules.Manager.loadModule(path, 'Core.Events.Listener') as Listener;
                    console.log(`Loaded event '${path} (${module.description.eventType})`);
                    return module;
                } catch(err) {
                    console.log(`Failed to load event '${path}'. see below for detail.\n${err}`);
                }
            }

            public static registerEvents(client: Discord.Client) {
                for(const i of this.events) {
                    this.registerEvent(client, i);
                }
            }

            public static registerEvent(client: Discord.Client, event: Listener) {
                client.on(event.description.eventType, (...args) => event.listen(client, ...args));
                console.log(`Registered event (type ${event.description.eventType})`);
            }

        }
    }
    

}

export default Core;