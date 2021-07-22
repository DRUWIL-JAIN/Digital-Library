const Auth = firebase.auth()
function forgotpass() {
    var emailAddress = document.getElementById("email").value;
    //var progress = document.getElementById("resetprogress");
    var btn = document.getElementById("button");
    //progress.style.visibility = "visible";
    btn.style.visibility = "hidden";

    Auth.sendPasswordResetEmail(emailAddress).then(function () {
        window.alert("Reset Link sent")
        //progress.style.visibility = "hidden";
        btn.style.visibility = "visible";
    }).catch(function (error) {
        window.alert(error.message)
        //progress.style.visibility = "hidden";
        btn.style.visibility = "visible";
    });
}