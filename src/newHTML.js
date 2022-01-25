const path = require("path");
const fs = require("fs");

const templateDir = path.resolve(__dirname, "../template");

const newHTML = employees => {
    const html = [];

    // Order the roles: 1-Manager, 2-Engineers, 3-Interns

    html.push(...employees
        .filter(employee => employee.getRole() === "Manager")
        .map(manager => renderManager(manager))
        );
    html.push(...employees
        .filter(employee => employee.getRole() === "Engineer")
        .map(engineer => renderEngineer(engineer))
        );
    html.push(...employees
        .filter(employee => employee.getRole() === "Intern")
        .map(intern => renderIntern(intern))
        );
    return renderHTML(html.join(""));
};
// Render Manager info
const renderManager = manager => {
    let template = fs.readFileSync(path.resolve(templateDir, "Manager.html"), "utf8");
    template = replaceTemplates(template, "name", manager.getName());
    template = replaceTemplates(template, "role", manager.getRole());
    template = replaceTemplates(template, "email", manager.getEmail());
    template = replaceTemplates(template, "id", manager.getId());
    template = replaceTemplates(template, "officeNumber", manager.getOfficeNumber());
    return template;
}
// Render Engineer info
const renderEngineer = engineer => {
    let template = fs.readFileSync(path.resolve(templateDir, "Engineer.html"), "utf8");
    template = replaceTemplates(template, "name", engineer.getName());
    template = replaceTemplates(template, "role", engineer.getRole());
    template = replaceTemplates(template, "email", engineer.getEmail());
    template = replaceTemplates(template, "id", engineer.getId());
    template = replaceTemplates(template, "github", engineer.getGithub());
    return template;
}// Render Intern info
const renderIntern = intern => {
    let template = fs.readFileSync(path.resolve(templateDir, "Intern.html"), "utf8");
    template = replaceTemplates(template, "name", intern.getName());
    template = replaceTemplates(template, "role", intern.getRole());
    template = replaceTemplates(template, "email", intern.getEmail());
    template = replaceTemplates(template, "id", intern.getId());
    template = replaceTemplates(template, "school", intern.getSchool());
    return template;
}

const renderHTML = html => {
    let template = fs.readFileSync(path.resolve(templateDir, "index.html"), "utf8");
    return replaceTemplates(template, "team", html);
};

const replaceTemplates = (template, placeholder, value) => {
    const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
    return template.replace(pattern, value);
}

module.exports = newHTML