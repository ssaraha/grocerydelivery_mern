import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { useEffect } from "react";
import {toast} from "react-hot-toast"

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();
    const  [user, setUser] = useState(true);
    const  [isSeller, setIsSeller] = useState(false);
    const  [showUserLogin, setShowUserLogin] = useState(false);
    const  [products, setProducts] = useState([]);

    const  [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState([]);

    //FETCH ALL PRODUCTS
    const fecthProducts = async () => {
        setProducts(dummyProducts)
    }

    //ADD TO CART
    const addToCart = async (itemId) => {
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] += 1
        }else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to cart");
    }

    //UPDATE CART ITEM QUANTITY
    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        setCartItems(cartData);
        toast.success('cart updated')
    }

    //REMOVE THE PRODUCT FROM CART
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        toast.success('Remove from cart');
        setCartItems(cartData);
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
        products,
        addToCart,
        updateCartItem,
        removeFromCart,
        cartItems,
        searchQuery,
        setSearchQuery
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}

