import React, { ReactNode, useState } from "react";
import Cookies from "universal-cookie";
import { Member } from "../../lib/types/member";
import { GlobalContext } from "../hooks/useGlobals";
import { CartItem } from "../../lib/types/search";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cookies = new Cookies();
  if (!cookies.get("accessToken")) localStorage.removeItem("memberData");

  const [authMember, setAuthMember] = useState<Member | null>(
    localStorage.getItem("memberData")
      ? JSON.parse(localStorage.getItem("memberData") as string)
      : null
  );
  const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());
const cartJson: string | null = localStorage.getItem("cartData");
const currentCart = cartJson ? JSON.parse(cartJson) : [];
const [cartItems, setCartItems] = useState<CartItem[]>(currentCart);
  console.log("=== verify ===");


const onDeleteAll = () => {
  setCartItems([]);
  localStorage.removeItem("cartData");
};

const onDelete = (input: CartItem) => {
  const cartUpdate = cartItems.filter(
    (item: CartItem) => item._id !== input._id
  );
  setCartItems(cartUpdate);
  localStorage.setItem("cartData", JSON.stringify(cartUpdate));
};

const onRemove = (input: CartItem) => {
  const exist: any = cartItems.find(
    (item: CartItem) => item._id === input._id
  );

  if (exist.quantity === 1) {
    const cartUpdate = cartItems.filter(
      (item: CartItem) => item._id !== input._id
    );
    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  } else {
    const cartUpdate = cartItems.map((item: CartItem) =>
      item._id === input._id
        ? { ...exist, quantity: exist.quantity - 1 }
        : item
    );
    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  }
};

const onAdd = (input: CartItem) => {
  const exist: any = cartItems.find(
    (item: CartItem) => item._id === input._id
  );

  if (exist) {
    const cartUpdate = cartItems.map((item: CartItem) =>
      item._id === input._id
        ? { ...exist, quantity: exist.quantity + 1 }
        : item
    );
    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  } else {
    const cartUpdate = [...cartItems, { ...input }];
    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  }
};
   return (
  <GlobalContext.Provider
    value={{
      authMember,
      setAuthMember,
      orderBuilder,
      setOrderBuilder,
      cartItems,
      onAdd,
      onRemove,
      onDelete,
      onDeleteAll,
    }}
  >
    {children}
  </GlobalContext.Provider>
  );
};

export default ContextProvider;