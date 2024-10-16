import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartServices from "../api/CartServices.js";
import AccountService from "../api/AccountService.js";
import { PopupCart } from "./PopupCart.js";
import { PopuBuyNow } from "./PopupBuyNow.js";
import "../css/Style.css";
import "../css/productCartMobile.css"
export const ProductCard = ({ listProduct }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState("");
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopupBuyNow, setButtonPopupBuyNow] = useState(false);
  const [jwtToken, setJwtToken] = useState(sessionStorage.getItem("jwtToken"));
  const [accountRole, setAccountRole] = useState("");
  const [accountEmail, setAccountEmail] = useState("");
  const [idCart, setIdcart] = useState("");
  const [account, setAccount] = useState("");
  const [titleInfo, setTitleInfo] = useState("");
  const [titleInfoBuy, setTitleInfoBuy] = useState("");
  const [contentInfo, setContentInfo] = useState("");
  const [contentInfoBuy, setContentInfoBuy] = useState("");
  const navigate = useNavigate();

  //Nút nhấn trở về trang trước
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Nút nhấn trở về trang sau
  const goToNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const getAccount = async () => {
      if (jwtToken !== "") {
        try {
          const account = await AccountService.getAccount(jwtToken);
          console.log("account cart: ", account);
          setAccountEmail(account.email);
          setAccountRole(account.role);
          return setAccount(account);
        } catch (error) {
          console.error("Lỗi lấy thông tin tài khoản:", error);
        }
      } else {
        setAccountRole("");
        setAccountEmail("");
      }
    };
    getAccount();
  }, [jwtToken]);

  useEffect(() => {
    const getCart = async () => {
      if (account.role === "user") {
        try {
          const response = await CartServices.getCart(account.email);
          return setIdcart(response.id);
        } catch {}
      }
    };
    getCart();
  }, [account]);

  const handleAddToCart = async (idBook) => {
    if (account.role === "user") {
      try {
        const response = await CartServices.addBookToCart(idCart, idBook);
        console.log("product in cart", response);
        // setTitleInfo('Successfull');
        // setContentInfo('product has been added successfully')
        setButtonPopup(true);
        setTitleInfo("Thành Công");
        setContentInfo("Sản phẩm đã được thêm vào giỏ hàng thành công");
        setTimeout(() => {
          setButtonPopup(false);
        }, 2000);
      } catch (error) {
        setButtonPopup(true);
        setTitleInfo(<span style={{ color: "red" }}>Sorry</span>);
        setContentInfo("Sản phẩm là chưa đủ");
        setTimeout(() => {
          setButtonPopup(false);
        }, 2000);
      }
    } else {
      navigate("/Login");
    }
  };

  const handleBuyNow = async (idBook) => {
    if (account.role === "user") {
      try {
        const response = await CartServices.addBookToCart(idCart, idBook);
        console.log("product in cart", response);
        navigate("/Cart");
        setTitleInfoBuy("Success");
        setContentInfoBuy(response.data);
        console.log("Get cart data: ", response.data);
        setTimeout(() => {
          setButtonPopup(false);
        }, 2000);
      } catch (error) {
        setButtonPopupBuyNow(true);
        setTitleInfoBuy(<span style={{ color: "red" }}>Sorry</span>);
        setContentInfoBuy(error.response.data);
        console.error("Lỗi lấy dữ liệu giỏ hàng:", error.response.data);
        setTimeout(() => {
          setButtonPopup(false);
        }, 2000);
      }
    } else {
      navigate("/Login");
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredProducts = listProduct.filter(
    (product) => product.status == null
  );

  return (
    <div>
      <div className="productCart">
        {filteredProducts.map((product) => (
          <div key={product.idBook} className="productCartItem">
            <div
              className={`product-card ${
                product.quantity === 0 ? "out-of-stock" : ""
              }`}
            >
              <div className="product-card p-3 box">
                <div className="col-12">
                  <Link to={`/ProductDetail/${product.idBook}`}>
                    <div className="col-12 img-product-card product-details">
                      <div className="img-setup">
                        <img
                          className="img-product-card-general"
                          src={`http://localhost:8090/${product.image}`}
                        />
                      </div>
                    </div>
                    <div className="product-details">
                      <h5
                        className="product-title product-title-name mt-4 link"
                        style={{ textOverflow: "ellipsis" }}
                      >
                        {product.title}
                      </h5>
                    </div>
                  </Link>
                </div>

                <div className="product-details">
                  <div className="quantity-price mt-2">
                    <p className="price text-dark link">
                      Giá {product.price.toLocaleString()} VND
                    </p>
                    <p className="quantity link d-block">
                      <strong>Số lượng: </strong>
                      {product.quantity}
                    </p>
                  </div>

                   {/* Button start */}
                   <div className="button-of-cart">
                   <button
                     className="button me-3"
                     type="submit"
                     onClick={() => handleAddToCart(product.idBook)}
                     disabled={product.quantity === 0}
                   >
                     Thêm vào giỏ hàng
                   </button>
                   <button
                     className="button"
                     type="submit"
                     onClick={() => handleBuyNow(product.idBook)}
                     disabled={product.quantity === 0}
                   >
                     Mua ngay
                   </button>
                 </div>
                 {/* Button end */}
                </div>
              </div>
            </div>
          </div>
        ))}

        <PopupCart trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h3 className="text-in-popup">{titleInfo}</h3>
          <p>{contentInfo}</p>
        </PopupCart>

        <PopuBuyNow
          trigger={buttonPopupBuyNow}
          setTrigger={setButtonPopupBuyNow}
        >
          <h3 className="text-in-popup">{titleInfoBuy}</h3>
          <p>{contentInfoBuy}</p>
        </PopuBuyNow>
      </div>
    </div>
  );
};
