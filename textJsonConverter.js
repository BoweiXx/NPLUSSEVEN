"use strict";
const fs = require("fs");
const readline = require("readline");
const jsonFile = require("jsonfile");
function converter(src){
    let counter = 0;
    return new Promise((resolve, rej)=>{
        const readStream = fs.createReadStream(src);
        readStream.on("error", rej);
        const reader = readline.createInterface({
            input: readStream
        })
        const tempObj = {}
        reader.on("line", line=>{
            tempObj[counter] = (JSON.parse(`"${line}"`));
            counter++;
        })
        reader.on("close", ()=>{
            resolve((tempObj));
        })     
    })
}
converter("Wordlist-Nouns-All.txt").then(res=>{
    jsonFile.writeFile('dictionary.json', res , err=>{
        err && console.log(err);
        return;
    })
})