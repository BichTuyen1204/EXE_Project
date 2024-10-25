import React, { useState } from "react";
import { BreadCrumb } from "./BreadCrumb";
import Meta from "./Meta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AccountService from "../api/AccountService";
import "../css/Style.css";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();
  // Check Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmail =
      email.trim() !== "" &&
      email.length >= 10 &&
      email.length <= 100 &&
      ValidEmail(email.trim());

    const isPasswordValid =
      password.trim() !== "" && password.length >= 6 && password.length <= 30;

    if (isEmail && isPasswordValid) {
      try {
        await AccountService.login(email, password, navigate);
        setIsSubmitted(true);
        setEmail("");
        setPassword("");
        setLoginError("");
        navigate("/");
        window.location.reload();
      } catch (error) {
        console.error("Login page error: ", error.response.data);
        const errorMessage = error.response.data;
        setLoginError(errorMessage);
      }
    } else {
      alert("Vui lòng điền thông tin đầy đủ và chính xác");
    }
  };

  /* Receives email */
  const EmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  // Check email
  const EmailBlur = () => {
    if (email.trim() === "") {
      setEmailError("Vui lòng nhập email của bạn");
    } else if (!ValidEmail(email.trim())) {
      setEmailError("Email phải chứa @ và .com");
    } else if (email.length < 6) {
      setEmailError("Email phải có ít nhất 6 ký tự");
    } else if (email.length > 100) {
      setEmailError("Email phải nhỏ hơn 100 ký tự");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Xin vui lòng gõ lại email");
    } else if (/@[^\w@]+\w/.test(email)) {
      setEmailError("Xin vui lòng gõ lại email");
    } else if (!/^[^\s@]+@[^\d@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Không được phép sử dụng các số sau @.");
    } else {
      setEmailError("");
    }
  };

  // Check email
  const ValidEmail = (e) => {
    const emailRegex = /@.*$/;
    return emailRegex.test(e);
  };

  /* Receive password */
  const PasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
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

  // Show and hidden password
  const PasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Meta title={"Đăng nhập"} />
      <BreadCrumb title="Đăng nhập" />
      <div className="login-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card box">
              <h3 className="text-center mb-3">Đăng nhập</h3>
              <form action="" className="d-flex flex-column gap-15 px-3">
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
                <div className="d-flex part-password-eye input-edit-profile">
                  <div className="position-relative w-100 d-flex">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={PasswordChange}
                      onBlur={PasswordBlur}
                      placeholder="Password"
                      className="form-control"
                    />
                    <FontAwesomeIcon
                      className="icon-eye-password p-2 position-absolute end-0 mt-2"
                      icon={showPassword ? faEyeSlash : faEye}
                      onClick={PasswordVisibility}
                    />
                  </div>
                </div>
                {passwordError && (
                  <p style={{ color: "red" }}>{passwordError}</p>
                )}

                <div className="text-right">
                  <div
                    style={{ color: "red" }}
                    className="mt-3 d-flex justify-content-center gap-15 align-items-center"
                  >
                    {loginError}
                  </div>
                  <div className="link-forgot-password link">
                    <Link to="/ForgotPassword">Quên mật khẩu</Link>
                  </div>

                  <div className="d-flex justify-content-center gap-15 align-items-center">
                    <button
                      className="button"
                      type="submit"
                      onClick={handleSubmit}
                    >
                    Đăng nhập
                    </button>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <p className="" style={{ marginRight: "5px" }}>
                    Bạn chưa có tài khoản?
                    </p>
                    <Link to="/Signup">
                      <div className="link-forgot-password link">Đăng ký</div>
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
