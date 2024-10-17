import React, { useEffect, useState } from "react";
import { BreadCrumb } from "./BreadCrumb.js";
import Meta from "./Meta.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Login } from "../pages/Login";
import AccountService from "../api/AccountService.js";
import InvoiceService from "../api/InvoiceService.js";
import Logo from "../images/Logo.png";
import "../css/Style.css";
import "../css/billMobile.css";

export const Bill = () => {
  const [jwtToken, setJwtToken] = useState(sessionStorage.getItem("jwtToken"));
  const [accountRole, setAccountRole] = useState("");
  const [accountEmail, setAccountEmail] = useState("");
  const [productsInInvoice, setProductsInInvoice] = useState([]);
  const [invoiceName, setInvoiceName] = useState();
  const [invoiceAddress, setInvoiceAddress] = useState();
  const [invoiceDate, setInvoiceDate] = useState();
  const [account, setAccount] = useState("");
  const [total, setTotal] = useState(0);
  const { invoiceId } = useParams();

  useEffect(() => {
    const getAccount = async () => {
      if (jwtToken !== "") {
        try {
          const account = await AccountService.getAccount(jwtToken);
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

  const getInvoice = async () => {
    // if (account.email !== null) {
    try {
      const response = await InvoiceService.getInvoiceById(invoiceId);
      console.log("product in cart", response);
      setProductsInInvoice(response.invoiceItems);
      setInvoiceName(response.invoiceName);
      setInvoiceAddress(response.shipAddress);
      setInvoiceDate(response.invoiceDate);
    } catch (error) {
      console.log("bug when log invoice", error);
    }
  };

  useEffect(() => {
    getInvoice();
  }, [invoiceId]);

  // Function to calculate the total sum
  const calculateTotalSum = () => {
    let sum = 0;
    productsInInvoice.forEach((cartItem) => {
      sum += cartItem.product.price * cartItem.quantity;
    });
    return sum;
  };

  // Update the total sum whenever productsInCart changes
  useEffect(() => {
    const sum = calculateTotalSum();
    setTotal(sum);
  }, [productsInInvoice]);

  const getButton = () => {
    if (accountRole === "admin") {
      return (
        <div className="pb-4 mt-3 mb-4 d-flex justify-content-center align-items-center">
          <Link to={"/ShowProductBooked"}>
            <button className="btn-submit px-4 py-1">Quay lại</button>
          </Link>
        </div>
      );
    } else if (accountRole === "user") {
      return (
        <div className="pb-4 mt-3 mb-4 d-flex justify-content-between align-items-center">
          <Link to="/Product">
            <button className="btn-submit px-4 py-1">Tiếp tục mua sắm</button>
          </Link>

          <Link to={`/HistoryInvoice/${accountEmail}`} className="ml-4">
            <button className="button-go-back px-4 py-1 ml-4">
              Xem tất cả hóa hơn
            </button>
          </Link>
        </div>
      );
    }
  };

  if (accountEmail !== "") {
    return (
      <>
        <Meta title={"Lịch sử hóa đơn"} />
        <BreadCrumb title="Lịch sử hóa đơn" />
        <section className="cart-wrapper py-5">
          <div className="col-12">
            <div className="container bg-white col-6 position-relative">
              <div className="px-5 box">
                {/* Header start */}
                <div className="d-flex">
                  <img src={Logo} className="logo col-4" alt="Logo" />
                  <div className="col-4"></div>
                  <div className="pt-5">
                    <div className=" pt-5">
                      <h3>HÓA ĐƠN</h3>
                    </div>
                  </div>
                </div>
                {/* Header end */}
                <div>
                  <div className="d-flex col-12">
                    <div className="col-7 d-flex">
                      <strong className="col-4">ID Bill :</strong>
                      <p className="col-8">{invoiceId}</p>
                    </div>
                  </div>

                  <div className="d-flex col-12">
                    <div className="d-flex col-7">
                      <strong className="col-4">Khách hàng :</strong>
                      <p className="col-8">{invoiceName}</p>
                    </div>
                    <div className="col-1"></div>
                    <div className="d-flex col-4">
                      <strong className="col-3">Ngày :</strong>
                      <p className="col-6">{invoiceDate}</p>
                    </div>
                  </div>
                  <div className="d-flex col-12">
                    <strong className="col-2">Địa chỉ :</strong>
                    <p className="col-9">{invoiceAddress}</p>
                  </div>
                </div>

                <div className="row cart-data-top">
                  {/* Table start */}
                  <table className="table col-12">
                    <thead>
                      <tr className="col-12">
                        <th className="col-1" scope="col-1"></th>
                        <th className=" col-5" scope="col-6">
                          Sản phẩm
                        </th>
                        <th className="col-2 text-center" scope="col-2">
                          Giá
                        </th>
                        <th className="col-2 text-center" scope="col-1">
                          Số Lượng
                        </th>
                        <th className="col-2 text-center" scope="col-2">
                          Tổng
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {productsInInvoice.map((cartItem, index) => (
                        <tr key={index}>
                          <th scope="row">
                            <img
                              src={`http://localhost:8090/${cartItem.product.image}`}
                              alt={cartItem.name}
                              width={90}
                              height={110}
                            />
                          </th>
                          <td className="">{cartItem.product.title}</td>
                          <td className="text-center">
                            {cartItem.product.price.toLocaleString()}
                          </td>
                          <td className="text-center">{cartItem.quantity}</td>
                          <td className="text-center">
                            {(
                              cartItem.product.price * cartItem.quantity
                            ).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Table end */}
                  <div className="d-flex">
                    <div className="col-7">
                      <p>
                        <strong> Cảm ơn bạn đã lựa chọn chúng tôi !</strong>
                      </p>
                    </div>
                    <div className="col-5 text-end">
                      <h6>
                        TỔNG: <strong>{total.toLocaleString()} VND</strong>
                      </h6>
                    </div>
                  </div>
                </div>
                {/* Additional info */}
                <div className="mt-3 fotter-bill d-flex justify-content-center align-items-center">
                  <div className="bottom-0 start-0 d-flex">
                    <p>
                      <strong>AnFoodStore@gmail.com | </strong>
                    </p>
                    <p className="ms-2">
                      <strong>0909 999 999</strong>
                    </p>
                  </div>
                </div>
                <div>{getButton()}</div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } else {
    return <Login />;
  }
};
