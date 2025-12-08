import "./asset/CSS/layout.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Layout = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  // Kiểm tra đăng nhập
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="layout-shop">
      {/* ================= HEADER ================= */}
      <header className="shop-header">
        {/* Thanh thông báo */}
        <div className="top-bar">
          <span>Miễn phí giao hàng cho đơn trên 500.000đ 🚚</span>
        </div>

        {/* Header chính */}
        <div className="main-header container">
          {/* LOGO */}
          <div className="logo-area">
            <Link to="/" className="logo-text">
              🛍️ <span>QDH</span> <strong>Shop</strong>
            </Link>
          </div>

          {/* SEARCH */}
          <div className="search-area">
            <input type="text" placeholder="Tìm sản phẩm, thương hiệu..." />
            <button>Tìm kiếm</button>
          </div>

          {/* MENU PHẢI */}
          <div className="user-area">
            <Link to="/cart" className="cart-btn">
              🛒 Giỏ hàng
            </Link>

            {user ? (
              <button onClick={handleLogout} className="logout-btn">
                🚪 Thoát
              </button>
            ) : (
              <Link to="/admin/products" className="login-btn">
                🔑 Đăng nhập
              </Link>
            )}
            <Link to="/chat" className="menu-item">
              🤖 Chat với AI
            </Link>
          </div>
        </div>

        {/* THANH DANH MỤC */}
        <nav className="nav-bar">
          <ul>
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <Link to="/listsanpham">Sản phẩm</Link>
            </li>
            <li>
              <Link to="/trang2">Liên hệ</Link>
            </li>
            <li>
              <Link to="/trang1">Giới thiệu</Link>
            </li>
            <li>
              <Link to="/admin/products">Quản trị</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="shop-content">
        <Outlet />
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="shop-footer">
        <div className="footer-container container">
          <div className="footer-col">
            <h4>Về QDH Shop</h4>
            <p>
              QDH Shop – nơi mua sắm đáng tin cậy, chuyên cung cấp các sản phẩm
              chất lượng, giá tốt và dịch vụ chu đáo.
            </p>
          </div>

          <div className="footer-col">
            <h4>Liên kết nhanh</h4>
            <ul>
              <li>
                <Link to="/">Trang chủ</Link>
              </li>
              <li>
                <Link to="/listsanpham">Sản phẩm</Link>
              </li>
              <li>
                <Link to="/cart">Giỏ hàng</Link>
              </li>
              <li>
                <Link to="/login">Đăng nhập</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Liên hệ</h4>
            <p>📍 123 Nguyễn Trãi, Hà Nội</p>
            <p>📞 (024) 1234 5678</p>
            <p>✉️ support@qdhshop.vn</p>
          </div>

          <div className="footer-col">
            <h4>Kết nối với chúng tôi</h4>
            <div className="social-icons">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#">
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © 2025 QDH Shop — All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
