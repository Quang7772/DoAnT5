import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./asset/CSS/listsanpham.css";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category?: string;
  rating_rate?: number;
  rating_count?: number;
}

const ListProducts_SP: React.FC = () => {
  const [listProduct, setListProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const navigate = useNavigate();

  // ================= FETCH PRODUCT =================
  useEffect(() => {
    fetchProducts();
  }, [search, sort, category, priceRange]);

  const fetchProducts = async () => {
    setLoading(true);

    try {
      let query = supabase.from<Product>("product1").select("*");

      // 🔍 Lọc theo tìm kiếm
      if (search.trim() !== "") {
        query = query.ilike("title", `%${search}%`);
      }

      // 🏷 Lọc theo danh mục
      if (category !== "all") {
        query = query.ilike("category", category);
      }

      // 💰 Lọc theo giá bằng dropdown
      if (priceRange !== "all") {
        const [min, max] = priceRange.split("-").map(Number);
        query = query.gte("price", min).lte("price", max);
      }

      // 🎚 Sắp xếp
      if (sort === "price_asc")
        query = query.order("price", { ascending: true });
      if (sort === "price_desc")
        query = query.order("price", { ascending: false });
      if (sort === "newest") query = query.order("id", { ascending: false });

      const { data, error } = await query;

      if (error) throw error;

      setListProduct(data || []);
    } catch (err: any) {
      console.error("❌ Lỗi lấy dữ liệu:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // =============== UI ===============

  return (
    <div className="product-page-wrapper">
      <h2 className="page-title">🛍️ Danh sách sản phẩm</h2>

      {/* ⭐ Bộ lọc sản phẩm */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="🔎 Tìm kiếm..."
          className="filter-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* CATEGORY */}
        <select
          className="filter-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">Tất cả danh mục</option>
          <option value="Apple">Apple</option>
          <option value="Samsung">Samsung</option>
          <option value="Xiaomi">Xiaomi</option>
          <option value="Oppo">Oppo</option>
          <option value="Realme">Realme</option>
          <option value="other">Khác</option>
        </select>

        {/* SORTING */}
        <select
          className="filter-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Mặc định</option>
          <option value="price_asc">Giá tăng dần</option>
          <option value="price_desc">Giá giảm dần</option>
          <option value="newest">Mới nhất</option>
        </select>

        {/* PRICE RANGE */}
        <select
          className="filter-select"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option value="all">Tất cả giá</option>
          <option value="0-5000000">Dưới 5 triệu</option>
          <option value="5000000-10000000">5 - 10 triệu</option>
          <option value="10000000-20000000">10 - 20 triệu</option>
          <option value="20000000-999999999">Trên 20 triệu</option>
        </select>
      </div>

      {/* LIST PRODUCTS */}
      {loading ? (
        <div className="loading">⏳ Đang tải sản phẩm...</div>
      ) : listProduct.length === 0 ? (
        <p className="empty-text">📭 Không có sản phẩm phù hợp!</p>
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
