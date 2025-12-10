import "./asset/CSS/layout.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";

const Layout = () => {
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { cartItems } = useCart();
  const navigate = useNavigate();

  // ================= Banner điện thoại =================
  const bannerImages = [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1920",
    "https://images.unsplash.com/photo-1510552776732-03e61cf4b144?q=80&w=1920",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? bannerImages.length - 1 : prev - 1
    );
  };

  // ================= User + Scroll =================
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
      <header className={`header-modern ${scrolled ? "sticky" : ""}`}>
        <div className="container">
          <div className="header-inner">
            <Link to="/" className="logo-modern">
              🛍️ <span>QDH</span> Shop
            </Link>
            <div className="action-area">
              <Link to="/cart" className="icon-btn">
                🛒
                {cartItems.length > 0 && (
                  <span className="badge-cart">{cartItems.length}</span>
                )}
              </Link>

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

              <Link to="/chat" className="icon-btn">
                🤖
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ================= BANNER ================= */}
      <section className="banner">
        <div className="banner-wrapper">
          <img
            src={bannerImages[currentIndex]}
            className="banner-img"
            alt="Banner"
          />

          <button className="slide-btn prev" onClick={prevSlide}>
            ❮
          </button>
          <button className="slide-btn next" onClick={nextSlide}>
            ❯
          </button>
        </div>
      </section>

      {/* ================= NAVIGATION ================= */}
      <nav className="nav-modern">
        <div className="container">
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
            {user?.role === "admin" && (
              <li>
                <Link to="/admin/products">⚙️ Quản trị</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* ================= CONTENT ================= */}
      <main className="shop-content">
        <Outlet />
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="shop-footer">
        <div className="container footer-container">
          <div className="footer-col">
            <h4>💎 Về QDH Shop</h4>
            <p>QDH Shop – nơi mua sắm uy tín với giá tốt và dịch vụ tận tâm.</p>
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

        <div className="footer-bottom">
          © 2025 QDH Shop — All rights reserved. ❤️
        </div>
      </footer>
    </div>
  );
};

export default Layout;
