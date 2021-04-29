
var firebaseConfig = {
  apiKey: "AIzaSyBbTDy0TjA16z7CcXgaXhE10ecvK7vhAHU",
  authDomain: "doorbell-92cb3.firebaseapp.com",
  databaseURL: "https://doorbell-92cb3-default-rtdb.firebaseio.com",
  projectId: "doorbell-92cb3",
  storageBucket: "doorbell-92cb3.appspot.com",
  messagingSenderId: "622367726802",
  appId: "1:622367726802:web:ff067312c7fdd9d65aa10b",
  measurementId: "G-B6JE6R6XLV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function logout(){
  firebase.auth().signOut();
}


