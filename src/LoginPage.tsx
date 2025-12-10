import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "./supabaseClient";
import anhlogo1 from "./asset/CSS/images/keylogin.png";
import "./asset/CSS/login.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!username.trim() || !password.trim()) {
      alert("❌ Vui lòng nhập đầy đủ thông tin!");
      setLoading(false);
      return;
    }

    try {
      // Lấy user từ Supabase
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .eq("password", password)
        .maybeSingle();

      if (error) {
        alert("❌ Lỗi kết nối server!");
      } else if (!data) {
        alert("❌ Sai tên đăng nhập hoặc mật khẩu!");
      } else {
        // ⭐ LƯU THÔNG TIN USER VÀ ROLE
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: data.username,
            role: data.role,
            isAdmin: data.role === "admin", // <- CHECK QUYỀN TRONG DB
          })
        );

        alert("✅ Đăng nhập thành công!");

        if (data.role === "admin") {
          navigate("/admin/products"); // chuyển vào trang admin
        } else {
          navigate("/"); // user bình thường
        }
      }
    } catch (err) {
      console.error(err);
      alert("❌ Đã xảy ra lỗi!");
    }

    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img src={anhlogo1} alt="Logo" className="login-logo" />
        <h2 className="login-title">Đăng nhập</h2>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              placeholder="Nhập tên đăng nhập..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>

        <p className="register-link">
          Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
