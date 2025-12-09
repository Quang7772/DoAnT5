import "bootstrap/dist/css/bootstrap.min.css";
import "./asset/CSS/layout.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { Container, Navbar, Nav, Form, Button } from "react-bootstrap";

const Layout = () => {
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { cartItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));

    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/listsanpham?search=${searchInput}`);
    }
  };

  return (
    <div className="layout-shop">
      {/* ================= HEADER ================= */}
      <header className={`shop-header ${scrolled ? "scrolled" : ""}`}>
        {/* TOP BAR */}
        <div className="top-bar">
          <Container>
            <span>✨ Miễn phí giao hàng cho đơn từ 500.000đ 🚚</span>
          </Container>
        </div>

        {/* MAIN HEADER */}
        <Container className="main-header-wrapper">
          <div className="main-header">
            {/* LOGO */}
            <div className="logo-area">
              <Link to="/" className="logo-text">
                🛍️ <span>QDH</span> Shop
              </Link>
            </div>

            {/* SEARCH */}
            <form className="search-area" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Tìm sản phẩm, thương hiệu..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button type="submit">🔍 Tìm kiếm</button>
            </form>

            {/* USER AREA */}
            <div className="user-area">
              <Link to="/cart" className="cart-btn">
                🛒 Giỏ hàng
                {cartItems.length > 0 && (
                  <span className="cart-badge">{cartItems.length}</span>
                )}
              </Link>

              {user ? (
                <>
                  <span className="user-name">👤 {user.username}</span>
                  <button onClick={handleLogout} className="logout-btn">
                    🚪 Thoát
                  </button>
                </>
              ) : (
                <Link to="/login" className="login-btn">
                  🔑 Đăng nhập
                </Link>
              )}

              <Link to="/chat" className="menu-item chat-btn">
                🤖 Chat AI
              </Link>
            </div>
          </div>
        </Container>

        {/* NAV BAR */}
        <nav className="nav-bar">
          <Container>
            <ul>
              <li>
                <Link to="/">🏠 Trang chủ</Link>
              </li>
              <li>
                <Link to="/listsanpham">🛍️ Sản phẩm</Link>
              </li>
              <li>
                <Link to="/trang2">📞 Liên hệ</Link>
              </li>
              <li>
                <Link to="/trang1">ℹ️ Giới thiệu</Link>
              </li>
              <li>
                <Link to="/admin/products" className="admin-link">
                  ⚙️ Quản trị
                </Link>
              </li>
            </ul>
          </Container>
        </nav>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="shop-content">
        <Outlet />
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="shop-footer">
        <Container>
          <div className="footer-container">
            <div className="footer-col">
              <h4>💎 Về QDH Shop</h4>
              <p>
                QDH Shop – nơi mua sắm đáng tin cậy, cung cấp sản phẩm chất lượng,
                giá tốt và dịch vụ tận tâm cho hàng triệu khách hàng.
              </p>
            </div>

            <div className="footer-col">
              <h4>🔗 Liên kết nhanh</h4>
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
              <h4>📍 Liên hệ</h4>
              <p>📍 123 Nguyễn Trãi, Hà Nội</p>
              <p>📞 (024) 1234 5678</p>
              <p>✉️ support@qdhshop.vn</p>
            </div>

            <div className="footer-col">
              <h4>🤝 Kết nối với chúng tôi</h4>
              <div className="social-icons">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="YouTube"
                >
                  <i className="fab fa-youtube"></i>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="TikTok"
                >
                  <i className="fab fa-tiktok"></i>
                </a>
              </div>
            </div>
          </div>
        </Container>

        <div className="footer-bottom">
          © 2025 QDH Shop — All rights reserved. ❤️
        </div>
      </footer>
    </div>
  );
};

export default Layout;