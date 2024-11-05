import React, { useState, useEffect } from "react";
import { BreadCrumb } from "./BreadCrumb";
import Meta from "./Meta";
import { IoHome } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { MdInfo } from "react-icons/md";
import AccountService from "../api/AccountService.js";
import { Popup } from "./Popup";
import { Login } from "../pages/Login";
import { useNavigate } from "react-router-dom";
import "../css/Style.css";

export const Contact = () => {
  const navigate = useNavigate();
  const [jwtToken, setJwtToken] = useState(sessionStorage.getItem("jwtToken"));
  const [accountPhone, setAccountPhone] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountEmail, setAccountEmail] = useState("");
  const [accountId, setAccountId] = useState("");
  const [accountRole, setAccountRole] = useState("");
  const [content, setContent] = useState("");
  const [buttonPopup, setButtonPopup] = useState(false);

  useEffect(() => {
    const getAccount = async () => {
      if (jwtToken !== "") {
        try {
          const account = await AccountService.getAccount(jwtToken);
          console.log("account header: ", account);
          setAccountEmail(account.email);
          setAccountPhone(account.phoneNumber);
          setAccountName(account.name);
          setAccountId(account.id);
          setAccountRole(account.role);
        } catch (error) {
          console.error("Lỗi lấy thông tin tài khoản:", error);
        }
      } else {
        setAccountPhone("");
        setAccountName("");
        setAccountEmail("");
        setAccountRole("");
      }
    };
    getAccount();
  }, [jwtToken]);

  const handleOnClick = async () => {
    if (accountRole === "user") {
      if (content.trim() !== "") {
        const comment = {
          accountId,
          content,
        };
        console.log("contact", comment);

        const response = await AccountService.addComment(comment);
        console.log("checkout page information:", response);
        // Xử lý orderData, ví dụ gửi đến server
        setButtonPopup(true);
      } else {
        alert("Vui lòng điền thông tin đầy đủ và chính xác");
      }
    } else {
      navigate("/Login");
    }
  };

  return (
    <>
      <Meta title={"Liên hệ"} />
      <BreadCrumb title="Liên hệ" />
      <div className="contact-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 box">
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d432.1776421150913!2d105.77643685959059!3d10.048769812250757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a089faf5c47ec9%3A0x83c6ec48f3917913!2sFpt%20Arena%20Multimedia!5e1!3m2!1svi!2s!4v1706514755581!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
                width="500"
                height="650"
                className="border-0 w-100 p-lg-5"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="col-12 mt-5 box">
              <div className="contact-inner-wrapper d-flex justify-content-between">
                <div>
                  <h3 className="contact-title mb-4">Thông tin của khách hàng</h3>
                  <form action="" className="d-flex flex-column gap-15">
                    <p>
                      <strong>Khách hàng: </strong> {accountName}
                    </p>
                    <p>
                      <strong>Email: </strong> {accountEmail}
                    </p>
                    <p>
                      <strong>Số điện thoại: </strong> {accountPhone}
                    </p>

                    <div className="input-comments-big mt-3">
                      <strong>Có vấn đề gì hãy bình luận tại đây nhé!</strong>
                      <textarea
                        name=""
                        id=""
                        className="mt-2 w-100 form-control input-comments-small box"
                        cols="30"
                        rows="4"
                        placeholder="Bình luận tại đây..."
                        onChange={(e) => setContent(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="button"
                        onClick={handleOnClick}
                      >
                        Gửi
                      </button>
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className="contact-title mb-4">
                    Hãy liên lạc với chúng tôi
                  </h3>
                  <div>
                    <ul className="ps-0">
                      <li className="mb-2 d-flex gap-15 align-items-center icon-contact">
                        <IoHome className="fs-5" />
                        <address>
                          14 Nguyễn Văn Cừ Nối Dài, Phường An Khánh, Ninh Kiều,
                          Cần Thơ
                        </address>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center icon-contact">
                        <FaPhone className="fs-5" />
                        <a className="link" href="tel:84 99 99 99 99">
                          +84 99 99 99 99
                        </a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center icon-contact">
                        <IoMail className="fs-5" />
                        <a className="link" href="mailto:FBookStore@gmail.com">
                          AnFoodStore@gmail.com
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h3 className="text-in-popup">Gửi thành công</h3>
          <p>Bình luận của bạn đã được gửi thành công</p>
        </Popup>
      </div>
    </>
  );
};
