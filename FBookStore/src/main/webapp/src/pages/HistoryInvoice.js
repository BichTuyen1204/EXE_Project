import React, { useEffect, useState } from "react";
import { BreadCrumb } from "./BreadCrumb.js";
import Meta from "./Meta.js";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Login } from "../pages/Login";
import $ from "jquery";
import "datatables.net-bs5";
import "bootstrap/dist/css/bootstrap.min.css";
import AccountService from "../api/AccountService.js";
import InvoiceService from "../api/InvoiceService.js";
import { FaCaretUp } from "react-icons/fa";
import { Button } from "react-bootstrap";

export const HistoryInvoice = () => {
  const [jwtToken] = useState(sessionStorage.getItem("jwtToken"));
  const [invoices, setInvoices] = useState([]);
  const [activeCell, setActiveCell] = useState(null); // State để theo dõi ô đang được nhấn
  const [accountRole, setAccountRole] = useState("");
  const [accountEmail, setAccountEmail] = useState("");
  const [productsInCart, setProductsInCart] = useState([]);
  const [account, setAccount] = useState("");
  const [total, setTotal] = useState(0);
  const { email } = useParams();
  const handleCellClick = (index) => {
    setActiveCell(index); // Cập nhật state khi một ô được nhấn
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
    const getData = async () => {
      try {
        const response = await InvoiceService.getInvoiceByEmail(email);
        setInvoices(response);
      } catch (error) {
        console.error("Không tìm thấy sản phẩm hoặc dữ liệu không được xác định:", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    // Ensure the table is not initialized until the data is fetched
    if (invoices.length > 0) {
      // DataTable initialization
      const table = $("#myDataTable").DataTable();
      // Clean-up function to destroy DataTables instance
      return () => {
        table.destroy();
      };
    }
  }, [invoices]);

  const totalValue = (invoiceItems) => {
    return invoiceItems.reduce((accumulator, item) => {
      return accumulator + item.quantity * item.product.price;
    }, 0);
  };

  // Function to calculate the total sum
  const calculateTotalSum = () => {
    let sum = 0;
    productsInCart.forEach((cartItem) => {
      sum += cartItem.product.price * cartItem.quantity;
    });
    return sum;
  };

  // Update the total sum whenever productsInCart changes
  useEffect(() => {
    const sum = calculateTotalSum();
    setTotal(sum);
  }, [productsInCart]);

  if (accountRole === "user") {
    return (
      <div className="">
        <div className="">
          <div class="mx-xxl-3 px-4 px-sm-5">
            <div class="py-5">
              <div class="row g-4 align-items-center">
                <div class="col">
                  <h1>Tất Cả Hóa Đơn</h1>
                </div>
              </div>
            </div>
          </div>

          {/* Show product start*/}
          <div class="mx-xxl-3 px-4 px-sm-5">
            <div className="row g-4 align-items-center ">
              <div class="table-responsive">
                <table
                  id="myDataTable"
                  className="table table-striped table-bordered table-in-adddata"
                >
                  <thead>
                    <tr className="col-12">
                      <th
                        onClick={() => handleCellClick(0)}
                        className="col-1 text-center"
                      >
                        Id hóa đơn{activeCell === 0 && <FaCaretUp />}
                      </th>
                      <th
                        onClick={() => handleCellClick(1)}
                        className="col-2 text-center"
                      >
                        Tên khách hàng {activeCell === 1 && <FaCaretUp />}
                      </th>
                      <th
                        onClick={() => handleCellClick(2)}
                        className="col-2 text-center"
                      >
                        Số điện thoại {activeCell === 2 && <FaCaretUp />}
                      </th>
                      <th
                        onClick={() => handleCellClick(3)}
                        className="col-4 text-center"
                      >
                        Địa chỉ {activeCell === 3 && <FaCaretUp />}
                      </th>
                      <th
                        onClick={() => handleCellClick(4)}
                        className="col-1 text-center"
                      >
                        Ngày {activeCell === 4 && <FaCaretUp />}
                      </th>
                      <th
                        onClick={() => handleCellClick(6)}
                        className="col-1 text-center"
                      >
                        Tổng{activeCell === 6 && <FaCaretUp />}
                      </th>
                      <th
                        onClick={() => handleCellClick(5)}
                        className="col-1 text-center"
                      >
                        Xem chi tiết {activeCell === 5 && <FaCaretUp />}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.length === 0 ? (
                      <tr className="text-center mt-5">
                      <td colSpan={7}> Không có hóa đơn nào ở đây</td></tr>
                    ) : (
                      invoices &&
                      invoices.length > 0 &&
                      invoices.map((invoice) => (
                        <tr key={invoice.invoiceID}>
                          <td className="text-center">{invoice.invoiceID}</td>
                          <td className="text-center">
                            {invoice.account.name}
                          </td>
                          <td className="text-center">
                            {invoice.account.phoneNumber}
                          </td>
                          <td className="">{invoice.shipAddress}</td>
                          <td className="text-center">{invoice.invoiceDate}</td>
                          <td className="text-center">
                            {totalValue(invoice.invoiceItems)} VND
                          </td>
                          <td className="text-center">
                            <Link to={`/Bill/${invoice.invoiceID}`}>
                              <Button className="button-view-continue px-4 py-1">
                                Chi tiết
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Show product end*/}
        </div>
      </div>
    );
  } else {
    return <Login />;
  }
};
