import React, { useState, useEffect } from "react";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token không tồn tại. Vui lòng đăng nhập lại.");
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/api/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setProfile(data.user);
        } else {
          const errorText = await response.text();
          setError(`Lỗi: ${errorText}`);
        }
      } catch (err) {
        setError("Lỗi mạng. Không thể kết nối đến server.");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return (
      <div className="profile-container">
        <h1>Lỗi</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-container">
        <h1>Đang tải...</h1>
      </div>
    );
  }

  return (
    <>
    <div className="profile-container">
      <form class="profile-edit-main" autocomplete="off">
        <div class="avatar-section">
          <div class="big-avatar">
            <img className="img-avt" src={profile.avatar || "https://via.placeholder.com/150"} alt="Avatar" />
          </div>
          <button type="button" class="change-avatar-btn">Đổi ảnh</button>
        </div>
        <div class="profile-form-section">
          <div class="profile-title">Thông Tin Cá Nhân</div>
          <div class="profile-form">
            <div class="input-row">
              <label for="name">Họ & Tên</label>
              <input type="text" id="name" name="name" required value={profile.name} />
            </div>
            <div class="input-row">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" value={profile.email} disabled/>
            </div>
            <div class="input-row">
              <label for="phone">SĐT</label>
              <input type="tel" id="phone" name="phone" required value={profile.phone} />
            </div>
            <div class="input-row">
              <label for="address">Địa chỉ</label>
              <input type="text" id="address" name="address" required value={profile.address} />
            </div>
            <div class="input-row">
              <label for="nation">Quốc tịch</label>
              <input type="text" id="nation" name="nation" required value={profile.country} />
            </div>
            <div class="input-row">
              <label for="password">Mật khẩu</label>
              <input type="password" id="password" name="password" required value="12345678" autocomplete="new-password" />
            </div>
          </div>
          <div class="profile-actions">
            <button class="save-btn" type="submit">Lưu thay đổi</button>
          </div>
        </div>
      </form>
    </div>
    </>
  );
}

export default Profile;