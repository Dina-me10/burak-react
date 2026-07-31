import { useState } from "react";
import { CartItem } from "../../lib/types/search";

// Custom hook — savatcha logikasini butunlay o'z ichiga oladi
const useBasket = () => {
  
  // Sahifa yuklanganda localStorage'dan avvalgi savatcha ma'lumotini o'qiymiz
  const cartJson: string | null = localStorage.getItem("cartData");
  
  // Agar localStorage'da data bo'lsa — JSON'dan object'ga aylantiramiz, bo'lmasa bo'sh massiv
  const currentCart = cartJson ? JSON.parse(cartJson) : [];
  
  // State — boshlang'ich qiymat sifatida localStorage'dan olingan savatchani beramiz
  // (shu sabab sahifa refresh bo'lsa ham savatcha o'chib qolmaydi)
  const [cartItems, setCartItems] = useState<CartItem[]>(currentCart);

  // ==================== MAHSULOT QO'SHISH ====================
  const onAdd = (input: CartItem) => {
    // Savatchada shu mahsulot allaqachon bormi, tekshiramiz (_id bo'yicha)
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === input._id
    );

    if (exist) {
      // Agar mavjud bo'lsa — faqat shu mahsulotning sonini (quantity) 1 taga oshiramiz
      const cartUpdate = cartItems.map((item: CartItem) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity + 1 } // topilgan mahsulot — quantity +1
          : item // boshqa mahsulotlar o'zgarishsiz qoladi
      );
      setCartItems(cartUpdate); // state'ni yangilaymiz
      localStorage.setItem("cartData", JSON.stringify(cartUpdate)); // localStorage'ga ham saqlaymiz
    } else {
      // Agar mavjud bo'lmasa — yangi mahsulot sifatida ro'yxatga qo'shamiz
      const cartUpdate = [...cartItems, { ...input }];
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    }
  };

  // ==================== MAHSULOT SONINI KAMAYTIRISH ====================
  const onRemove = (input: CartItem) => {
    // Savatchada shu mahsulotni topamiz
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === input._id
    );

    if (exist.quantity === 1) {
      // Agar soni 1 ta bo'lsa — kamaytirish o'rniga mahsulotni butunlay o'chiramiz
      const cartUpdate = cartItems.filter(
        (item: CartItem) => item._id !== input._id
      );
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    } else {
      // Aks holda — sonini 1 taga kamaytiramiz
      const cartUpdate = cartItems.map((item: CartItem) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity - 1 }
          : item
      );
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    }
  };

  // ==================== MAHSULOTNI BUTUNLAY O'CHIRISH ====================
  const onDelete = (input: CartItem) => {
    // Shu _id'ga teng bo'lmagan mahsulotlarni qoldiramiz (ya'ni berilganini chiqarib tashlaymiz)
    const cartUpdate = cartItems.filter(
      (item: CartItem) => item._id !== input._id
    );
    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  };

  // ==================== SAVATCHANI TO'LIQ TOZALASH ====================
  const onDeleteAll = () => {
    setCartItems([]); // state'ni bo'sh massiv qilamiz
    localStorage.removeItem("cartData"); // localStorage'dan ham butunlay o'chiramiz
  };

  // Bu hook'ni ishlatadigan komponentlarga kerakli data va funksiyalarni qaytaramiz
  return {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
  };
};

export default useBasket;