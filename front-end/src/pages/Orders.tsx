import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/BaseUrl";
import { useAuth } from "../context/Auth/AuthContext";

export default function Orders() {

  const [orders, setOrders] = useState([])

  const { token } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get(`${BASE_URL}/cart/checkout`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(data.data);
      setOrders(data.data)
    }
    fetchOrders();
  }, [])
  

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm bg-white dark:bg-gray-800"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <div>
                <p className="text-sm text-white">
                  Address:  <span className="font-bold">{order.address}</span>
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-4">
              {order.orderItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4">
                  <img
                    src={item.productImage}
                    alt={item.productTitle}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {item.productTitle}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Qty: {item.quantity} × ${item.unitPrice}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    ${item.quantity * item.unitPrice}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t mt-4 pt-4 flex justify-between items-center">
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                ${order.total}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
