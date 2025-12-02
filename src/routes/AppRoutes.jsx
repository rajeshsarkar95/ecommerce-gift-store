import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/user/LandingPage"
import ProductDetails from "../components/user/ProductDetails"
import AdminDashboard from "../pages/admin/AdminDashboard"
import Cart from "../components/user/Cart";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/product/:id" element={<ProductDetails/>}/>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}