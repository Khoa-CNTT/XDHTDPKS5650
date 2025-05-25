import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

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
      Swal.fire({
        icon: "warning",
        title: "Chưa chọn sản phẩm",
        text: "Vui lòng chọn ít nhất một sản phẩm để đặt hàng.",
      });
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
        const errorData = await response.json();
        console.error("Order error:", errorData);

        if (errorData.message === "Error login!") {
          Swal.fire({
            icon: "error",
            title: "Chưa đăng nhập",
            text: "Vui lòng đăng nhập để tiếp tục đặt hàng.",
          });
        } else if (response.status === 422) {
          Swal.fire({
            icon: "error",
            title: "Dữ liệu không hợp lệ",
            text: "Vui lòng kiểm tra lại sản phẩm hoặc số lượng.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Lỗi đặt hàng",
            text: errorData.message || "Đã xảy ra lỗi không xác định.",
          });
        }
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Đặt hàng thành công!",
        text: "Cảm ơn bạn đã mua hàng.",
      });

      const remaining = cartItems.filter(
        (item) => !selectedItems.includes(item.id)
      );
      setCartItems(remaining);
      setSelectedItems([]);

      localStorage.setItem("carts", JSON.stringify(remaining));
    } catch (error) {
      console.error("Network error:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi kết nối",
        text: "Không thể kết nối đến máy chủ. Vui lòng thử lại sau.",
      });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Bạn có muốn xoá sản phẩm này không?",
      text: "Thao tác này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xoá",
      cancelButtonText: "Huỷ",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedItems = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedItems);
        setSelectedItems((prev) => prev.filter((i) => i !== id));
        localStorage.setItem("carts", JSON.stringify(updatedItems));
        Swal.fire({
          icon: "success",
          title: "Đã xoá",
          text: "Sản phẩm đã được xoá khỏi giỏ hàng.",
        });
      }
    });
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
                  <th>Hành động</th>
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
                    <td>
                      <button
                        className="btn-action"
                        onClick={() => handleDelete(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#d33", fontSize: "18px",}}
                        title="Xoá sản phẩm"
                      >
                        <FaTrash />
                      </button>
                    </td>
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
