import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "./supabaseClient";
import anhlogo1 from "./asset/CSS/images/keylogin.png";
import "./asset/CSS/login.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("⚠️ Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (password !== confirmPassword) {
      alert("❌ Mật khẩu không khớp!");
      return;
    }

    setLoading(true);

    // 🔍 Kiểm tra xem username đã tồn tại chưa
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .maybeSingle();

    if (existingUser) {
      alert("⚠️ Tên đăng nhập đã tồn tại!");
      setLoading(false);
      return;
    }

    // 🟢 Tạo tài khoản mới
    const { error } = await supabase.from("users").insert([
      {
        username: username.trim(),
        password: password.trim(), // demo: chưa mã hoá
      },
    ]);

    if (error) {
      alert("❌ Lỗi khi tạo tài khoản! " + error.message);
    } else {
      alert("✅ Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    }

    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img src={anhlogo1} alt="Logo" className="login-logo" />

        <h2 className="login-title">Tạo tài khoản mới</h2>
        <p className="login-subtitle">
          Hoàn tất đăng ký để tham gia cùng chúng tôi
        </p>

        <form onSubmit={handleRegister} className="login-form">
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

          <div className="form-group">
            <label>Nhập lại mật khẩu</label>
            <input
              type="password"
              placeholder="Xác nhận mật khẩu..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "⏳ Đang xử lý..." : "Đăng ký"}
          </button>
        </form>

        <p className="register-link">
          Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
