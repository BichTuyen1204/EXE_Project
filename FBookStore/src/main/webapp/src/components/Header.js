import React, { useState, useEffect } from "react";
import { NavLink, Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "../images/Logo.png";
import { BsSearch } from "react-icons/bs";
import { FaCartShopping } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";
import { AiFillHome } from "react-icons/ai";
import { GiShop } from "react-icons/gi";
import { PiPhoneCallFill } from "react-icons/pi";
import { BsJournalCheck } from "react-icons/bs";
import AccountService from "../api/AccountService.js";
import CategoryService from "../api/CategoryService";
import ProductService from "../api/ProductService.js";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "../components/header.css";
import { MdUpdate } from "react-icons/md";
import "./headerMobile.css"
export const Header = () => {
  const [jwtToken, setJwtToken] = useState(sessionStorage.getItem("jwtToken"));
  const [accountRole, setAccountRole] = useState("");
  const [accountName, setAccountName] = useState("");
  const [category, setCategory] = useState([]);
  const [accountEmail, setAccountEmail] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const [accountID, setAccountID] = useState();

  const handleLogout = () => {
    sessionStorage.removeItem("jwtToken");
    setJwtToken(null);
    window.location.reload();
  };

  // Nhận giá keyword người dùng nhập
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchProduct(searchInput);
    }
  };

  const handleSearchProduct = async (search) => {
    try {
      navigate(`/product/${search}`);
    } catch (error) {
      console.error("Failed", error);
    }
  };

  useEffect(() => {
    const getAccount = async () => {
      if (jwtToken !== "") {
        try {
          const account = await AccountService.getAccount(jwtToken);
          console.log("account header: ", account);
          setAccountEmail(account.email);
          setAccountRole(account.role);
          setAccountName(account.name);
          setAccountID(account.id);
        } catch (error) {
          console.error("Error fetching account information:", error);
        }
      } else {
        setAccountRole("");
        setAccountName("");
        setAccountEmail("");
      }
    };
    getAccount();
  }, [jwtToken]);

  const getUser = () => {
    if (accountEmail !== "") {
      if (accountRole === "admin") {
        return (
          <DropdownButton
            className="d-flex align-items-center gap-10 text-white"
            id="dropdown-basic-button"
            title={
              <IoPersonSharp className="icon-on-header icon-on-header-user" />
            }
            variant="light"
          >
            <Dropdown.Item
              className="link background-icon-person"
              as={Link}
              to="/"
              onClick={handleLogout}
            >
              Đăng xuất
            </Dropdown.Item>
            <Dropdown.Item
              className="link background-icon-person"
              as={Link}
              to="/Profile"
            >
              {accountName}
            </Dropdown.Item>
            <Dropdown.Item
              className="link background-icon-person"
              as={Link}
              to="/Product2"
            >
              Admin
            </Dropdown.Item>
          </DropdownButton>
        );
      } else if (accountRole === "user") {
        return (
          <DropdownButton
            className="d-flex align-items-center gap-10 text-white"
            id="dropdown-basic-button"
            title={
              <IoPersonSharp className="icon-on-header icon-on-header-user" />
            }
            variant="light"
          >
            <Dropdown.Item
              className="link"
              as={Link}
              to="/"
              onClick={handleLogout}
            >
              Đăng xuất
            </Dropdown.Item>
            <Dropdown.Item className="link" as={Link} to="/Profile">
              {accountName}
            </Dropdown.Item>
          </DropdownButton>
        );
      } else {
        return (
          <DropdownButton
            id="dropdown-basic-button"
            title={
              <IoPersonSharp className="icon-on-header icon-on-header-user" />
            }
            variant="light"
          >
            <Dropdown.Item className="link" as={Link} to="/Login">
              Đăng nhập
            </Dropdown.Item>
            <Dropdown.Item className="link" as={Link} to="/Signup">
              Đăng ký
            </Dropdown.Item>
          </DropdownButton>
        );
      }
    } else {
      return (
        <DropdownButton
          id="dropdown-basic-button"
          title={
            <IoPersonSharp className="icon-on-header icon-on-header-user" />
          }
          variant="light"
        >
          <Dropdown.Item
            className="link background-icon-person"
            as={Link}
            to="/Login"
          >
            Đăng nhập
          </Dropdown.Item>
          <Dropdown.Item
            className="link background-icon-person"
            as={Link}
            to="/Signup"
          >
            Đăng ký
          </Dropdown.Item>
        </DropdownButton>
      );
    }
  };

  const getCart = () => {
    if (accountEmail !== "") {
      if (accountRole === "user") {
        return (
          <div className="col-2">
            <Link to="/Cart" className="d-flex align-items-center text-white">
              <FaCartShopping className="icon-on-header icon-on-header-cart" />
            </Link>
          </div>
        );
      }
    }
  };

  const getHisInvoice = () => {
    if (accountEmail !== "") {
      if (accountRole === "user") {
        return (
          <div className="icon-home">
            <div className="icon-and-text-function">
              <BsJournalCheck className="icon-on-header-bottom mb-2" />
              <Link to={`/HistoryInvoice/${accountEmail}`} className="link">
                Đơn Hàng
              </Link>
            </div>
          </div>
        );
      }
    }
  };

  const getContact = () => {
    if (accountEmail !== "") {
      if (accountRole === "user") {
        return (
          <div className="icon-home">
            <div className="icon-and-text-function">
              <PiPhoneCallFill className="icon-on-header-bottom mb-2" />
              <NavLink to="/Contact" className="link">
                Liên hệ
              </NavLink>
            </div>
          </div>
        );
      }
    }
  };
  const getAdmin = () => {
    if (accountEmail !== "") {
      if (accountRole === "admin") {
        return (
          <div className="icon-home">
            <MdUpdate className="icon-on-header-bottom mb-2" />
            <NavLink to="/Product2" className="link">
              Admin
            </NavLink>
          </div>
        );
      }
    }
  };

  const getDataCategory = async () => {
    try {
      const dataCategory = await CategoryService.getAllCategory();
      setCategory(dataCategory);
      console.log("category", dataCategory);
    } catch (error) {
      console.log("Failed");
    }
  };

  useEffect(() => {
    getDataCategory();
  }, []);

  return (
    <header>
      <div className="header-upper">
        <div className="header container-xl">
          <div className="row align-items-center">
            <div className="logo col-2">
              <Link to="/" className="link-go-home">
                <img src={Logo} className="logo col-12" />
              </Link>
            </div>
            <div className="col-7">
              <div className="input-group mb-8">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Tìm kiếm sản phẩm tại đây..."
                  aria-label="Tìm kiếm sản phẩm tại đây..."
                  aria-describedby="basic-addon2"
                  value={searchInput}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                />
                <span
                  className="input-group-text p-3"
                  id="basic-addon2"
                  onClick={() => handleSearchProduct(searchInput)}
                >
                  <BsSearch className="fs-6 icon-search" />
                </span>
              </div>
            </div>

            {/* Icon cart and user start */}
            <div className="col-3">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                {/* Icon cart start */}
                {getCart()}
                {/* Icon cart end */}

                {/* Icon user start */}
                <div className="col-10">
                  <div className="d-flex align-items-center gap-10 text-white">
                    <div>{getUser()}</div>
                  </div>
                </div>
                {/* Icon user end */}
              </div>
            </div>
            {/* Icon cart and user end */}
          </div>
        </div>


        <div className="menu-links">
          <div className="">
            <div className="container menu-bottom d-flex align-items-center gap-30 breadcrumb mb-0 py-2">
              <div className="icon-home gap-10">
                <div className="icon-and-text-function">
                  <AiFillHome className="icon-on-header-bottom mb-2" />
                  <Link to="/" className="link">
                    Trang Chủ
                  </Link>
                </div>
              </div>

              <div className="icon-home">
                <div className="icon-and-text-function">
                  <GiShop className="icon-on-header-bottom mb-2" />
                  <Link to="/product" className="link">
                    Cửa Hàng
                  </Link>
                </div>
              </div>
              {getAdmin()}
              {getContact()}
              {getHisInvoice()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
