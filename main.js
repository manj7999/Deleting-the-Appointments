function saveToCrudCrud(event) {
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.emailId.value;
    const phonenumber = event.target.phonenumber.value;
    const obj = {
        name,
        email,
        phonenumber
    }
    axios.post("https://crudcrud.com/api/9597e61f131a430985df71521cccaa04/bookingappointment",obj)
    .then((res) => {
        showNewUserOnScreen(res.data)
    })
    .catch((Err)=>{
        console.log(Err)
    });
    
}



function showNewUserOnScreen(user){

    document.getElementById('email').value = '';
    document.getElementById('username').value = '';
    document.getElementById('phonenumber').value ='';

    const parentNode = document.getElementById('listOfUsers');
    const childHTML = `<li id=${user._id}> ${user.name} - ${user.email}
                            <button onclick=deleteUser('${user._id}')> Delete User </button>
                            <button onclick=editUserDetails('${user.email}','${user.name}','${user.phonenumber}')>Edit User </button>
                        </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;

}



window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/9597e61f131a430985df71521cccaa04/bookingappointment")
    .then((response) => {
        for(var i=0;i<response.data.length;i++){
            showNewUserOnScreen(response.data[i]);
        }
    })
    .catch((err)=>{
        console.log(err);
    })
    }
)

function deleteUser(UserId){
    axios.delete(`https://crudcrud.com/api/9597e61f131a430985df71521cccaa04/bookingappointment/${UserId}`)
    .then((res)=>{
        removeUserFromScreen(UserId)
    })
    .catch((err)=>{
        console.log(err); 
    })
}

function removeUserFromScreen(UserId){
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(UserId);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}