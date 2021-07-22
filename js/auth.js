const Auth = firebase.auth()
async function signUp() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const name = document.getElementById('name').value
    const branch = document.getElementById('branch').value
    const yearOfGrad = document.getElementById('yearOfGrad').value
    const prn = document.getElementById('prn').value
    const gender = document.getElementById('gender').value
    if (gender == "" || branch == "" || name == "") {
        window.alert("Please fill complete details")
        return
    }
    if (yearOfGrad.length < 3) {
        window.alert("Please Enter Year in 20-- Format")
        return
    }
    if (!email.includes("@mitaoe.ac.in")) {
        window.alert("Please Enter email of @mitaoe.ac.in domain only")
        return
    }
    if (prn.length != 10) {
        window.alert("Invalid PRN (PRN should be 10 digits)")
        return
    }
    var isSignedIn = false;

    await Auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            isSignedIn = true;
            sendVerificationEmail()
            window.alert("Signup successful.\nPlease check your inbox to verify your email id")
        })
        .catch((error) => {
            isSignedIn = false;
            window.alert("SignUp Failed :" + error.message)
            console.log(error.code)
            console.log(error.message)
        });
    if (isSignedIn) {
        await Auth.currentUser.updateProfile({
            displayName: name,
            photoURL: prn + "~" + yearOfGrad + "~" + branch + "~" + gender
        });
        await analytics.logEvent('user_info', {
            prn: prn,
            department: branch,
            yearOfGrad: yearOfGrad,
            Gender: gender
        });
        console.log("SignedIn")
        //window.location.href = '/home.html';
    }
}

const sendVerificationEmail = () => {
    Auth.currentUser.sendEmailVerification()
        .then(() => {
            window.location.href = "/index.html";
        })
        .catch(error => {
            window.alert("Error : " + error.message)
        })
}


async function signIn() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    var isLoggedIn = false;
    if (!email.includes("@mitaoe.ac.in")) {
        window.alert("Please Enter email of @mitaoe.ac.in domain only")
        return
    }
    var user;
    await Auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            user = userCredential.user;
            isLoggedIn = true;
        })
        .catch((error) => {
            window.alert("Login Failed :" + error.message)
            isLoggedIn = false;
        });
    

    if (isLoggedIn) {
        var str = user.photoURL;

        var index = str.indexOf('~');
        var prn = str.substring(0, index);
        str = str.substring(index + 1);

        index = str.indexOf('~');
        var yearOfGrad = str.substring(0, index);
        str = str.substring(index + 1);

        index = str.indexOf('~');
        var department = str.substring(0, index);
        str = str.substring(index + 1);

        var gender = str;
        console.log(prn, yearOfGrad, department)
        await analytics.logEvent('user_info', {
            prn: prn,
            department: department,
            yearOfGrad: yearOfGrad,
            Gender: gender
        });
        console.log("Logedin")
        
    }
    if (isLoggedIn && !Auth.currentUser.emailVerified) {
        sendVerificationEmail()
        window.alert("Email Id not verified.\nPlease check your inbox for verification email");
        return;
    }
    else
    {
        window.location.href = '/home.html';
    }
}


//check if loggedin
Auth.onAuthStateChanged((user) => {
    if (user && Auth.currentUser.emailVerified) {
        window.location.href = "/home.html";
    }
});