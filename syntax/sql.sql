
CREATE DATABASE testDB;

DROP DATABASE testDB;

CREATE TABLE Persons (
    PersonID int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
);

SELECT * FROM Customers
WHERE Country='Test'; 

INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
