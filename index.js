const inquirer = require("inquirer");
const fs = require("fs");
const newHTML = require("./src/newHTML")

const Engineer = require ("./lib/Engineer");
const Intern = require ("./lib/Intern");
const Manager = require ("./lib/Manager");

const team = [];

function newMember() {
    inquirer.prompt ([{
        message: "Enter team member's name",
        name: "name"
    },
    {
        message: "Enter team member's employee ID",
        name: "id"
    },
    {
        message: "Enter team member's email",
        name: "email"
    },
    {
        type: "list",
        message: "Please select this member's role",
        choices: ["Manager", "Engineer", "Intern"],
        name: "role"
    }])
    .then(function({name, role, id, email}){
        let roleInfo;
        if (role === "Intern") {
            roleInfo = "school name";
        } else if (role === "Manager") {
            roleInfo = "office phone number";
        } else {
            roleInfo = "Github username";
        }
    inquirer.prompt([{
        message: `Enter team member's ${roleInfo}`,
        name: "roleInfo"
    },
    {
        type: "confirm",
        message: "Would you like to add additional team members?",
        default: false,
        name: "additionalMembers"
    }])
    .then(function({roleInfo, additionalMembers}){
        // let {additionalMembers} = newMembers;
        let newEmployee;
        if (role === "Intern") {
            newEmployee = new Intern(name, id, email, roleInfo);
        } else if (role === "Manager") {
            newEmployee = new Manager(name, id, email, roleInfo);
        } else {
            newEmployee = new Engineer(name, id, email, roleInfo);
        }

        team.push(newEmployee);
        console.log(team)

        if (additionalMembers) {
            newMember(team);
        } else {
            return writeFile();
            // console.log(team);
        }
    })
    })
};

const writeFile = data => {
    fs.writeFile('./output/index.html', data, err => {
        // if there is an error 
        if (err) {
            console.log(err);
            return;
        // when the profile has been created 
        } else {
            console.log("Your team has been created! Please view the HTML file.")
        }
    })
}; 


newMember()
.then(team => {
    return newHTML(team)
})
.then(profileHTML => {
    return writeFile(profileHTML)
})
.catch(err => {
    console.log(err);
});