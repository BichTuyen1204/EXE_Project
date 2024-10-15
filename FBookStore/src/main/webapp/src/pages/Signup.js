import React, { useEffect, useState } from "react";
import { BreadCrumb } from "./BreadCrumb";
import Meta from "./Meta";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import AccountService from "../api/AccountService";
import "../css/Style.css"
export const Signup = () => {
    const [fullName, setFullname] = useState("");
    const [fullNameError, setFullnameError] = useState("");
    const [email, setEmail] = useState("");
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

    const [account, setAccount] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        phoneNumber: ''

    });

    // Receive re-password
    const ConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setRePassword(value);
        if (value === "") {
            setPasswordError("");
            setCheckPass(false);
        } else if (value !== password) {
            setPasswordError("");
            setCheckPass(true);
        } else {
            setPasswordError("");
            setCheckPass(false);
        }
    };

    // Receive password
    const PasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setAccount({ ...account, [e.target.name]: e.target.value });
    };

    // Show and hidden re-password
    const RePasswordVisibility = () => {
        setShowRePassword(!showRePassword);
    };

    // Show and hidden password
    const PasswordVisibility = () => {
        setShowPassword(!showPassword);
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
            setFullnameError("Vui lòng chỉ nhập các ký tự chữ cái");
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
            console.log("Email đã được sử dụng.");
            return true;
        } else {
            console.log("Email này có sẵn.");
            return false;
        }
    }

    // Check email
    const EmailBlur = async () => {
        if (email.trim() === "") {
            setEmailError("Vui lòng nhập email của bạn.");
        } else if (!ValidEmail(email.trim())) {
            setEmailError("Email phải chứa @ và .com");
        } else if (email.length < 6) {
            setEmailError("Email phải có ít nhất 6 ký tự");
        } else if (email.length > 100) {
            setEmailError("Email phải nhỏ hơn 100 ký tự");
        } else if (await checkEmailExisted(email)) {
            setEmailError("Email này đã được sử dụng.");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError("Xin vui lòng gõ lại email");
        } else if (/@[^\w@]+\w/.test(email)) {
            setEmailError("Please retype email");
        } else if (!/^[^\s@]+@[^\d@]+\.[^\s@]+$/.test(email)) {
            setEmailError("Không được phép nhập số sau @ và trước .com.");
        } else {
            setEmailError("");
        }
    };

    // Check email
    const ValidEmail = (e) => {
        const emailRegex = /@.*/;
        return emailRegex.test(e);
    };

    // Check password
    const PasswordBlur = () => {
        const enteredPassword = password.trim();
        if (enteredPassword === "") {
            setPasswordError("Vui lòng nhập mật khẩu của bạn");
        } else if (enteredPassword.length < 6) {
            setPasswordError("Mật khẩu dài hơn 6 ký tự");
        } else if (enteredPassword.length > 30) {
            setPasswordError("Mật khẩu nhỏ hơn 30 ký tự");
        } else {
            setPasswordError("");
        }
    };

    // Check re-password
    const RePasswordBlur = () => {
        const enteredRePassword = rePassword.trim();
        if (enteredRePassword === "") {
            setRePasswordError("Vui lòng nhập mật khẩu của bạn");
        } else if (enteredRePassword.length < 6 || enteredRePassword.length > 30) {
            setRePasswordError("Mật khẩu phải từ 6 đến 30 ký tự");
        } else {
            setRePasswordError("");
        }
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

    // Check Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFullName =
            fullName.trim() !== "" &&
            fullName.length >= 4 &&
            fullName.length <= 100;

        const isEmail =
            email.trim() !== "" &&
            email.length >= 10 &&
            email.length <= 100 &&
            ValidEmail(email.trim()) &&
            !(await checkEmailExisted(email))

        const isPasswordValid =
            password.trim() !== "" && password.length >= 6 && password.length <= 30;

        const isRePasswordValid =
            rePassword.trim() !== "" &&
            rePassword.length >= 6 &&
            rePassword.length <= 30 &&
            rePassword === password;

        const isPhoneNum =
            phoneNum.trim() !== "" && phoneNum.length === 10 && /^0/.test(phoneNum);

        if (
            isFullName &&
            isEmail &&
            isPasswordValid &&
            isRePasswordValid &&
            isPhoneNum &&
            !checkPass
        ) {
            setIsSubmitted(true);
            try {
                const response = AccountService.createAccount(account);
                console.log('account created', response.data);
            } catch (error) {
                console.error('Đã xảy ra lỗi khi tạo tài khoản', error)
            }
            setFullname("");
            setEmail("");
            setPassword("");
            setRePassword("");
            setPhonenum("");

            setTimeout(() => {
                setIsSubmitted(false);
            }, 20000);
        } else {
            alert("Vui lòng điền thông tin đầy đủ và chính xác");
        }
    };

    return (
        <>
            <Meta title={"Đăng ký"} />
            <BreadCrumb title="Đăng ký" />
            <div className="login-wrapper py-5 ">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card box">
                            <h3 className="text-center mb-3">Đăng ký</h3>
                            <form action="" className="d-flex flex-column gap-15 px-3">
                                {/* Full name */}
                                <div className="input-edit-profile">
                                    <input
                                        type="text"
                                        name="name"
                                        value={fullName}
                                        onChange={FullnameChange}
                                        onBlur={FullnameBlur}
                                        placeholder="Họ và tên"
                                        className="form-control"
                                    />
                                    {fullNameError && (
                                        <p style={{ color: "red" }}>{fullNameError}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="input-edit-profile">
                                    <input
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

                                {/* Password */}
                                <div className="d-flex part-password-eye">
                                    <div className="position-relative w-100 d-flex input-edit-profile">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={password}
                                            onChange={PasswordChange}
                                            onBlur={PasswordBlur}
                                            placeholder="Mật khẩu"
                                            className="form-control"
                                        />
                                        <FontAwesomeIcon className="icon-eye-password p-2 position-absolute end-0 mt-2"
                                            icon={showPassword ? faEyeSlash : faEye} onClick={PasswordVisibility}
                                        />
                                    </div>
                                </div>
                                {passwordError && (
                                    <p style={{ color: "red" }}>{passwordError}</p>
                                )}

                                {/* Re-password */}
                                <div className="d-flex part-password-eye">
                                    <div className="position-relative w-100 d-flex input-edit-profile">
                                        <input
                                            type={showRePassword ? "text" : "password"}
                                            name="rePassword"
                                            value={rePassword}
                                            onChange={ConfirmPasswordChange}
                                            onBlur={RePasswordBlur}
                                            placeholder="Nhập lại mật khẩu"
                                            className="form-control"
                                        />
                                        <FontAwesomeIcon className="icon-eye-password p-2 position-absolute end-0 mt-2"
                                            icon={showRePassword ? faEyeSlash : faEye} onClick={RePasswordVisibility}
                                        />
                                    </div>
                                </div>
                                {checkPass && (
                                    <p style={{ color: "red" }}>Mật khẩu không trùng khớp</p>
                                )}
                                {rePasswordError && (
                                    <p style={{ color: "red" }}>{rePasswordError}</p>
                                )}

                                {/* Phone */}
                                <div className="input-edit-profile">
                                    <input
                                        type="number"
                                        name="phoneNumber"
                                        id="hiddenNumber"
                                        value={phoneNum}
                                        onChange={PhoneNumChange}
                                        onBlur={PhoneNumBlur}
                                        placeholder="Số điện thoại"
                                        className="form-control hiddenNumberInput"
                                    />
                                    {phoneNumError && (
                                        <p style={{ color: "red" }}>{phoneNumError}</p>
                                    )}
                                </div>

                                {/* Button */}
                                <div>
                                    {isSubmitted && (
                                        <p style={{ color: "green" }}>Đăng ký thành công</p>
                                    )}
                                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                                        <Link
                                            type="submit"
                                            onClick={handleSubmit}
                                            to = "/Login"
                                        >
                                        <div className="link-forgot-password link">Đăng ký</div>
                                        </Link>
                                    </div>
                                    <div className="d-flex justify-content-center mt-3">
                                        <p className="" style={{ marginRight: "5px" }}>Bạn đã có tài khoản?</p>
                                        <Link to="/Login">
                                            <div className="link-forgot-password link">Đăng nhập</div>
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
};
