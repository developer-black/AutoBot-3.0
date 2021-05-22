import Discord from 'discord.js';
import fs from 'fs';
import Core from "./core";
import Files from "./files";


class Client {

    public constructor() {
        const client = new Discord.Client();
        client.login('NzcwMTA0NTc1OTI2NzMwNzcy.X5Ytxg.BBFfH3rNoNmj6khHUFMfs9ClRCk');

        Core.Events.Manager.loadEvents(`events`);
        Core.Events.Manager.registerEvents(client);
    }

}

export default Client;