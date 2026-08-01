import { createContext, useContext } from "react";
import { Member } from "../../lib/types/member";
import { CartItem } from "../../lib/types/search";

interface GlobalInterface {
  authMember: Member | null;
  setAuthMember: (member: Member | null) => void;
  orderBuilder: Date;
  setOrderBuilder: (input: Date) => void;

  cartItems: CartItem[];               
  onAdd: (input: CartItem) => void;     
  onRemove: (input: CartItem) => void;  
  onDelete: (input: CartItem) => void;  
  onDeleteAll: () => void;              
}

export const GlobalContext = createContext<GlobalInterface | undefined>(
  undefined
);

export const useGlobals = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) throw new Error("useGlobals witthout Provider");
  return context;
};