-- **********************************************************
-- Course: CS340 - Introduction to Databases
-- Group #17 - It's My Money, and I Want It Now!
-- Team Members: Jason Rash, Grigori Barbachov
-- DDL SQL STATEMENTS + POPULATE DBS WITH INITIAL VALUES
-- **********************************************************

-- **********************************************************
-- Drop Existing Tables
-- **********************************************************
DROP TABLE IF EXISTS RaceResults;
DROP TABLE IF EXISTS Drivers;
DROP TABLE IF EXISTS Races;
DROP TABLE IF EXISTS Tracks;
DROP TABLE IF EXISTS Seasons;
DROP TABLE IF EXISTS Licenses;

-- **********************************************************
-- Create Table Licenses
-- **********************************************************
CREATE TABLE Licenses (
	licenseID int(11) AUTO_INCREMENT NOT NULL,
	name varchar(255) NOT NULL,
	description varchar(255),

	PRIMARY KEY (licenseID)
);

-- **********************************************************
-- Create Table Tracks
-- **********************************************************
CREATE TABLE Tracks (
	trackID int(11) AUTO_INCREMENT NOT NULL,
	name varchar(255) NOT NULL,
	description varchar(255),

	PRIMARY KEY (trackID)
);

-- **********************************************************
-- Create Table Seasons
-- **********************************************************
CREATE TABLE Seasons (
	seasonID int(11) AUTO_INCREMENT NOT NULL,
	name varchar(255) NOT NULL,
	description varchar(255),

	PRIMARY KEY (seasonID)
);

-- **********************************************************
-- Create Table Drivers
-- **********************************************************
CREATE TABLE Drivers (
	driverID int(11) AUTO_INCREMENT NOT NULL,
	firstName varchar(255) NOT NULL,
	lastName varchar(255) NOT NULL,
	birthDate date NOT NULL,
	licenseID int(11),

	PRIMARY KEY (driverID),
	FOREIGN KEY (licenseID) REFERENCES Licenses (licenseID) ON DELETE SET NULL
);

-- **********************************************************
-- Create Table Races
-- **********************************************************
CREATE TABLE Races
(
	raceID int(11) AUTO_INCREMENT NOT NULL,
	name varchar(255) NOT NULL,
	trackID int(11) NOT NULL,
	raceDate date NOT NULL,
	seasonID int(11) NOT NULL,

	PRIMARY KEY (raceID),
	FOREIGN KEY (trackID) REFERENCES Tracks (trackID) ON DELETE NO ACTION,
	FOREIGN KEY (seasonID) REFERENCES Seasons (seasonID) ON DELETE NO ACTION
);

-- **********************************************************
-- Create Table RaceResults
-- **********************************************************
CREATE TABLE RaceResults
(
	raceID int(11) NOT NULL,
	driverID int(11) NOT NULL,
	finishTime time(2) NOT NULL,

	PRIMARY KEY (raceID, driverID),
	FOREIGN KEY (raceID) REFERENCES Races (raceID) ON DELETE CASCADE,
	FOREIGN KEY (driverID) REFERENCES Drivers (driverID) ON DELETE CASCADE
);

-- **********************************************************
-- Populate Table Licenses
-- **********************************************************
LOCK TABLES Licenses WRITE;

INSERT INTO Licenses VALUES
	(1,'Class A', 'Can drive in Class A, B, C, D, & E.'),
  	(2,'Class B', 'Can drive in Class B, C, D, & E.'),
  	(3,'Class C', 'Can drive in Class C, D, & E.'),
  	(4,'Class D', 'Can drive in Class D, & E.'),
  	(5,'Class E', 'Can drive in Class E.');

UNLOCK TABLES;

-- **********************************************************
-- Populate Table Seasons
-- **********************************************************
LOCK TABLES Seasons WRITE;

INSERT INTO Seasons VALUES
	(1, '2019 Group GT3','500 hp to 600 hp cars requiring a Class A license.'),
	(2, '2018 Spec Miata','Mazda Miata race cars that are all built the same requiring Class D license.'),
	(3, '2017 Spec Racer Ford', 'Ford race cars that are all built the same requiring Class C license.'),
	(4, '2018 Formula Mazda', 'Open Wheel race cars with Mazda engines requiring Class B license.'),
	(5, '2019 Amateur Cup', '150hp to 200 hp street cars requring a Class E license.');

UNLOCK TABLES;

-- **********************************************************
-- Populate Table Tracks
-- **********************************************************
LOCK TABLES Tracks WRITE;

INSERT INTO Tracks VALUES
	(1,'Watkins Glen','A 3.4mi Road course in Watkins Glen, New York.'),
	(2,'Sebring','A 3.74 mi Road course in Sebring, Florida.'),
	(3,'Road Atlanta', 'A 2.54 mi Road Course near Braselton, Georgia.'),
	(4,'Laguna Seca', 'A 2.24 mi Road Course near Monterey, California.'),
	(5,'Circuit of the Americas', 'A 3.43 mi Road Course near Austin, Texas.');

UNLOCK TABLES;

-- **********************************************************
-- Populate Table Drivers
-- **********************************************************
LOCK TABLES Drivers WRITE;

INSERT INTO Drivers VALUES
	(1,'Lando', 'Norris', '1994-03-15',1),
	(2,'Niki', 'Lauda', '1968-01-01',2),
	(3,'Carlos', 'Sainz', '1993-02-02',3),
	(4,'George', 'Russell', '1995-03-03',4),
	(5,'Mario', 'Andretti', '1955-04-04',5),
	(6,'Max', 'Verstappen', '1993-06-24',2),
	(7,'Daniel', 'Riccardo', '1985-07-17',1);

UNLOCK TABLES;

-- **********************************************************
-- Populate Table Races
-- **********************************************************
LOCK TABLES Races WRITE;

INSERT INTO Races VALUES
	(1, 'Circuit of the Americas Group GT3 2019', 5, '2019-09-21,', 1),
    (2, 'Watkins Glen Formula Mazda 2018', 1, '2018-05-04', 4),
    (3, 'Laguna Seca Spec Racer Ford 2019', 4, '2019-06-09', 3),
    (4, 'Road Atlanta Formula Mazda 2019', 3, '2019-07-22', 4),
    (5, 'Sebring Amateur Cup 2019', 2, '2019-08-12', 5);

UNLOCK TABLES;

-- **********************************************************
-- Populate Table RaceResults
-- **********************************************************
LOCK TABLES RaceResults WRITE;

INSERT INTO RaceResults VALUES
	(1,1, '1:12:43.23'),
	(1,7, '1:12:37.87'),
    (2,2, '1:04:23.05'),
    (3,3, '0:56:10.95'),
    (4,6, '1:32:21.54'),
    (5,5, '1:18:56.32'),
    (2,4, '1:04:22.97');

UNLOCK TABLES;

-- **********************************************************
-- Verification
-- **********************************************************
describe Licenses;
describe Seasons;
describe Tracks;
describe Drivers;
describe Races;
describe RaceResults;

SELECT * FROM Licenses;
SELECT * FROM Tracks;
SELECt * FROM Seasons;
SELECT * FROM Drivers;
SELECT * FROM Races;
SELECT * FROM RaceResults;
