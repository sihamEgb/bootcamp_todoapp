const TODO = {
	items:[],
	counter: 1,
	selectedItem: null,
};

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

	const action = document.createElement('div');
	action.classList.add('action');

	const deleteDiv = document.createElement('div');
	const deleteButton = document.createElement('button');
	deleteButton.classList.add('action-button');
	deleteButton.classList.add('delete');
	deleteButton.innerHTML = "delete";
	deleteDiv.append(deleteButton);

	const updateDiv = document.createElement('div');
	const updateButton = document.createElement('button');
	updateButton.classList.add('action-button');
	updateButton.classList.add('update');
	updateButton.innerHTML = "update";
	updateDiv.append(updateButton);

	// const readDiv = document.createElement('div');
	// const readButton = document.createElement('button');
	// readButton.classList.add('action-button');
	// readButton.classList.add('read');
	// readButton.innerHTML = "read";
	// readDiv.append(readButton);

	

	// action.append(deleteDiv);
	// action.append(updateDiv);
	// action.append(readDiv);
	
	newDOMItem.append(id);
	newDOMItem.append(title);
	newDOMItem.append(text);
	newDOMItem.append(action);

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

	addItem(newItem);
	title.value = "",
	text.value = ""
}
// show extra data
// date , status ...
// function readItem(event){
// 	const elementToRead = event.currentTarget.parentElement.parentElement.parentElement;
// 	const id = elementToRead.firstElementChild.innerHTML;
// 	console.log("id:" ,elementToRead);

// }
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
	TODO.items.splice(getElementIndexById(id),1);
	// remove from DOM
	elementToDelete.remove();
	// console.log(event.target);
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
	updateButton.style.display = "block";
	deleteButton.style.display = "block";
	
}

// buttons listeners

// init app
const createButton = document.querySelector('.create');
const updateButton = document.querySelector('.update');
const deleteButton = document.querySelector('.delete');

createButton.style.display = "block";
updateButton.style.display = "none";
deleteButton.style.display = "none";

// readButton.addEventListener('click',readItem);
	deleteButton.addEventListener('click',deleteItem);
	updateButton.addEventListener('click',updateItem);	
	createButton.addEventListener('click',createItem);




