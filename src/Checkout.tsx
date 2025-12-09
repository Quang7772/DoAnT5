import React, { useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./asset/CSS/checkout.css";

interface OrderInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  notes: string;
  paymentMethod: "cod" | "bank" | "card";
}

const CheckoutPage: React.FC = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "Hà Nội",
    district: "",
    ward: "",
    notes: "",
    paymentMethod: "cod",
  });

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <div className="empty-box">
          <div className="empty-icon">🛒</div>
          <h2>Giỏ hàng trống</h2>
          <p>Vui lòng chọn sản phẩm trước khi thanh toán</p>
          <button onClick={() => navigate("/")} className="btn-back">
            ← Quay lại mua sắm
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setOrderInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!orderInfo.fullName.trim()) {
      alert("❌ Vui lòng nhập họ tên");
      return false;
    }
    if (!orderInfo.email.trim() || !/\S+@\S+\.\S+/.test(orderInfo.email)) {
      alert("❌ Vui lòng nhập email hợp lệ");
      return false;
    }
    if (!orderInfo.phone.trim() || !/^\d{10,11}$/.test(orderInfo.phone)) {
      alert("❌ Vui lòng nhập số điện thoại hợp lệ (10-11 chữ số)");
      return false;
    }
    if (!orderInfo.address.trim()) {
      alert("❌ Vui lòng nhập địa chỉ cụ thể");
      return false;
    }
    if (!orderInfo.district.trim()) {
      alert("❌ Vui lòng nhập quận/huyện");
      return false;
    }
    return true;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;

      const orderData = {
        customer_name: orderInfo.fullName,
        customer_email: orderInfo.email,
        customer_phone: orderInfo.phone,
        shipping_address: `${orderInfo.address}, ${orderInfo.ward}, ${orderInfo.district}, ${orderInfo.city}`,
        total_price: totalPrice,
        payment_method: orderInfo.paymentMethod,
        order_note: orderInfo.notes,
        order_items: cartItems.map((item) => ({
          product_id: item.product.id,
          product_title: item.product.title,
          product_price: item.product.price,
          quantity: item.quantity,
        })),
        username: user?.username || "Guest",
        order_status: "pending",
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("orders")
        .insert([orderData])
        .select();

      if (error) {
        console.error("❌ Lỗi:", error);
        alert("❌ Lỗi khi tạo đơn hàng. Vui lòng thử lại!");
        setLoading(false);
        return;
      }

      clearCart();

      navigate(`/order-success/${data?.[0]?.id}`, {
        state: {
          orderInfo,
          cartItems,
          totalPrice,
          orderId: data?.[0]?.id,
        },
      });
    } catch (err) {
      console.error("❌ Lỗi:", err);
      alert("❌ Có lỗi xảy ra. Vui lòng thử lại!");
      setLoading(false);
    }
  };

  const shippingFee = totalPrice >= 500000 ? 0 : 30000;
  const finalTotal = totalPrice + shippingFee;

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">🛒 Thanh toán đơn hàng</h1>

      <div className="checkout-content">
        <div className="checkout-form-section">
          <h2 className="section-title">📋 Thông tin giao hàng</h2>

          <form onSubmit={handleSubmitOrder} className="checkout-form">
            <div className="form-group">
              <label>Họ và tên *</label>
              <input
                type="text"
                name="fullName"
                value={orderInfo.fullName}
                onChange={handleChange}
                placeholder="Nhập họ tên"
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={orderInfo.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Số điện thoại *</label>
              <input
                type="tel"
                name="phone"
                value={orderInfo.phone}
                onChange={handleChange}
                placeholder="0912345678"
                required
              />
            </div>

            <div className="form-group">
              <label>Địa chỉ cụ thể *</label>
              <input
                type="text"
                name="address"
                value={orderInfo.address}
                onChange={handleChange}
                placeholder="Số nhà, tên đường"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Thành phố/Tỉnh *</label>
                <select
                  name="city"
                  value={orderInfo.city}
                  onChange={handleChange}
                  required
                >
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="TP HCM">TP HCM</option>
                  <option value="Hải Phòng">Hải Phòng</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Cần Thơ">Cần Thơ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              <div className="form-group">
                <label>Quận/Huyện *</label>
                <input
                  type="text"
                  name="district"
                  value={orderInfo.district}
                  onChange={handleChange}
                  placeholder="Nhập quận/huyện"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phường/Xã</label>
                <input
                  type="text"
                  name="ward"
                  value={orderInfo.ward}
                  onChange={handleChange}
                  placeholder="Nhập phường/xã"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Ghi chú cho người bán (tùy chọn)</label>
              <textarea
                name="notes"
                value={orderInfo.notes}
                onChange={handleChange}
                placeholder="VD: Giao hàng giờ hành chính, cần ký tên..."
                rows={4}
              ></textarea>
            </div>

            <h2 className="section-title" style={{ marginTop: 30 }}>
              💳 Phương thức thanh toán
            </h2>

            <div className="payment-methods">
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={orderInfo.paymentMethod === "cod"}
                  onChange={handleChange}
                />
                <span className="payment-label">
                  🚚 <strong>COD</strong> (Thanh toán khi nhận hàng)
                </span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  checked={orderInfo.paymentMethod === "bank"}
                  onChange={handleChange}
                />
                <span className="payment-label">
                  🏦 <strong>Chuyển khoản ngân hàng</strong>
                </span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={orderInfo.paymentMethod === "card"}
                  onChange={handleChange}
                />
                <span className="payment-label">
                  💳 <strong>Thẻ tín dụng / Debit</strong>
                </span>
              </label>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="btn-back"
              >
                ← Quay lại giỏ hàng
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-submit"
              >
                {loading ? "⏳ Đang xử lý..." : "✓ Đặt hàng"}
              </button>
            </div>
          </form>
        </div>

        <div className="checkout-summary-section">
          <h2 className="section-title">📦 Chi tiết đơn hàng</h2>

          <div className="order-items">
            {cartItems.map((item) => (
              <div key={item.product.id} className="order-item">
                <img src={item.product.image} alt={item.product.title} />
                <div className="item-info">
                  <p className="item-title">{item.product.title}</p>
                  <p className="item-qty">x{item.quantity}</p>
                </div>
                <p className="item-price">
                  {(Number(item.product.price) * item.quantity).toLocaleString()} ₫
                </p>
              </div>
            ))}
          </div>

          <div className="order-summary">
            <div className="summary-row">
              <span>Tạm tính:</span>
              <strong>{totalPrice.toLocaleString()} ₫</strong>
            </div>
            <div className="summary-row">
              <span>Phí vận chuyển:</span>
              <strong className={shippingFee === 0 ? "free" : ""}>
                {shippingFee === 0 ? "Miễn phí" : shippingFee.toLocaleString() + " ₫"}
              </strong>
            </div>
            {shippingFee === 0 && (
              <div className="summary-note">✨ Bạn được miễn phí vận chuyển</div>
            )}
            <div className="summary-total">
              <span>Tổng cộng:</span>
              <strong>{finalTotal.toLocaleString()} ₫</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;