const TODO = {
	items:[],
	// counter for id
	counter: 1,
	selectedItem: null,
	updateButton: null,
	createButton:null,
	deleteButton:null,
};
// What I Do
initApp();


// How I Do It


// init app buttons and listeners
function initApp(){
	TODO.createButton = document.querySelector('.create');
	TODO.updateButton = document.querySelector('.update');
	TODO.deleteButton = document.querySelector('.delete');

	TODO.createButton.style.display = "block";
	TODO.updateButton.style.display = "none";
	TODO.deleteButton.style.display = "none";
	
	TODO.deleteButton.addEventListener('click',deleteItem);
	TODO.updateButton.addEventListener('click',updateItem);	
	TODO.createButton.addEventListener('click',createItem);

	// update id to be max+1
	let max = 0;
	// init tasks from local storage
	for (var i = 0; i < localStorage.length; i++)
	{
		// console.log("current key",key);
	
		const temp = localStorage.getItem(localStorage.key(i));
		const obj = JSON.parse(temp);
		if(obj.id > max)
		{
			max = obj.id;
		}
		console.log("in local storage ",obj);
		addItem(obj);
	}
	TODO.counter = max ;
	console.log(TODO.counter);

}
function addItem(newItem){

	const newDOMItem = document.createElement('li');
	
	const id = document.createElement('div');
	id.classList.add('id');
	id.dataset.id = newItem.id;
	console.log("the created object ",id) ;
	id.innerHTML = newItem.id;
	id.style.display = "none";

	const title = document.createElement('div');
	title.classList.add('title');
	title.innerHTML = newItem.title;
	
	const text = document.createElement('div');
	text.classList.add('text');
	text.innerHTML = newItem.text;

	
	newDOMItem.append(id);
	newDOMItem.append(title);
	newDOMItem.append(text);
	// newDOMItem.append(action);

	newDOMItem.addEventListener('click',selectItem);

	const todo = document.querySelector('.todoContainer');
	console.log(todo);
	todo.insertAdjacentElement('afterbegin',newDOMItem);
}
function createItem(event){
	const title = document.getElementById('title');
	const text = document.getElementById('text');
	// let currentDate = new Date();
	TODO.counter++;
	let newItem = {
		id: TODO.counter,
		title: title.value,
		// title: `title${TODO.counter}`,
		text: text.value,
		date: new Date().toLocaleString(),
		status: 'pending',
	}
	TODO.items.push(newItem);
	const myJsonObject = JSON.stringify(newItem);
	localStorage.setItem(newItem.id,myJsonObject);
	console.log("adding to local storage ",localStorage);
	addItem(newItem);
	title.value = "",
	text.value = ""
}
// show extra data
// date , status ...
// open as read but allow to update
// title + text
// date will be changed automatically
// priority change will change color
function updateItem(event){
	const elementToUpdate = TODO.selectedItem;
	// const id = elementToUpdate.firstElementChild.innerHTML;
	const idValue = elementToUpdate.firstElementChild.innerHTML;

	if(elementToUpdate){
		// input tag
		const title = document.getElementById('title');
		const text = document.getElementById('text');
		// console.log("element to update",document.getElementById('id'));
		// console.log("title",title.value);
		// console.log("idValue",document.getElementById('id'));
		

		const elementItem = TODO.items[getElementIndexById(idValue)];

		localStorage.setItem(elementItem.id,JSON.stringify(elementItem));
		// update stored object
		elementItem.title = title.value;
		elementItem.text = text.value;
				// update in DOM
		elementToUpdate.getElementsByClassName('title')[0].innerHTML = title.value;
		elementToUpdate.getElementsByClassName('text')[0].innerHTML = text.value;

	}
	// elementItem.querySelector('.title') = title.value;
	// console.log(id);

}

function getElementIndexById(id){
	// console.log("id we look for",id );
	for(let i=0;i<TODO.items.length;i++){
		// console.log("curr item id",TODO.items[i].id);
		if(TODO.items[i].id === parseInt(id))
		{
			// console.log("found item",TODO.items[i].id);
			return i;
		}
	}
	// console.log("did not found item");

	return -1;
}
function deleteItem(event){
	// element to delete
	const elementToDelete = TODO.selectedItem;
	const id = elementToDelete.firstElementChild.innerHTML;
	// console.log("id:" ,id);

	// remove from array
	const objToDeleteArr = TODO.items.splice(getElementIndexById(id),1);
	// remove from DOM
	elementToDelete.remove();	
	localStorage.removeItem(objToDeleteArr[0].id);
}

// focused item takes data
// update TODO.selectedItem
function selectItem(event){

	const focus = document.querySelector('.selectedItemContainer');
	const selectedItem = event.currentTarget;
	const idValue = selectedItem.firstElementChild.dataset.id;
	console.log("selectedItem ",selectedItem);
	// console.log("id ",idValue);
	// console.log(event.currentTarget.querySelector('.title').innerHTML);
	const selectedObject = TODO.items[getElementIndexById(idValue)];
	console.log("selectedObject ",selectedObject);

	focus.querySelector('.title').value = selectedObject.title;
	focus.querySelector('.text').value = selectedObject.text;

	TODO.selectedItem = selectedItem;
	TODO.updateButton.style.display = "block";
	TODO.deleteButton.style.display = "block";
	
}










