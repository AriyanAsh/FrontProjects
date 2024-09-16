let $ = document
let firstnameInput = $.querySelector(".firstname")
let lastnameInput = $.querySelector(".lastname")
let passwordInput = $.querySelector(".password")
let form = $.getElementById("form")
let formButton = $.querySelector("button")

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    let userData = {
        firstname: firstnameInput.value,
        lastname: lastnameInput.value,
        password: passwordInput.value,
    }

    fetch('https://newfirebaseproject-c2dd8-default-rtdb.firebaseio.com/users.json',{
        method: "POST",
        headers: {
            "Content-type": "application/json"},
            body: JSON.stringify(userData)
    }).then(res => console.log(res))
    .catch(err => console.log(err))
    clearData()
})

function clearData (){
        firstnameInput.value = ''
        lastnameInput.value = ''
        passwordInput.value = ''
}