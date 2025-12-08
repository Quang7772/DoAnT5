import React from "react";
import "./asset/CSS/trang2.css";

const ContactPage = () => {
  return (
    <div className="contact-page">
      <h2 className="contact-title">LIÊN HỆ VỚI CHÚNG TÔI</h2>

      {/* THÔNG TIN LIÊN HỆ */}
      <div className="contact-info-box">
        <div>
          <h3>📍 Địa chỉ</h3>
          <p>123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh</p>
        </div>

        <div>
          <h3>📞 Hotline</h3>
          <p>0123 456 789</p>
        </div>

        <div>
          <h3>📧 Email</h3>
          <p>contact@yourshop.com</p>
        </div>
      </div>

      {/* FORM LIÊN HỆ */}
      <div className="contact-form-box">
        <h3>Gửi tin nhắn</h3>
        <form className="contact-form">
          <input type="text" placeholder="Họ và tên" required />
          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="Số điện thoại" required />
          <textarea placeholder="Nội dung liên hệ..." required></textarea>
          <button type="submit">Gửi liên hệ</button>
        </form>
      </div>

      {/* MAP */}
      <div className="contact-map">
        <h3>Bản đồ</h3>
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.99074691472!2d106.70042387480536!3d10.737997189406444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3ddf08deff%3A0xa06f36c9c6a1b201!2zTmjDom4gVmFuIExpbmgsIFF14bqtbiA3LCBUUC5IQ00!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
          width="100%"
          height="350"
          style={{ border: 0, borderRadius: "12px" }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;
