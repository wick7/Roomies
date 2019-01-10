/*

To run this file, we do the following in our Terminal:

1. Go to the directory of this sql file.

2. Get into our mysql console.

3. Run "source schema.sql"

*/

-- Create the database movie_planner_db and specified it for use.
-- CREATE DATABASE movie_planner_db;
-- USE movie_planner_db;

-- -- Create the table plans.
-- CREATE TABLE movies
-- (
-- id int NOT NULL AUTO_INCREMENT,
-- movie varchar(255) NOT NULL,
-- PRIMARY KEY (id)
-- );

-- -- Insert a set of records.
-- INSERT INTO movies (movie) VALUES ('Rush Hour 2');


CREATE DATABASE roomies_db;
USE roomies_db;

-- Create the table plans.
CREATE TABLE users
(
id int NOT NULL AUTO_INCREMENT,
firstName varchar(45) NOT NULL,
lastName varchar(45) NOT NULL,
phone varchar (15) NOT NULL,
email varchar(45) NOT NULL,
PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO users (firstName, lastName, phone, email) VALUES ('Craig', 'Wickersham', '000-000-0000', 'email@email.com' );