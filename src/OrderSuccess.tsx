import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./asset/CSS/order-success.css";

const OrderSuccessPage: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const initialState = location.state || {};
  const [orderData, setOrderData] = useState<any>(initialState);

  useEffect(() => {
    // Nếu reload F5 hoặc vào thẳng thì gọi Supabase
    if (!initialState.orderInfo && orderId) {
      fetchOrderFromSupabase();
    }
  }, [orderId]);

  const fetchOrderFromSupabase = async () => {
    const { data, error } = await supabase.rpc("get_order_by_id", {
      order_id: Number(orderId),
    });

    if (error) {
      console.error(error);
      return;
    }

    if (data && data.length > 0) {
      const order = data[0];

      setOrderData({
        orderInfo: {
          fullName: order.customer_name,
          email: order.customer_email,
          phone: order.customer_phone,
          address: order.shipping_address,
          city: "",
          district: "",
          ward: "",
          paymentMethod: order.payment_method,
        },
        cartItems: order.order_items,
        totalPrice: order.total_price,
      });
    }
  };

  const { orderInfo, cartItems, totalPrice } = orderData;

  if (!orderId) {
    return (
      <div className="success-container">
        <div className="error-box">
          <h2>❌ Không tìm thấy đơn hàng</h2>
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
        <p className="success-message">Cảm ơn bạn đã mua sắm tại QDH Shop</p>

        <div className="order-code">
          <p className="code-label">Mã đơn hàng:</p>
          <p className="code-value">#{orderId}</p>
        </div>

        {orderInfo && (
          <div className="customer-info">
            <h3>👤 Thông tin khách hàng</h3>
            <p>
              <strong>Tên:</strong> {orderInfo.fullName}
            </p>
            <p>
              <strong>Email:</strong> {orderInfo.email}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {orderInfo.phone}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {orderInfo.address}
            </p>
            <p>
              <strong>Thanh toán:</strong> {orderInfo.paymentMethod}
            </p>
          </div>
        )}

        {cartItems && (
          <div className="order-details">
            <h3>📦 Chi tiết đơn hàng</h3>
            <table className="details-table">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item: any, i: number) => (
                  <tr key={i}>
                    <td>{item.product_title}</td>
                    <td>{item.quantity}</td>
                    <td>{Number(item.product_price).toLocaleString()} ₫</td>
                    <td>
                      {(item.quantity * item.product_price).toLocaleString()} ₫
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="total-amount">
              <strong>Tổng tiền:</strong>
              <strong className="amount">
                {Number(totalPrice).toLocaleString()} ₫
              </strong>
            </div>
          </div>
        )}

        <div className="success-actions">
          <button onClick={() => navigate("/")} className="btn-primary">
            🏠 Trang chủ
          </button>
          <button
            onClick={() => navigate("/listsanpham")}
            className="btn-secondary"
          >
            🛍️ Tiếp tục mua sắm
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
