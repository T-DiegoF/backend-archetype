create database if not exists test;
use test;

start transaction;
CREATE TABLE IF NOT EXISTS  user (
    id int NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    UNIQUE KEY unique_username_idx (username),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS profile (
    id int NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL,
	addressId INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES user(id)
);

CREATE TABLE IF NOT EXISTS address(
    id int NOT NULL AUTO_INCREMENT,
    cityId  INT NOT NULL,
    street VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS country (
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS  city (
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    countryId int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (countryId) REFERENCES country(id)
);

ALTER TABLE profile ADD FOREIGN KEY (addressId) REFERENCES address(id);
ALTER TABLE address ADD FOREIGN KEY (cityId) REFERENCES city(id);
ALTER TABLE city ADD FOREIGN KEY (countryId) REFERENCES country(id);

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

commit;



