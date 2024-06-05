import { Button } from "@mui/material"


export function LogOut() {


    
    return <Button  variant="outlined" onClick={loguut} >Logout</Button>

}
function loguut() {
    localStorage.removeItem('token')
    window.location.reload()
}
