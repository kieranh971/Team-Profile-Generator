const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require ("./lib/Engineer");
const Intern = require ("./lib/Intern");
const Manager = require ("./lib/Manager");

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
        type: "list",
        message: "Would you like to add additional team members?",
        choices: [
            "Yes",
            "No"
        ],
        name: "additionalMembers"
    }])
    .then(function({roleInfo, newMembers}){
        let additionalMembers;
        if (role === "Intern") {
            additionalMembers = new Intern(name, id, email, roleInfo);
        } else if (role === "Manager") {
            additionalMembers = new Manager(name, id, email, roleInfo);
        } else {
            additionalMembers = new Engineer(name, id, email, roleInfo);
        }

    })
    })
};

newMember();