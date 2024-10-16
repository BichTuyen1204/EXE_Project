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
import "../css/historyInvoiceMobile.css"

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
        console.error(
          "Không tìm thấy sản phẩm hoặc dữ liệu không được xác định:",
          error
        );
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

        </div>
        <section>
        <div className="container-xxl bg-white p-5 box">
          <div className="row">
            <div className="col-12">
              <table id="myDataTable" className="table table-striped">
                <thead>
                  <tr className="cart-header">
                    <th className="col-2">Tên</th>
                    <th className="col-5">Địa chỉ</th>
                    <th className="col-1">Số điện thoại</th>
                    <th className="col-1">Ngày mua</th>
                    <th className="cart-col-2">Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center mt-5">
                        Không có hóa đơn nào ở đây
                      </td>
                    </tr>
                  ) : (
                    invoices.map((invoice, index) => (
                      <tr key={index} className="border-bottom py-3 align-items-center">
                        <td className="col-2">{invoice.account.name}</td>
                        <td className="col-5">{invoice.shipAddress}</td>
                        <td className="col-1">{invoice.account.phoneNumber}</td>
                        <td className="col-1">{invoice.invoiceDate}</td>
                        <td className="cart-col-2">{totalValue(invoice.invoiceItems)} VND</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      
      </div>
    );
  } else {
    return <Login />;
  }
};
