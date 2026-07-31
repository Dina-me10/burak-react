import { createContext, useContext } from "react";
import { Member } from "../../lib/types/member";

// Global context qanday shakldagi ma'lumot saqlashini belgilaydi (TypeScript tip)
interface GlobalInterface {
  authMember: Member | null;      // login qilgan foydalanuvchi obyekti, yoki hech kim kirmagan bo'lsa null
  setAuthMember: (member: Member | null) => void; // shu qiymatni o'zgartiruvchi funksiya
}

// React Context yaratamiz — bu butun ilova bo'ylab ma'lumot uzatish uchun "quvur"
// Boshlang'ich qiymat "undefined" — hali hech kim Provider bilan o'ramagan degani
export const GlobalContext = createContext<GlobalInterface | undefined>(
  undefined
);

// Custom hook — context'ni oson va xavfsiz ishlatish uchun
export const useGlobals = () => {
  // Context'ning joriy qiymatini olamiz
  const context = useContext(GlobalContext);

  // Agar context "undefined" bo'lsa — demak bu komponent Provider ichida emas
  // shu sabab xato tashlaymiz (dasturchiga signal: Provider bilan o'rab qo'yish kerak)
  if (context === undefined) throw new Error("useGlobals witbit Provider");

  // Hammasi joyida bo'lsa — context'ni qaytaramiz (authMember + setAuthMember)
  return context;
};