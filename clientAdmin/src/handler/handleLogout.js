import Swal from "sweetalert2"
import clearUserDataInLocalStorage from "../helper/clearUserDataInLocalStorage"

async function handleLogout(changePage) {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "we will miss you :(",
        showCancelButton: true,
        confirmButtonText: "Yeap, log me out",
        confirmButtonColor: '#e34944'
    })
    if (result.isConfirmed) {
        Swal.fire('Logout Successfull!', '', 'success')
        clearUserDataInLocalStorage()
        changePage('Login')
    }
}

export default handleLogout
