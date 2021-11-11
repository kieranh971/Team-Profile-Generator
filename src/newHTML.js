// Generates Manager section
const newManager = function(Manager) {
    return 
    `
        <div class="col-6">
            <div class="card mx-auto" style="width: 18rem">
                <h5 class="card-header">${Manager.name}<br /><br />Role</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${Manager.id}</li>
                    <li class="list-group-item">${Manager.email}</li>
                    <li class="list-group-item">${Manager.officeNumber}</li>
                </ul>
            </div>
        </div>
    `;
}

// Generates Engineer section
const newEngineer = function(Engineer) {
    return 
    `
        <div class="col-6">
            <div class="card mx-auto" style="width: 18rem">
                <h5 class="card-header">${Engineer.name}<br /><br />Role</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${Engineer.id}</li>
                    <li class="list-group-item">${Engineer.email}</li>
                    <li class="list-group-item">${Engineer.officeNumber}</li>
                </ul>
            </div>
        </div>
    `;
}

// Generates Intern section
const newIntern = function(Intern) {
    return 
    `
        <div class="col-6">
            <div class="card mx-auto" style="width: 18rem">
                <h5 class="card-header">${Intern.name}<br /><br />Role</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${Intern.id}</li>
                    <li class="list-group-item">${Intern.email}</li>
                    <li class="list-group-item">${Intern.officeNumber}</li>
                </ul>
            </div>
        </div>
    `;
}

newHTML = (data) => {
    // empty array for sections
    htmlArray = [];

    for (let i=0; i<data.length; i++) {
        const newEmployee = data[i];
        const employeeRole = newEmployee.getRole();

        if (role === "Manager") {
            const managerSection = newManager(newEmployee);
            htmlArray.push(managerSection);
        }
        if (role === "Engineer") {
            const engineerSection = newEngineer(newEmployee);
            htmlArray.push(engineerSection);
        }
        if (role === "Intern") {
            const internSection = newIntern(newEmployee);
            htmlArray.push(internSection);
        }
    }
    const allEmployees = htmlArray.join('');
    const newTeam = generateTeam(allEmployees);
    return newTeam;
}

const generateTeam = function (allEmployees) {
    return 
    `
    <!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Template Profile</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
        </nav>
        <div class="container">
            <div class="row">
            ${allEmployees}
            </div>
        </div>
        
    </body>
    `
}

module.exports = newHTML;