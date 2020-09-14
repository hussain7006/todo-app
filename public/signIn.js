let signIn = () => {

    let email = document.getElementById('email');
    let password = document.getElementById('password');

    console.log(email.value);
    console.log(password.value);


    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then( (result) => {
            // console.log(result)
            window.location = './index.html'
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
            // ...
      });
}