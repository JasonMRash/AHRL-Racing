-- **********************************************************
-- Course: CS340 - Introduction to Databases
-- Group #17 - It's My Money, and I Want It Now!
-- Team Members: Jason Rash, Grigori Barbachov
-- DML SQL STATEMENTS
-- **********************************************************

-- **********************************************************
-- CRUD Queries for Screen and Table: Licenses
-- **********************************************************
INSERT INTO Licenses (name, description) VALUES (?, ?);

SELECT * FROM Licenses WHERE licenseID = (?) OR (?) != "APPLY_FILTER";
 
UPDATE Licenses SET name = (?), description = (?) WHERE licenseID = (?);

DELETE FROM Licenses WHERE licenseID = (?);

-- **********************************************************
-- CRUD Queries for Screen and Table: Seasons
-- **********************************************************
INSERT INTO Seasons (name, description) VALUES (?, ?);

SELECT * FROM Seasons WHERE seasonID = (?) OR (?) != "APPLY_FILTER";

UPDATE Seasons SET name = (?), description = (?) WHERE seasonID = (?);

DELETE FROM Seasons WHERE seasonID = (?);

-- **********************************************************
-- CRUD Queries for Screen and Table: Tracks
-- **********************************************************
INSERT INTO Tracks (name, description) VALUES (?, ?);
    
SELECT * FROM Tracks WHERE trackID = (?) OR (?) != "APPLY_FILTER";

UPDATE Tracks SET name = (?), description = (?) WHERE trackID = (?);

DELETE FROM Tracks WHERE trackID = (?);

-- **********************************************************
-- CRUD Queries for Screen and Table: Drivers
-- **********************************************************
INSERT INTO Drivers (firstName, lastName, birthdate, licenseID) VALUES (?, ?, ?, ?);

SELECT driverID, firstName, lastName, birthdate,
    name as licenseName, Licenses.licenseID
    FROM Drivers LEFT OUTER JOIN Licenses
    ON Drivers.licenseID = Licenses.licenseID
    WHERE driverID = (?) OR (?) != "APPLY_FILTER";

UPDATE Drivers
SET firstName = (?), lastName = (?), birthdate = (?), licenseID = (?)
WHERE driverID = (?);

DELETE FROM Drivers WHERE driverID = (?);

-- **********************************************************
-- CRUD Queries for Screen and Table: Races
-- **********************************************************
INSERT INTO Races (name, trackID, raceDate, seasonID) VALUES (?, ?, ?, ?);

SELECT raceID, Races.name as raceName, Tracks.name as trackName,
    Tracks.trackID as trackID, raceDate, Seasons.seasonID as seasonID,
    Seasons.name as seasonName
    FROM Races INNER JOIN Tracks ON Races.trackID = Tracks.trackID
    INNER JOIN Seasons ON Races.seasonID = Seasons.seasonID
    WHERE raceID = (?) OR (?) != "APPLY_FILTER";

UPDATE Races
SET name = (?), trackID = (?), raceDate = (?), seasonID = (?)
WHERE raceID = (?);

DELETE FROM Races WHERE raceID = (?);

-- **********************************************************
-- CRUD Queries for Screen and Table: RaceResults
-- **********************************************************
INSERT INTO RaceResults (raceID, driverID, finishTime) VALUES (?, ?, ?);

SELECT Races.name as raceName, Races.raceID as raceID,
    Drivers.driverID as driverID, firstName, lastName, finishTime
    FROM RaceResults INNER JOIN Races ON RaceResults.raceID = Races.raceID
    INNER JOIN Drivers ON RaceResults.driverID = Drivers.driverID
    WHERE (Races.raceID = (?) OR (?) != "APPLY_FILTER")
    AND (Drivers.driverID = (?) OR (?) != "APPLY_FILTER");

UPDATE RaceResults 
SET finishTime = (?) 
WHERE raceID = (?) AND driverID = (?);

DELETE FROM RaceResults WHERE raceID = (?) AND driverID = (?);
