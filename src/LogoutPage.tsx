// ✅ LogoutPage.tsx (Tối ưu + có TypeScript)
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Xóa toàn bộ thông tin user khỏi localStorage
    localStorage.removeItem("user");

    // Nếu bạn dùng token khác như "accessToken" hay "refreshToken", có thể xóa thêm:
    // localStorage.removeItem("accessToken");
    // localStorage.removeItem("refreshToken");

    // 🕒 Sau 2s tự động quay về trang login
    const timer = setTimeout(() => {
      navigate("/login", { replace: true }); // replace để tránh back quay lại page cũ
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gray-50">
      <div className="bg-white shadow-md rounded-2xl p-8 w-96 text-center border border-gray-200">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          👋 Đăng xuất thành công!
        </h2>
        <p className="text-gray-600 mb-2">
          Phiên đăng nhập của bạn đã được kết thúc.
        </p>
        <p className="text-gray-500 text-sm">
          Đang chuyển hướng đến trang đăng nhập...
        </p>
      </div>
    </div>
  );
};

export default LogoutPage;
