import { createContext, useState } from "react";

const AlertContext = createContext()

export const AlertProvider = ({children}) => {
    const [alert, setAlert] = useState(null)

    const makeAlert = (msg) => {
        setAlert(msg)
        setTimeout(()=>{setAlert(null)}, 3000)
    }


    return(
        <AlertContext.Provider value={{
            alert,
            makeAlert
        }}>
            {children}
        </AlertContext.Provider>
    )
}

export default AlertContext