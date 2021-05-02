import { strikethrough } from 'ansi-styles';
import fs from 'fs';

/**
 * File utils.
 * 
 * @version 1.0.0
 * @since 3.0.0
 */
class Files {

    public static searchFilesSync(path: string, nameFilter?: (name: string) => boolean, useRecursive=false): string[] {
        if(useRecursive) return this.deepSearchFilesSync(path, nameFilter);
        if(nameFilter) return fs.readdirSync(path).filter(nameFilter);
        return fs.readdirSync(path);
    }

    /**
     * Deep find files from path (sync)
     */
    public static deepSearchFilesSync(path: string, nameFilter?: (name: string) => boolean): string[] {
        var arr = new Array<string>();
        var dirs = fs.readdirSync(path);
        for(let i of dirs) {
            i = `${path}/${i}`;
            let stat = fs.lstatSync(i);
            if(stat.isDirectory()) {
                arr = arr.concat(this.deepSearchFilesSync(i, nameFilter));
            } else if(stat.isFile()) {
                if(nameFilter) {
                    if(nameFilter(i)) arr.push(i);
                } else arr.push(i);
            }
        }
        return arr;
    }

    /**
     * 
     * @param path path to deep search
     * @param nameFilter 
     * @returns 
     */
    public static deepSearchDirSync(path: string, nameFilter?: (name: string) => boolean): string[] {
        var arr = new Array<string>();
        var dirs = fs.readdirSync(path);
        for(let i of dirs) {
            i = `${path}/${i}`;
            let stat = fs.lstatSync(i);
            if(stat.isDirectory()) {
                arr.push(i);
                arr.concat(this.deepSearchDirSync(i, nameFilter));
            }
        }
        return arr;
    }

}

export default Files;