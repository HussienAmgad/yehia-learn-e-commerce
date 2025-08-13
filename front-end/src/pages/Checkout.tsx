import axios from "axios";
import { useRef } from "react";
import { BASE_URL } from "../constants/BaseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart/CartContext";

export default function Checkout() {

    const addressRef = useRef<HTMLInputElement>(null);

    const { token } = useAuth();

    const { setProducts, setCountofproduct } = useCart()

    const navigate = useNavigate();

    const checkout = async () => {
        try {
            const address = addressRef.current?.value;
            const { data } = await axios.post(`${BASE_URL}/cart/checkout`, {
                address
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(data.message);
            setCountofproduct(0);
            setProducts([]);
            toast.success(data.message);
            navigate("/orders");
        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="max-w-sm mx-auto">
            <div className="mb-5">
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your address</label>
                <input ref={addressRef} type="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address" />
            </div>
            <button onClick={checkout} type="submit" className="text-white hover:cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </div>
    )
}
