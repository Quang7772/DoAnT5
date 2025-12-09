import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useCart } from "./CartContext";
import "./asset/CSS/Chitietsanpham.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { addToCart } = useCart();

  // ⭐ Format tiền VNĐ
  const formatPrice = (p) =>
    Number(p).toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  // ⭐ Lấy sản phẩm + sản phẩm liên quan
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        setProduct(data);

        // ⭐ Lấy sản phẩm liên quan theo category
        if (data.category) {
          const { data: related } = await supabase
            .from("product1")
            .select("*")
            .eq("category", data.category)
            .neq("id", id)
            .limit(6);

          setRelatedProducts(related || []);
        }
      } catch (err) {
        setError("Không thể tải sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="loading-box">
        <div className="loader"></div>
        <p>Đang tải sản phẩm...</p>
      </div>
    );

  if (error)
    return (
      <div className="error-box">
        <p>{error}</p>
        <button onClick={() => navigate(-1)}>← Quay lại</button>
      </div>
    );

  if (!product) return <p>Không tìm thấy sản phẩm.</p>;

  return (
    <div className="detail-container">
      {/* Nút quay lại */}
      <button className="btn-back" onClick={() => navigate(-1)}>
        ← Quay lại danh sách
      </button>

      <div className="detail-wrapper">
        {/* Hình ảnh sản phẩm */}
        <div className="detail-image">
          <img src={product.image} alt={product.title} />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="detail-info">
          <h2>{product.title}</h2>

          <p className="detail-price">{formatPrice(product.price)}</p>

          <p className="detail-rating">
            ⭐ {product.rating_rate ?? 5} ({product.rating_count ?? 1} đánh giá)
          </p>

          <p className="detail-desc">
            {product.description || "Chưa có mô tả cho sản phẩm này."}
          </p>

          {/* Chọn số lượng */}
          <div className="qty-box">
            <label>Số lượng:</label>
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </div>

          {/* Nút thêm vào giỏ */}
          <button
            className="btn-add-cart"
            onClick={() => {
              addToCart({
                ...product,
                qty,
                id: Number(product.id),
                price: Number(product.price),
              });
              alert("Đã thêm vào giỏ hàng!");
            }}
          >
            🛒 Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      {/* Sản phẩm liên quan */}
      <h3 className="related-title">🔍 Sản phẩm liên quan</h3>

      <div className="related-grid">
        {relatedProducts.map((item) => (
          <div
            key={item.id}
            className="related-card"
            onClick={() => navigate(`/detail/${item.id}`)}
          >
            <img src={item.image} alt={item.title} />
            <p className="related-name">{item.title}</p>
            <p className="related-price">{formatPrice(item.price)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
