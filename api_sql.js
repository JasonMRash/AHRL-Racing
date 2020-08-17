const actionUpdate = {
    'Licenses':     'UPDATE Licenses SET name = (?), description = (?) WHERE licenseID = (?)',
    'Seasons':      'UPDATE Seasons SET name = (?), description = (?) WHERE seasonID = (?)',
    'Tracks':       'UPDATE Tracks SET name = (?), description = (?) WHERE trackID = (?)',
    'Drivers':      'UPDATE Drivers SET firstName = (?), lastName = (?), birthdate = (?), \
                        licenseID = (?) WHERE driverID = (?)',
    'Races':        'UPDATE Races SET name = (?), trackID = (?), \
                        raceDate = (?), seasonID = (?) WHERE raceID = (?)',
    'RaceResults':  'UPDATE RaceResults SET finishTime = (?) WHERE raceID = (?) AND driverID = (?)'
};

const actionDelete = {
    'Licenses':     'DELETE FROM Licenses WHERE licenseID = (?)',
    'Seasons':      'DELETE FROM Seasons WHERE seasonID = (?)',
    'Tracks':       'DELETE FROM Tracks WHERE trackID = (?)',
    'Drivers':      'DELETE FROM Drivers WHERE driverID = (?)',
    'Races':        'DELETE FROM Races WHERE raceID = (?)',
    'RaceResults':  'DELETE FROM RaceResults WHERE raceID = (?) AND driverID = (?)'
};

const actionInsert = {
    'Licenses':     'INSERT INTO Licenses (name, description) VALUES (?, ?)',
    'Seasons':      'INSERT INTO Seasons (name, description) VALUES (?, ?)',
    'Tracks':       'INSERT INTO Tracks (name, description) VALUES (?, ?)',
    'Drivers':      'INSERT INTO Drivers (firstName, lastName, birthdate, licenseID) VALUES (?, ?, ?, ?)',
    'Races':        'INSERT INTO Races (name, trackID, raceDate, seasonID) VALUES (?, ?, ?, ?)',
    'RaceResults':  'INSERT INTO RaceResults (raceID, driverID, finishTime) VALUES (?, ?, ?)'
};

const actionSelect = {
    'Licenses':     'SELECT * FROM Licenses WHERE licenseID = (?) OR (?) != "APPLY_FILTER"',
    'Seasons':      'SELECT * FROM Seasons WHERE seasonID = (?) OR (?) != "APPLY_FILTER"',
    'Tracks':       'SELECT * FROM Tracks WHERE trackID = (?) OR (?) != "APPLY_FILTER"',
    'Drivers':      'SELECT driverID, firstName, lastName, birthdate, \
                        name as licenseName, Licenses.licenseID \
                        FROM Drivers LEFT OUTER JOIN Licenses \
                        ON Drivers.licenseID = Licenses.licenseID \
                        WHERE driverID = (?) OR (?) != "APPLY_FILTER"',
    'Races':        'SELECT raceID, Races.name as raceName, Tracks.name as trackName, \
                        Tracks.trackID as trackID, raceDate, Seasons.seasonID as seasonID, \
                        Seasons.name as seasonName \
                        FROM Races INNER JOIN Tracks ON Races.trackID = Tracks.trackID \
                        INNER JOIN Seasons ON Races.seasonID = Seasons.seasonID \
                        WHERE raceID = (?) OR (?) != "APPLY_FILTER"',
    'RaceResults':  'SELECT Races.name as raceName, Races.raceID as raceID, \
                        Drivers.driverID as driverID, firstName, lastName, finishTime \
                        FROM RaceResults INNER JOIN Races ON RaceResults.raceID = Races.raceID \
                        INNER JOIN Drivers ON RaceResults.driverID = Drivers.driverID \
                        WHERE (Races.raceID = (?) OR (?) != "APPLY_FILTER") \
                        AND (Drivers.driverID = (?) OR (?) != "APPLY_FILTER")'
}

module.exports = {
    actionUpdate, actionDelete, actionInsert, actionSelect
};
