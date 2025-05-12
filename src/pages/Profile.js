import { colors } from "@mui/material";
import React, { useState, useEffect } from "react";

function Profile() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [current_password, setCurrent_password] = useState("");
  const [password, setPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarMethod, setAvatarMethod] = useState("file");
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token không tồn tại. Vui lòng đăng nhập lại.");
        return;
      }

      try {
        const res = await fetch("http://127.0.0.1:8000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setProfile(data.user);
      } catch (err) {
        setError(err.message || "Lỗi khi lấy profile.");
      }
    };
    fetchProfile();
  }, []);

  const handleAvatarChange = (e) => {
    if (avatarMethod === "file" && e.target.files) {
      const file = e.target.files[0];
      if (file) {
        setAvatarFile(file);
        const url = URL.createObjectURL(file);
        setAvatarUrl(url);
      }
    } else if (avatarMethod === "link" && avatarUrl) {
      setAvatar(avatarUrl);
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/country");
        const json = await res.json();
        const list = Object.entries(json).map(([code, name]) => ({
          code,
          name,
        }));
        setCountries(list);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách quốc gia:", err);
        setCountries([]);
      }
    };
    fetchCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token không tồn tại. Vui lòng đăng nhập lại.");
      return;
    }

    const formData = new FormData();

    formData.append("name", profile.name);
    formData.append("current_password", current_password);
    formData.append("password", password);
    formData.append("phone", profile.phone);
    formData.append("address", profile.address);
    formData.append("country", profile.country);
    if (avatarFile) formData.append("avatar", avatarFile);
    else if (avatarUrl && avatarUrl !== profile.originalAvatarUrl) formData.append("avatar", avatarUrl);

    if (formData.entries().next().done) {
      setError("Không có thay đổi nào để cập nhật.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/update-profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Cập nhật thất bại.");
        console.log("Lỗi từ API:", data); 
        return;
      }

      const data = await res.json();
      setProfile(data.user);
      setError("");
      alert("Cập nhật thành công!");
    } catch (err) {
      setError(err.message || "Cập nhật thất bại.");
    }
  };


  useEffect(() => {
    if (avatarMethod === "file" && avatarFile) {
      const url = URL.createObjectURL(avatarFile);
      setAvatarUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [avatarFile, avatarMethod]);

  // if (error) return <p className="error">{error}</p>;
  if (!profile) return <p>Đang tải...</p>;

  return (
    <>
      <div className="profile-container">
        <form className="profile-edit-main" onSubmit={handleSubmit} autoComplete="off">
          <div className="avatar-section">
            <div className="big-avatar">
              <div className="avatar-section">
                <img
                  className="img-avt"
                  src={avatarUrl || profile.avatar || "https://via.placeholder.com/150"}
                  alt="Avatar"
                />
              </div>
            </div>
          </div>
          <div className="profile-form-section">
            <div className="profile-title">Thông Tin Cá Nhân</div>
            <div className="profile-form">
              <div className="input-row">
                <label htmlFor="name">Họ & Tên</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={profile.name}
                  onChange={handleChange}
                />
              </div>
              <div className="input-row">
                <label htmlFor="email">Email</label>
                <input
                  className="email-profile"
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  disabled
                />
              </div>
              <div className="input-row">
                <label htmlFor="phone">SĐT</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={profile.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="input-row">
                <label htmlFor="address">Địa chỉ</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={profile.address}
                  onChange={handleChange}
                />
              </div>
              <div className="input-row">
                <label htmlFor="country">Quốc gia</label>
                <select
                  className="country-profile"
                  id="country"
                  name="country"
                  value={profile.country}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Chọn quốc gia</option>
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-row">
                <label htmlFor="current_password">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  id="current_password"
                  name="current_password"
                  value={current_password}
                  onChange={(e) => setCurrent_password(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
              {error && <p className="error-profile">* {error}</p>}
              <div className="input-row">
                <label htmlFor="password">Mật khẩu mới</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="password"
                  placeholder="Nhập để đổi mật khẩu"
                />
              </div>
              <div className="profile-up-img">
                <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="avatarMethod"
                    value="file"
                    checked={avatarMethod === "file"}
                    onChange={() => setAvatarMethod("file")}
                    className="mr-2"
                  />
                  Chọn ảnh từ máy
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="avatarMethod"
                    value="link"
                    checked={avatarMethod === "link"}
                    onChange={() => setAvatarMethod("link")}
                    className="mr-2"
                  />
                  Nhập link ảnh
                </label>
                </div>
                {avatarMethod === "file" && (
                  <div>
                    <input
                      id="register-avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="block text-zinc-100 focus:outline-none"
                    />
                  </div>
                )}
                {avatarMethod === "link" && (
                  <div>
                    <input
                      id="register-avatar-link"
                      type="text"
                      placeholder="Nhập link ảnh..."
                      value={avatarUrl}
                      onChange={(e) => {
                        setAvatarUrl(e.target.value);
                        setAvatar(null);
                      }}
                      className="w-full rounded bg-zinc-900 border border-zinc-700 px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="profile-actions">
              {/* <button className="save-btn" type="submit">
                Lưu thay đổi
              </button> */}
              <div className="modal-footer">
                <button type="submit" className="save-btn">
                  Lưu thay đổi
                </button>
                {/* <button onClick={() => setIsModalOpen(false)}>Hủy</button> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Profile;