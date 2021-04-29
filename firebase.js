var storage = firebase.storage();
var storageRef = storage.ref();

$('#List').find('tbody').html('');

var i = 0;
var name;
storageRef.child('images/').listAll().then(function (result) {

  result.items.forEach(function (imageRef) {
    console.log(imageRef.toString());
    var thePath = imageRef.toString();
    var lastItem = thePath.substring(thePath.lastIndexOf('/') + 1)
    var date = lastItem.substring(4, 14);
    var time = lastItem.substring(15, 23);

    i++;
    displayImage(i, imageRef, date, time);
  });
  if (i == 0) {
    noimage();

  }
});

function displayImage(row, images, date, time) {
  images.getDownloadURL().then(function (url) {

    console.log(url);

    let new_html = '';
    new_html += '<tr>';
    new_html += '<td>';
    new_html += 'Date: ' + date + '<br>';
    new_html += 'Time: ' + time + '<br>';
    new_html += '</td>';
    new_html += '<td>';
    new_html += '<img src="' + url + '" width="150px" style="float:right">';
    new_html += '</td>';
    new_html += '</tr>';

    $('#List').find('tbody').append(new_html);
  });
}
function noimage() {
  let new_html = '';
  new_html += '<tr>';
  new_html += '<td>';
  new_html += '<h1 class="display-3">No Images Found<h1>'
  new_html += '</td>';
  new_html += '<td>';
  $('#List').find('tbody').append(new_html);
}


firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if (user != null) {

      location.assign('latest.html');
    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login() {

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function logout() {
  firebase.auth().signOut();
}