// CS340 AHRL
// Jason Rash & Grigori Barbachov
// Drivers Page Javascript

baseURL ='https://ahrl-racing.herokuapp.com'

document.addEventListener("DOMContentLoaded", start);

function start() {
  document.getElementById('addRaceResult').addEventListener('click', addRaceResult);
  document.getElementById('updateRaceResult').addEventListener('click', updateRaceResult);
  document.getElementById('filterDriver').addEventListener('change', filterResults);
  document.getElementById('filterRace').addEventListener('change', filterResults);
  document.getElementById('filterRaceCheckbox').addEventListener('change', filterResults);
  document.getElementById('filterDriverCheckbox').addEventListener('change', filterResults);
  populateRaceResultsTable(); // create table of drivers names
  loadRaceDropdown();
  loadDriverDropdown();
};

function makeCell(contents, hidden) {
  var bodyCell = document.createElement("td");
  var textCell = document.createTextNode(contents);
  bodyCell.append(textCell);
  if (hidden){
    bodyCell.style.display = "none";
  }
  return bodyCell;
};

function makeRaceResultsRow(rowData, i) {
  let bodyRow = document.createElement("tr");
  bodyRow.id = i;
  const raceID = makeCell(rowData.raceID, true);
  bodyRow.append(raceID);
  const raceName = makeCell(rowData.raceName, false);
  bodyRow.append(raceName);
  const driverID = makeCell(rowData.driverID, true);
  bodyRow.append(driverID);
  const firstName = makeCell(rowData.firstName, false);
  bodyRow.append(firstName);
  const lastName = makeCell(rowData.lastName, false);
  bodyRow.append(lastName);
  const finishTime = makeCell(rowData.finishTime, false);
  bodyRow.append(finishTime);
  let updateButton = document.createElement("button");
  updateButton.type = "button";
  updateButton.id = "updateRaceModal";
  updateButton.className = "btn btn-silver";
  updateButton.textContent = "Update";
  updateButton.setAttribute("data-toggle", "modal");
  updateButton.setAttribute("data-target", "#updateRaceResultModal");
  updateButton.setAttribute('onclick', "updateModal(this)");
  let updateButtonCell = document.createElement("td");
  updateButtonCell.append(updateButton);
  bodyRow.append(updateButtonCell);
  let deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "btn btn-danger";
  deleteButton.id = "deleteRaceResult";
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute('onclick', "deleteRaceResult(this)");
  let deleteButtonCell = document.createElement("td");
  deleteButtonCell.append(deleteButton);
  bodyRow.append(deleteButtonCell);
  
  return bodyRow;
};

function makeRaceResultsTable(rows){
  console.log(rows);
  let tableRows = document.getElementById("raceResultsTable");
  for(let i=0; i<rows.length; i++){
    console.log(rows[i]);
    tableRows.append(makeRaceResultsRow(rows[i], i+1));
  }
};

function deleteRaceResultsTable(){
  let table = document.getElementById("raceResultsTable");
  while (table.hasChildNodes()){
    table.removeChild(table.lastChild);
  }
};

function loadRaceDropdown(){
  const req = new XMLHttpRequest();
  const action = 'actionSelect';
  const table = 'Races';
  const params = ['',''];
  
  const body = {"action":action, "table":table, "params":params};
  req.open('POST', baseURL + "/api", true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function(){
    if(req.status >= 200 && req.responseText){
      let response = JSON.parse(req.responseText);
      console.log(response);

      let filterRaceDropdown = document.getElementById("filterRace");
      let insertRaceDropdown = document.getElementById("insertRace");
      for (i=0;i<response.length;i++){
        let filterOption = document.createElement("option");
        let insertOption = document.createElement("option");
        filterOption.textContent = response[i].raceName;
        insertOption.textContent = response[i].raceName;
        filterOption.value = response[i].raceID;
        insertOption.value = response[i].raceID;
        filterRaceDropdown.append(filterOption);
        insertRaceDropdown.append(insertOption);
      }
    }
  })
    let context = {}
    context = JSON.stringify(body);
    req.send(context);
};

function loadDriverDropdown(){
  const req = new XMLHttpRequest();
  const action = 'actionSelect';
  const table = 'Drivers';
  const params = ['',''];
  
  const body = {"action":action, "table":table, "params":params};
  req.open('POST', baseURL + "/api", true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function(){
    if(req.status >= 200 && req.responseText){
      let response = JSON.parse(req.responseText);
      console.log(response);

      let filterDriverDropdown = document.getElementById("filterDriver");
      let insertDriverDropdown = document.getElementById("insertDriver");
      for (i=0;i<response.length;i++){
        let filterOption = document.createElement("option");
        filterOption.textContent = response[i].firstName + " " + response[i].lastName;
        filterOption.value = response[i].driverID;
        filterDriverDropdown.append(filterOption);
        let insertOption = document.createElement("option");
        insertOption.textContent = response[i].firstName + " " + response[i].lastName;
        insertOption.value = response[i].driverID;
        insertDriverDropdown.append(insertOption);
      }
    }
  })
    let context = {}
    context = JSON.stringify(body);
    req.send(context);
};

function populateRaceResultsTable(){
  const req = new XMLHttpRequest();
  const action = 'actionSelect';
  const table= 'RaceResults';
  const params = ['','', '','']
  const body = {"action": action, "table":table, "params":params};

  req.open('POST', baseURL + "/api", true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', async function(){
    if(req.status >= 200 && req.responseText){
      let response = await JSON.parse(req.responseText);
      console.log(response);
      deleteRaceResultsTable();
      makeRaceResultsTable(response);
    }
  })
    let context = {}
    context = JSON.stringify(body);
    req.send(context);
};

function addRaceResult() {
    const req = new XMLHttpRequest();
    const action = "actionInsert";
    const table = "RaceResults";
    const raceID = document.getElementById('insertRace').value;
    const driverID = document.getElementById('insertDriver').value;
    const finishTime = document.getElementById('insertFinishTime').value;
    console.log(finishTime);

  let alertString ="";
  let validation = true;
  if (!raceID){
    alertString += "Race Name ";
    validation = false;
  }
  if (!driverID){
    alertString += "Driver Name ";
    validation = false;
  }
  if (!finishTime){
    alertString += "Finish Time ";
    validation = false;
  }
  if (!validation){
    return alert(alertString + "field(s) required.")
  }
  const pattern = RegExp("[0-9]{2}:[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1}.[0-9]{2}");
  if (!pattern.test(finishTime)){
    return alert("Time must be in pattern 00:00:00.00 with max values of 99:59:59.99");
  }
  $('#addRaceResultModal').modal('hide'); // from Bootstrap Modal documentation
    const params=[raceID, driverID, finishTime];

    const body = {"action":action, "table":table, "params":params};
    req.open('POST', baseURL + "/api", true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = req.responseText;
        console.log(response);
        const initialLoad = false;
        populateRaceResultsTable(initialLoad);
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

function updateModal(button){
  const currentRow = button.parentNode.parentNode;
  const raceID = currentRow.firstChild.textContent;
  const raceName = currentRow.firstChild.nextSibling.textContent;
  const driverID = currentRow.firstChild.nextSibling.nextSibling.textContent;
  const driverFirstName = currentRow.firstChild.nextSibling.nextSibling.nextSibling.textContent;
  const driverLastName = currentRow.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.textContent;
  const driverName = driverFirstName + " " + driverLastName;
  let finishTime = currentRow.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.textContent;
  console.log(raceName);
  console.log(driverName);
  console.log(finishTime);
  document.getElementById("updateRace").textContent = raceName;
  document.getElementById("updateRaceID").textContent = raceID;
  document.getElementById("updateDriver").textContent = driverName;
  document.getElementById("updateDriverID").textContent = driverID;
  document.getElementById("updateFinishTime").value = finishTime;
}
function updateRaceResult(){
  
  const req = new XMLHttpRequest();
  const action = "actionUpdate";
  const table = "RaceResults";
  const raceID = document.getElementById("updateRaceID").textContent;
  const driverID = document.getElementById("updateDriverID").textContent;
  const finishTime = document.getElementById("updateFinishTime").value;

  let alertString ="";
  let validation = true;
  if (!raceID){
    alertString += "Race Name ";
    validation = false;
  }
  if (!driverID){
    alertString += "Driver Name ";
    validation = false;
  }
  if (!finishTime){
    alertString += "Finish Time ";
    validation = false;
  }
  if (!validation){
    return alert(alertString + "field(s) required.")
  }
  const pattern = RegExp("[0-9]{2}:[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1}.[0-9]{2}");
  if (!pattern.test(finishTime)){
    return alert("Time must be in pattern 00:00:00.00 with max values of 99:59:59.99");
  }
  $('#updateRaceResultModal').modal('hide'); // from Bootstrap Modal documentation

  const params = [finishTime, raceID, driverID];
  const body = {"action":action, "table":table, "params":params};

  req.open('POST', baseURL + "/api", true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
    var response = req.responseText;
    console.log(response);
    populateRaceResultsTable();
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

function deleteRaceResult(button){
  const req = new XMLHttpRequest();
  const action = "actionDelete";
  const table = "RaceResults";
  const currentRow = button.parentNode.parentNode;
  const raceID = currentRow.firstChild.textContent;
  const driverID = currentRow.firstChild.nextSibling.nextSibling.textContent;
  console.log(raceID);
  console.log(driverID);
  const params = [raceID, driverID];
  const body = {"action":action, "table":table, "params":params};
  console.log(body);
  req.open('POST', baseURL + "/api", true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
    var response = req.responseText;
    console.log(response);
    populateRaceResultsTable();
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

function filterResults(){
  const req = new XMLHttpRequest();
  const action = 'actionSelect';
  const table= 'RaceResults';
  const raceID= document.getElementById('filterRace').value;
  console.log(raceID);
  const filterRaceCheckbox = document.getElementById('filterRaceCheckbox');
  let filterRace = ''
  if (filterRaceCheckbox.checked){
    filterRace = 'APPLY_FILTER';
  }
  const filterDriverCheckbox = document.getElementById('filterDriverCheckbox');
  let filterDriver = ''
  if (filterDriverCheckbox.checked){
    filterDriver = 'APPLY_FILTER';
  }
  const driverID = document.getElementById('filterDriver').value;
  console.log(driverID);
  console.log(raceID+","+filterRace+","+driverID+","+filterDriver);
  const params = [raceID, filterRace, driverID, filterDriver]
  const body = {"action": action, "table":table, "params":params};
  req.open('POST', baseURL + "/api", true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', async function(){
    if(req.status >= 200 && req.responseText){
      let response = await JSON.parse(req.responseText);
      console.log(response);
      deleteRaceResultsTable();
      makeRaceResultsTable(response);
    }
  })
    let context = {}
    context = JSON.stringify(body);
    req.send(context);
}
