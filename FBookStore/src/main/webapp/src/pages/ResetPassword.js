import React, { useEffect, useState } from "react";
import { BreadCrumb } from "./BreadCrumb";
import Meta from "./Meta";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import AccountService from "../api/AccountService";

export const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [infoUpddate, setInfoUpdate] = useState("");
    const [infoUpdateErr, setInfoUpdateErr] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [rePasswordError, setRePasswordError] = useState("");
    const [checkPass, setCheckPass] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { email } = useParams()

    // Check Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isPasswordValid =
            password.trim() !== "" && password.length >= 6 && password.length <= 30;

        const isRePasswordValid =
            rePassword.trim() !== "" &&
            rePassword.length >= 6 &&
            rePassword.length <= 30 &&
            rePassword === password;
        if (
            isPasswordValid &&
            isRePasswordValid &
            !checkPass
        ) {
            setIsSubmitted(true);
            try {
                const response = await AccountService.resetPassword(email, password);
                setPassword("");
                setRePassword("");
                setInfoUpdate(response.data);
                setInfoUpdateErr("")
                setTimeout(() => {
                    setIsSubmitted(false);
                }, 20000);
            } catch (error) {
                console.error("Lỗi lấy thông tin tài khoản:", error);
                setInfoUpdateErr(error.response.data)
                setInfoUpdate("")
            }

        } else {
            alert("Vui lòng điền thông tin đầy đủ và chính xác");
        }
    };

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
    };

    // Show and hidden re-password
    const RePasswordVisibility = () => {
        setShowRePassword(!showRePassword);
    };

    // Show and hidden password
    const PasswordVisibility = () => {
        setShowPassword(!showPassword);
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


    return (
        <>
            <Meta title={"Reset password"} />
            <BreadCrumb title="Reset password" />
            <div className="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3">Reset password</h3>
                            <form action="" className="d-flex flex-column gap-15">

                                {/* Password */}
                                <div className="d-flex part-password-eye">
                                    <div className="position-relative w-100 d-flex input-edit-profile">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={password}
                                            onChange={PasswordChange}
                                            onBlur={PasswordBlur}
                                            placeholder="Password"
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
                                            placeholder="Confirm password"
                                            className="form-control"
                                        />
                                        <FontAwesomeIcon className="icon-eye-password p-2 position-absolute end-0 mt-2"
                                            icon={showRePassword ? faEyeSlash : faEye} onClick={RePasswordVisibility}
                                        />
                                    </div>
                                </div>
                                {checkPass && (
                                    <p style={{ color: "red" }}>The passwords do not match</p>
                                )}
                                {rePasswordError && (
                                    <p style={{ color: "red" }}>{rePasswordError}</p>
                                )}



                                {/* Button */}
                                <div>
                                    {isSubmitted && (
                                        <p style={{ color: "green" }}>{infoUpddate}</p>
                                    )}
                                    {isSubmitted && (
                                        <p style={{ color: "red" }}>{infoUpdateErr}</p>
                                    )}
                                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                                        <button
                                            className="button"
                                            type="submit"
                                            onClick={handleSubmit}
                                        >
                                            Change password
                                        </button>
                                    </div>
                                    <div className="d-flex justify-content-center mt-3">
                                        <p className="" style={{ marginRight: "5px" }}>Do have any account?</p>
                                        <Link to="/Login">
                                            <div className="link-forgot-password link">Login</div>
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
