// CS340 - Web Development
// Jason Rash, Grigori Barbachov
// Group Project - JS Code for screens Licenses, Seasons, Tracks

// Declare constants
const apiURL = 'https://ahrl-racing.herokuapp.com/api';

// Declare global variables for DOM reference
let itemsList, itemID, itemName, itemDescriptionl;
let addItemName, addItemDescription, updateItemName, updateItemDescription;

// *********************************************************
// INIT FUNCTION - CALLED WHEN PAGE HAS LOADED
// *********************************************************
document.addEventListener("DOMContentLoaded", start);

function start() {
	// When document finish loading -> add event listeners
	document.getElementById('addItem').addEventListener('click', addItem);
	document.getElementById('updateItem').addEventListener('click', updateItem);
	document.getElementById('deleteItem').addEventListener('click', deleteItem);

	// obtain references to common DOM objects
	itemsList = document.getElementById("itemsList");
    itemID = document.getElementById('itemID');
    itemName = document.getElementById('itemName');
    itemDescription = document.getElementById('itemDescription');

    addItemName = document.getElementById('addItemName');
    addItemDescription = document.getElementById('addItemDescription');
    updateItemName = document.getElementById('updateItemName');
    updateItemDescription = document.getElementById('updateItemDescription');

	// Load data to all sceen elements
	loadListItems();

    // Click on first element in the list to trigger 'details' display
    // 	document.getElementById('content').dispatchEvent(new Event('click'));
}

// *********************************************************
// LOAD LIST OF ITEMS ON THE LEFT SIDE OF THE SCREEN
// *********************************************************
async function loadListItems() {

	const response = await apiRequest(
		{'action':'actionSelect', 'table':table, 'params':['', '']}
	);
    console.log('LOADED LIST OF ITEMS', response);
    
    createTableItems(response);
    loadItem(response[0][idFieldName]);
}

// *********************************************************
// LOAD INFO ABOUT ONE PARTICULAR ITEM TO RIGHT SCREEN
// *********************************************************
async function loadItem(id) {
console.log(id);
	const response = await apiRequest(
		{'action':'actionSelect', 'table':table,
		'params':[id, 'APPLY_FILTER']}
	);
console.log('LOADED ONE ITEM:', response);
    
    // populate DOM fields in ITEM DETAIL section
    itemID.innerHTML = response[0][idFieldName];
    itemName.innerHTML = response[0]['name'];
    itemDescription.innerHTML = response[0]['description'];
    
    // prefill fields on UPDATE modal window
    updateItemName.value = response[0]['name'];
    updateItemDescription.value = response[0]['description'];
}

// *********************************************************
// ADD NEW ITEM TO THE DATABASE
// *********************************************************
async function addItem() {
  let alertString ="";
  let validation = true;
  if (!addItemName.value){
    alertString += "Name ";
    validation = false;
  }
  if (!validation){
    return alert(alertString + "field required.")
  }

  $('#addItemModal').modal('hide'); // from Bootstrap Modal documentation
console.log('ADD ITEM ACTION');
    const response = await apiRequest(
		{'action':'actionInsert', 'table':table,
		'params':[addItemName.value, addItemDescription.value]}
	);
console.log('ADDED ONE ITEM:', response);
	loadListItems();
	addItemName.value = '';
	addItemDescription.value = '';
}

// *********************************************************
// UPDATE ONE ITEM IN THE DATABASE
// *********************************************************
async function updateItem() {
  let alertString ="";
  let validation = true;
  if (!addItemName.value){
    alertString += "Name ";
    validation = false;
  }
  if (!validation){
    return alert(alertString + "field required.")
  }
  
  $('#updateItemModal').modal('hide'); // from Bootstrap Modal documentation
console.log('UPDATE ITEM ACTION');
    const response = await apiRequest(
		{'action':'actionUpdate', 'table':table,
		'params':[updateItemName.value, updateItemDescription.value, itemID.innerHTML]}
	);
console.log('UPDATED ONE ITEM:', response);
    loadListItems();
}

// *********************************************************
// DELETE ONE ITEM FROM THE DATABASE
// *********************************************************
async function deleteItem() {
console.log('DELETE ITEM ACTION');
    const response = await apiRequest(
		{'action':'actionDelete', 'table':table,
		'params':[itemID.innerHTML, 'APPLY_FILTER']}
	);
console.log('LOADED ONE ITEM:', response);
    loadListItems();
}

// *********************************************************
// HELPER METHODS - CREATE SCROLLABLE LIST OF ITEMS
// *********************************************************

// CREATE A TABLE OF ELEMENTS FOR LEFT HAND SIDE
function createTableItems(apiResult) {
    itemsList.innerHTML = '';
    apiResult.forEach(item => {
		itemsList.append(createItemRow(item));
	});
};

// CREATE SIGNLE TABLE ROW
function createItemRow(item) {
console.log(idFieldName);
	let row = document.createElement("tr");
	row.id = item[idFieldName];
	row.append( makeCell(item.name) );
	row.onclick = () => { loadItem(row.id) };
	return row;
};

// CREATE SINGLE TABLE ELEMENT
function makeCell(contents) {
	var cell = document.createElement("td");
	var text = document.createTextNode(contents);
	cell.append(text);
	return cell;
};

// *********************************************************
// HELPER METHODS - API REQUESTS
// *********************************************************

// MAKE REQUEST TO BACKEND API
async function apiRequest(apiData) {
	
	let fetchParams = {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin',
		headers: {
		  'Content-Type': 'application/json'
		  // 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	  };
	  
	fetchParams['body'] = JSON.stringify(apiData);
	const response = await fetch(apiURL, fetchParams);
	return response.json();
}
