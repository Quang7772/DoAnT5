import "bootstrap/dist/css/bootstrap.min.css";
import "./asset/CSS/layout.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { Container } from "react-bootstrap";

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
      <header className={`header-modern shadow-sm ${scrolled ? "sticky" : ""}`}>
        <Container>
          <div className="d-flex align-items-center justify-content-between py-2">
            {/* LOGO */}
            <Link to="/" className="logo-modern">
              🛍️ <span>QDH</span> Shop
            </Link>

            {/* SEARCH BOX */}
            <form className="search-box d-flex" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Tìm sản phẩm, thương hiệu..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button type="submit">🔍</button>
            </form>

            {/* ACTION AREA */}
            <div className="d-flex align-items-center gap-3 action-area">
              {/* CART */}
              <Link to="/cart" className="icon-btn">
                🛒
                {cartItems.length > 0 && (
                  <span className="badge-cart">{cartItems.length}</span>
                )}
              </Link>

              {/* USER */}
              {user ? (
                <>
                  <span className="user-name">👤 {user.username}</span>
                  <button className="logout-btn" onClick={handleLogout}>
                    Thoát
                  </button>
                </>
              ) : (
                <Link to="/login" className="icon-btn">
                  🔑
                </Link>
              )}

              {/* CHAT AI */}
              <Link to="/chat" className="icon-btn">
                🤖
              </Link>
            </div>
          </div>
        </Container>
      </header>

      {/* ================= NAV BAR ================= */}
      <nav className="nav-modern">
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
              <Link to="/admin/products">⚙️ Quản trị</Link>
            </li>
          </ul>
        </Container>
      </nav>

      {/* ================= CONTENT ================= */}
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
                QDH Shop – nơi mua sắm đáng tin cậy, cung cấp sản phẩm chất
                lượng, giá tốt và dịch vụ tận tâm.
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
              <h4>🤝 Kết nối</h4>
              <div className="social-icons">
                <a href="#">Facebook</a>
                <a href="#">Instagram</a>
                <a href="#">YouTube</a>
                <a href="#">TikTok</a>
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
