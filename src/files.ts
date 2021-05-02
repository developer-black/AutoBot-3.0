import { strikethrough } from 'ansi-styles';
import fs from 'fs';

/**
 * File utils.
 * 
 * @version 1.0.0
 * @since 3.0.0
 */
class Files {

    /**
     * search files using recursive or not and return result
     * 
     * @param path path to search files
     * @param nameFilter filter
     * @param useRecursive useRecursive
     * @returns result
     */
    public static searchFilesSync(path: string, nameFilter?: (name: string) => boolean, useRecursive=false): string[] {
        if(useRecursive) return this.deepSearchFilesSync(path, nameFilter);
        if(nameFilter) return fs.readdirSync(path).filter(nameFilter);
        return fs.readdirSync(path);
    }

    /**
     * search files using recursive
     * @param path path to deep search
     * @param nameFilter filter
     * @returns result
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
     * search directories using recursive
     * 
     * @param path path to deep search
     * @param nameFilter filter
     * @returns result
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