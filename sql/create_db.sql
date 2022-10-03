CREATE DATABASE test;
USE test;

CREATE TABLE IF NOT EXISTS Country (
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS City (
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    countryId int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (countryId) REFERENCES Country(id)
);



START TRANSACTION;
INSERT INTO 
	Country(name)
VALUES
	('Argentina'),
	('Brazil'),
    ('Uruguay'),
    ('USA'),
    ('Belgium'),
    ('Australia'),
    ('Japan');

INSERT INTO 
	City(name,countryId)
VALUES
   ('La Plata',1),
   ('Seattle',4),
   ('Tokyo',7),
   ('Perth',6),
   ('New York',4),
   ('Bruselas',5),
   ('Brujas',5),
   ('Sydney',6),
   ('Montevideo',3),
   ('Rio de Janeiro',2),
   ('Sao Pablo',2),
   ('Rosario',1);

COMMIT;