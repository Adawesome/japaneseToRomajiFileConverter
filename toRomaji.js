const fs = require('fs');
const {readdir, rename, lstat} = require('fs/promises');
const path = require('path');
const wanakana = require('wanakana');

/**
 * Parses arguments passed through command line.
 * Expect at least one argument, path to a file or directory. 
 * If there are 2 arguments, if the arg starts with a hyphen then it is treated as an option, 
 * otherwise it is treated as the path to a file or directory.
 */
async function handleArgs() {
    const args = process.argv.slice(2);
    switch(args[0]) {
        case('-r'):
        case('-R'):
            // iterate on all files in the directory
            const pathStat = await fs.lstat('test.txt');
            console.log(pathStat.isFile());
            break;
        default: 
            console.log('Usage: node toRomaji [options] <file path>.');
            return [];
    }
}

/**
 * Take an array of strings as file paths and rename the file names, returns void.
 * @param {string} fileName 
 */
async function toRomaji(fileName) {
    return rename(fileName, wanakana.toRomaji(fileName));
}

async function main() {
    const myFiles = await handleArgs();
    const convertingFiles = myFiles.map(filePath => {
        return toRomaji(filePath);
    });
    await Promise.all(convertingFiles);
}

main()