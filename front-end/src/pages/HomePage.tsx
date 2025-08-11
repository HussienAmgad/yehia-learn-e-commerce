import { useEffect, useState } from "react";
import Products from "../components/Products";
import type { Product } from "../types/Product";
import axios from "axios";
import { BASE_URL } from "../constants/BaseUrl";

export default function HomePage() {

  const [products, setProducts] = useState<Product[]>([])
  const [error,setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/product`);
        setProducts(data.data);
        setError(false);
      } catch (error) {
        console.error("Error fetching products");
        setError(true);
      }
    }

    fetchData();
  }, [])

  if (error) {
    return (<p>Error Fetching Products Please Try Again</p>)
  }

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {products.map((p) => (
          <Products {...p} />
        ))}
      </div>
    </div>
  )
}
