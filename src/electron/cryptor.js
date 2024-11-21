import fs from "node:fs";
import path from "node:path";

/**
 * Decrypt File
 * @param {Buffer} key 
 * @param {Buffer} iv 
 * @param {String} file 
 * @param {String} filePath
 * @returns {Promise<JSON>}
 */
export async function decode(key, iv, file, filePath) {
    console.log(fs.existsSync(path.join(import.meta.dirname, file)));
    
    try {
        console.log('decoding...', key, iv, path.resolve(import.meta.dirname, file))
        const filePath = path.resolve(import.meta.dirname, file)
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        let fileDecoded = fileContent;
        (key !== undefined) ? fileDecoded = atob(fileContent) : null; //.replace(/\s+/g, '')
        return JSON.parse(fileDecoded);
    } catch (error) {
        throw error;
    }

    /*try {
        const response = await fetch(path.join(import.meta.dirname, file));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const enc_str = await response.text();
        console.log(enc_str);
        
        let dec_str = enc_str;
        console.log(dec_str);
        (key !== '') ? dec_str = atob(enc_str) : null; //.replace(/\s+/g, '')
        console.log(dec_str);
        return JSON.parse(dec_str);
    } catch (error) {
        console.error('Error decoding or parsing JSON:', error);
    }*/
}

/**
 * Encrypt File
 * @param {Buffer} key 
 * @param {Buffer} iv 
 * @param {JSON} file
 * @param {String} filePath
 * @returns {Promise<String>} 
 */
export async function encode(key, iv, file, filePath) {
    // function in progress
    console.log('encoding...')
    let fileContent = 'dd'
    return fileContent
}
