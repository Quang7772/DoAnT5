import "./asset/CSS/trang1.css";

const GioiThieu = () => {
  return (
    <div className="about-page">
      <h2 className="about-title">🌟 GIỚI THIỆU VỀ CHÚNG TÔI</h2>

      <div className="about-section">
        <div className="about-text">
          <h3>Chúng tôi là ai?</h3>
          <p>
            Chào mừng bạn đến với <b>YourShop</b> – nền tảng mua sắm hiện đại,
            nơi mang đến trải nghiệm tuyệt vời nhất cho người dùng.  
            Chúng tôi cung cấp các sản phẩm chất lượng, giá cả hợp lý và dịch vụ
            chăm sóc khách hàng tận tâm.
          </p>

          <h3>Sứ mệnh của chúng tôi</h3>
          <p>
            Mang lại giải pháp mua sắm nhanh chóng, tiện lợi và đáng tin cậy,
            giúp khách hàng tiết kiệm thời gian và chi phí.
          </p>

          <h3>Giá trị cốt lõi</h3>
          <ul>
            <li>✔ Chất lượng hàng đầu</li>
            <li>✔ Giá cạnh tranh</li>
            <li>✔ Giao hàng nhanh – an toàn</li>
            <li>✔ Hỗ trợ khách hàng 24/7</li>
          </ul>
        </div>

        <div className="about-image">
          <img
            src="https://img.freepik.com/free-photo/team-success-hands-up-partnership-concept_53876-20643.jpg"
            alt="About Us"
          />
        </div>
      </div>

      <div className="about-extra">
        <h3>Tại sao chọn chúng tôi?</h3>
        <p>
          Với hơn <b>5 năm kinh nghiệm</b> trong lĩnh vực thương mại điện tử,
          chúng tôi cam kết mang đến cho khách hàng dịch vụ tốt nhất, cập nhật
          xu hướng và không ngừng cải tiến để nâng cao trải nghiệm người dùng.
        </p>
      </div>
    </div>
  );
};

export default GioiThieu;
