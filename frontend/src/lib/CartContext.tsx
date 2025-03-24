import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext({
  cart: [] as { food: any; quantity: number }[],
  addToCart: (item: { food: any; quantity: number }) => {},
  updateQuantity: (itemId: string, newQuantity: number) => {},
  removeFromCart: (itemId: string) => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<{ food: any; quantity: number }[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (item: { food: any; quantity: number }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.food._id === item.food._id
      );

      let newCart;
      if (existingItem) {
        newCart = prevCart.map((cartItem) =>
          cartItem.food._id === item.food._id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        newCart = [...prevCart, item];
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newCart));
      }

      return newCart;
    });
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    setCart((prevCart) => {
      const newCart = prevCart.map((cartItem) =>
        cartItem.food._id === itemId
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      );

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newCart));
      }

      return newCart;
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter(
        (cartItem) => cartItem.food._id !== itemId
      );

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newCart));
      }

      return newCart;
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
