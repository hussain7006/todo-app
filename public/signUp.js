let signUp = ()=> {
    // alert("husssain");
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    // console.log(email.value);
    // console.log(password.value);

    if(email.value && password.value){

        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((result)=>{
            // console.log(result);

            email.value = "";
            password.value = "";

            window.location = './signIn.html'
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // console.log(errorMessage)
            // ...
        });
    }
    else{
        alert("Please Fill All Fields");
    }
}
