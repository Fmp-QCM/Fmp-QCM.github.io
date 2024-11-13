
/**
 * Decrypt File
 * @param {Buffer} key 
 * @param {Buffer} iv 
 * @param {String} file 
 * @returns {JSON}
 */
export async function decode(key, iv, file) {
    console.log('decoding...')
    try {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const enc_str = await response.text();
        let dec_str = enc_str;
        (key !== '') ? dec_str = atob(enc_str) : null; //.replace(/\s+/g, '')
        return JSON.parse(dec_str);
    } catch (error) {
        console.error('Error decoding or parsing JSON:', error);
    }
}

/**
 * Encrypt File
 * @param {Buffer} key 
 * @param {Buffer} iv 
 * @param {JSON} json
 * @returns {String} 
 */
export async function encode(key, iv, json) {
    // function in progress
    console.log('encoding...')
    return // file
}
