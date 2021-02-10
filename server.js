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
        choices: ["View All Employees", 
        "View Employees by Department", 
        "View Employees by Role/Position", 
        // "View Employees by Manager", 
        // "View the Total Utilized Budget of a Department", 
        "Go back"]
    })
    .then(answer => {
        if (answer.view === "View All Employees"){
            var query = `
                SELECT a.id, a.first_name, a.last_name, role.title, role.salary, department.department_name, m.first_name, m.last_name 
                FROM employee a
                LEFT JOIN role ON a.role_id = role.id 
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee m ON a.manager_id = m.id
            `;
            connection.query(query, function(err, res) {
                if (err) throw err;
                console.table(res);
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
                .then(answer => {    
                    var query = `
                    SELECT a.id, a.first_name, a.last_name, role.title, role.salary, department.department_name, m.first_name, m.last_name 
                    FROM employee a
                    LEFT JOIN role ON a.role_id = role.id 
                    LEFT JOIN department ON role.department_id = department.id
                    LEFT JOIN employee m ON a.manager_id = m.id
                    WHERE ?
                    `;
                    connection.query(query, { department_name : answer.dept }, function(err, res) {
                        if (err) throw err;
                        console.log(cTable.getTable(res));
                        employeeSearch();
                    });
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
                .then(answer => {  
                    var query = `
                    SELECT a.id, a.first_name, a.last_name, role.title, role.salary, department.department_name, m.first_name, m.last_name 
                    FROM employee a
                    LEFT JOIN role ON a.role_id = role.id 
                    LEFT JOIN department ON role.department_id = department.id
                    LEFT JOIN employee m ON a.manager_id = m.id
                    WHERE ?
                    `;
                    connection.query(query, { title : answer.role }, function(err, res) {
                        if (err) throw err;
                        console.log(cTable.getTable(res));
                        employeeSearch();
                    });
                });
            }
        // } else if (answer.view === "View Employees by Manager"){
        //     managers = //tie in to the manager? variable//
        //     function viewEmpMngr () {
        //         inquirer
        //         .prompt ({
        //             name: "manager",
        //             type: "list",
        //             message: "Which manager?",
        //             choices: [`${managers}`]
        //         })
        //             var query = `
        //             SELECT employee.id, first_name, last_name, title, salary, department_name 
        //             FROM employee 
        //             INNER JOIN role ON (employee.role_id = role.id) 
        //             INNER JOIN department ON (role.department_id = department.id)
        //             WHERE ?
        //         `;
        //         connection.query(query, { manager_name? : answer.manager }, function(err, res) {
        //             if (err) throw err;
        //             console.log(cTable.getTable(res));
        //             employeeSearch();
        //         });
        //     }

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
        name: "add",
        type: "list",
        message: "What would you like to add?",
        choices: ["A New Department", "A New Role/Position", "A New Employee", "Go back"]
    })
    .then(answer => {
        if (answer.add === "A New Department"){
            inquirer
            .prompt({
                name: "department_name",
                type: "input",
                message: "What is the name of the department you want to add?"
            })
            .then(answer => {
                var query = 'INSERT INTO department SET ?';
                connection.query(query, {department_name: answer.department_name}, function(err, res) {
                    if (err) throw err;
                    console.log("The folowing department has been added\n" + res.affectedRows);
                    employeeSearch();
                });
            });
        } else if (answer.add === "A New Role/Position"){
            inquirer
            .prompt({
                name: "title",
                type: "input",
                message: "What is the name of the role/position you want to add?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary for this role/position?"
            },
            {
                name: "department",
                type: "list",
                message: "What department is this role positioned in?",
                choices: ["${departments}"]
            })
            .then(answer => {
                var query = 'INSERT INTO role SET ?';
                connection.query(query, {
                    title: answer.title,
                    salary: answer.salary,
                    // department_id: answer.department
                }, function(err, res) {
                    if (err) throw err;
                    console.log("The folowing role has been added\n" + res.affectedRows);
                    employeeSearch();
                });
            });
        } else if (answer.add === "A New Employee"){
            inquirer
            .prompt({
                name: "first_name",
                type: "input",
                message: "What is the first name of the employee you want to add?"
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the last name?"
            },
            {
                name: "role",
                type: "list",
                message: "What is this employee's role?",
                choices: ["${roles}"]
            },
            {
                name: "manager",
                type: "list",
                message: "Does this employee have a manager??",
                choices: ["Yes", "No"]
            })
            .then(answer => {                
                if (answer.manager === "Yes"){
                    employees = //tie in to the names of the employees in the employee table//
                    function addMngr(){
                        inquirer
                        .prompt({
                            name: "mngr",
                            type: "list",
                            message: "Who is this employee's manager?",
                            choices: ["${employees}"]
                        })
                        .then(answer => {
                            var query = 'INSERT INTO employee SET ?';
                            connection.query(query, {
                                first_name: answer.first_name,
                                last_name: answer.last_name,
                                // role_id: answer.role
                                //manager_id: answer.mngr
                            }, function(err, res) {
                                if (err) throw err;
                                console.log("The folowing employee has been added\n" + res.affectedRows);
                                employeeSearch();
                            });
                        })
                    };
                } else {
                    var query = 'INSERT INTO employee SET ?';
                    connection.query(query, {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        // role_id: answer.role
                        //manager_id: null
                    }, function(err, res) {
                        if (err) throw err;
                        console.log("The folowing employee has been added\n" + res.affectedRows);
                        employeeSearch();
                    });
                };
            }); 
        } else {
            employeeSearch();
        };
    });
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