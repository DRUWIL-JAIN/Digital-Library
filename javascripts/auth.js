async function signUp() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const name = document.getElementById('name').value
    const branch = document.getElementById('branch').value
    const yearOfGrad = document.getElementById('yearOfGrad').value
    const prn = document.getElementById('prn').value
    var isSignedIn = false;
    await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            isSignedIn = true;

        })
        .catch((error) => {
            isSignedIn = false;
            window.alert("SignUp Failed :"+error.message)
            console.log(error.code)
            console.log(error.message)
        });
    if (isSignedIn) {
        await firebase.auth().currentUser.updateProfile({
            displayName: name,
            photoURL: prn + "~" + yearOfGrad + "~" + branch
        });
        window.location.href = '/home.html';
    }
}
async function signIn() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            window.location.href = '/home.html';
        })
        .catch((error) => {
            window.alert("Login Failed :"+error.message)
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}