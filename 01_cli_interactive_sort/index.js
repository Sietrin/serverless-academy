import * as readline from 'node:readline/promises';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

while (true) { //main loop
  await askWords();
}

async function askWords() {
  rl.write("Hi there, enter 10 words or digits to be sorted separating them with a space: \n")
  let words = await rl.question('');
  let wordsArr = words.split(' ');

  rl.write("How would you like to sort the values?\n 1. Words by name\n");
  rl.write(" 2. Show digits from the smallest\n 3. Show digits from the biggest\n 4. Words by quantity of letters\n 5. Only unique words\n");
  let sorting = await rl.question("Select (1 - 5) and press ENTER:");
  sorting = sorting.toLowerCase().trim();
  switch (sorting) {
    case "exit":
      rl.write("Thanks for coming!\n");
      rl.close();
      process.exit();
      break;
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
      //wordsArr = ["bbbbbb", "zz", "zz", "adc", "adc", 1, 5, 10, 27, 3, "word", "word", "unique"]; //quick test to overwrite the values, the app was tested using this array
      wordsSort(Number(sorting), wordsArr);
      break;
    default:
      rl.write("Something went wrong. Let's do it again\n");
      break;
  }
};

function wordsSort(sortingType, wordsArr) {
  let arr = [];
  if (sortingType == 1) {
    for (let elem of wordsArr) {
      if (isNaN(elem)) {
        arr.push(elem);
      }
    }
    arr.sort((first, second) => first.localeCompare(second));
    console.log(arr);
    return arr;
  }

  if (sortingType == 2) {
    for (let elem of wordsArr) {
      if (!isNaN(elem)) {
        arr.push(elem);
      }
    }
    arr.sort((first, second) =>  first - second);
    console.log(arr);
    return arr;
  }
  if (sortingType == 3) {
    for (let elem of wordsArr) {
      if (!isNaN(elem)) {
        arr.push(elem);
      }
    }
    arr.sort((first, second) => second - first);
    console.log(arr);
    return arr;
  }

  if (sortingType == 4) {
    for (let elem of wordsArr) {
      if (isNaN(elem)) {
        arr.push(elem);
      }
    }
    arr.sort((first, second) => first.length - second.length);
    console.log(arr);
    return arr;
  }

  if (sortingType == 5) {
    for (let elem of wordsArr) {
      let wordCounter = 0;
      for (let word of wordsArr) {
        if (word == elem) wordCounter++; 
      }
      if (wordCounter <= 1 && isNaN(elem)) arr.push(elem);
    }
    console.log(arr);
    return arr;
  }
}