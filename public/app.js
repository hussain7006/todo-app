
let todoInput = document.getElementById("todoInput");   // getting ID of input field
let todoList = document.getElementById("todoList");     // getting Id of UL

function getTodo() {

    // Creating List Start
    let createList = document.createElement('li');      // creating list tags
    if (todoInput.value) {
        
        createList.append(todoInput.value);                 // inserting text into list tags

        let updateButton = document.createElement('button'); // creating update button
        updateButton.append("Edit");                         // setting button name
        updateButton.setAttribute("onclick", "editList(this)"); // onclick calling function and passes itself
        updateButton.setAttribute("class", "updateButton");     // setting class name
        // createList.append(updateButton);                        // inserting update button into list
    
        let deleteButton = document.createElement('button'); // creating button
        deleteButton.append("Delete");                       // setting button name
        deleteButton.setAttribute("onclick","delteElement(this.parentNode)"); // onclick calling function and passes its parent node
        deleteButton.setAttribute("class", "deleteButton");     // setting class name
        // createList.append(deleteButton);                     // inserting this button into list

        let bothButtonDiv = document.createElement('div');
        bothButtonDiv.setAttribute("class", "editDelteDiv");     // setting class name
        bothButtonDiv.append(updateButton);
        bothButtonDiv.append(deleteButton);
        createList.append(bothButtonDiv);
        // console.log(bothButtonDiv);

        todoList.append(createList);                        // inserting list into UL
        todoInput.value = "";                               // empty the input field
        // Creating List End
    }
}

function delteElement(e) {
    e.parentNode.remove();                                         // removing list
}

function editList(e){
    // console.log(e)
    let newTodo = prompt("Enter a new text", e.parentNode.parentNode.firstChild.nodeValue); // getting new todo input from user
    if (newTodo) e.parentNode.parentNode.firstChild.nodeValue = newTodo;        // upldate old todo item
}

function deleteAll() {
    todoList.innerHTML = "";                            // empty the UL
}