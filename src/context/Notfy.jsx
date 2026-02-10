import { createContext, useState } from "react";

export const NotfyContext = createContext();

const NotfyContextProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    const showNotification = (message, type) => {
        setNotification({ message, type });

        setTimeout(() => {
            setNotification(null);
        }, 3000);
    }

    return (
        <NotfyContext.Provider value={{ notification, showNotification }}>
            {children}
        </NotfyContext.Provider>
    )
}

export default NotfyContextProvider;
