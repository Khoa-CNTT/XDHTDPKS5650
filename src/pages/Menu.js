import { useState, useEffect } from "react";

function Menu() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/list-product");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-zinc-300">Đang tải dữ liệu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-500">Lỗi: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="gdlr-page-title-wrapper">
        <div className="gdlr-page-title-overlay" />
        <div className="gdlr-page-title-container container">
          <h1 className="gdlr-page-title">Vietnam's leading experienced restaurant</h1>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="gdlr-content">
          <div className="with-sidebar-wrapper">
            <div className="with-sidebar-left ">
              <div className="with-sidebar-content twelve columns">
                <div className="main-content-container container gdlr-item-start-content">
                  <div className="gdlr-item gdlr-main-content">
                    <section>
                      <div className="container center">
                        <div>
                          <h2>Các món chính tại đây</h2>
                          <p className="desc">Bán vì đam mê nên không có bán chạy lắm. Thích thì mua không thích thì
                            mua. Không ý kiến.</p>
                        </div>
                        <div className="grid-container card-container">
                          {products.map((product, index) => (
                            <div key={product.id || index} className="card">
                              <img className="card-img" src={product.image || "https://via.placeholder.com/300x200"} alt={product.name} />
                              <div className="card-title">{product.name}</div>
                              <div className="card-money">
                                Giá: {product.price ? `${product.price.toLocaleString()} VNĐ` : "Liên hệ"}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    </div>
  );
}

export default Menu;