# AHRL-Racing
https://ahrl-racing.herokuapp.com/
Project by Grigori Barbachov & Jason Rash

## Project Outline
Amateur Hour Racing League (AHRL) is a 17 year old amateur racing league for beginner to intermediate level drivers that currently holds 30 races per year at 8 different tracks with between 40 and 60 drivers per race weekend. Last year 158 different drivers participated in one or more races. Our database driven website will allow users to search and display information on who the Drivers are, what License they hold, and Race Results of any Races they were in.

## Backend Overview
All backend API calls are made via a POST request to a single endpoint <api URL>/api. Each call expects a JSON object with three parameters - action, table and params. API returns a JSON object with requested rows from the database.

|action|table|params[] * important to be in the the order listed|
|---|---|---|
|actionUpdate|Licenses|name, description, *licenseID|
|actionUpdate|Seasons|name, description, *seasonID|
|actionUpdate|Tracks|name, description, *trackID|
|actionUpdate|Drivers|firstName, lastName, birthdate, licenseID, *driverID|
|actionUpdate|Races|name, trackID, raceDate, seasonID, *raceID|
|actionUpdate|RaceResults|finishTime, *raceID, *driverID|
|actionInsert|Licenses|name, description|
|actionInsert|Seasons|name, description|
|actionInsert|Tracks|name, description|
|actionInsert|Drivers|firstName, lastName, birthdate, licenseID|
|actionInsert|Races|name, trackID, raceDate, seasonID|
|actionInsert|RaceResults|finishTime, *raceID, *driverID|
|actionDelete|Licenses|*licenseID|
|actionDelete|Seasons|*seasonID|
|actionDelete|Tracks|*trackID|
|actionDelete|Drivers|*driverID|
|actionDelete|Races|*raceID|
|actionDelete|RaceResults|*raceID, *driverID|
|actionSelect|Licenses|*licenseID, 'APPLY_FILTER'|
|actionSelect|Seasons|*seasonID, 'APPLY_FILTER'|
|actionSelect|Tracks|*trackID, 'APPLY_FILTER'|
|actionSelect|Drivers|*driverID, 'APPLY_FILTER'|
|actionSelect|Races|*raceID, 'APPLY_FILTER'|
|actionSelect|RaceResults|*raceID, 'APPLY_FILTER', *driverID, 'APPLY_FILTER'|
