import  { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id);
    if (exist) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    const exist = cart.find((item) => item.id === product.id);
    if (exist.qty === 1) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== exist.id));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty - 1 } : item
        )
      );
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
