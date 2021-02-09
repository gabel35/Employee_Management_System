USE institutional_db;

/* Inserting fake data into tables */
INSERT INTO department (department_name)
VALUES ("Emergency Medicine"), ("Cardiology"), ("Neurology");

INSERT INTO role (title, salary, department_id)
VALUES ("Attending", 120000.00, 1), 
("Attending", 138600.86, 2), 
("Attending", 138600.86, 3), 
("Surgeon", 156800.00, 2), 
("Surgeon", 160230.20, 3), 
("Resident", 96890.10, 1), 
("Resident", 95000.01, 2), 
("Resident", 95000.01, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Alex", "A", 1), 
("Brian", "B", 2), 
("Casey", "C", 3), 
("Damon", "D", 4), 
("Erin", "E", 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Fabian", "F", 6, 1), 
("Gabby", "G", 6, 1), 
("Henry", "H", 6, 1), 
("India", "I", 7, 2), 
("Jose", "J", 7, 2), 
("Kevin", "K", 7, 4), 
("Liliana", "L", 8, 3), 
("Maria", "M", 8, 3), 
("Nidia", "N", 8, 5);
