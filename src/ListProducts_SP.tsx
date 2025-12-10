import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./asset/CSS/ProductList.css";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating_rate?: number;
  rating_count?: number;
}

const ListProducts_SP: React.FC = () => {
  const [listProduct, setListProduct] = useState<Product[]>([]);
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortType, setSortType] = useState<string>("popular");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from<Product>("product1")
          .select("*");

        if (error) throw error;

        setListProduct(data || []);

        // → Featured product lấy 4 sản phẩm random
        setFeatured((data || []).slice(0, 4));
      } catch (err: any) {
        console.error("❌ Lỗi:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // FILTERRRRRRRRRR
  const filteredList = listProduct.filter((item) =>
    filterCategory === "all" ? true : item.category === filterCategory
  );

  // SORTTTTTTTTTT
  const sortedList = [...filteredList].sort((a, b) => {
    switch (sortType) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "newest":
        return b.id - a.id;
      default:
        return b.rating_count! - a.rating_count!; // phổ biến
    }
  });

  if (loading) {
    return <div className="loading-text">⏳ Đang tải sản phẩm...</div>;
  }

  return (
    <div className="product-page">
      {/* ===================== FEATURED PRODUCTS ===================== */}
      <h2 className="section-title">🔥 Sản phẩm nổi bật</h2>

      <div className="featured-grid">
        {featured.map((p) => (
          <div
            key={p.id}
            className="product-card featured-card"
            onClick={() => navigate(`/detail/${p.id}`)}
          >
            <img src={p.image} className="product-img" />
            <h4 className="product-title">{p.title}</h4>
            <p className="product-price">{p.price.toLocaleString("vi-VN")}₫</p>
          </div>
        ))}
      </div>

      {/* ===================== SORT BAR ===================== */}
      <div className="sort-bar">
        <span>Sắp xếp:</span>
        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="popular">Phổ biến</option>
          <option value="newest">Mới nhất</option>
          <option value="price-asc">Giá thấp → cao</option>
          <option value="price-desc">Giá cao → thấp</option>
        </select>
      </div>

      {/* ===================== ALL PRODUCTS ===================== */}
      <h2 className="section-title">🛍️ Tất cả sản phẩm</h2>

      <div className="product-grid">
        {sortedList.map((p) => (
          <div
            key={p.id}
            className="product-card"
            onClick={() => navigate(`/detail/${p.id}`)}
          >
            <img src={p.image} className="product-img" />

            <div className="card-body">
              <h4 className="product-title">{p.title}</h4>
              <p className="product-price">
                {p.price.toLocaleString("vi-VN")}₫
              </p>
              <p className="product-rating">
                ⭐ {p.rating_rate ?? 0} ({p.rating_count ?? 0})
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProducts_SP;
