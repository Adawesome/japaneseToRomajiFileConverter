# The Japanese To Romaji Filename Converter

## Objective

The purpose of this NodeJS-based application is to provide a simple to use command line interface that can take an input of either a single file path or directory and convert any japanese text to its romaji equivalent.

## How to Use

First, ensure you have installed [NodeJS 14+](https://nodejs.org/en/download/).

Second, clone this repository and install the needed libraries.

```bash
cd {path to repo} && npm install --production
```

Third, execute the [toRomaji](toRomaji.js) javascript file and provide the file/directory path to begin conversion.

```bash
# example
cd {path to repo} && node toRomaji [options] <file/directory path>
```
