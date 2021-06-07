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
        case('-h'):
        case('-H'):
            displayHelpMenu();
            return -1; // -1 will represent input that will not follow normal execution.
        case('-r'):
        case('-R'):
            // iterate on all files in the directory
            if(await isFile(args[1])) {
                console.log('A single file or something that is neither a file nor a directory, but a directory is expected. Please remove the recursion flag.');
                return -1;
            } else {
                return args[1];
            }
        case('-s'):
        case('S'):
            if(await isFile(args[1])) {
                return [...args[1]];
            }
            else {
                console.log('A valid file path was not entered.');
                return -1;
            }
        default: 
            if(await isFile(args[1])) {
                return [...args[1]];
            } else {
                displayHelpMenu();
                return -1;
            }      
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
    if(myFiles === -1) {
        console.log('Concluding program.')
        return;
    }
    const convertingFiles = myFiles.map(filePath => {
        return toRomaji(filePath);
    });
    await Promise.all(convertingFiles);
}

main()

/* helper functions*/

async function isFile(pathName) {
    if(pathName) {
        const pathStat = await lstat(pathNam);
        return pathStat.isFile();
    } else {
        return false;
    }

}

function displayHelpMenu() {
    console.log('Usage: node toRomaji [options] <file path>');
    console.group(); //A
        console.log('OPTIONS');
        console.group(); //B
            console.log('-h -H | help menu');
            console.log('-r -R | recursion, iterate over a directory against multiple files');
            console.log('-s -S | single file, rename the single file provided by the subsequent argument');
            console.groupEnd(); //B
        console.log('default | If no options are given, a single file is expected.');
        console.groupEnd(); //A
}