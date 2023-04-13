// UserName
let username = document.getElementById("username");
// Password
let pass = document.getElementById("password");
// SignIn Button
let form = document.getElementById("signin");
// Button for logIn popup
let loginbutton = document.getElementById("show-login");
// Name of user
let Name = document.getElementById("name");
// Link To API all users
let userUrl = "https://test-h-8359.onrender.com/users";

// Form EventListner for logIn
form.addEventListener("click", (event) => {
   
    // checking for  if the input fields are empty
    if (username.value === "" || pass.value === "" || Name.value === ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Fill All Details!',
            footer: '<a href="">Why do I have this issue?</a>'
        })
        return;
    }
    // check if user is already logged in
    fetch(userUrl)
    .then(res => res.json())
    .then(data => {
        let user;
        console.log(data)
        for (let i = 0; i <= data.length - 1; i++) {
            if (data[i].username === username.value && data[i].password === pass.value && data[i].name === Name.value) {
                user = data[i];
                break;
            }
        }

        // check if user is found
        let loginstatus = JSON.parse(localStorage.getItem("loginstatus"));
        console.log(loginstatus,loginstatus.status)
        if (loginstatus && loginstatus.status) {
            Swal.fire(
                'Login?',
                'You are still loged In? Log Out First',
                'question'
              )
        }
        else {
                if(user){
                  localStorage.setItem("loginstatus", JSON.stringify({status: true, id: user.id}));
                  localStorage.setItem("userDetails", JSON.stringify(user));
                  console.log(user)
                  if(user.admin == "true"){
                    window.location.href = "/admin.html";
                     console.log("admin");
                     }
                    else {
                        console.log("user");
                     window.location.href = "index.html";  
                    }
                }
                else {
                   
                    Swal.fire({
                    icon: 'error',
                    title: 'Incorrect username, password or name.',
                    text: ' Please try again.',
                    footer: '<a href="">Why do I have this issue?</a>'
                     })

                }
        }
       
    });
});
