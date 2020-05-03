

var storage = firebase.storage();
var storageRef = storage.ref();
//urll is the url for image
storageRef.child("dog.jpg").getDownloadURL().then(function(url) {
  // Or inserted into an <img> element:
  var img = document.getElementById('myImgId');
  img.src = url;
}).catch(function(error) {
  // Handle any errors
});
