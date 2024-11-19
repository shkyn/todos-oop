import fs from 'node:fs/promises'

class FileManager {
    async writeFile(filename, data){
        try {
            data = JSON.stringify(data, null, 2)
            await fs.writeFile(filename, data)
        }  catch(error){
            console.log("write error => ", error)
        }
    }

    async readFile(filename) {
        try {
            const fileContent = await fs.readFile(filename, 'utf8');
            if (!fileContent) {
                return []; // Kui fail on tühi, tagasta tühi massiiv
            }
            return JSON.parse(fileContent); // Kui sisu on olemas, parsi see JSON-iks
        } catch (error) {
            console.error("read error =>", error);
            return []; // Kui fail puudub või tekib muu viga, tagasta tühi massiiv
        }
    }
}

export const fileManager = new FileManager()