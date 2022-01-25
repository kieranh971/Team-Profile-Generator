const Engineer = require ("./lib/Engineer");
const Intern = require ("./lib/Intern");
const Manager = require ("./lib/Manager");
const Employee = require("./lib/Employee");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const newHTML = require("./src/newHTML")
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "index.html")

const teamArr = [];

function newMember() {
    inquirer.prompt ([
        {
            type: "input",
            message: "Enter team member's name",
            name: "nameAnswer"
        },
        {
            type: "input",
            message: "Enter team member's employee ID",
            name: "idAnswer"
        },
        {
            type: "input",
            message: "Enter team member's email",
            name: "emailAnswer"
        },
        {
            type: "list",
            message: "Please select this member's role",
            choices: ["Manager", "Engineer", "Intern"],
            name: "roleAnswer"
        }
]).then(function(results){
        if (results.roleAnswer === "Intern") {
            // console.log(results)
            internQuestions(results);
        } else if (results.roleAnswer === "Manager") {
            managerQuestions(results);
        } else {
            engineerQuestions(results);
        }
    })
}

function internQuestions(originalResults){
    inquirer.prompt([
        {
            type: "input",
            message: "Enter intern's school.",
            name: "schoolAnswer"
        },
        {
            type: "confirm",
            message: "Enter any addition info if needed.",
            name: "additionalAnswers"
        }
    ]).then(function(results){
        const newIntern = new Intern(originalResults.nameAnswer, originalResults.idAnswer, originalResults.emailAnswer, results.schoolAnswer);
        teamArr.push(newIntern);
        if(results.additionalAnswers === true){
            newMember();
        } else {
            createTeam()
            console.log("Dude, we're gettin the band back together.")
        }
    })
}

function engineerQuestions(originalResults){
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the engineer's Github username.",
            name: "githubAnswer"
        },
        {
            type: "confirm",
            message: "Enter any addition info if needed.",
            name: "additionalAnswers"
        }
    ]).then(function(results){
        const newEngineer = new Engineer(originalResults.nameAnswer, originalResults.idAnswer, originalResults.emailAnswer, results.githubAnswer);
        teamArr.push(newEngineer);
        if(results.additionalAnswers === true){
            newMember();
        } else {
            createTeam()
            console.log("Dude, we're gettin the band back together.")
        }
    })
}

function managerQuestions(originalResults){
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the manager's office number.",
            name: "officeNumbAnswer"
        },
        {
            type: "confirm",
            message: "Enter any addition info if needed.",
            name: "additionalAnswers"
        }
    ]).then(function(results){
        const newManager = new Manager(originalResults.nameAnswer, originalResults.idAnswer, originalResults.emailAnswer, results.officeNumbAnswer);
        teamArr.push(newManager);
        if(results.additionalAnswers === true){
            newMember();
        } else {
            createTeam()
            console.log("Dude, we're gettin the band back together.")
        }
    })
}

function createTeam() {
    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, newHTML(teamArr), "utf-8")
}

newMember()