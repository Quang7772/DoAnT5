// src/App.tsx

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles.css";

import Home from "./Home";
import Layout from "./Layout";
import Trang1 from "./Trang1";
import Trang2 from "./Trang2";
import Listsanpham from "./Listsanpham";
import Chitietsanpham from "./Chitietsanpham";
import ListProducts_SP from "./ListProducts_SP";
import ProductDetail from "./ProductDetail";
import LoginPage from "./LoginPage";
import LogoutPage from "./LogoutPage";
import RegisterPage from "./RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import ListProducts_SP_Admin from "./ListProducts_SP_Admin";
import EditProduct from "./EditProduct";
import { CartProvider } from "./CartContext"; // Context vừa sửa ở Bước 1
import CartPage from "./CartPage"; // Trang hiển thị giỏ hàng (Xem bước 3)
import ChatBox from "./ChatBox";

const App: React.FC = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Trang chính */}
            <Route index element={<ListProducts_SP />} />
            <Route path="chat" element={<ChatBox />} />
            {/* Các trang khác */}
            <Route path="trang1" element={<Trang1 />} />
            <Route path="listsanpham" element={<Listsanpham />} />
            <Route path="detail/:id" element={<ProductDetail />} />
            <Route path="/admin/edit/:id" element={<EditProduct />} />
            <Route path="sanpham/:id" element={<Chitietsanpham />} />
            <Route path="trang2" element={<Trang2 />} />
            <Route path="cart" element={<CartPage />} />

            {/* Đăng nhập, đăng xuất */}
            <Route path="login" element={<LoginPage />} />
            <Route path="logout" element={<LogoutPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Trang Admin - Có bảo vệ */}
            <Route
              path="admin/products"
              element={
                <ProtectedRoute>
                  <ListProducts_SP_Admin />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
