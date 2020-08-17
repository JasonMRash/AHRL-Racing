// CS340 AHRL
// Jason Rash & Grigori Barbachov
// Drivers Page Javascript

baseURL ='https://ahrl-racing.herokuapp.com';

document.addEventListener("DOMContentLoaded", start);

function start() {
  document.getElementById('addDriver').addEventListener('click', addDriver);
  document.getElementById('updateDriver').addEventListener('click', updateDriver);
  document.getElementById('deleteDriver').addEventListener('click', deleteDriver);
  let initialTableRows = populateDriversTable(); // create table of drivers names
  deleteLicenseDropdowns();
  loadLicenseDropdowns();
  
};

function makeCell(contents) {
  var bodyCell = document.createElement("td");
  var textCell = document.createTextNode(contents);
  bodyCell.append(textCell);
  return bodyCell;
};

function makeDriverRow(rowData) {
  let bodyRow = document.createElement("tr");
  bodyRow.id = rowData.driverID;
  console.log(rowData.firstName);
  let firstName = makeCell(rowData.firstName);
  bodyRow.append(firstName);
  let lastName = makeCell(rowData.lastName);
  bodyRow.append(lastName);
  bodyRow.onclick = function(){
    loadDriverInfo(bodyRow.id);
  }
  return bodyRow;
};

function makeDriversTable(rows){
  console.log(rows);
  let tableRows = document.getElementById("driversNameTable");
  for(let i=0; i<rows.length; i++){
    console.log(rows[i]);
    tableRows.append(makeDriverRow(rows[i]));
  }
};

function makeDriversInfo(rows){
  let driverID = rows[0].driverID;
  let firstName = rows[0].firstName;
  let lastName = rows[0].lastName;
  let birthdate = rows[0].birthdate;
  birthdate = birthdate.substring(0,10);
  let licenseID = rows[0].licenseID;
  let licenseName = rows[0].licenseName;
  console.log(driverID);

  document.getElementById("driverID").textContent = driverID;
  document.getElementById("driverFirstName").textContent = firstName;
  document.getElementById("driverLastName").textContent = lastName;
  document.getElementById("driverBirthdate").textContent = birthdate;
  document.getElementById("driverLicenseID").textContent = licenseID;
  document.getElementById("driverLicenseName").textContent = licenseName;
};

function deleteDriversTable(){
  let table = document.getElementById("driversNameTable");
  while (table.hasChildNodes()){
    table.removeChild(table.lastChild);
  }
};

function deleteLicenseDropdowns(){
  let insertDrop = document.getElementById("insertLicense");
  let updateDrop = document.getElementById("updateLicense");
  while (insertDrop.hasChildNodes()){
    insertDrop.removeChild(insertDrop.lastChild);
  }
  while(updateDrop.hasChildNodes()){
    updateDrop.removeChild(updateDrop.lastChild);
  }
}

function populateDriversTable(){
  const req = new XMLHttpRequest();
  const action = 'actionSelect';
  const table= 'Drivers';
  const params = ['','']
  const body = {"action": action, "table":table, "params":params};

  req.open('POST', baseURL + "/api", true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', async function(){
    if(req.status >= 200 && req.responseText){
      let response = await JSON.parse(req.responseText);
      console.log(response);
      deleteDriversTable();
      makeDriversTable(response);
      loadDriverInfo(response[0].driverID)
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
function loadLicenseDropdowns(){
  const req = new XMLHttpRequest();
  const action = 'actionSelect';
  const table = 'Licenses';
  const params = ['',''];
  
  const body = {"action":action, "table":table, "params":params};
  req.open('POST', baseURL + "/api", true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function(){
    if(req.status >= 200 && req.responseText){
      let response = JSON.parse(req.responseText);
      console.log(response);
      // first create blank options with value of null
      let licenseDropdownInsert = document.getElementById("insertLicense");
      let licenseDropdownUpdate = document.getElementById("updateLicense");
      let blankOptionInsert = createBlankOption();
      let blankOptionUpdate = createBlankOption();
      licenseDropdownInsert.append(blankOptionInsert);
      licenseDropdownUpdate.append(blankOptionUpdate);
      for (i=0;i<response.length;i++){
        let optionInsert = document.createElement("option");
        let optionUpdate = document.createElement("option");

        optionInsert.textContent = response[i].name;
        optionUpdate.textContent = response[i].name;

        optionInsert.value = response[i].licenseID;
        optionUpdate.value = response[i].licenseID;

        licenseDropdownInsert.append(optionInsert);
        licenseDropdownUpdate.append(optionUpdate);
      }
    }
  })
    let context = {}
    context = JSON.stringify(body);
    req.send(context);
};

function loadUpdateDriver(rows){
  console.log(rows);
  let firstName = rows[0].firstName;
  let lastName = rows[0].lastName;
  let birthdate = rows[0].birthdate;
  let licenseID = rows[0].licenseID;
  birthdate = birthdate.substring(0,10);
  // licenseDropdownUpdate already loaded

  document.getElementById('updateFirstName').value = firstName;
  document.getElementById('updateLastName').value = lastName;
  document.getElementById('updateBirthdate').value = birthdate;
  let licenseDropdowns = document.getElementById('updateLicense');
  console.log(licenseDropdowns.options.length);
  for (let i = 0; i<licenseDropdowns.options.length; i++){
    if (licenseDropdowns.options[i].value == licenseID){
      licenseDropdowns.options[i].selected = true;
    }
    else{
      licenseDropdowns.options[i].selected = false;
    }
  }
}
function loadDriverInfo(driverID){
  const req = new XMLHttpRequest();
  const action = 'actionSelect';
  const table = 'Drivers';
  const params =[driverID, 'APPLY_FILTER'];
  const body = {"action":action, "table":table, "params":params};
  req.open('POST', baseURL + "/api", true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function(){
    if(req.status >= 200 && req.responseText){
      let response = JSON.parse(req.responseText);
      console.log(response);
      makeDriversInfo(response);
      loadUpdateDriver(response);
    }
  })
    let context = {}
    context = JSON.stringify(body);
    console.log(context);
    req.send(context);
};

function addDriver() {
  const req = new XMLHttpRequest();
  const action = "actionInsert";
  const table = "Drivers";
  const firstName = document.getElementById('insertFirstName').value;
  const lastName = document.getElementById('insertLastName').value;
  const birthdate = document.getElementById('insertBirthdate').value;
  let licenseID = document.getElementById('insertLicense').value;
  if (licenseID == "null"){
    licenseID = null;
  }
  const params=[firstName, lastName, birthdate, licenseID];
  let alertString ="";
  let validation = true;
  if (!firstName){
    alertString += "First Name ";
    validation = false;
  }
  if (!lastName){
    alertString += "Last Name ";
    validation = false;
  }
  if (!birthdate){
    alertString += "Birthdate ";
    validation = false;
  }
  if (!validation){
    return alert(alertString + "field(s) required.")
  }
  $('#addDriverModal').modal('hide'); // from Bootstrap Modal documentation
    const body = {"action":action, "table":table, "params":params};
    req.open('POST', baseURL + "/api", true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = req.responseText;
        console.log(response);
        const initialLoad = false;
        populateDriversTable(initialLoad);
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

function updateDriver(){
  const req = new XMLHttpRequest();
  const action = "actionUpdate";
  const table = "Drivers";
  const driverID = document.getElementById('driverID').textContent;
  const firstName = document.getElementById('updateFirstName').value;
  const lastName = document.getElementById('updateLastName').value;
  const birthdate = document.getElementById('updateBirthdate').value;
  let licenseID = document.getElementById('updateLicense').value;
  console.log(licenseID);
  if (licenseID == "null"){
    licenseID = null;
  }
  console.log(licenseID);
  let alertString ="";
  let validation = true;
  if (!firstName){
    alertString += "First Name ";
    validation = false;
  }
  if (!lastName){
    alertString += "Last Name ";
    validation = false;
  }
  if (!birthdate){
    alertString += "Birthdate ";
    validation = false;
  }
  if (!validation){
    return alert(alertString + "field(s) required.")
  }
  $('#updateDriverModal').modal('hide'); // from Bootstrap Modal documentation
  const params = [firstName, lastName, birthdate, licenseID, driverID]
  const body = {"action":action, "table":table, "params":params};
  req.open('POST', baseURL + "/api", true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
    var response = req.responseText;
    console.log(response);
    const initialLoad = false;
    populateDriversTable(initialLoad);
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

function deleteDriver(){
  const req = new XMLHttpRequest();
  const action = "actionDelete";
  const table = "Drivers";
  const driverID = document.getElementById('driverID').textContent;
  console.log("delete this drivers ID #"+ driverID);
  const params = [driverID];
  const body = {"action":action, "table":table, "params":params};
  console.log(body);
  req.open('POST', baseURL + "/api", true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
    var response = req.responseText;
    console.log(response);
    const initialLoad = false;
    populateDriversTable(initialLoad);
    if(!driverID){
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
