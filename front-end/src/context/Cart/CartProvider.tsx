import { useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";
import { BASE_URL } from "../../constants/BaseUrl";
import { useAuth } from "../Auth/AuthContext";


const CartProvider: FC<PropsWithChildren> = ({ children }) => {
    const [products, setProducts] = useState<[] | unknown>([]);
    const [countofproducts, setCountofproduct] = useState<number | null>(0);
    const [totalAmount, setTotalAmount] = useState<number | null>(0);

    const { token } = useAuth()

    const getCart = async () => {
        const { data } = await axios.get(`${BASE_URL}/cart`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (!data) {
            return "Please Login And Try Again";
        }
        console.log(data);
        
        setProducts(data.items);
        setCountofproduct(data.items.length);
        setTotalAmount(data.totalAmount);
    }

    return (
        <CartContext.Provider value={{ products, countofproducts, totalAmount, setCountofproduct, setProducts, getCart }}>
            {children}
        </CartContext.Provider>
    )
}


export default CartProvider;