// CS340 AHRL
// Jason Rash & Grigori Barbachov
// Drivers Page Javascript

baseURL ='https://ahrl-backend.herokuapp.com'

document.addEventListener("DOMContentLoaded", start);

function start() {
  document.getElementById('addRace').addEventListener('click', addRace);
  document.getElementById('updateRace').addEventListener('click', updateRace);
  document.getElementById('deleteRace').addEventListener('click', deleteRace);
  populateRacesTable(); // create table of drivers names
  loadTrackDropdowns();
  loadSeasonDropdowns();
};

function makeCell(contents) {
  var bodyCell = document.createElement("td");
  var textCell = document.createTextNode(contents);
  bodyCell.append(textCell);
  return bodyCell;
};

function makeRaceRow(rowData) {
  let bodyRow = document.createElement("tr");
  bodyRow.id = rowData.raceID;
  console.log(rowData.raceName);
  let raceName = makeCell(rowData.raceName);
  bodyRow.append(raceName);
  bodyRow.onclick = function(){
    loadRaceInfo(bodyRow.id);
  }
  return bodyRow;
};

function makeRacesTable(rows){
  console.log(rows);
  let tableRows = document.getElementById("raceNameTable");
  for(let i=0; i<rows.length; i++){
    console.log(rows[i]);
    tableRows.append(makeRaceRow(rows[i]));
  }
};

function makeRacesInfo(rows){
  let raceID = rows[0].raceID;
  let raceName = rows[0].raceName;
  let trackID = rows[0].trackID;
  let trackName = rows[0].trackName;
  let raceDate = rows[0].raceDate;
  raceDate = raceDate.substring(0,10);
  let seasonID = rows[0].seasonID;
  let seasonName = rows[0].seasonName;
  console.log(raceID);

  document.getElementById("raceID").textContent = raceID;
  document.getElementById("raceName").textContent = raceName;
  document.getElementById("raceTrackID").textContent = trackID;
  document.getElementById("raceTrackName").textContent = trackName;
  document.getElementById("raceDate").textContent = raceDate;
  document.getElementById("raceSeasonID").textContent = seasonID;
  document.getElementById("raceSeasonName").textContent = seasonName;
};

function deleteRacesTable(){
  let table = document.getElementById("raceNameTable");
  while (table.hasChildNodes()){
    table.removeChild(table.lastChild);
  }
};

function deleteDropdowns(){
  let insertTrack = document.getElementById("insertTrack");
  let updateTrack = document.getElementById("updateTrack");
  let insertSeason = document.getElementById("insertSeason");
  let updateSeason = document.getElementById("updateSeason");
  while (insertTrack.hasChildNodes()){
    insertTrack.removeChild(insertTrack.lastChild);
  }
  while(updateTrack.hasChildNodes()){
    updateTrack.removeChild(updateTrack.lastChild);
  }
  while (insertSeason.hasChildNodes()){
    insertSeason.removeChild(insertSeason.lastChild);
  }
  while(updateSeason.hasChildNodes()){
    updateSeason.removeChild(updateSeason.lastChild);
  }
}

function populateRacesTable(){
  const req = new XMLHttpRequest();
  const action = 'actionSelect';
  const table= 'Races';
  const params = ['','']
  const body = {"action": action, "table":table, "params":params};

  req.open('POST', baseURL + "/api", true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', async function(){
    if(req.status >= 200 && req.responseText){
      let response = await JSON.parse(req.responseText);
      console.log(response);
      deleteRacesTable();
      makeRacesTable(response);
      loadRaceInfo(response[0].raceID)
      return response;
    }
  })
    let context = {}
    context = JSON.stringify(body);
    req.send(context);
};

function createBlankOption(){
  let option = document.createElement("option");
  option.textContent = "N/A";
  option.value = "null";
  return option;
}

function loadTrackDropdowns(){
  const req = new XMLHttpRequest();
  const action = 'actionSelect';
  const table = 'Tracks';
  const params = ['',''];
  
  const body = {"action":action, "table":table, "params":params};
  req.open('POST', baseURL + "/api", true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function(){
    if(req.status >= 200 && req.responseText){
      let response = JSON.parse(req.responseText);
      console.log(response);

      let trackDropdownInsert = document.getElementById("insertTrack");
      let trackDropdownUpdate = document.getElementById("updateTrack");      

      for (i=0;i<response.length;i++){
        let optionInsert = document.createElement("option");
        let optionUpdate = document.createElement("option");

        optionInsert.textContent = response[i].name;
        optionUpdate.textContent = response[i].name;

        optionInsert.value = response[i].trackID;
        optionUpdate.value = response[i].trackID;

        console.log(optionInsert);

        trackDropdownInsert.append(optionInsert);
        trackDropdownUpdate.append(optionUpdate);
      }
    }
  })
    let context = {}
    context = JSON.stringify(body);
    req.send(context);
};

function loadSeasonDropdowns(){
  const req = new XMLHttpRequest();
  const action = 'actionSelect';
  const table = 'Seasons';
  const params = ['',''];
  
  const body = {"action":action, "table":table, "params":params};
  req.open('POST', baseURL + "/api", true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function(){
    if(req.status >= 200 && req.responseText){
      let response = JSON.parse(req.responseText);
      console.log(response);

      let seasonDropdownInsert = document.getElementById("insertSeason");
      let seasonDropdownUpdate = document.getElementById("updateSeason");

      for (i=0;i<response.length;i++){
        let optionInsert = document.createElement("option");
        let optionUpdate = document.createElement("option");

        optionInsert.textContent = response[i].name;
        optionUpdate.textContent = response[i].name;

        optionInsert.value = response[i].seasonID;
        optionUpdate.value = response[i].seasonID;

        seasonDropdownInsert.append(optionInsert);
        seasonDropdownUpdate.append(optionUpdate);
      }
    }
  })
    let context = {}
    context = JSON.stringify(body);
    req.send(context);
};

function loadUpdateRace(rows){
  console.log(rows);
  let raceName = rows[0].raceName;
  let trackID = rows[0].trackID;
  let raceDate = rows[0].raceDate;
  let seasonID = rows[0].seasonID;
  raceDate = raceDate.substring(0,10);
  // licenseDropdownUpdate already loaded

  document.getElementById('updateRaceName').value = raceName;
  document.getElementById('updateRaceDate').value = raceDate;
  let trackDropdown = document.getElementById('updateTrack');
  console.log(trackDropdown.options.length);
  for (let i = 0; i<trackDropdown.options.length; i++){
    if (trackDropdown.options[i].value == trackID){
      trackDropdown.options[i].selected = true;
    }
    else{
      trackDropdown.options[i].selected = false;
    }
  }
  let seasonDropdown = document.getElementById('updateSeason');
  console.log(seasonDropdown.options.length);
  for (let i = 0; i<seasonDropdown.options.length; i++){
    if (seasonDropdown.options[i].value == seasonID){
      seasonDropdown.options[i].selected = true;
    }
    else{
      seasonDropdown.options[i].selected = false;
    }
  }
}
function loadRaceInfo(raceID){
  const req = new XMLHttpRequest();
  const action = 'actionSelect';
  const table = 'Races';
  const params =[raceID, 'APPLY_FILTER'];
  const body = {"action":action, "table":table, "params":params};
  req.open('POST', baseURL + "/api", true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function(){
    if(req.status >= 200 && req.responseText){
      let response = JSON.parse(req.responseText);
      console.log(response);
      makeRacesInfo(response);
      loadUpdateRace(response);
    }
  })
    let context = {}
    context = JSON.stringify(body);
    console.log(context);
    req.send(context);
};

function addRace() {
    const req = new XMLHttpRequest();
    const action = "actionInsert";
    const table = "Races";
    const raceName = document.getElementById('insertRaceName').value;
    const trackID = document.getElementById('insertTrack').value;
    const raceDate = document.getElementById('insertRaceDate').value;
    const seasonID = document.getElementById('insertSeason').value;

  let alertString ="";
  let validation = true;
  if (!raceName){
    alertString += "Race Name ";
    validation = false;
  }
  if (!trackID){
    alertString += "Track Name ";
    validation = false;
  }
  if (!raceDate){
    alertString += "Race Date ";
    validation = false;
  }
  if (!seasonID){
    alertString += "Season Name ";
    validation = false;
  }
  if (!validation){
    return alert(alertString + "field(s) required.")
  }
  $('#addRaceModal').modal('hide'); // from Bootstrap Modal documentation
    const params=[raceName, trackID, raceDate, seasonID];

    const body = {"action":action, "table":table, "params":params};
    req.open('POST', baseURL + "/api", true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = req.responseText;
        console.log(response);
        const initialLoad = false;
        populateRacesTable(initialLoad);
      }
      else {
        console.log("Error in network request: " + req.statusText);
      }
    })
    let context = {}
    context = JSON.stringify(body);
    req.send(context);
    event.preventDefault();
};

function updateRace(){
  const req = new XMLHttpRequest();
  const action = "actionUpdate";
  const table = "Races";
  const raceID = document.getElementById('raceID').textContent;
  const raceName = document.getElementById('updateRaceName').value;
  let trackID = document.getElementById('updateTrack').value;
  const raceDate = document.getElementById('updateRaceDate').value;
  let seasonID = document.getElementById('updateSeason').value;

  let alertString ="";
  let validation = true;
  if (!raceName){
    alertString += "Race Name ";
    validation = false;
  }
  if (!trackID){
    alertString += "Track Name ";
    validation = false;
  }
  if (!raceDate){
    alertString += "Race Date ";
    validation = false;
  }
  if (!seasonID){
    alertString += "Season Name ";
    validation = false;
  }
  if (!validation){
    return alert(alertString + "field(s) required.")
  }
  $('#updateRaceModal').modal('hide'); // from Bootstrap Modal documentation
  const params = [raceName, trackID, raceDate, seasonID, raceID]
  const body = {"action":action, "table":table, "params":params};

  req.open('POST', baseURL + "/api", true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
    var response = req.responseText;
    console.log(response);
    const initialLoad = false;
    populateRacesTable(initialLoad);
    loadDriverInfo(driverID);
    }
    else {
      console.log("Error in network request: " + req.statusText);
    }
  })
  let context = {}
  context = JSON.stringify(body);
  req.send(context);
  event.preventDefault();
};

function deleteRace(){
  const req = new XMLHttpRequest();
  const action = "actionDelete";
  const table = "Races";
  const raceID = document.getElementById('raceID').textContent;
  console.log("delete this drivers ID #"+ raceID);
  const params = [raceID];
  const body = {"action":action, "table":table, "params":params};
  console.log(body);
  req.open('POST', baseURL + "/api", true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
    var response = req.responseText;
    console.log(response);
    const initialLoad = false;
    populateRacesTable(initialLoad);
    if(raceID == ""){
      loadDriverInfo(response[0].driverID);
    }
    }
    else {
      console.log("Error in network request: " + req.statusText);
    }
  })
  let context = {}
  context = JSON.stringify(body);
  req.send(context);
  event.preventDefault();
}
