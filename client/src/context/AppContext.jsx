import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { useEffect } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const currency = import.meta.VITE_CURRENCY;
    const navigate = useNavigate();
    const  [user, setUser] = useState(true);
    const  [isSeller, setIsSeller] = useState(false);
    const  [showUserLogin, setShowUserLogin] = useState(false);
    const  [products, setProducts] = useState([]);

    const fecthProducts = async () => {
        setProducts(dummyProducts)
    }

    useEffect(() => {
        fecthProducts()
    }, [])

    const value = {
        currency,
        navigate, 
        user, 
        setUser,
        isSeller, 
        setIsSeller,
        showUserLogin,
        setShowUserLogin,
        products
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}

