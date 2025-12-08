import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "./supabaseClient"; // ✅ import supabase
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
      // ✅ Truy vấn Supabase bảng `users`
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .eq("password", password) // demo: plain text
        .maybeSingle();

      if (error) {
        alert("❌ Lỗi kết nối với server!");
      } else if (!data) {
        alert("❌ Sai tên đăng nhập hoặc mật khẩu!");
      } else {
        // Lưu thông tin user vào localStorage (dùng trong app)
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: data.username,
            isAdmin: data.username === "admin",
          })
        );
        alert("✅ Đăng nhập thành công!");
        navigate("/"); // chuyển về trang chính
      }
    } catch (err) {
      console.error(err);
      alert("❌ Có lỗi xảy ra!");
    }

    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img src={anhlogo1} alt="Logo" className="login-logo" />

        <h2 className="login-title">Đăng nhập vào tài khoản</h2>
        <p className="login-subtitle">Sử dụng tài khoản của bạn để tiếp tục</p>

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
            {loading ? "⏳ Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>
        <p className="register-link">
          Bạn chưa có tài khoản? <Link to="/register">Tạo tài khoản mới</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
