import { Link, useNavigate , useLocation} from "react-router-dom";
import { FaUser } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { FaShoppingCart } from 'react-icons/fa';

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
        try {
          const res = await fetch("http://127.0.0.1:8000/api/profile", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const data = await res.json();
            setUser(data.user);
          } else {
            console.error("Lỗi khi lấy thông tin người dùng:", await res.json());
          }
        } catch (err) {
          console.error("Lỗi mạng khi lấy thông tin người dùng:", err);
        }
      } else {
        setIsLoggedIn(false);
        console.log("Không tìm thấy token trong localStorage.");
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await fetch("http://127.0.0.1:8000/api/logout", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          console.log("Đăng xuất thành công!");
        } else {
          console.error("Đăng xuất thất bại:", await res.json());
        }
      }
    } catch (err) {
      console.error("Lỗi khi đăng xuất:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setIsLoggedIn(false);
      navigate("/Login");
    }
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;
  return (
    <>
      <header className="gdlr-header-wrapper">
      <div className="gdlr-header-inner">
        <div className="gdlr-header-container container">
          <div className="gdlr-logo">
            <div className="gdlr-logo-inner">
              <Link to="/">
                <img src="frontend\anh\logo.png" alt="" /> </Link>
              <div className="gdlr-responsive-navigation dl-menuwrapper" id="gdlr-responsive-navigation">
                <ul id="menu-main-menu" className="dl-menu gdlr-main-mobile-menu">
                  <li className="menu-item current-menu-item "><Link to="/">Trang chủ</Link></li>
                  <li className="menu-item menu-item-has-children"><Link to="/AboutUs">Cơ sở vật chất</Link></li>
                  <li className="menu-item menu-item-has-children"><Link to="room-classic-3-columns.html">Phòng</Link></li>
                  <li className="menu-item"><Link to="booking.html">Đặt lịch</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="gdlr-navigation-wrapper">
            {/* <nav className="gdlr-navigation" id="gdlr-main-navigation" role="navigation"> */}
            <nav className="gdlr-navigation" role="navigation">
              <ul id="menu-main-menu-1" className="sf-menu gdlr-main-menu menu">
                {/* <li className="menu-item current-menu-item menu-item current-menu-item  gdlr-normal-menu"><Link to="/">Trang chủ</Link></li>
                <li className="menu-item menu-item-has-childrenmenu-item menu-item-has-children gdlr-normal-menu"><Link to="/AboutUs" className="sf-with-ul-pre">Cơ sở vật chất</Link></li>
                <li className="menu-item menu-item-has-childrenmenu-item menu-item-has-children gdlr-normal-menu"><Link to="/Room" className="sf-with-ul-pre">Phòng</Link></li>
                <li className="menu-item menu-item gdlr-normal-menu"><Link to="/Booking">Đặt lịch</Link></li>
                <li className="menu-item menu-item-has-childrenmenu-item menu-item-has-children gdlr-normal-menu"><Link to="/Blog" className="sf-with-ul-pre">Blog</Link></li>
                <li className="menu-item menu-item-has-childrenmenu-item menu-item-has-children gdlr-normal-menu"><Link to="/Menu">Menu</Link></li> */}
                <li className={`menu-item gdlr-normal-menu ${isActive('/') ? 'active-link' : ''}`}>
                  <Link to="/">Trang chủ</Link>
                </li>
                <li className={`menu-item gdlr-normal-menu ${isActive('/AboutUs') ? 'active-link' : ''}`}>
                  <Link to="/AboutUs">Cơ sở vật chất</Link>
                </li>
                <li className={`menu-item gdlr-normal-menu ${isActive('/Room') ? 'active-link' : ''}`}>
                  <Link to="/Room">Phòng</Link>
                </li>
                <li className={`menu-item gdlr-normal-menu ${isActive('/Booking') ? 'active-link' : ''}`}>
                  <Link to="/Booking">Đặt lịch</Link>
                </li>
                <li className={`menu-item gdlr-normal-menu ${isActive('/Blog') ? 'active-link' : ''}`}>
                  <Link to="/Blog">Blog</Link>
                </li>
                <li className={`menu-item gdlr-normal-menu ${isActive('/Menu') ? 'active-link' : ''}`}>
                  <Link to="/Menu">Menu</Link>
                </li>
              </ul>
            </nav>
            <span className="gdlr-menu-search-button-sep">•</span>
            <i className="fa fa-search icon-search gdlr-menu-search-button" id="gdlr-menu-search-button" />
            <div className="gdlr-menu-search" id="gdlr-menu-search">
              <form method="get" id="searchform" action="#">
                <div className="search-text">
                  <input type="text" defaultValue="Type Keywords" name="s" autoComplete="off" data-default="Type Keywords" />
                </div>
                <input type="submit" defaultValue />
                <div className="clear" />
              </form>
            </div>
            <div className="gdlr-navigation-gimmick " id="gdlr-navigation-gimmick" />
            <div className="clear" />
          </div>
          <div className="clear" />
        </div>
      </div>
    </header>
    {/* <div className="user-icon-wrapper">
      <Link to="/Login" className="user-icon-link">
        <FaUser className="user-icon" />
      </Link>
    </div> */}
    <div className="icon-hearder-action">
      <div className="user-icon-wrapper">
      {isLoggedIn ? (
        <>
          <span className="username">{user.name}</span>
          <div className="user-menu">
            <div className="user-icon-container loged" onClick={toggleMenu}>
              <FaUser className="user-icon" />
            </div>
            {showMenu && (
              <div className="user-dropdown">
                <ul>
                  <li>
                    <Link to="/Profile">
                      <span className="info-user">Thông tin cá nhân</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/HistoryBooking">
                      <span className="info-user">Lịch sử đặt phòng</span>
                    </Link>
                  </li>
                  <li onClick={handleLogout}>Đăng xuất</li>
                </ul>
              </div>
            )}
          </div>
        </>
      ) : (
        <Link to="/Login" className="user-icon-link">
          <FaUser className="user-icon" />
        </Link>
      )}
      </div>
      <div className="order-icon-wrapper">
        <Link to="/Cart" className="order-icon-link">
          <FaShoppingCart className="order-icon" />
        </Link>
      </div>
    </div>
    <df-messenger
        intent="WELCOME"
        chat-title="Hotel Support"
        agent-id="54701f30-96e3-49f2-a6b9-eb4c16c5d257"
        language-code="vi"
      ></df-messenger>
    </>
  );
}

export default Header;