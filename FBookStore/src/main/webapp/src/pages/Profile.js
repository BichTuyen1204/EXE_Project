import React, { useState, useEffect } from "react";
import { BreadCrumb } from "./BreadCrumb";
import Meta from "./Meta";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Login } from "../pages/Login";
import { FaArrowLeftLong } from "react-icons/fa6";
import AccountService from "../api/AccountService";
import "../css/Style.css";
export const Profile = () => {
    const [fullName, setFullname] = useState("");
    const [fullNameError, setFullnameError] = useState("");
    const [email, setEmail] = useState("");
    const [oldemail, setoldEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [rePasswordError, setRePasswordError] = useState("");
    const [phoneNum, setPhonenum] = useState("");
    const [phoneNumError, setPhonenumError] = useState("");
    const [checkPass, setCheckPass] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [accountRole, setAccountRole] = useState('');
    const [invoiceName, setInvoiceName] = useState('');
    const [invoiceEmail, setInvoiceEmail] = useState('');
    const [invoicePhone, setInvoicePhone] = useState('');
    const [jwtToken, setJwtToken] = useState(sessionStorage.getItem('jwtToken'));

    const [account, setAccount] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        phoneNumber: ''
    });

    useEffect(() => {
        const getAccount = async () => {
            if (jwtToken !== null) {
                try {
                    const account = await AccountService.getAccount(jwtToken);
                    console.log("account checkout: ", account)
                    setFullname(account.name)
                    setEmail(account.email)
                    setoldEmail(account.email)
                    setPhonenum(account.phoneNumber)
                    setAccountRole(account.role)
                    setAccount(account)
                } catch (error) {
                    console.error("Lỗi lấy thông tin tài khoản:", error);
                }
            } else {
                setAccountRole('');
                setInvoiceEmail('');
            }
        }
        getAccount();
    }, [jwtToken]);

    if (accountRole == 'user' || accountRole == 'admin') {
        return (
            <>
                <Meta title={"Profile"} />
                <section className="cart-wrapper py-5">
                    <div className="col-12">
                        <div className="container bg-white px-3 col-7 box">
                            <Link to="/"><FaArrowLeftLong size={20} className="mt-3 icon-profile" /></Link>
                            <div className="p-3 col-12">
                                <h5 className="">Thông tin của bạn</h5>
                                <p className="font-weight-normal">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                                <div className="border-profile"></div>
                            </div>

                            <div className="px-4 col-10">
                                {/* Name start */}
                                <div className="pb-3 col-12">
                                    <label className="col-2"><strong>Tên:</strong></label>
                                    <input
                                        disabled
                                        type="text"
                                        name="name"
                                        value={fullName}
                                        placeholder="Full name"
                                        className="input-on-profile col-10"
                                    />
                                    {fullNameError && (
                                        <p style={{ color: "red" }}>{fullNameError}</p>
                                    )}
                                </div>
                                {/* Name end */}

                                {/* Email start */}
                                <div className="pb-3 col-12">
                                    <label className="col-2"><strong>Email:</strong></label>
                                    <input
                                        disabled
                                        type="email"
                                        name="email"
                                        value={email}
                                        placeholder="Email"
                                        className="input-on-profile col-10"
                                    />
                                    {emailError && <p style={{ color: "red" }}>{emailError}</p>}
                                </div>
                                {/* Email end */}

                                {/* Phone number start */}
                                <div className="pb-3 col-12 d-flex">
                                    <label className="col-2"><strong>Số điện thoại:</strong></label>
                                    <input
                                        disabled
                                        type="number"
                                        name="phoneNumber"
                                        id="hiddenNumber"
                                        value={phoneNum}
                                        placeholder="Phone number"
                                        className="input-on-profile hiddenNumberInput"
                                    />
                                    {phoneNumError && (
                                        <p style={{ color: "red" }}>{phoneNumError}</p>
                                    )}
                                </div>
                                {/* Phone number end */}

                                {/* Button */}
                                <div className="pb-4">
                                    {isSubmitted && (
                                        <p style={{ color: "green" }}>Thay đổi thành công!</p>
                                    )}
                                    <div className="mt-3 d-flex gap-15 align-items-center">
                                        <div className="p-1" type="submit">
                                            <Link to='/EditProfile' className="link button">
                                                Chỉnh sửa thông tin
                                            </Link>
                                        </div>
                                        <div className="p-1">
                                            <Link to="/EditPassword" className="link button-profile-1">
                                                Thay đổi mật khẩu
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
    else {
        return (<Login />)
    }
};
