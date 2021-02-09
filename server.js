require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const app = express();

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
        choices: ["View Information", "Add Information", "Update Information", "Delete Information"]
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

    })
    .then({

    })
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