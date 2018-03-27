const firebase = require('firebase')

firebase.initializeApp({
    apiKey: "AIzaSyAJD96-JNcjlnwhngJjK90u8vW3AMmQZTs",
    authDomain: "ariefmanda-195202.firebaseapp.com",
    databaseURL: "https://ariefmanda-195202.firebaseio.com",
    projectId: "ariefmanda-195202",
    storageBucket: "ariefmanda-195202.appspot.com",
    messagingSenderId: "807187906136"
})
console.log(firebase);
var storage = firebase.storage()
var mountainImagesRef = storageRef.child('images/mountains.jpg');
var message = '5b6p5Y-344GX44G-44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
mountainImagesRef.putString(message, 'base64url')
.then( snapshot => {
  return console.log('Uploaded a base64url string!');
})
.catch(err=>{
    return console.log(err);
})