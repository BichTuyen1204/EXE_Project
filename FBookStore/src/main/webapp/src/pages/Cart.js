import React, { useEffect, useState } from "react";
import { BreadCrumb } from "./BreadCrumb.js";
import Meta from "./Meta.js";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import ProductService from "../api/ProductService.js";
import { Login } from "../pages/Login";
import AccountService from "../api/AccountService.js";
import CartServices from "../api/CartServices.js";
import { PopupBlockCheckOut } from "./PopupBlockCheckOut.js";

export const Cart = () => {
  const { idBook } = useParams();
  const [bookId, setBookId] = useState(idBook);
  const [jwtToken, setJwtToken] = useState(sessionStorage.getItem('jwtToken'));
  const [numberOfBookInCart, setNumberOfBookInCart] = useState();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [includeInTotal, setIncludeInTotal] = useState([false]);
  const [cardBodyDeleted, setCardBodyDeleted] = useState([false, false]);
  const [accountRole, setAccountRole] = useState('');
  const [accountEmail, setAccountEmail] = useState('');
  const [productsInCart, setProductsInCart] = useState([]);
  const [account, setAccount] = useState('');
  const [total, setTotal] = useState(0);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [titleInfo, setTitleInfo] = useState('');
  const [contentInfo, setContentInfo] = useState('');
  const [checkQuantityValid, setCheckQuantityValid] = useState(true);

  useEffect(() => {
    const getAccount = async () => {
      if (jwtToken !== '') {
        try {
          const account = await AccountService.getAccount(jwtToken);
          console.log("account cart: ", account)
          setAccountEmail(account.email)
          setAccountRole(account.role)
          setAccount(account)
        } catch (error) {
          console.error("Lỗi lấy thông tin tài khoản:", error);
        }
      } else {
        setAccountRole('');
        setAccountEmail('');
      }

    }

    getAccount();
  }, [jwtToken]);

  const getBookInCart = async () => {
    if (account.role === 'user') {
      try {
        const response = await CartServices.getBookInCart(account.email);
        console.log("product in cart", response);
        setNumberOfBookInCart(response.length)
        // setIdcart(response.shoppingCart.id);
        setProductsInCart(response.reverse());
      } catch (error) {
        console.log("error product in cart", error);
      }
    }
  }
  useEffect(() => {
    getBookInCart();
  }, [account, numberOfBookInCart]);

  const handleCheckout = async () => {

    if (productsInCart.length > 0) {
      navigate('/CheckOut')
    }
    else {
      setTitleInfo('Xin Lỗi');
      setContentInfo('Không có sản phẩm trong giỏ hàng')
      setButtonPopup(true);
      navigate('/Cart')
    }
  }

  // Function to calculate the total sum
  const calculateTotalSum = () => {
    let sum = 0;
    productsInCart.forEach(cartItem => {
      sum += cartItem.product.price * cartItem.quantity;
    });
    return sum;
  };

  // Update the total sum whenever productsInCart changes
  useEffect(() => {
    const sum = calculateTotalSum();
    setTotal(sum);
  }, [productsInCart]);


  if (account.role === 'user') {

    const handleDeleteCardBody = async (idBookDeleted, idCart) => {
      try {
        const response = await CartServices.deletBookInCart(idCart, idBookDeleted);
        console.log("product in cart", response);
        //setNumberOfBookInCart(response.cartItemList.length - 1)
        getBookInCart();
        navigate('/Cart')
      } catch (error) {

      }
    };

    const handleQuantityChange = async (event, index, idBook, idCart) => {
      const value = event.target.value;
      let newQuantity;
      if (value === "") {
        // Cho phép giá trị input tạm thời là chuỗi rỗng để người dùng có thể xóa và nhập lại
        newQuantity = "";
      } else {
        newQuantity = parseInt(value, 10);
        // Áp dụng giới hạn từ 1 đến 20
        if (isNaN(newQuantity) || newQuantity < 1) {
          newQuantity = 1;
        } else if (newQuantity > 20) {
          newQuantity = 20;
        }
      }

      // Cập nhật mảng productsInCart với quantity mới
      const updatedProductsInCart = productsInCart.map((item, i) => {
        if (i === index) { // Kiểm tra nếu là item cần cập nhật
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      // Giả sử bạn có một setState cho productsInCart ở đây
      setProductsInCart(updatedProductsInCart);
    }

    const handleBlurQuantity = (event, index, idBook, idCart) => {
      let newQuantity = parseInt(event.target.value, 10); // Chuyển đổi giá trị nhập vào thành số
      // Kiểm tra nếu giá trị nhập không hợp lệ hoặc nằm ngoài khoảng 1-20
      if (isNaN(newQuantity) || newQuantity < 1) {
        newQuantity = 1; // Đặt giá trị về 1 nếu dưới 1
      } else if (newQuantity > 20) {
        newQuantity = 20; // Giới hạn giá trị tối đa là 20
      }

      // Cập nhật mảng productsInCart với quantity mới
      const updatedProductsInCart = productsInCart.map((item, i) => {
        if (i === index) { // Kiểm tra nếu là item cần cập nhật
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      // Cập nhật state với mảng sản phẩm mới
      setProductsInCart(updatedProductsInCart);

      const updateBookInCart = (idCart, idBook, index) => {
        updatedProductsInCart.map(async (item, i) => {
          if (i === index) { // Kiểm tra nếu là item cần cập nhật

            try {
              const response = await CartServices.updateBookInCart(idCart, idBook, item.quantity);
              console.log("result updated: ", response);

            } catch (error) {
              console.log(error)
              setCheckQuantityValid(false);
              setTitleInfo('Xin lỗi');
              setContentInfo('Sản phẩm là chưa đủ')
              setButtonPopup(true);
              getBookInCart();
            }
          }
        })
      }
      updateBookInCart(idCart, idBook, index)
    };

    const incrementQuantity = (event, index) => {
      let newQuantity = parseInt(event.target.value, 10);
      if (isNaN(newQuantity) || newQuantity < 1) {
        newQuantity += 1; // Đặt giá trị về 1 nếu dưới 1
      }
      // Cập nhật mảng productsInCart với quantity mới
      const updatedProductsInCart = productsInCart.map((item, i) => {
        if (i === index) { // Kiểm tra nếu là item cần cập nhật
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      // Cập nhật state với mảng sản phẩm mới
      setProductsInCart(updatedProductsInCart);
    };

    const totalSum = (mount) => {
      setTotal(total += mount)
    };

    return (
      <>
        <Meta title={"Giỏ hàng"} />
        <BreadCrumb title="Giỏ hàng" />
        <section className="cart-wrapper  py-5">
          <div className="container-xxl bg-white p-5 box">
            <div className="row">
              <div className="col-12">
                <div className="cart-header d-flex justify-content-between">
                  <h4 className="col-5">Sản phẩm</h4>
                  <h4 className="col-2">Giá </h4>
                  <h4 className="col-2">Số lượng</h4>
                  <h4 className="col-2">Tổng</h4>
                  <h4 className="col-1"></h4>
                  {/* <h4 className="cart-col-6">Select</h4> */}
                </div>

                {productsInCart.length === 0 ? (
                  <div className="text-center mt-5">Không có sản phẩm nào ở đây</div>
                ) : (productsInCart.map(
                  (cartItem, index) =>
                    !cardBodyDeleted[index] && (
                      <div
                        key={index}
                        className="cart-data d-flex py-3 mb-2 justify-content-between align-items-center col-12"
                      >
                        {/* Image and title start */}
                        <div className="cart-col-1 gap-15 d-flex align-items-center col-5">
                          {/* Img start */}
                          <div className="w-25">
                            <div className="img-product-detail">
                              <img
                                src={`http://localhost:8090/${cartItem.product.image}`}
                                alt={cartItem.name}
                                width={90}
                                height={110}
                              />
                            </div>
                          </div>
                          {/* Img end */}

                          {/* Titlte start */}
                          <div className="w-75">
                            <p>
                              <strong>{cartItem.product.title}</strong>
                            </p>
                            <p>Loại thực phẩm: {cartItem.product.category.name}</p>
                          </div>
                          {/* Titlte end */}
                        </div>
                        {/* Image and title end */}

                        {/* Price start */}
                        <div className="cart-col-2 col-2">
                          <h8 className="price">{cartItem.product.price.toLocaleString()}  VND</h8>
                        </div>
                        {/* Price end */}

                        {/* Quantity start */}
                        <div className="cart-col-3 d-flex gap-15 col-2">
                          <div className="button-increate-decreate d-flex">
                            <div className="value-quantity">
                              <input
                                className="input-value-of-cart col-3 text-center"
                                type="number"
                                name="quantity"
                                value={cartItem.quantity}
                                onChange={(e) => handleQuantityChange(e, index, cartItem.product.idBook, cartItem.shoppingCart.id)}
                                onBlur={(e) => handleBlurQuantity(e, index, cartItem.product.idBook, cartItem.shoppingCart.id)}
                                width={{ with: "50px" }}
                              />
                            </div>
                          </div>
                        </div>
                        {/* Quantity end */}

                        {/* Total start */}
                        <div className="cart-col-4 col-2">
                          <h8 className="price"> {(cartItem.product.price * cartItem.quantity).toLocaleString()}  VND</h8>
                        </div>
                        {/* Total end */}

                        {/* Icon trash start */}
                        <div className="cart-col-5 col-1">
                            <div className="mt-3">
                              <FaRegTrashCan
                                className="text-danger icon-trash " 
                                onClick={() => handleDeleteCardBody(cartItem.product.idBook, cartItem.shoppingCart.id)}
                              />
                          </div>
                        </div>
                        {/* Icon trash end */}
                      </div>
                    )
                ))}

                {/* Button go back and checkout start */}
                <div className="col-12 py-2 mt-4">
                  <div className="d-flex justify-content-between align-items-baseline ">
                    {/* Total all book start */}
                    <div className="d-flex flex-column total-book">
                      <h6 className="">
                        <strong className="">Tổng sản phẩm: </strong> {numberOfBookInCart}
                      </h6>
                      <Link to="/product" className="button link mt-2">
                        Tiếp tục mua sắm
                      </Link>
                    </div>
                    {/* Total all book end */}

                    {/* Total and checkout start */}
                    <div className="d-flex flex-column align-items-end">
                      <h6>
                        <strong>Tổng: </strong>{total.toLocaleString()} VND
                      </h6>
                      <button onClick={handleCheckout} className="button mt-2">
                        Thanh Toán
                      </button>
                    </div>
                    {/* Total and checkout end */}
                  </div>
                </div>
                {/* Button go back and checkout end */}
              </div>
            </div>
          </div>
          <PopupBlockCheckOut trigger={buttonPopup} setTrigger={setButtonPopup}>
            <h3 className="text-in-popup text-danger">{titleInfo}</h3>
            <p>{contentInfo}</p>
          </PopupBlockCheckOut>
        </section>
      </>
    );
  } else {
    return (<Login />)
  }
};
