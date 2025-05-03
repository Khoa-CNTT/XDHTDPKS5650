import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

function Layout() {
  console.log("Layout component is rendering");
  
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <nav className="bg-zinc-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <Link to="/" className="text-zinc-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Trang chủ
                  </Link>
                  <Link to="/room" className="text-zinc-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Phòng
                  </Link>
                  <Link to="/booking" className="text-zinc-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Đặt phòng
                  </Link>
                  <Link to="/blog" className="text-zinc-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Blog
                  </Link>
                  <Link to="/menu" className="text-zinc-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Thực đơn
                  </Link>
                  <Link to="/aboutus" className="text-zinc-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Về chúng tôi
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <Link to="/login" className="text-zinc-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <FaUser className="mr-2" />
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-zinc-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-zinc-400">
            © 2024 Hotel VN. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;