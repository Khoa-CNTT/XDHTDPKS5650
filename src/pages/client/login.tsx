import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [fieldErrors, setFieldErrors] = React.useState<{ email?: string; password?: string }>({});

  function validate() {
    const errs: { email?: string; password?: string } = {};
    if (!email) {
      errs.email = "Vui lòng nhập email.";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      errs.email = "Email không đúng định dạng.";
    }
    if (!password) {
      errs.password = "Vui lòng nhập mật khẩu.";
    } else if (password.length < 6) {
      errs.password = "Mật khẩu tối thiểu 6 ký tự.";
    }
    return errs;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length) {
      if (errs.email) document.getElementById("login-email")?.focus();
      else if (errs.password) document.getElementById("login-password")?.focus();
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Đăng nhập thành công!");
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setError(data?.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại.");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi mạng. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-page">
      {/* Nút Back */}
      <button className="back-button" onClick={() => navigate("/")}>
        <FaArrowLeft /> Trang chủ
      </button>

      {/* Form đăng nhập */}
      <div className="login-container">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFieldErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="Nhập email..."
              required
              autoComplete="username"
            />
            {fieldErrors.email && <div className="error-message">{fieldErrors.email}</div>}
          </div>
          <div>
            <label htmlFor="login-password">Mật khẩu</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldErrors((prev) => ({ ...prev, password: undefined }));
              }}
              placeholder="Nhập mật khẩu..."
              required
              autoComplete="current-password"
            />
            {fieldErrors.password && <div className="error-message">{fieldErrors.password}</div>}
          </div>
          <div className="checkbox-group">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Ghi nhớ đăng nhập
            </label>
            <Link to="/forgot-password">Quên mật khẩu?</Link>
          </div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <button type="submit" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
          <div className="register-link">
            Chưa có tài khoản? <Link to="/Register">Đăng ký ngay</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
