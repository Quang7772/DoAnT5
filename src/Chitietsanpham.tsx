import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import "./asset/CSS/Chitietsanpham.css"; // ⭐ THÊM CSS

export default function Chitietsanpham() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://68f97a99ef8b2e621e7c302b.mockapi.io/products/${id}`
        );
        if (!response.ok) throw new Error("Không thể tải sản phẩm!");

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p style={{ padding: 20 }}>Đang tải dữ liệu...</p>;

  if (error || !product) {
    return (
      <div style={{ padding: 20 }}>
        <h3>Không tìm thấy sản phẩm!</h3>
        <p>{error}</p>
        <button onClick={() => navigate("/")}>Quay lại trang chủ</button>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Quay lại
      </button>

      <div className="product-container">
        <img src={product.image} alt={product.title} />

        <div className="product-info">
          <h2>{product.title}</h2>
          <p>
            <strong>Giá:</strong> ${product.price}
          </p>
          <p>
            <strong>Loại:</strong> {product.category}
          </p>

          <p className="product-description">{product.description}</p>

          <button
            className="add-cart-btn"
            onClick={() => {
              addToCart(product);
              setAdded(true); // ⭐ HIỆN THÔNG BÁO
              setTimeout(() => setAdded(false), 2000); // Ẩn sau 2 giây
            }}
          >
            🛒 Thêm vào giỏ hàng
          </button>

          {added && <p className="added-message">✔ Đã thêm vào giỏ hàng!</p>}
        </div>
      </div>
    </div>
  );
}
