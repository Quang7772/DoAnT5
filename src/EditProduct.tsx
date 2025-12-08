import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate, useParams } from "react-router-dom";
import "./asset/CSS/EditProducts_SP_Admin.css";

const EditProduct = () => {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
    rating_rate: "",
    rating_count: "",
    category: "",
    description: "",
    stock: "",
  });

  useEffect(() => {
    if (!isNew) {
      supabase
        .from("product1")
        .select("*")
        .eq("id", id)
        .single()
        .then(({ data }) => {
          if (data) setProduct(data);
        });
    }
  }, [id, isNew]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNew) {
      const { error } = await supabase.from("product1").insert([product]);
      if (error) return alert("❌ Lỗi thêm sản phẩm: " + error.message);
      alert("✅ Đã thêm sản phẩm mới!");
    } else {
      const { error } = await supabase
        .from("product1")
        .update(product)
        .eq("id", id);

      if (error) return alert("❌ Lỗi cập nhật: " + error.message);
      alert("✅ Cập nhật thành công!");
    }

    navigate("/admin/products");
  };

  return (
    <div className="container">
      <h2>{isNew ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}</h2>

      <form onSubmit={handleSubmit} className="form">
        {/* TITLE */}
        <label>
          Tên sản phẩm:
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </label>

        {/* PRICE */}
        <label>
          Giá:
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </label>

        {/* CATEGORY */}
        <label>
          Hãng:
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn hãng --</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Xiaomi">Xiaomi</option>
            <option value="Oppo">Oppo</option>
            <option value="Realme">Realme</option>
          </select>
        </label>

        {/* STOCK */}
        <label>
          Tồn kho:
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
          />
        </label>

        {/* IMAGE URL */}
        <label>
          Hình ảnh (URL):
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
          />
        </label>

        {/* PREVIEW IMAGE */}
        {product.image && (
          <img
            src={product.image}
            alt="preview"
            className="preview"
            onError={(e) => (e.target.src = "/no-image.png")}
          />
        )}

        {/* RATING */}
        <label>
          Đánh giá (0–5):
          <input
            type="number"
            step="0.1"
            name="rating_rate"
            value={product.rating_rate}
            onChange={handleChange}
          />
        </label>

        <label>
          Số lượt đánh giá:
          <input
            type="number"
            name="rating_count"
            value={product.rating_count}
            onChange={handleChange}
          />
        </label>

        {/* DESCRIPTION */}
        <label>
          Mô tả sản phẩm:
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </label>

        {/* ACTION BUTTONS */}
        <div className="actions">
          <button
            type="button"
            className="btn gray"
            onClick={() => navigate("/admin/products")}
          >
            Hủy
          </button>

          <button type="submit" className="btn blue">
            {isNew ? "Thêm sản phẩm" : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
