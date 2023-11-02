import axios, { isCancel, AxiosError } from 'axios';
import fs from "fs";

/* The JSON JSONEndpoints dont work. 
I will create something resemling their work using filesystem calls 
but also leaving an example of how it would've worked and was supposed to.
Basically here I present two solutions remote and local but to proprly test 
the algorithm I needed to create local version nonetheless so it stays to showcase
that the script works*/
const JSONEndpoints = [
    "https://jsonbase.com/sls-team/json-793",
    "https://jsonbase.com/sls-team/json-955",
    "https://jsonbase.com/sls-team/json-231",
    "https://jsonbase.com/sls-team/json-931",
    "https://jsonbase.com/sls-team/json-93",
    "https://jsonbase.com/sls-team/json-342",
    "https://jsonbase.com/sls-team/json-770",
    "https://jsonbase.com/sls-team/json-491",
    "https://jsonbase.com/sls-team/json-281",
    "https://jsonbase.com/sls-team/json-718",
    "https://jsonbase.com/sls-team/json-310",
    "https://jsonbase.com/sls-team/json-806",
    "https://jsonbase.com/sls-team/json-469",
    "https://jsonbase.com/sls-team/json-258",
    "https://jsonbase.com/sls-team/json-516",
    "https://jsonbase.com/sls-team/json-79",
    "https://jsonbase.com/sls-team/json-706",
    "https://jsonbase.com/sls-team/json-521",
    "https://jsonbase.com/sls-team/json-350",
    "https://jsonbase.com/sls-team/json-64",
];

const localEndpoints = [
    "./1.json",
    "./2.json"
];

async function fetchJSONProper(url, maxRetries=3) {
    let retries = 0;
    while (retries <= maxRetries) {
        try {
            let response = await axios.get(url);
            return response.data;
        } catch (error) {
            retries++;
        }
    }
    console.log(`[Fail] ${url}: The endpoint is unavailable`);
    return null;
}
let responsesRemote = await Promise.all(JSONEndpoints.map(url => fetchJSONProper(url))); //it will return an array with lots of nulls 

for (let i = 0; i < responsesRemote.length; i++) { //iterates array and passes to a finder function
    let result = findIsDone(responsesRemote[i]);
    if (result === true || result === false) {
            console.log(`[Success] ${localEndpoints[i]}: isDone - ${result}` );
    }
}

async function fetchJSON(url, maxRetries=1) { //this function does absolutely the same but reads local JSONs instead
    let retries = 0;
    while (retries <= maxRetries) {
        try {
            let response = fs.readFileSync(url);
            return JSON.parse(response);
        } catch (error) {
            retries++;
        }
    }
    console.log(`[Fail] ${url}: The endpoint is unavailable`);
    return null;
}

let responsesLocal = await Promise.all(localEndpoints.map(url => fetchJSON(url))); //local works just fine

for (let i = 0; i < responsesLocal.length; i++) {
    let result = findIsDone(responsesLocal[i]);
    if (result === true || result === false) {
            console.log(`[Success] ${localEndpoints[i]}: isDone - ${result}` );
    }
}

function findIsDone(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      const result = findIsDone(obj[key]);
      if (result !== undefined) {
        return result;
      }
    } else if (key === 'isDone' && typeof obj[key] === 'boolean') {
      return obj[key];
    }
  }
}