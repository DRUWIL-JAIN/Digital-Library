const Auth = firebase.auth()

//log out
function logout() {
    Auth.signOut().then(() => {
        window.alert("Logout successfull")
    }).catch((error) => {
        window.alert(error.message)
    });
}



//check if loggedin
Auth.onAuthStateChanged((user) => {
    if (!user || !Auth.currentUser.emailVerified) {
        if (!(window.location.href.slice(-10) == "index.html" || window.location.href.slice(-11) == "signup.html" || window.location.href.slice(-10) == "reset.html")) {
            window.location.href = "/index.html";
        }
    }
});


