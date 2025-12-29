import { Routes, Route } from "react-router-dom";

import UserLayout from "../layouts/UserLayout";
import LandingPage from "../pages/user/LandingPage";
import ProductDetails from "../components/user/ProductDetails";
import Cart from "../components/user/Cart";
import FlashDealsPage from "../pages/user/FlashDealsPage";
import TopsellerPage from "../pages/user/TopsellerPage";
import TShirtCollection from "../pages/user/TShirtCollectionPage";
import HoodiesCollection from "../pages/user/HoodiesCollectionPage";
import MugCollection from "../pages/user/MugCollectionPage";
import RecommendedProductsPage from "../pages/user/RecommendedProductsPage";
import FeaturedProductsPage from "../pages/user/FeaturedProductsPage";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminLogin from "../pages/admin/SignInForm";
import AdminPrivateRoute from "./AdminPrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>

      {/* USER ROUTES */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/flashdealspage" element={<FlashDealsPage />} />
        <Route path="/topsellerpage" element={<TopsellerPage />} />
        <Route path="/tshirtpage" element={<TShirtCollection />} />
        <Route path="/hoodiesPage" element={<HoodiesCollection />} />
        <Route path="/mugspage" element={<MugCollection />} />
        <Route path="/featuredproducts" element={<FeaturedProductsPage />} />
        <Route path="/recommendedproducts" element={<RecommendedProductsPage />} />
      </Route>

      {/* ADMIN ROUTES (NO NUMBER / NO NAVBAR) */}
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
