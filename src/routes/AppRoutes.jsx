import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/user/LandingPage";
import ProductDetails from "../components/user/ProductDetails";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminLogin from "../pages/admin/SignInForm";
import AdminPrivateRoute from "./AdminPrivateRoute";
import Cart from "../components/user/Cart";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
  path="/admin/dashboard"
  element={
    <AdminPrivateRoute>
      <AdminDashboard />
    </AdminPrivateRoute>
  }
/>
    </Routes>
  );
}
