import React from "react";
import Logo from "../images/Logo.png";
import { IoHome } from "react-icons/io5";
import { FaRegAddressBook } from "react-icons/fa";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaBuilding } from "react-icons/fa";
import { SlEarphonesAlt } from "react-icons/sl";
import { SiTiktok } from "react-icons/si";
import { IoMail } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./header.css";
import "./footerMobile.css"
export const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-img">
          <div className="footer-div">
            <div className="footerItem-1">
              <Link
                to="/"
                onClick={() => {
                  window.scroll({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                  });
                }}
                className="text-dark link"
              >
                <img src={Logo} />
              </Link>

              <div>
                <p
                  style={{
                    fontSize: "30px",
                    color: " rgb(83, 173, 101)",
                    fontFamily: "math",
                  }}
                >
                  <i> Tịnh Thực Thanh Khiết, Tâm An Thân Khỏe</i>
                </p>
              </div>
            </div>
            <div className="footerItem-2" style={{ display: "contents" }}>
              <div className="social-links">
                <div className="social-icons">
                  {/* Icon home start */}
                  <li>
                    <a href="#">
                      <Link
                        to="/"
                        onClick={() => {
                          window.scroll({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                          });
                        }}
                        className="icon-footer link"
                      >
                        <IoHome className="m-2" />
                        Trang chủ
                      </Link>
                    </a>
                  </li>
                  {/* Icon home end */}

                  {/* Icon about us start */}
                  <li>
                    <a href="#">
                      <Link
                        to="/About"
                        onClick={() => {
                          window.scroll({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                          });
                        }}
                        className="icon-footer link"
                      >
                        <FaRegAddressBook className="m-2" /> Thông tin
                      </Link>
                    </a>
                  </li>
                  {/* Icon about us start */}

                  {/* Icon contact start */}
                  <li>
                    <a href="#">
                      <Link
                        to="/Contact"
                        onClick={() => {
                          window.scroll({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                          });
                        }}
                        className="icon-footer link"
                      >
                        <BiSolidPhoneCall className="m-2" /> Liên hệ
                      </Link>
                    </a>
                  </li>
                  {/* Icon contact end */}
                </div>
              </div>
              <div className="col-1 pt-5"></div>
              <div className="social-links py-2">
                <h4>
                  <strong>Theo dõi chúng tôi</strong>
                </h4>
                <div className="social-icons">
                  <li>
                    <a
                      href="https://www.facebook.com/profile.php?id=61560284147275"
                      className="icon-footer link"
                    >
                      <FaFacebook className="m-2" />
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#" className="icon-footer link">
                      <SiTiktok className="m-2" />
                      TikTok
                    </a>
                  </li>
                  {/*<li>
                  <a href="#" className="icon-footer link">
                    <GrInstagram className="m-2" />
                    Instagram
                  </a>
                </li>*/}
                </div>
              </div>
              <div className="col-1 pt-5"></div>
              <div class="address py-2">
                <h4>
                  <strong>Địa Chỉ</strong>
                </h4>
                <div class="address-links">
                  <li class="address1">
                    <FaBuilding className="m-2" />
                    14 Nguyễn Văn Cừ Nối Dài, Phường An Khánh, Ninh Kiều, Cần Thơ
                  </li>
                  <li className="address1">
                    <SlEarphonesAlt className="m-2" />
                    0909 999 999
                  </li>
                  <li>
                    <IoMail className="m-2" />
                    AnFoodStore@gmail.com
                  </li>
                </div>
              </div>
            </div>
          </div>
          <div className="end-footer pb-3">
            <strong>&copy; "AnFoodStore created by Group 5"</strong>
          </div>
        </div>
      </footer>
    </>
  );
};
