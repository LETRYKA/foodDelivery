import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext({
  cart: [] as { food: any; quantity: number }[],
  addToCart: (item: { food: any; quantity: number }) => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<{ food: any; quantity: number }[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const addToCart = (item: { food: any; quantity: number }) => {
    setCart((prevCart) => {
      const newCart = [...prevCart, item];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
