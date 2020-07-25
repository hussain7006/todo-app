
let todoInput = document.getElementById("todoInput");   // getting ID of input field
let todoList = document.getElementById("todoList");     // getting Id of UL

function getTodo() {

    // Creating List Start
    let createList = document.createElement('li');      // creating list tags
    createList.append(todoInput.value);                 // inserting text into list tags
    
    let updateButton = document.createElement('button'); // creating update button
    updateButton.append("Edit");                         // setting button name
    updateButton.setAttribute("onclick", "editList(this)"); // onclick calling function and passes itself
    updateButton.setAttribute("class", "updateButton");
    createList.append(updateButton);                        // inserting update button into list
 
    let deleteButton = document.createElement('button'); // creating button
    deleteButton.append("Delete");                       // setting button name
    deleteButton.setAttribute("onclick","delteElement(this.parentNode)"); // onclick calling function and passes its parent node
    createList.append(deleteButton);                     // inserting this button into list

    todoList.append(createList);                        // inserting list into UL
    todoInput.value = "";                               // empty the input field
    // Creating List End
}

function delteElement(e) {
    e.remove();                                         // removing list
}

function editList(e){
    
    let newTodo = prompt("Enter a new text", e.parentNode.firstChild.nodeValue); // getting new todo input from user
    e.parentNode.firstChild.nodeValue = newTodo;        // upldate old todo item
}

function deleteAll() {
    todoList.innerHTML = "";                            // empty the UL
}