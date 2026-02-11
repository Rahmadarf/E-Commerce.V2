// context/CartContext.jsx
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);
    const { user, isLoaded } = useUser();

    console.log("USER:", user);
    console.log("ID:", user?.id);


    const fetchCart = async () => {
        if (!user) return;       // kalau belum login jangan fetch

        const res = await axios.get(`https://rahmadarifin.my.id/api/cart/count.php?clerk_id=${user.id}`);
        setCartCount(res.data.count);
    };

    useEffect(() => {
        if (!isLoaded) return;
        if (!user) {
            setCartCount(0);
            return;
        }

        fetchCart();
    }, [isLoaded, user]);


    return (
        <CartContext.Provider value={{ cartCount, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};
