import { HomePage } from "./HomePage"
import { LoginPage } from "./LoginPage"

export const HOST = 'https://test.v5.pryaniky.com'

export function App() {
        

    if (!localStorage.getItem("token")) {
        return <LoginPage/>
    }
    return (
        <>
            <HomePage/>
            
        </>
    )

}







