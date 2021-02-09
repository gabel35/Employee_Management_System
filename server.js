require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.PASSWORD,
    database: 'institutional_db',
});

connection.connect(function(err) {
    if (err) throw err;
    employeeSearch();
});

function employeeSearch() {
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Information", "Add Information", "Update Information", "Delete Information", "Exit"]
    })
    .then(answer => {
        if (answer.action === "View Information"){
            viewInfo();
        } else if (answer.action === "Add Information"){
            addInfo();
        } else if (answer.action === "Update Information"){
            updateInfo();
        } else if (answer.action === "Delete Information"){
            deleteInfo();
        } else {
            connection.end();
        }
    });
};

function viewInfo(){
    inquirer
    .prompt({
        name: "view",
        type: "list",
        message: "What would you like to view?",
        choices: ["View All Employees", "View Employees by Department", "View Employees by Role/Position", "View Employees by Manager", "View the Total Utilized Budget of a Department", "Go back"]
    })
    .then(answer => {
        if (answer.view === "View All Employees"){
            var query = `
                SELECT employee.id, first_name, last_name, title, salary, department.department_name 
                FROM employee 
                INNER JOIN role ON (employee.role_id = role.id) 
                INNER JOIN department ON (role.department_id = department.id)
            `;
            connection.query(query, function(err, res) {
                if (err) throw err;
                console.log(cTable.getTable(res));
                employeeSearch();
            });
        } else if (answer.view === "View Employees by Department"){
            departments = //tie in to the department_name variable//
            function viewEmpDept () {
                inquirer
                .prompt ({
                    name: "dept",
                    type: "list",
                    message: "Which department?",
                    choices: [`${departments}`]
                })
                    var query = `
                    SELECT employee.id, first_name, last_name, title, salary, department_name 
                    FROM employee 
                    INNER JOIN role ON (employee.role_id = role.id) 
                    INNER JOIN department ON (role.department_id = department.id)
                    WHERE ?
                `;
                connection.query(query, { department_name : answer.dept }, function(err, res) {
                    if (err) throw err;
                    console.log(cTable.getTable(res));
                    employeeSearch();
                });
            }
        } else if (answer.view === "View Employees by Role/Position"){
            roles = //tie in to the title variable//
            function viewEmpRole () {
                inquirer
                .prompt ({
                    name: "role",
                    type: "list",
                    message: "Which role/position?",
                    choices: [`${roles}`]
                })
                    var query = `
                    SELECT employee.id, first_name, last_name, title, salary, department_name 
                    FROM employee 
                    INNER JOIN role ON (employee.role_id = role.id) 
                    INNER JOIN department ON (role.department_id = department.id)
                    WHERE ?
                `;
                connection.query(query, { title : answer.role }, function(err, res) {
                    if (err) throw err;
                    console.log(cTable.getTable(res));
                    employeeSearch();
                });
            }
        } else if (answer.view === "View Employees by Manager"){
            managers = //tie in to the manager? variable//
            function viewEmpMngr () {
                inquirer
                .prompt ({
                    name: "manager",
                    type: "list",
                    message: "Which manager?",
                    choices: [`${managers}`]
                })
                    var query = `
                    SELECT employee.id, first_name, last_name, title, salary, department_name 
                    FROM employee 
                    INNER JOIN role ON (employee.role_id = role.id) 
                    INNER JOIN department ON (role.department_id = department.id)
                    WHERE ?
                `;
                connection.query(query, { manager_name? : answer.manager }, function(err, res) {
                    if (err) throw err;
                    console.log(cTable.getTable(res));
                    employeeSearch();
                });
            }
            
        // } else if (answer.view === "View the Total Utilized Budget of a Department"){
        //     departments = //tie in to the department_name variable//
        //     function viewEmpDept () {
        //         inquirer
        //         .prompt ({
        //             name: "dept",
        //             type: "list",
        //             message: "Which department?",
        //             choices: [`${departments}`]
        //         })
        //             var query = `
        //             SELECT employee.id, first_name, last_name, title, salary, department_name 
        //             FROM employee 
        //             INNER JOIN role ON (employee.role_id = role.id) 
        //             INNER JOIN department ON (role.department_id = department.id)
        //             WHERE ?
        //         `;
        //         connection.query(query, { department_name : answer.dept }, function(err, res) {
        //             if (err) throw err;
        //             console.log(cTable.getTable(res));
        //             employeeSearch();
        //         });
        //     }
        } else {
            employeeSearch();
        }
    });
}

function addInfo(){
    inquirer
    .prompt({

    })
    .then({
        
    })
}

function updateInfo(){
    inquirer
    .prompt({

    })
    .then({
        
    })
}

function deleteInfo(){
    inquirer
    .prompt({

    })
    .then({
        
    })
}