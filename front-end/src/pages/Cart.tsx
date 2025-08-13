import { useNavigate } from "react-router-dom";
import CartProduct from "../components/CartProduct";
import { useCart } from "../context/Cart/CartContext"

export default function Cart() {

    const navigate = useNavigate();
    const { products } = useCart();

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex flex-col">
            {products.length === 0 ? <>
                <p className="text-2xl text-center mt-10">No Products In Cart</p>
            </> : <>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Qty
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Unit Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <CartProduct id={p.product} quantity={p.quantity} />
                        ))}
                    </tbody>
                </table>
            </>}
            {products.length === 0 ? <></> : <>
                <button onClick={() => navigate("/checkout")} type="button" className="text-white hover:cursor-pointer mt-10 justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Checkout</button>
            </>}
        </div>

    )
}
