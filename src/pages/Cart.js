import React, { useState, useEffect } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("carts");
    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        }
      } catch (e) {
        console.error("Lỗi khi parse carts từ localStorage:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("carts", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const updateQty = (id, delta) => {
    const updated = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    });
    setCartItems(updated);
  };

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getTotal = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + item.qty * parseInt(item.price), 0);
  };

  const handleOrder = async () => {
    const orderedItems = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );

    if (orderedItems.length === 0) {
      alert("Vui lòng chọn sản phẩm để đặt.");
      return;
    }

    const orderData = {
      paymentMethod: 1,
      products: orderedItems.map((item) => ({
        id: item.id,
        quantity: item.qty,
      })),
    };

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/order-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const error = await response.text();
        alert("Lỗi đặt hàng: " + error);
        return;
      }

      alert("Đặt thành công!");
      const remaining = cartItems.filter(
        (item) => !selectedItems.includes(item.id)
      );
      setCartItems(remaining);
      setSelectedItems([]);

    } catch (error) {
      alert("Lỗi mạng khi đặt hàng: " + error.message);
    }
  };

  return (
    <>
      <div className="gdlr-page-title-wrapper">
        <div className="gdlr-page-title-overlay" />
        <div className="gdlr-page-title-container container">
          <h1 className="gdlr-page-title">Giỏ hàng</h1>
          <h1 className="gdlr-page-title">---</h1>
        </div>
      </div>

      <div className="cart-container" style={{ padding: "40px" }}>
        {cartItems.length === 0 ? (
          <p>Giỏ hàng trống.</p>
        ) : (
          <>
            <table className="cart-table" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th></th>
                  <th>Hình ảnh</th>
                  <th>Tên</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tổng</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} style={{ textAlign: "center" }}>
                    <td>
                      <input
                        type="checkbox"
                        className="checkbox-order"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelect(item.id)}
                      />
                    </td>
                    <td>
                      <img src={item.img} alt={item.name} style={{ width: "60px" }} />
                    </td>
                    <td>{item.name}</td>
                    <td>{parseInt(item.price).toLocaleString()}đ</td>
                    <td>
                      <button className="btn-action" onClick={() => updateQty(item.id, -1)}>-</button>
                      <span style={{ margin: "0 10px" }}>{item.qty}</span>
                      <button className="btn-action" onClick={() => updateQty(item.id, 1)}>+</button>
                    </td>
                    <td>{(item.qty * parseInt(item.price)).toLocaleString()}đ</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ textAlign: "right", marginTop: "30px" }}>
              <p style={{ fontWeight: "bold" }}>
                Tổng tiền: {getTotal().toLocaleString()}đ
              </p>
              <button className="button-order" onClick={handleOrder} style={{ padding: "10px 20px", fontSize: "16px" }}>
                Đặt ngay
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
