import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./asset/CSS/listsanpham.css";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating_rate?: number;
  rating_count?: number;
}

const ListProducts_SP: React.FC = () => {
  const [listProduct, setListProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from<Product>("product1")
          .select("*")
          .order("id", { ascending: true });

        if (error) throw error;
        setListProduct(data || []);
      } catch (err: any) {
        console.error("❌ Lỗi khi lấy dữ liệu:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="loading">⏳ Đang tải sản phẩm...</div>;
  }

  return (
    <div className="product-page-wrapper">
      <h2 className="page-title">🛍️ Danh sách sản phẩm</h2>

      {listProduct.length === 0 ? (
        <p className="empty-text">📭 Không có sản phẩm nào!</p>
      ) : (
        <div className="product-grid">
          {listProduct.map((p) => (
            <div
              key={p.id}
              className="product-card"
              onClick={() => navigate(`/detail/${p.id}`)}
            >
              <div className="product-img-box">
                <img src={p.image} alt={p.title} className="product-img" />
              </div>

              <div className="product-info">
                <h4 className="product-title">{p.title}</h4>

                <p className="product-price">
                  {p.price.toLocaleString("vi-VN")}₫
                </p>

                <p className="product-rating">
                  ⭐ {p.rating_rate ?? 0} ({p.rating_count ?? 0} đánh giá)
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListProducts_SP;
