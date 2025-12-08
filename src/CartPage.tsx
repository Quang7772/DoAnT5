// src/CartPage.tsx
import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const {
    cartItems,
    totalPrice,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const navigate = useNavigate();

  // ===== GIỎ HÀNG TRỐNG =====
  if (cartItems.length === 0)
    return (
      <div style={styles.emptyContainer}>
        <h3 style={{ marginBottom: 20 }}>🛒 Giỏ hàng của bạn đang trống</h3>
        <button onClick={() => navigate("/")} style={styles.btnBack}>
          ⬅ Quay lại mua sắm
        </button>
      </div>
    );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🛍 Giỏ hàng của bạn ({cartItems.length} SP)</h2>

      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeadRow}>
            <th style={styles.th}>Sản phẩm</th>
            <th style={styles.th}>Đơn giá</th>
            <th style={styles.th}>Số lượng</th>
            <th style={styles.th}>Thành tiền</th>
            <th style={styles.th}>Xóa</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item) => (
            <tr key={item.product.id} style={styles.row}>
              <td style={styles.productCell}>
                <img
                  src={item.product.image}
                  width={60}
                  height={60}
                  style={styles.productImage}
                  alt=""
                />
                <span style={styles.productTitle}>{item.product.title}</span>
              </td>

              <td style={styles.center}>
                {Number(item.product.price).toLocaleString()} ₫
              </td>

              <td style={styles.center}>
                <div style={styles.qtyContainer}>
                  <button
                    onClick={() => decreaseQuantity(item.product.id)}
                    style={styles.qtyBtn}
                  >
                    -
                  </button>
                  <span style={styles.qtyText}>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.product.id)}
                    style={styles.qtyBtn}
                  >
                    +
                  </button>
                </div>
              </td>

              <td style={styles.totalCell}>
                {(Number(item.product.price) * item.quantity).toLocaleString()}{" "}
                ₫
              </td>

              <td style={styles.center}>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  style={styles.deleteBtn}
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Thanh toán */}
      <div style={styles.checkoutBar}>
        <button onClick={() => navigate("/")} style={styles.btnBack}>
          ⬅ Tiếp tục mua hàng
        </button>

        <div style={{ textAlign: "right" }}>
          <h3 style={styles.totalText}>
            Tổng cộng:{" "}
            <span style={styles.totalNumber}>
              {totalPrice.toLocaleString()} ₫
            </span>
          </h3>
          <button style={styles.btnCheckout}>Thanh toán ngay</button>
        </div>
      </div>
    </div>
  );
}

// ================= CSS =================
const styles: Record<string, any> = {
  container: {
    padding: "30px 20px",
    maxWidth: 1000,
    margin: "auto",
  },

  title: {
    marginBottom: 20,
    fontWeight: "700",
    fontSize: "24px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 0 10px rgba(0,0,0,0.05)",
    borderRadius: 8,
    overflow: "hidden",
  },

  tableHeadRow: {
    backgroundColor: "#f0f0f0",
  },

  th: {
    padding: "12px",
    fontWeight: "600",
    borderBottom: "1px solid #ddd",
  },

  row: {
    borderBottom: "1px solid #eee",
  },

  productCell: {
    padding: 12,
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  productImage: {
    objectFit: "contain",
    borderRadius: 6,
    background: "#fff",
    border: "1px solid #eee",
    padding: 4,
  },

  productTitle: {
    maxWidth: 250,
    fontWeight: "500",
  },

  center: { textAlign: "center", padding: 10 },

  qtyContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  qtyBtn: {
    width: 28,
    height: 28,
    cursor: "pointer",
    backgroundColor: "#efefef",
    border: "1px solid #ccc",
    borderRadius: 6,
    fontSize: 16,
  },

  qtyText: {
    minWidth: 20,
    textAlign: "center",
    fontWeight: "600",
  },

  totalCell: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#d32f2f",
  },

  deleteBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 20,
    color: "#d9534f",
  },

  checkoutBar: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 30,
    paddingTop: 20,
    borderTop: "1px solid #eee",
  },

  totalText: {
    marginBottom: 10,
    fontSize: 20,
  },

  totalNumber: {
    color: "#d32f2f",
    fontWeight: "700",
    fontSize: "22px",
  },

  // BUTTONS
  btnBack: {
    padding: "10px 20px",
    background: "#fff",
    color: "#333",
    border: "1px solid #ccc",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "500",
  },

  btnCheckout: {
    padding: "12px 24px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: 6,
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  emptyContainer: {
    textAlign: "center",
    marginTop: 80,
  },
};
