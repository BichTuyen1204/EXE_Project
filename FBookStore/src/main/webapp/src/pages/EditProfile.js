
import React, { useState, useEffect } from "react";
import { BreadCrumb } from "./BreadCrumb";
import Meta from "./Meta";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Login } from "../pages/Login";
import "../css/Style.css";
import "../css/editProfileMobile.css"
import AccountService from "../api/AccountService";

export const EditProfile = () => {

    const [fullName, setFullname] = useState("");
    const [fullNameError, setFullnameError] = useState("");
    const [email, setEmail] = useState("");
    const [oldemail, setoldEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneNum, setPhonenum] = useState("");
    const [phoneNumError, setPhonenumError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [accountRole, setAccountRole] = useState('');
    const [invoiceEmail, setInvoiceEmail] = useState('');
    const [jwtToken, setJwtToken] = useState(sessionStorage.getItem('jwtToken'));

    const [account, setAccount] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        phoneNumber: ''
    });

    // Check Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const isFullName =
            fullName.trim() !== "" &&
            fullName.length >= 4 &&
            fullName.length <= 100;

        const isEmail =
            email.trim() !== "" &&
            email.length >= 10 &&
            email.length <= 100 &&
            ValidEmail(email.trim());

        const isPhoneNum =
            phoneNum.trim() !== "" &&
            phoneNum.length === 10 &&
            /^0/.test(phoneNum);

        if (
            isFullName &&
            isEmail &&
            isPhoneNum 
        ) {
            setIsSubmitted(true);
            try {
                const response = AccountService.updateAccount(account);
                console.log('account created', response.data);
            } catch (error) {
                console.error('Đã xảy ra lỗi khi tạo tài khoản', error)
            }
            setFullname("");
            setEmail("");
            setPhonenum("");
            setTimeout(() => {
                setIsSubmitted(false);
            }, 20000);
        } else {
            alert("Vui lòng điền thông tin đầy đủ và chính xác");
        }
    };

    // Receive full name
    const FullnameChange = (e) => {
        const value = e.target.value;
        setFullname(value);
        setAccount({ ...account, [e.target.name]: e.target.value });
    };

    // Check full name
    const FullnameBlur = () => {
        if (fullName.trim() === "") {
            setFullnameError("Vui lòng nhập họ tên đầy đủ của bạn");
        } else if (fullName.length < 4) {
            setFullnameError("Tên đầy đủ phải có ít nhất 4 ký tự");
        } else if (fullName.length > 100) {
            setFullnameError("Tên đầy đủ phải nhỏ hơn 100 ký tự");
        } else if (!/^[\p{L}\s]+$/u.test(fullName)) {
            setFullnameError("Vui lòng chỉ nhập bảng chữ cái");
        } else {
            setFullnameError("");
        }
    };

    // Receive email
    const EmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setAccount({ ...account, [e.target.name]: e.target.value });
    };

    const checkEmailExisted = async (email) => {
        if (await AccountService.checkAccountExited(email)) {
            console.log("This email is already in use.");
            return true;
        } else {
            console.log("This email is available.");
            return false;
        }
    }

    // Check email
    const EmailBlur = async () => {
        if (email.trim() === "") {
            setEmailError("Vui lòng nhập email của bạn");
        } else if (!ValidEmail(email.trim())) {
            setEmailError("Email phải chứa @ và .com");
        } else if (email.length < 10) {
            setEmailError("Email phải dài ít nhất 10 ký tự");
        } else if (email.length > 100) {
            setEmailError("Email phải nhỏ hơn 100 ký tự");
        } else if (await checkEmailExisted(email) && (email !== oldemail)) {
            setEmailError("Email này đã được sử dụng.");
        } else {
            setEmailError("");
        }
    };

    // Check email
    const ValidEmail = (e) => {
        const emailRegex = /@.*/;
        return emailRegex.test(e);
    };

    // Receive phone number
    const PhoneNumChange = (e) => {
        const value = e.target.value;
        setPhonenum(value);
        setAccount({ ...account, [e.target.name]: e.target.value });
    };

    // Check phone number
    const PhoneNumBlur = () => {
        const phoneNumValue = phoneNum.trim();
        if (phoneNumValue === "") {
            setPhonenumError("Vui lòng nhập số điện thoại của bạn");
        } else if (phoneNumValue.length !== 10) {
            setPhonenumError("Vui lòng nhập số điện thoại hợp lệ gồm 10 chữ số");
        } else if (!/^0/.test(phoneNumValue)) {
            setPhonenumError("Số điện thoại phải bắt đầu bằng 0");
        } else {
            setPhonenumError("");
        }
    };

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
                    console.error("Lỗi tìm nạp thông tin tài khoản:", error);
                }
            } else {
                setAccountRole('');
                setInvoiceEmail('');
            }
        }
        getAccount();
    }, [jwtToken]);
    if (accountRole === 'user') {
        return (
            <>
                <Meta title={"Edit information"} />
                <div className="login-wrapper py-5 ">
                    <div className="row">
                        <div className="col-12">
                            <div className="editProfile">
                                <h3 className="text-center mb-3">Chỉnh sửa thông tin</h3>
                                <form action="" className="d-flex flex-column gap-15 box">
                                    {/* Full name */}
                                    <div className="input-edit-profile">
                                        <label><strong>Tên:</strong></label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={fullName}
                                            onChange={FullnameChange}
                                            onBlur={FullnameBlur}
                                            placeholder="Full name"
                                            className="form-control"
                                        />
                                        {fullNameError && (
                                            <p style={{ color: "red" }}>{fullNameError}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label><strong>Email:</strong></label>
                                        <input
                                            disabled
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={EmailChange}
                                            onBlur={EmailBlur}
                                            placeholder="Email"
                                            className="form-control"
                                        />
                                        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
                                    </div>


                                    <div className="input-edit-profile">
                                        <label><strong>Số điện thoại:</strong></label>
                                        <input
                                            type="number"
                                            name="phoneNumber"
                                            id="hiddenNumber"
                                            value={phoneNum}
                                            onChange={PhoneNumChange}
                                            onBlur={PhoneNumBlur}
                                            placeholder="Phone number"
                                            className="form-control hiddenNumberInput"
                                        />
                                        {phoneNumError && (
                                            <p style={{ color: "red" }}>{phoneNumError}</p>
                                        )}
                                    </div>

                                    {/* Button */}
                                    <div>
                                        {isSubmitted && (
                                            <p style={{ color: "green" }}>Thay đổi thành công!</p>
                                        )}
                                        <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                                            <button
                                                className="btn-submit px-3 py-1"
                                                type="submit"
                                                onClick={handleSubmit}
                                            >
                                                Lưu
                                            </button>

                                            <Link to="/Profile" className="button-go-back link px-3 py-1">
                                                Quay lại
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    else {
        return (<Login />)
    }
};
