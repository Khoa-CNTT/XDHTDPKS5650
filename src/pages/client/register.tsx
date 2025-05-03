import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    address?: string;
    country?: string;
    avatar?: string;
  }>({});
  const [countries, setCountries] = useState<{ [key: string]: string }>({}); // State để lưu danh sách quốc gia

  // Hàm validate
  function validate() {
    const errs: typeof fieldErrors = {};
    if (!name.trim()) errs.name = "Vui lòng nhập họ và tên.";
    if (!email) errs.email = "Vui lòng nhập email.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errs.email = "Email không đúng định dạng.";
    if (!password) errs.password = "Vui lòng nhập mật khẩu.";
    else if (password.length < 8) errs.password = "Mật khẩu tối thiểu 8 ký tự.";
    if (!phone) errs.phone = "Vui lòng nhập số điện thoại.";
    else if (!/^[0-9\+\-\s]+$/.test(phone)) errs.phone = "Chỉ nhập số, +, -, khoảng trắng.";
    if (!address) errs.address = "Vui lòng nhập địa chỉ.";
    if (!country) errs.country = "Vui lòng chọn quốc gia.";
    return errs;
  }

  // Hàm xử lý thay đổi avatar
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setAvatar(file || null);
    if (file) {
      setAvatarUrl(URL.createObjectURL(file));
    } else {
      setAvatarUrl("");
    }
    setFieldErrors((prev) => ({ ...prev, avatar: undefined }));
  };

  // Hàm xử lý submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length) {
      return;
    }
    setLoading(true);

    // Log dữ liệu của form
    console.log({
      name,
      email,
      password,
      phone,
      address,
      country,
      avatar: avatar ? avatar.name : null, // Log tên file avatar nếu có
    });

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("country", country);
      if (avatar) {
        formData.append("avatar", avatar);
      }

      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Đăng ký thành công!");
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setError(data?.message || "Đăng ký thất bại. Vui lòng kiểm tra lại.");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi mạng. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Lấy danh sách quốc gia từ API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/country");
        const data = await res.json();
        setCountries(data); // Lưu danh sách quốc gia vào state
      } catch (err) {
        console.error("Lỗi khi lấy danh sách quốc gia:", err);
      }
    };
    fetchCountries();
  }, []);

  return (
    <div className="register-page">
      {/* Nút Back */}
      <button className="back-button" onClick={() => navigate("/")}>
        <FaArrowLeft /> Trang chủ
      </button>
      <div className="register-container">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Đăng ký tài khoản</h2>
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <input
                id="register-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, name: undefined }));
                }}
                required
                className={`w-full rounded bg-zinc-900 border ${
                  fieldErrors.name ? "border-red-600" : "border-zinc-700"
                } px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 ${
                  fieldErrors.name ? "focus:ring-red-500" : "focus:ring-blue-600"
                }`}
                placeholder="Nhập họ tên..."
              />
              {fieldErrors.name && <div className="text-xs text-red-400 mt-1">{fieldErrors.name}</div>}
            </div>
            <div className="input-group">
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, email: undefined }));
                }}
                required
                className={`w-full rounded bg-zinc-900 border ${
                  fieldErrors.email ? "border-red-600" : "border-zinc-700"
                } px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 ${
                  fieldErrors.email ? "focus:ring-red-500" : "focus:ring-blue-600"
                }`}
                placeholder="Nhập email..."
              />
              {fieldErrors.email && <div className="text-xs text-red-400 mt-1">{fieldErrors.email}</div>}
            </div>
            <div className="input-group">
              <input
                id="register-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, password: undefined }));
                }}
                required
                className={`w-full rounded bg-zinc-900 border ${
                  fieldErrors.password ? "border-red-600" : "border-zinc-700"
                } px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 ${
                  fieldErrors.password ? "focus:ring-red-500" : "focus:ring-blue-600"
                }`}
                placeholder="Nhập mật khẩu..."
              />
              {fieldErrors.password && (
                <div className="text-xs text-red-400 mt-1">{fieldErrors.password}</div>
              )}
            </div>
            <div className="input-group">
              <input
                id="register-phone"
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                required
                className={`w-full rounded bg-zinc-900 border ${
                  fieldErrors.phone ? "border-red-600" : "border-zinc-700"
                } px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 ${
                  fieldErrors.phone ? "focus:ring-red-500" : "focus:ring-blue-600"
                }`}
                placeholder="Nhập số điện thoại..."
              />
              {fieldErrors.phone && <div className="text-xs text-red-400 mt-1">{fieldErrors.phone}</div>}
            </div>
            <div className="input-group">
              <input
                id="register-address"
                type="text"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, address: undefined }));
                }}
                required
                className={`w-full rounded bg-zinc-900 border ${
                  fieldErrors.address ? "border-red-600" : "border-zinc-700"
                } px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 ${
                  fieldErrors.address ? "focus:ring-red-500" : "focus:ring-blue-600"
                }`}
                placeholder="Nhập địa chỉ..."
              />
              {fieldErrors.address && (
                <div className="text-xs text-red-400 mt-1">{fieldErrors.address}</div>
              )}
            </div>
            <div>
              <select
                aria-label="Quốc gia"
                id="register-country"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, country: undefined }));
                }}
                required
                className={`w-full rounded bg-zinc-900 border ${
                  fieldErrors.country ? "border-red-600" : "border-zinc-700"
                } px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 ${
                  fieldErrors.country ? "focus:ring-red-500" : "focus:ring-blue-600"
                }`}
              >
                <option value="">Chọn quốc gia</option>
                {Object.entries(countries).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
              {fieldErrors.country && (
                <div className="text-xs text-red-400 mt-1">{fieldErrors.country}</div>
              )}
            </div>
            <div>
              <label className="block text-zinc-200 mb-1" htmlFor="register-avatar">
                Avatar
              </label>
              <input
                id="register-avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="block text-zinc-100 focus:outline-none"
              />
              {avatarUrl && (
                <img
                  src={avatarUrl}
                  alt="Avatar preview"
                  className="w-16 h-16 rounded-full mt-2 border border-zinc-700 object-cover"
                />
              )}
              {fieldErrors.avatar && (
                <div className="text-xs text-red-400 mt-1">{fieldErrors.avatar}</div>
              )}
            </div>
            {error && <div className="text-red-400 text-sm text-center">{error}</div>}
            {success && <div className="text-green-400 text-sm text-center">{success}</div>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-zinc-100 font-semibold py-2 mt-4 rounded transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </button>
            <div className="text-center mt-4">
              <span className="text-zinc-400">Đã có tài khoản? </span>
              <Link to="/Login" className="text-blue-400 hover:underline">
                Đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
