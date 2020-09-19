
// let userID = '';
// let promise = new Promise( (resolve, reject) => {
//     firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//             // User is signed in.
//             resolve(user);

//             // ...
    
//         } else {
//             console.log("signout ");
//             reject("signOut")
//             // User is signed out.
//             // ...
//         }
//     });
// })

// promise.then( (user) => {
//     var displayName = user.displayName;
//     var email = user.email;
//     var emailVerified = user.emailVerified;
//     var photoURL = user.photoURL;
//     var isAnonymous = user.isAnonymous;
//     var uid = user.uid;
//     var providerData = user.providerData;

//     userID = uid;

//     console.log("displayName", displayName)
//     console.log("email", email)
//     console.log("emailVerified", emailVerified)
//     console.log("uid", uid)
//     console.log("isAnonymous", isAnonymous)
//     console.log("providerData", providerData)

//     fillingList(userID);
// })

function checkAuth(){

    return new Promise( (resolve, reject) => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                resolve(user.uid);
            } else {
                console.log("signout ");
                reject("signOut")
            }
        });
    });

    // promise.then( (user) => {
    //     var displayName = user.displayName;
    //     var email = user.email;
    //     var emailVerified = user.emailVerified;
    //     var photoURL = user.photoURL;
    //     var isAnonymous = user.isAnonymous;
    //     var uid = user.uid;
    //     var providerData = user.providerData;

    //     userID = uid;

    //     // console.log("displayName", displayName)
    //     // console.log("email", email)
    //     // console.log("emailVerified", emailVerified)
    //     // console.log("uid", uid)
    //     // console.log("isAnonymous", isAnonymous)
    //     // console.log("providerData", providerData)
    //     console.log(userID)
    //     return userID;
    // })
    // .catch( (error) => {
    //     console.log(error);
    // })
}




let todoInput = document.getElementById("todoInput");   // getting ID of input field
let todoList = document.getElementById("todoList");     // getting Id of UL

async function getTodo() {
    let userID = await checkAuth();
    // console.log("userID:",userID);
    if (todoInput.value) {
        firebase.database().ref(userID).push(todoInput.value);
        todoInput.value = "";  // empty the input field
        deleteAll();
        fillingList();
    }
}

async function delteElement(e) {
    // e.parentnode.parentNode.remove();  // removing list
    // console.log(e.value);
    let userID = await checkAuth();

    firebase.database().ref(userID + '/' + e.value).remove();
    deleteAll();
    fillingList();
}

async function editList(e) {

    let newTodo = prompt("Enter a new text", e.parentNode.parentNode.firstChild.nodeValue); // getting new todo input from user
    // if (newTodo) e.parentNode.parentNode.firstChild.nodeValue = newTodo;        // upldate old todo item
    let userID = await checkAuth();
    // console.log("e==>",e.value)
    if (newTodo) {
        firebase.database().ref(userID + '/' + e.value).set(newTodo);
        deleteAll();
        fillingList();
    }

}

function deleteAll() {
    todoList.innerHTML = ""; // empty the UL
}

async function deleteAllData() {

    let userID = await checkAuth();
    firebase.database().ref(userID).remove();
    deleteAll();
    fillingList();
}

// console.log();
// firebase.database().ref('/').once('value'function(data){
//     console.log(data.val())
// })
// firebase.database().ref('/').remove();
fillingList()
async function fillingList() {

    let userID = await checkAuth();

    firebase.database().ref(userID).on('child_added', function (data) {

        // for (const [key, value] of Object.entries(data)) {
        //     // console.log(`${key}: ${value}`);
        // console.log("data ==> ",data.key)
        // Creating List Start
        let createList = document.createElement('li');      // creating list tags
        createList.append(data.val());                 // inserting text into list tags

        let updateButton = document.createElement('button'); // creating update button
        updateButton.append("Edit");                         // setting button name
        updateButton.setAttribute("onclick", "editList(this)"); // onclick calling function and passes itself
        updateButton.setAttribute("class", "updateButton");     // setting class name
        updateButton.setAttribute("value", data.key);
        // createList.append(updateButton);                        // inserting update button into list

        let deleteButton = document.createElement('button'); // creating button
        deleteButton.append("Delete");                       // setting button name
        deleteButton.setAttribute("onclick", "delteElement(this)"); // onclick calling function and passes its parent node
        deleteButton.setAttribute("class", "deleteButton");     // setting class name
        deleteButton.setAttribute("value", data.key);
        // createList.append(deleteButton);                     // inserting this button into list

        let bothButtonDiv = document.createElement('div');
        bothButtonDiv.setAttribute("class", "editDelteDiv");     // setting class name
        bothButtonDiv.append(updateButton);
        bothButtonDiv.append(deleteButton);
        createList.append(bothButtonDiv);
        // console.log(bothButtonDiv);

        todoList.append(createList); // inserting list into UL
        // Creating List End
        // }

    })
}

function signOut() {

    let signOut = confirm("Are You Sure!");
    if(signOut){
        // alert("going to signOut")
        firebase.auth().signOut()
        .then(function () {
            window.location = "signIn.html"
        })
        .catch(function (error) {
            // An error happened.
        });
    }
    else{
        // alert("still here")
    }

}



