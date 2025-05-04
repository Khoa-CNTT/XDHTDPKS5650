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
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          <img
            src={profile.avatar || "https://via.placeholder.com/150"} // Hiển thị avatar hoặc ảnh mặc định
            alt="Avatar"
          />
        </div>
        <div className="profile-info">
          <h1>{profile.name}</h1>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Số điện thoại:</strong> {profile.phone}</p>
          <p><strong>Địa chỉ:</strong> {profile.address}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;