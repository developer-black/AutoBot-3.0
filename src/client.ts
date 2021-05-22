import Discord from 'discord.js';
import fs from 'fs';
import yargs from 'yargs';
import Core from "./core";
import Files from "./files";


class Client {

    public constructor() {
        const client = new Discord.Client();
        client.login('token');

        Core.Events.Manager.loadEvents(`events`);
        Core.Events.Manager.registerEvents(client);
    }

}

export default Client;