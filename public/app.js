
//   firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       // User is signed in.
//       var displayName = user.displayName;
//       var email = user.email;
//       var emailVerified = user.emailVerified;
//       var photoURL = user.photoURL;
//       var isAnonymous = user.isAnonymous;
//       var uid = user.uid;
//       var providerData = user.providerData;


//       console.log("displayName",displayName)
//       console.log("email",email)
//       console.log("emailVerified",emailVerified)
//       console.log("uid",uid)
//       console.log("isAnonymous",isAnonymous)
//       console.log("providerData",providerData)
//       // ...

//     } else {
//         console.log("signout ")
//       // User is signed out.
//       // ...
//     }
//   });

let todoInput = document.getElementById("todoInput");   // getting ID of input field
let todoList = document.getElementById("todoList");     // getting Id of UL

function getTodo() {
    if (todoInput.value) {
        firebase.database().ref('App').push(todoInput.value);
        todoInput.value = "";  // empty the input field
        deleteAll();
        fillingList();
    }
}

function delteElement(e) {
    // e.parentnode.parentNode.remove();  // removing list
    // console.log(e.value);
    firebase.database().ref('App/'+e.value).remove();
    deleteAll();
    fillingList();
}

function editList(e){
    let newTodo = prompt("Enter a new text", e.parentNode.parentNode.firstChild.nodeValue); // getting new todo input from user
    // if (newTodo) e.parentNode.parentNode.firstChild.nodeValue = newTodo;        // upldate old todo item
    if(newTodo){
        firebase.database().ref('App/'+e.value).set(newTodo);
        deleteAll();
        fillingList();
    }

}

function deleteAll() {
    todoList.innerHTML = ""; // empty the UL
}

function deleteAllData() {
    firebase.database().ref('App').remove();
    deleteAll();
    fillingList();
}

// console.log();
// firebase.database().ref('/').once('value'function(data){
//     console.log(data.val())
// })
// firebase.database().ref('/').remove();
fillingList();
function fillingList(){
    firebase.database().ref('/').on('child_added',function(data){
        // console.log(data.val())
        // console.log(data.val().)
        for (const [key, value] of Object.entries(data.val())) {
            // console.log(`${key}: ${value}`);

            // Creating List Start
            let createList = document.createElement('li');      // creating list tags
            createList.append(value);                 // inserting text into list tags

            let updateButton = document.createElement('button'); // creating update button
            updateButton.append("Edit");                         // setting button name
            updateButton.setAttribute("onclick", "editList(this)"); // onclick calling function and passes itself
            updateButton.setAttribute("class", "updateButton");     // setting class name
            updateButton.setAttribute("value", key);
            // createList.append(updateButton);                        // inserting update button into list
        
            let deleteButton = document.createElement('button'); // creating button
            deleteButton.append("Delete");                       // setting button name
            deleteButton.setAttribute("onclick","delteElement(this)"); // onclick calling function and passes its parent node
            deleteButton.setAttribute("class", "deleteButton");     // setting class name
            deleteButton.setAttribute("value", key);
            // createList.append(deleteButton);                     // inserting this button into list

            let bothButtonDiv = document.createElement('div');
            bothButtonDiv.setAttribute("class", "editDelteDiv");     // setting class name
            bothButtonDiv.append(updateButton);
            bothButtonDiv.append(deleteButton);
            createList.append(bothButtonDiv);
            // console.log(bothButtonDiv);

            todoList.append(createList); // inserting list into UL
            // Creating List End
        }

    })
}




