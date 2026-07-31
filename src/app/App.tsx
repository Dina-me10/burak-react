import { useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import ProductsPage from "./screens/productsPage";
import OrdersPage from "./screens/ordersPage";
import UserPage from "./screens/userPage";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";
import HelpPage from "./screens/helpPage";
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
import Test from "./screens/Test";
import { CartItem } from "../lib/types/search";
import useBasket from "./hooks/useBasket";
import AuthenticationModal from "./components/auth";
import { Messages } from "../lib/config";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../lib/sweetAlert";
import { T } from "../lib/types/common";
import MemberService from "./services/MemberService";
import { useGlobals } from "./hooks/useGlobals";
 function App() {
  // Joriy URL manzilini kuzatib turadi (masalan qaysi sahifada ekanimizni bilish uchun)
  const location = useLocation();

  // Global state'dan — login qilgan foydalanuvchini o'rnatuvchi funksiyani olamiz
  const { setAuthMember } = useGlobals();

  // Savatcha logikasini custom hook'dan olamiz (data + funksiyalar)
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();

  // Signup modal ochiq/yopiqligini boshqaruvchi state
  const [signupOpen, setSignupOpen] = useState<boolean>(false);

  // Login modal ochiq/yopiqligini boshqaruvchi state
  const [loginOpen, setLoginOpen] = useState<boolean>(false);

  // Logout dropdown menyusi qaysi elementga "yopishib" ochilishini saqlaydi
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  /** HANDLERS **/

  // Signup modalini yopish uchun — false qilib qo'yadi
  const handleSignupClose = () => setSignupOpen(false);

  // Login modalini yopish uchun — false qilib qo'yadi
  const handleLoginClose = () => setLoginOpen(false);

  // Logout tugmasi (odatda profil ikonkasi) bosilganda — dropdown menyu ochiladi
  const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget); // bosilgan elementni saqlaymiz, shu joyga menyu chiqadi
  };

  // Logout dropdown menyusini yopish — anchorEl'ni null qilamiz
  const handleCloseLogout = () => setAnchorEl(null);

  // Foydalanuvchi "Logout" tugmasini bossa, shu funksiya ishga tushadi
  const handleLogoutRequest = async () => {
    try {
      // MemberService orqali backendga logout so'rovi yuboriladi
      const member = new MemberService();
      await member.logout();

      // Muvaffaqiyatli chiqildi degan qisqa xabar (yashil, yuqori burchakda, 700ms davomida)
      await sweetTopSuccessAlert("success", 700);

      // Global state'dagi authMember'ni null qilamiz — foydalanuvchi endi "chiqqan" hisoblanadi
      setAuthMember(null);
    } catch (err) {
      // Xato bo'lsa — konsolga chiqaramiz
      console.log(err);
      
      // Va foydalanuvchiga xato xabarini ko'rsatamiz
      sweetErrorHandling(Messages.error1);
    }
  };
  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
        />
      ) : (
        <OtherNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
        />
      )}
      <Switch>
        <Route path="/products">
          <ProductsPage onAdd={onAdd} />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
      <AuthenticationModal
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        handleLoginClose={handleLoginClose}
        handleSignupClose={handleSignupClose}
      />
    </>
  );
}
export default App;