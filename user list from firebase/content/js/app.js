const usersContainer = document.querySelector('#wrap-users')
const deleteModal = document.querySelector("#delete-modal")
const editModal = document.getElementById("edit-modal")
let userId = null
const firstname = document.querySelector(".firstname")
const lastname = document.querySelector(".lastname")
const password = document.querySelector(".password")

window.addEventListener('load', getAllUsers())

function getAllUsers (){
    usersContainer.innerHTML = ""
            fetch('https://newfirebaseproject-c2dd8-default-rtdb.firebaseio.com/users.json')
            .then(res => res.json())
            .then(data => {
                Object.entries(data).forEach((user) => {
                    usersContainer.insertAdjacentHTML('beforeend',`
                        <div class="user">
                        <div class="user-profile-wrap">
                            <img class="user-profile" src="content/img/noimg.png" alt="default-image">
                            <div class="user-profile-description">
                                <h1 class="user-profile-name">${user[1].firstname} - ${user[1].lastname}<span class="user-age">18</span> </h1>
                                <h3 class="user-explanations">Pass: ${user[1].password}</h3>
                            </div>
                        </div>
                        <div class="btn-groups-column">
                            <button class="delete-user-btn" onclick="openDeleteModal('${user[0]}')">delete</button>
                            <button class="edit-user-btn" onclick="openEditModal('${user[0]}')">edit</button>
                        </div>
                    </div>`)
                })
                
            })
        }


function openDeleteModal (user) {
    userId = user
    deleteModal.classList.add("visible")
} 

function closeDeleteModal() {
    deleteModal.classList.remove("visible")
}

function deleteUser(){

    fetch(`https://newfirebaseproject-c2dd8-default-rtdb.firebaseio.com/users/${userId}.json`,{
    method: "DELETE"}
    )
    .then(res => {
        console.log(res);
        getAllUsers()
        
    })
    
   
    deleteModal.classList.remove("visible")

}

function openEditModal (user){
    userId = user
    fetch(`https://newfirebaseproject-c2dd8-default-rtdb.firebaseio.com/users/${userId}.json`)
    .then(res => res.json())
    .then(data => {
        firstname.value =data.firstname;
        lastname.value =data.lastname;
        password.value =data.password;
        
    })
    editModal.classList.add("visible")
}

function editUser (){
        const userNewData = {
            firstname: firstname.value,
            lastname: lastname.value,
            password: password.value,
        }
        fetch(`https://newfirebaseproject-c2dd8-default-rtdb.firebaseio.com/users/${userId}.json`,{
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userNewData)
        })
        .then(res => {
            firstname.value = ""
            lastname.value = ""
            password.value = ""
            console.log(res)
            closeEditModal()
            getAllUsers()
            
        })
     
}

function closeEditModal (){
    editModal.classList.remove("visible")
}