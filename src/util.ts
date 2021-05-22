import fs from 'fs';

namespace Utils {
    export class FileUtils {
        public static isFileExist(path: string): boolean {
            try {
                const stat = fs.statSync(path);
                return stat.isFile();
            } catch(ignored) {
                return false;
            }
        }
    }

    export namespace Decorators {
        export function Type(...types: string[]) {
            return function (constructFN: Function) {
                if(!constructFN.prototype.types) constructFN.prototype.types = new Array<string>();
                for(var type of types) {
                    constructFN.prototype.types.push(type);
                }
            }
        }
    }
}

export default Utils;