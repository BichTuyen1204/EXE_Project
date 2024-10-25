import React, { useState, useEffect } from "react";
import { BreadCrumb } from "./BreadCrumb.js";
import Meta from "./Meta.js";
import { BiArrowBack } from "react-icons/bi";
import { Popup } from "./Popup";
import { Link, useNavigate } from "react-router-dom";
import data from "../data/dvhcvn.json";
import AccountService from "../api/AccountService.js";
import CartServices from "../api/CartServices.js";
import InvoiceService from "../api/InvoiceService.js";
import { Button } from "react-bootstrap";
import { Login } from "../pages/Login";
import PopupOrder from "./PopupOrder.js";
import { PopupBlockCheckOut } from "./PopupBlockCheckOut.js";
import "../css/Style.css";
export const CheckOut = () => {
  const [visible, setVisible] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [titleInfo, setTitleInfo] = useState("");
  const [contentInfo, setContentInfo] = useState("");
  const [accountRole, setAccountRole] = useState("");
  const [invoiceName, setInvoiceName] = useState("");
  const [invoiceEmail, setInvoiceEmail] = useState("");
  const [invoicePhone, setInvoicePhone] = useState("");
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [jwtToken, setJwtToken] = useState(sessionStorage.getItem("jwtToken"));
  const cities = data.data;
  const [city, setCity] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [productsInCart, setProductsInCart] = useState([]);
  const [numberOfBookInCart, setNumberOfBookInCart] = useState();
  const [idCart, setIdcart] = useState("");
  const [account, setAccount] = useState("");
  const [discount, setDiscount] = useState(0);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cityError, setCityError] = useState(false);
  const [districtError, setDistrictError] = useState(false);
  const [wardError, setWardError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [invoiceNameError, setInvoiceNameError] = useState("");
  const [invoiceEmailError, setInvoiceEmailError] = useState("");
  const [invoicePhoneError, setInvoicePhoneError] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [totalOrderPrice, setTotalOrderPrice] = useState(0);
  const navigate = useNavigate();

  const changeCity = (event) => {
    setCity(event.target.value);
    setCityError(false);
    setDistricts(
      cities.find((ct) => ct.name === event.target.value)?.districts || []
    );
  };

  const changeDistrict = (event) => {
    setDistrict(event.target.value);
    setDistrictError(false);
    setWards(
      districts.find((district) => district.name === event.target.value)
        ?.wards || []
    );
  };

  const changeWard = (event) => {
    setWard(event.target.value);
    setWardError(false);
  };

  const changeAddress = (e) => {
    setAddress(e.target.value);
    setAddressError(false);
  };

  const changeName = (e) => {
    setInvoiceName(e.target.value);
  };

  const changeEmail = (e) => {
    setInvoiceEmail(e.target.value);
  };

  const changePhoneNumber = (e) => {
    setInvoicePhone(e.target.value);
  };

  const changeTotalPrice = (e) => {
    setTotalPrice(e.target.value);
  };

  const handleOpenOrderModal = () => {
    if (!validateInputs()) {
      return;
    } else if (numberOfBookInCart === 0) {
      setTitleInfo("LỖI");
      setContentInfo("Không có sách để đặt hàng");
      setButtonPopup(true);
    } else {
      setModalShow(true);
    }
  };

  const validateInputs = () => {
    let isValid = true;
    // City
    if (!city) {
      setCityError(true);
      isValid = false;
    } else {
      setCityError(false);
    }

    // District
    if (!district) {
      setDistrictError(true);
      isValid = false;
    } else {
      setDistrictError(false);
    }

    // Ward
    if (!ward) {
      setWardError(true);
      isValid = false;
    } else {
      setWardError(false);
    }

    // Address
    if (!address) {
      setAddressError(true);
      isValid = false;
    } else {
      setAddressError(false);
    }

    // Name
    if (invoiceName.length < 2) {
      setInvoiceNameError("Tên phải dài ít nhất 2 ký tự.");
      isValid = false;
    } else if (!invoiceName) {
      setInvoiceNameError("Vui lòng nhập tên của bạn");
      isValid = false;
    } else {
      setInvoiceNameError("");
    }

    // Email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(invoiceEmail)) {
      setInvoiceEmailError("Vui lòng nhập địa chỉ email hợp lệ.");
      isValid = false;
    } else if (!invoiceEmail) {
      setInvoiceEmailError("Vui lòng nhập email của bạn.");
      isValid = false;
    } else if (/@[^\w@]+\w/.test(invoiceEmail)) {
      setInvoiceEmailError("Vui lòng nhập lại email của bạn.");
      isValid = false;
    } else if (!/^[^\s@]+@[^\d@]+\.[^\s@]+$/.test(invoiceEmail)) {
      setInvoiceEmailError("Không được phép sử dụng số sau @ và trước .com.");
      isValid = false;
    } else {
      setInvoiceEmailError("");
    }

    // Phone number
    if (!invoicePhone) {
      setInvoicePhoneError("Xin vui lòng điền số điện thoại của bạn.");
      isValid = false;
    } else if (!/^\d{10}$/.test(invoicePhone)) {
      setInvoicePhoneError("Số điện thoại phải dài 10 chữ số và chỉ chứa số.");
      isValid = false;
    } else if (!/^0/.test(invoicePhone)) {
      setInvoicePhoneError("Vui lòng nhập số điện thoại bắt đầu bằng 0");
      isValid = false;
    } else {
      setInvoicePhoneError("");
    }

    // Set other errors to empty if they are valid
    if (isValid) {
      setCityError("");
      setDistrictError("");
      setWardError("");
      setAddressError("");
    }
    return isValid;
  };

  // Check account start
  useEffect(() => {
    const getAccount = async () => {
      if (jwtToken !== null) {
        try {
          const account = await AccountService.getAccount(jwtToken);
          console.log("account checkout: ", account);
          console.log("firstPurchase: ", account.firstPurchase, "Type: ", typeof account.firstPurchase);
          setInvoiceEmail(account.email);
          setAccountRole(account.role);
          setInvoiceName(account.name);
          setInvoicePhone(account.phoneNumber);
          setAccount(account);

          if (account.firstPurchase === true) {
            setDiscount(10000);
          } else {
            setDiscount(0);
          }
        } catch (error) {
          console.error("Lỗi lấy thông tin tài khoản:", error);
        }
      } else {
        setAccountRole("");
        setInvoiceEmail("");
        setAccount("");
        setDiscount(0);
      }
    };
    getAccount();
  }, [jwtToken]);
  // Check account end

  // Check cart start
  useEffect(() => {
    const getBookInCart = async () => {
      if (account.role === "user") {
        try {
          const response = await CartServices.getBookInCart(account.email);
          console.log("product in cart for checkout", response);
          setProductsInCart(response);
          setNumberOfBookInCart(response.length);
          console.log("books", numberOfBookInCart);
        } catch { }
      }
    };
    getBookInCart();
  }, [account, numberOfBookInCart]);
  // Check cart end

  // Check order start
  const handleOrder = async () => {
    const shipAddress = address + ", " + ward + ", " + district + ", " + city;
    const invoiceItems = productsInCart;
    const invoice = {
      shipAddress,
      paymentMethod,
      account,
      invoiceItems,
      invoiceName,
      invoiceEmail,
      invoicePhone,
      totalPrice,
    };
    console.log(invoice);
    try {
      const data = await InvoiceService.createInvoice(invoice);
      console.log("checkout page information:", data);
      navigate(`/OrderSuccess/${data.invoiceID}`);
    } catch (error) {
      console.error("lỗi trang thanh toán:", error);
    }
  };
  // Check order end

  // Total price start
  const total = productsInCart.reduce((accumulator, cartItem) => {
    return accumulator + cartItem.product.price * cartItem.quantity;
  }, 0);

  useEffect(() => {
    setTotalPrice(total - discount);
  }, [total, discount]);


  // Total price end
  if (accountRole !== "") {
    return (
      <>
        <Meta title={"Thanh toán"} />
        <BreadCrumb title="Thanh toán" />
        <main>
          <div className="checkout-wrapper py-5 ">
            <div className="container-xxl">
              <div className="row">
                <div className="checkout-form-wrapper col-7 p-5 box">
                  <div className="checkout-left-data">
                    <h3 className="website-name text-center mb-4">
                      AnFoodStore
                    </h3>
                    <h4 className="title my-3">Thông Tin</h4>
                    <form className="gap-15 my-3 flex-wrap justify-content-between">
                      <div>
                        {/* Name start */}
                        <div className="form-group">
                          <label htmlFor="name">
                            <strong>Khách hàng :</strong>
                          </label>
                          <input
                            type="text"
                            className={`form-control input-checkout-infor ${invoiceNameError ? "is-invalid" : ""
                              }`}
                            id="name"
                            placeholder="Enter your name"
                            value={invoiceName}
                            onChange={changeName}
                          />
                          {invoiceNameError && (
                            <div className="invalid-feedback">
                              {invoiceNameError}
                            </div>
                          )}
                        </div>
                        {/* Name end */}

                        {/* Email start */}
                        <div className="form-group mt-4">
                          <label htmlFor="email">
                            <strong>Địa chỉ email:</strong>
                          </label>
                          <input
                            type="email"
                            className={`form-control input-checkout-infor ${invoiceEmailError ? "is-invalid" : ""
                              }`}
                            id="email"
                            placeholder="Enter your email"
                            value={invoiceEmail}
                            onChange={changeEmail}
                          />
                          {invoiceEmailError && (
                            <div className="invalid-feedback">
                              {invoiceEmailError}
                            </div>
                          )}
                        </div>
                        {/* Email end */}

                        {/* Phone number start */}
                        <div className="form-group mt-4">
                          <label htmlFor="phoneNumber">
                            <strong>Số điện thoại:</strong>
                          </label>
                          <input
                            type="text"
                            className={`form-control input-checkout-infor ${invoicePhoneError ? "is-invalid" : ""
                              }`}
                            id="phoneNumber"
                            placeholder="Enter your phone number"
                            value={invoicePhone}
                            onChange={changePhoneNumber}
                          />
                          {invoicePhoneError && (
                            <div className="invalid-feedback">
                              {invoicePhoneError}
                            </div>
                          )}
                        </div>
                        {/* Phone number end */}
                      </div>
                      <div className="mt-4">
                        <h4>Địa chỉ giao hàng</h4>
                        <div className="d-flex mb-2">
                          {/* City start */}
                          <div className="flex-grow-1 me-1">
                            <select
                              name="city"
                              className={`form-control select-checkout-address ${cityError ? "is-invalid" : ""
                                }`}
                              id=""
                              value={city}
                              onChange={changeCity}
                            >
                              <option>Tỉnh/ Thành Phố</option>
                              {cities.map((ct) => (
                                <option key={ct.name} value={ct.name}>
                                  {ct.name}
                                </option>
                              ))}
                            </select>
                            {cityError && (
                              <div className="invalid-feedback">
                                Vui lòng chọn một tỉnh/ thành phố.
                              </div>
                            )}
                          </div>
                          {/* City end */}

                          {/* District start */}
                          <div className="flex-grow-1 me-1">
                            <select
                              name=""
                              className={`form-control select-checkout-address ${districtError ? "is-invalid" : ""
                                }`}
                              id=""
                              value={district}
                              onChange={changeDistrict}
                            >
                              <option>Quận/Huyện</option>
                              {districts.map((district) => (
                                <option
                                  key={district.name}
                                  value={district.name}
                                >
                                  {district.name}
                                </option>
                              ))}
                            </select>
                            {districtError && (
                              <div className="invalid-feedback">
                                Vui lòng chọn một quận/ huyện.
                              </div>
                            )}
                          </div>
                          {/* District end */}

                          {/* Ward start */}
                          <div className="flex-grow-1">
                            <select
                              name=""
                              className={`form-control select-checkout-address ${wardError ? "is-invalid" : ""
                                }`}
                              id=""
                              onChange={changeWard}
                            >
                              <option>Xã/ Phường</option>
                              {wards.map((ward, index) => (
                                <option key={index} value={ward.name}>
                                  {ward.name}
                                </option>
                              ))}
                            </select>
                            {wardError && (
                              <div className="invalid-feedback">
                                Vui lòng chọn một xã/ phường.
                              </div>
                            )}
                          </div>
                          {/* Ward end */}
                        </div>

                        {/* Input the address start */}
                        <div className="w-100 mb-2z input-checkout">
                          <input
                            type="text"
                            className={`form-control select-checkout-address ${addressError ? "is-invalid" : ""
                              }`}
                            placeholder="số nhà - đường"
                            onChange={changeAddress}
                          ></input>
                          {addressError && (
                            <div className="invalid-feedback">
                              Vui lòng nhập địa chỉ của bạn.
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Input the address end */}


                      {/* Payment method start */}
                      <div className="my-3">
                        <div className="w-100">
                          <h5>Phương thức thanh toán</h5>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="cod"
                              onClick={() => setVisible(false)}
                              defaultChecked
                            />
                            <label class="form-check-label" for="cod">
                              Thanh toán khi giao hàng
                            </label>
                          </div>
                        </div>
                      </div>
                      {/* Payment method end */}

                      {/* Button start */}
                      <div className="w-100">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="col-10 ">
                            <Link
                              to="/Cart"
                              className="button-go-back px-2 py-1"
                            >
                              <div className="link button-go-to-cart">
                                <BiArrowBack className="m-lg-2 link" />
                                Đi tới giỏ hàng
                              </div>
                            </Link>
                          </div>

                          <div className="col-2 button-order-big">
                            <Button
                              style={{
                                backgroundColor: "#538641",
                                borderColor: "black",
                              }}
                              className="button"
                              onClick={handleOpenOrderModal}
                            >
                              Thanh Toán
                            </Button>
                          </div>

                          <PopupOrder
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            onConfirmOrder={handleOrder}
                          />
                        </div>
                      </div>
                      {/* Button end */}
                    </form>
                  </div>
                </div>
                <div className="col-4 offset-1 bg-white box border-bottom">
                  {productsInCart.map((cartItem) => (
                    <div className="border-bottom py-4 col-12">
                      <div className="d-flex gap-10 align-items-center">
                        <div className="w-65 d-flex gap-10 col-8">
                          <div className="w-15 position-relative col-3">
                            <span className="checkout-badge badge bg-secondary text-white rounded-circle p-2 position-absolute">
                              {cartItem.quantity}
                            </span>
                            <div className="col-12">
                              <img
                                className="check-out-img"
                                src={`http://localhost:8090/${cartItem.product.image}`}
                                width={90}
                                height={110}
                              />
                            </div>
                          </div>
                          {/* Title start */}
                          <div className="pt-4 col-7 mx-2">
                            <p className="title">
                              <strong>{cartItem.product.title}</strong>
                            </p>
                          </div>
                          {/* Title end */}
                        </div>

                        {/* Total price start */}
                        <div className="flex-grow-1 col-4 px-3">
                          <h7 className="price-checkout">
                            <strong>
                              {(cartItem.product.price * cartItem.quantity).toLocaleString()} VND
                            </strong>
                          </h7>
                        </div>
                        {/* Total price end */}
                      </div>
                    </div>
                  ))}

                  <div className="d-flex justify-content-between align-items-center py-2">
                    <h4 className="total">
                      <strong>Tổng: </strong>
                    </h4>
                    <h5 className="total-price">
                      <strong>{total.toLocaleString()} VND</strong>
                    </h5>
                  </div>

                  <div className="d-flex justify-content-between align-items-center py-2">
                    <h4 className="total">
                      <strong>Voucher: </strong>
                    </h4>
                    <h5 className="total-price">
                      <strong>{discount.toLocaleString()} VND</strong>
                    </h5>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between align-items-center py-2">
                    <h4 className="total">
                      <strong>Tổng tiền: </strong>
                    </h4>
                    <h5 className="total-price">
                      <strong>{totalPrice.toLocaleString()} VND</strong>
                    </h5>
                  </div>

                </div>
              </div>
            </div>
          </div>
          
          <PopupBlockCheckOut trigger={buttonPopup} setTrigger={setButtonPopup}>
            <h3 className="text-in-popup text-danger">{titleInfo}</h3>
            <p>{contentInfo}</p>
          </PopupBlockCheckOut>
        </main>
      </>
    );
  } else {
    return <Login />;
  }
};
