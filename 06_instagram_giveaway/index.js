import fs, { read } from "fs";

console.time('Program');
let setUniqueInAllFiles = new Set(); //sets store only unique values, isn't it perfect?
let namesCounter = {}; //holds all names to ever occur and counts the number of the,is they occur

for (let i = 0; i <= 19; i++) { //loops over each file storing the data, inefficient for RAM but efficient for speed, why use JS for RAM effeciency having Rust after all?
    readFile(i);
}

function readFile(fileNum) {
    console.time('Function');
    let filename = `./words/out${fileNum}.txt`;
    let uniqueIntheFile = new Set(); //stores all unique occurences for a single file
    fs.readFileSync(filename, 'utf8').split('\n').forEach((line) => {
        let words = line.split(' ');
        words.forEach((word) => {
            setUniqueInAllFiles.add(word);
            uniqueIntheFile.add(word);
        });
    });
    for (let word of uniqueIntheFile) { //adds up all the occurences on a file basis
        if (typeof namesCounter[word] === "undefined") {
            namesCounter[word] = 1;
        }
        else {
            namesCounter[word] += 1;
        }
    }
    console.timeEnd('Function');
    console.log(`${fileNum} has been read!`);
}

uniqueValues();
existInAtleastTen();
existInAllFiles();

function uniqueValues() {
    console.log(`The amount of unique elements is: ${setUniqueInAllFiles.size}`);
    return setUniqueInAllFiles.size;
}
function existInAllFiles() { //the functions are virtually the same and I would've suggested merging them
    let resultArr = [];
    for (let prop in namesCounter) {
        if (namesCounter[prop] == 20) {
            resultArr.push(prop);
        }
    }
    console.log(`The amount of unique elements that occur across all files is: ${resultArr.length}`);
    return resultArr.length;
}
function existInAtleastTen() {
    let resultArr = [];
    for (let prop in namesCounter) {
        if (namesCounter[prop] >= 10) {
            resultArr.push(prop);
        }
    }
    console.log(`The amount of unique elements that occur across at least 10 files is: ${resultArr.length}`);
    return resultArr.length;

}
console.timeEnd('Program');