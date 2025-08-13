import axios from "axios";
import { BASE_URL } from "../constants/BaseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useCart } from "../context/Cart/CartContext";
import { toast } from "react-toastify";

interface Props {
  _id: string;
  title: string;
  image: string;
  price: number;
  stock: number;
}


export default function Products({ _id, title, image, price, stock }: Props) {
  const { token } = useAuth();
  const { getCart } = useCart();

  const addProduct = async () => {
    const { data } = await axios.post(`${BASE_URL}/cart/items`, {
      quantity: 1,
      productId: _id
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(data.message);
    toast.success(data.message);
    getCart();

  }
  return (
    <div key={_id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between">
      <a href="#" className="flex items-center justify-center">
        <img className="p-8 rounded-t-lg w-full" src={image} alt="product image" />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          <span className="font-semibold">Stock</span>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">{stock}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">{price}</span>
          <a onClick={addProduct} href="#" className="text-white hover:cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
        </div>
      </div>
    </div>
  )
}
