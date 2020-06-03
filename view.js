
var storage = firebase.storage();
var storageRef = storage.ref();
var rootRef = firebase.database().ref().child('Images');
console.log(rootRef);
var myList = new Array();
// myList.push("ds")
storageRef.child("dog.jpg").getDownloadURL().then(function(url) {
  // Or inserted into an <img> element:
  var img = document.getElementById('myImgId');
  img.src = url;
}).catch(function(error) {
  // Handle any errors
});

storageRef.child('dog.jpg').getDownloadURL().then(function(url) {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
      var blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    // Or inserted into an <img> element:
    var img = document.getElementById('myimg');
    img.src = url;
    }).catch(function(error) {
    // Handle any errors
});

rootRef.on('child_added', snap => {
  var img_name = snap.child("url").val();
});



var count = 0;
// var userId = firebase.auth().currentUser.uid;
var userID = ""
var fbRef = firebase.database().ref().child("Images");

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user);
        var user = firebase.auth().currentUser.uid;
        userID = user;
        // alert(user);    //you should have your user here!
        fbRef.on("child_added", snap => {
            var key=snap.key;
            myList.push(key);
            // alert('HEllo');
            // alert(key);
        });
    } else {
        console.log('No user is signed in.');
    }
});
function nextImg(){
    count = count+1;
    var lbl = ""
    var ele = document.getElementsByName('label');
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked)
        lbl = ele[i].value;
        if (myList.length <= count){
          storageRef.child(myList[count]).getDownloadURL().then(function(url) {
          // Or inserted into an <img> element:
            img.src = url;
            firebase.database().ref('users/' + userId).set({
                label: lbl

            }).catch(function(error) {
              // Handle any errors
            });
          })
        }
      }
}
//
for (var i = 0; i < myList.length; i ++ ){
        window.console.log(myList[i]);
     }
// alert(myList);
console.log(myList[0]);

//urll is the url for image

  var urlList = new Array();
  for (var i = 0; i < myList.length; i ++ ){
    urlList.push(myList[i]);
  }
  //
  // for (var i = 0; i < urlList.length; i++) {
  //   urlList[i]
  // }
