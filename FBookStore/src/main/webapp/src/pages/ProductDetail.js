import React, { useEffect, useState } from "react";
import { BreadCrumb } from "./BreadCrumb";
import Meta from "./Meta";
import { ProductCard } from "./ProductCard";
import ReactStars from "react-rating-stars-component";
import { Link, useNavigate } from "react-router-dom";
import ProductService from "../api/ProductService";
import { useParams } from "react-router-dom";
import AccountService from "../api/AccountService.js";
import CartServices from "../api/CartServices.js";
import { PopupCart } from "./PopupCart.js";
import { PopuBuyNow } from "./PopupBuyNow.js";
import BannerService from "../api/BannerService";
import { data } from "jquery";
import "../css/Style.css";
import "../css/productDetailMobile.css"
export const ProductDetail = () => {
  const [product, setProduct] = useState("");
  const { idBook } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState("");
  const [productCategory, setProductCategory] = useState();
  const [account, setAccount] = useState("");
  const [idCart, setIdcart] = useState("");
  const [accountRole, setAccountRole] = useState("");
  const [accountEmail, setAccountEmail] = useState("");
  const [jwtToken, setJwtToken] = useState(sessionStorage.getItem("jwtToken"));
  const [buttonPopup, setButtonPopup] = useState(false);
  const [titleInfo, setTitleInfo] = useState("");
  const [contentInfo, setContentInfo] = useState("");
  const [titleInfoBuy, setTitleInfoBuy] = useState("");
  const [contentInfoBuy, setContentInfoBuy] = useState("");
  const [buttonPopupBuyNow, setButtonPopupBuyNow] = useState(false);
  const navigate = useNavigate();

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
          console.log("product in cart", response.cartItemList);
          return setIdcart(response.id);
        } catch {}
      }
    };
    getCart();
  }, [account]);

  // Check add to cart
  const handleAddToCart = async (idBook) => {
    if (account.role === "user") {
      try {
        const response = await CartServices.addBookToCart(idCart, idBook);
        console.log("product in cart", response.data);
        setButtonPopup(true);
        setTitleInfo("Thành công");
        setContentInfo(response.data);
        console.log("Get cart data: ", response.data);
      } catch (error) {
        setButtonPopup(true);
        setTitleInfo(<span style={{ color: "red" }}>Xin Lỗi</span>);
        setContentInfo(error.response.data);
        console.error("Lỗi lấy dữ liệu giỏ hàng:", error.response.data);
      }
    } else {
      navigate("/Login");
    }
  };

  // Check Buy Now
  const handleBuyNow = async (idBook) => {
    if (account.role === "user") {
      try {
        const response = await CartServices.addBookToCart(idCart, idBook);
        console.log("product in cart", response);
        navigate("/Cart");
        setTitleInfoBuy("Thành công");
        setContentInfoBuy(response.data);
        console.log("Get cart data: ", response.data);
      } catch (error) {
        setButtonPopupBuyNow(true);
        setTitleInfoBuy(<span style={{ color: "red" }}>Xin Lỗi</span>);
        setContentInfoBuy(error.response.data);
        console.error("Lỗi lấy dữ liệu giỏ hàng:", error.response.data);
      }
    } else {
      navigate("/Login");
    }
  };

  const getData = async (idBook) => {
    try {
      const data = await ProductService.getProductDetail(idBook);
      setProduct(data);
      getDataProducts(data.category.idCategory, currentPage, idBook);
      console.log("product deatail", data);
      console.log("cate", data.category.idCategory);
    } catch (error) {
      console.error("không có sản phẩm");
    }
  };

  useEffect(() => {
    getData(idBook);
    window.scrollTo(0, 0);
  }, [idBook]);

  const getDataProducts = async (productCategory, pageNumber, idBook) => {
    try {
      const data2 = await ProductService.getProductDetail(idBook);
      console.log("alo alo", data2.category.idCategory);
      setProductCategory(data2.category.name);
      const data = await ProductService.getProductsbyCategoryException(
        productCategory,
        pageNumber,
        idBook
      );
      if (data) {
        setProducts(data.dataForPage);
        setTotalPage(data.totalPages);
        setCurrentPage(pageNumber);
        console.log("dmm", data.dataForPage);
      } else {
        console.log(
          "Không tìm thấy sản phẩm nào hoặc dữ liệu không được xác định"
        );
      }
    } catch (error) {
      console.error("Không thể tìm nạp sản phẩm:", error);
    }
  };

  useEffect(() => {
    getDataProducts(productCategory, currentPage, idBook);
    window.scrollTo(0, 0);
  }, [currentPage]);

  const goToPreviousPage = () => {
    if (currentPage >= 1) {
      getDataProducts(productCategory, currentPage - 1, idBook);
    }
  };

  // Nút nhấn trở về trang sau
  const goToNextPage = () => {
    if (currentPage <= totalPage) {
      getDataProducts(productCategory, currentPage + 1, idBook);
    }
  };

  const paginate = (pageNumber) => {
    getDataProducts(productCategory, pageNumber, idBook);
  };

  return (
    <>
      <Meta title={"Chi tiết sản phẩm"} />
      <BreadCrumb title="Chi tiết sản phẩm" />
      <div>
        <div>
          <div className="main-product-wrapper">
            <div className="container-xxl">
              <div className="productDetail">
                <div className="productDetail-img">
                  <div className="main-product-details box">
                    <div className="productdisplay-left">
                      <div className="productdisplay-img image">
                        <img
                          className="productdisplay-main-img img-detail"
                          src={`http://localhost:8090/${product.image}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="productDetail-content">
                  <div
                    className={`product-card ${
                      product.quantity === 0 ? "out-of-stock" : ""
                    }`}
                  >
                    <div className="main-product-details box">
                      <div className="border-bottom">
                        <h3 className="title">{product.title}</h3>
                      </div>

                      <div className="border-bottom py-3">
                        <p className="price text-dark link">
                          Giá{" "}
                          {product.price
                            ? product.price.toLocaleString()
                            : "N/A"}{" "}
                          VND
                        </p>
                      </div>

                      <div className="border-bottom py-1">
                        <div className="d-flex gap-10 align-items-center my-2">
                          <h3 className="product-heading">Loại thực phẩm :</h3>
                          <p className="product-data">{productCategory}</p>
                        </div>

                        <div className="d-flex gap-10 align-items-center my-2">
                          <h3 className="product-heading">Khối lượng :</h3>
                          <p className="product-data">{product.weight}</p>
                        </div>

                        <div className="d-flex gap-10 align-items-center my-2">
                          <h3 className="product-heading">Nơi sản xuất : </h3>
                          <p className="product-data">
                            {product.place_production}
                          </p>
                        </div>

                        <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                          <h3 className="product-heading">Số lượng : </h3>
                          <p className="product-data">{product.quantity}</p>
                        </div>
                        <div className="d-flex gap-30">
                          <button
                            className="button"
                            type="submit"
                            onClick={() => handleAddToCart(product.idBook)}
                            disabled={product.quantity === 0}
                          >
                            Thêm vào giỏ hàng
                          </button>
                          <PopupCart
                            trigger={buttonPopup}
                            setTrigger={setButtonPopup}
                          >
                            <h3 className="text-in-popup">{titleInfo}</h3>
                            <p>{contentInfo}</p>
                          </PopupCart>

                          <button
                            className="button"
                            type="submit"
                            onClick={() => handleBuyNow(product.idBook)}
                            disabled={product.quantity === 0}
                          >
                            Mua ngay
                          </button>

                          <PopuBuyNow
                            trigger={buttonPopupBuyNow}
                            setTrigger={setButtonPopupBuyNow}
                          >
                            <h3 className="text-in-popup">{titleInfoBuy}</h3>
                            <p>{contentInfoBuy}</p>
                          </PopuBuyNow>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="description-wrapper">
            <div className="container-xxl">
              <div className="row">
                <div className="col-12 product-detail">
                  <h3>Chi Tiết Sản Phẩm</h3>
                  <div className="bg-white p-3 box">
                    {/* <p>{product.describle}</p> */}
                    <div
                      dangerouslySetInnerHTML={{ __html: product.describle }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="popular-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Sản phẩm tương tự</h3>
            </div>
          </div>
          <div className="row box">
            {/* <ProductCard /> */}
            <ProductCard listProduct={products} />
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item">
                  <a
                    className="page-link previous-button"
                    aria-label="Previous"
                    onClick={goToPreviousPage}
                    style={{
                      outline: "none",
                      boxShadow: "none",
                    }}
                  >
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only"></span>
                  </a>
                </li>

                <li class="page-item">
                  <div className="pagination">
                    {Array.from({
                      length: totalPage,
                    }).map((_, index) => (
                      <span
                        class={`page-link ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                        href="#"
                        key={index}
                        onClick={() => paginate(index + 1)}
                        style={{
                          backgroundColor:
                            currentPage === index + 1 ? "#538641" : "white",
                          color:
                            currentPage === index + 1 ? "white" : "#538641",
                          borderColor:
                            currentPage === index + 1 ? "#538641" : "",
                        }}
                      >
                        {index + 1}
                      </span>
                    ))}
                  </div>
                </li>

                <li class="page-item">
                  <a
                    className="page-link previous-button"
                    aria-label="Next"
                    onClick={goToNextPage}
                    style={{
                      outline: "none",
                      boxShadow: "none",
                    }}
                  >
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only"></span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
};
