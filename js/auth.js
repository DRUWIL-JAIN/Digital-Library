async function signUp() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const name = document.getElementById('name').value
    const branch = document.getElementById('branch').value
    const yearOfGrad = document.getElementById('yearOfGrad').value
    const prn = document.getElementById('prn').value
    const gender = document.getElementById('gender').value
    if(gender=="" || branch=="")
    {
        window.alert("Please fill complete details")
        return
    }
    var isSignedIn = false;
    await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            isSignedIn = true;

        })
        .catch((error) => {
            isSignedIn = false;
            window.alert("SignUp Failed :" + error.message)
            console.log(error.code)
            console.log(error.message)
        });
    if (isSignedIn) {
        await firebase.auth().currentUser.updateProfile({
            displayName: name,
            photoURL: prn + "~" + yearOfGrad + "~" + branch + "~" + gender
        });
        await analytics.logEvent('user_info', {
            prn: prn,
            department: branch,
            yearOfGrad: yearOfGrad,
            Gender: gender
        });
        //window.location.href = '/home.html';
    }
}
async function signIn() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    var isLoggedIn = false;
    var user;
    await firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            user = userCredential.user;
            isLoggedIn = true;
        })
        .catch((error) => {
            window.alert("Login Failed :" + error.message)
            isLoggedIn = false;
        });

    if (isLoggedIn) {
        var str=user.photoURL;

        var index = str.indexOf('~');
        var prn=str.substring(0,index);
        str=str.substring(index+1);

        index = str.indexOf('~');
        var yearOfGrad=str.substring(0,index);
        str=str.substring(index+1);

        index = str.indexOf('~');
        var department=str.substring(0,index);
        str=str.substring(index+1);

        var gender = str;
        console.log(prn,yearOfGrad,department)
        await analytics.logEvent('user_info', {
            prn: prn,
            department: department,
            yearOfGrad: yearOfGrad,
            Gender: gender
        });
        //window.location.href = '/home.html';
    }
}