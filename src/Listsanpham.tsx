import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./asset/CSS/ProductList.css";

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
    return (
      <div
        style={{ textAlign: "center", marginTop: "50px", fontSize: "1.3rem" }}
      >
        ⏳ Đang tải sản phẩm...
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px 20px",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "2rem",
          marginBottom: "30px",
          color: "#333",
          fontWeight: 700,
          letterSpacing: "0.5px",
        }}
      >
        🛍️ Danh sách sản phẩm
      </h2>

      {/* Nếu không có sản phẩm */}
      {listProduct.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "1.1rem", color: "#555" }}>
          📭 Không có sản phẩm nào!
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "24px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {listProduct.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/detail/${p.id}`)}
              style={{
                borderRadius: "14px",
                overflow: "hidden",
                backgroundColor: "#fff",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              }}
            >
              {/* Ảnh sản phẩm */}
              <div
                style={{
                  width: "100%",
                  height: "230px",
                  backgroundColor: "#f3f3f3",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>

              {/* Thông tin sản phẩm */}
              <div style={{ padding: "16px" }}>
                <h4
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: "#222",
                    marginBottom: "8px",
                    lineHeight: "1.3",
                  }}
                >
                  {p.title}
                </h4>
                <p
                  style={{
                    color: "#e63946",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    marginBottom: "6px",
                  }}
                >
                  {p.price.toLocaleString("vi-VN")}₫
                </p>

                <p
                  style={{
                    color: "#666",
                    fontSize: "0.9rem",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                  }}
                >
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
