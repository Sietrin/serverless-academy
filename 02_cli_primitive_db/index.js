import inquirer from "inquirer";
import fs from "fs";


const questionName = [
  {
    type: 'input',
    message: 'Enter the user`s name. To cancel press ENTER:',
    name: "name",
  },
];
const questionsUser = [
  {
    type: 'list',
    message: 'Select gender',
    name: 'gender',
    choices: ['masculine', 'feminine'],
  },
  {
    type: 'input',
    message: 'Enter your age',
    name: "age",
  },
];
const questionsSearch = [
    {
        type: 'confirm',
        name: 'searchConfirmation',
        message: "Would you like to search in the DB?",
        waitUserInput: true,
    },
    {
        type: 'input',
        message: 'Enter the name of the user you wish to find',
        name: "searchName",
    },
];
entryPoint();

function entryPoint() {
  inquirer.prompt(questionName).then((answers) => {
    if (answers.name == '') {
        userSearch();
    } 
    else {
        userCreation(answers.name);
    }
  });
}
function userCreation(name) {
  inquirer.prompt(questionsUser).then((answers) => {
    answers.name = name;
    console.log(answers);
    let database = fs.readFileSync('./database.txt');
    let objs = JSON.parse(database);
    objs.push(answers);
    fs.writeFileSync('./database.txt', JSON.stringify(objs, null, 2));
    entryPoint();
  });
}
function userSearch() {
    const database = fs.readFileSync('./database.txt');
    let users = JSON.parse(database);
    inquirer.prompt(questionsSearch[0]).then((answers) => {
        if (answers.searchConfirmation == false) { process.exit(); }
        else {
            console.log(users);
            inquirer.prompt(questionsSearch[1]).then((answers) => {
                for (let user of users) {
                    if (user.name.toLowerCase() == answers.searchName.toLowerCase()) {
                        console.log(user);
                    }
                    else {
                        console.log(`I am sorry but there is no record of ${answers.searchName}`);
                        break;
                    }
                }

            });
        }
    });
}