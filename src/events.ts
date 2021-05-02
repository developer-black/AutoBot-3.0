import Files from "./files";

class Events {

    public static events: Map<string, string>;

    public static loadEvents(path: string, extension: string) {
        const files = Files.deepSearchDirSync(path, name => name.endsWith(`.${extension}`));
        

    }

    public static loadEventFromFile(path: string) {
        
    }

    public static checkValidate(module: any) {

    }

}

export default Events;