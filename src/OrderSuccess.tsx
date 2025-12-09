import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./asset/CSS/order-success.css";

const OrderSuccessPage: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { orderInfo, cartItems, totalPrice } = location.state || {};

  if (!orderId) {
    return (
      <div className="success-container">
        <div className="error-box">
          <div className="error-icon">❌</div>
          <h2>Lỗi</h2>
          <p>Không tìm thấy thông tin đơn hàng</p>
          <button onClick={() => navigate("/")} className="btn-primary">
            ← Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="success-container">
      <div className="success-box">
        <div className="success-animation">
          <div className="checkmark">✓</div>
        </div>

        <h1 className="success-title">Đặt hàng thành công!</h1>
        <p className="success-message">
          Cảm ơn bạn đã mua sắm tại QDH Shop
        </p>

        <div className="order-code">
          <p className="code-label">Mã đơn hàng:</p>
          <p className="code-value">#{orderId}</p>
        </div>

        {orderInfo && (
          <div className="customer-info">
            <h3>👤 Thông tin khách hàng</h3>
            <p><strong>Tên:</strong> {orderInfo.fullName}</p>
            <p><strong>Email:</strong> {orderInfo.email}</p>
            <p><strong>Số điện thoại:</strong> {orderInfo.phone}</p>
            <p>
              <strong>Địa chỉ giao hàng:</strong> {orderInfo.address},{" "}
              {orderInfo.ward}, {orderInfo.district}, {orderInfo.city}
            </p>
            <p>
              <strong>Phương thức thanh toán:</strong>{" "}
              {orderInfo.paymentMethod === "cod"
                ? "COD (Thanh toán khi nhận hàng)"
                : orderInfo.paymentMethod === "bank"
                ? "Chuyển khoản ngân hàng"
                : "Thẻ tín dụng / Debit"}
            </p>
          </div>
        )}

        {cartItems && cartItems.length > 0 && (
          <div className="order-details">
            <h3>📦 Chi tiết đơn hàng</h3>
            <table className="details-table">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.product.id}>
                    <td>{item.product.title}</td>
                    <td>{item.quantity}</td>
                    <td>{Number(item.product.price).toLocaleString()} ₫</td>
                    <td>
                      {(Number(item.product.price) * item.quantity).toLocaleString()} ₫
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="total-amount">
              <strong>Tổng tiền:</strong>
              <strong className="amount">
                {totalPrice ? totalPrice.toLocaleString() : "0"} ₫
              </strong>
            </div>
          </div>
        )}

        <div className="next-steps">
          <h3>📬 Các bước tiếp theo</h3>
          <ul>
            <li>✓ Đơn hàng của bạn đang được xử lý</li>
            <li>✓ Bạn sẽ nhận email xác nhận trong vòng 5 phút</li>
            <li>✓ Hàng sẽ được giao trong 2-3 ngày làm việc</li>
            <li>✓ Bạn có thể theo dõi đơn hàng bằng mã đơn hàng trên</li>
          </ul>
        </div>

        <div className="support-info">
          <p>❓ Cần hỗ trợ? Liên hệ: <strong>support@qdhshop.vn</strong> hoặc <strong>(024) 1234 5678</strong></p>
        </div>

        <div className="success-actions">
          <button onClick={() => navigate("/")} className="btn-primary">
            🏠 Quay lại trang chủ
          </button>
          <button onClick={() => navigate("/listsanpham")} className="btn-secondary">
            🛍️ Tiếp tục mua sắm
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;