import { createContext, useContext } from "react";

interface CartContextType {
  products: unknown;
  totalAmount: number | null;
  countofproducts: number | null;
  setProducts: React.Dispatch<React.SetStateAction<unknown[]>>; // أضفناها هنا
  setCountofproduct: React.Dispatch<React.SetStateAction<unknown[]>>; // أضفناها هنا
  getCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  products: [],
  totalAmount: 0,
  countofproducts: 0,
  setProducts: () => {},
  setCountofproduct: () => {},
  getCart: () => {},
});

export const useCart = () => useContext(CartContext);
