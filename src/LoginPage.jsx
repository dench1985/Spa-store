import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { HOST } from "./App";
import { useState } from "react";



export function LoginPage() {


    const [open, setOpen]=useState(false)
    async function otpravitjZapros(event) {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value


        const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/login`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });
        const data = await response.json()
        if (!data.data) {
           setOpen(true)
            return
        }

        localStorage.setItem('token', data.data.token)
        window.location.reload()
    }



    return <div>
        <form className="login-form" onSubmit={otpravitjZapros}>

            <TextField
                label="username" variant="filled" required
                type="text"
                name="username"
                error={open}
            />
            <TextField
                label="password" variant="filled"
                type="password"
                name="password"
                error={open}
                required />
            <Button type="submit" variant="contained">login</Button>
        </form>
        <Snackbar open={open} autoHideDuration={3000}
        onClose={()=> setOpen(false)} >
            <Alert variant="filled" severity="error">
                Bad Password!!!!!!
            </Alert>
        </Snackbar>
    </div>
}
