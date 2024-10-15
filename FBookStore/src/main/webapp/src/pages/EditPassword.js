import React, { useEffect, useState } from "react";
import { BreadCrumb } from "./BreadCrumb";
import Meta from "./Meta";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import AccountService from "../api/AccountService";
import { Login } from "../pages/Login";
import "../css/Style.css";
export const EditPassword = () => {

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [infoUpddate, setInfoUpdate] = useState("");
  const [infoUpdateErr, setInfoUpdateErr] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");
  const [checkPass, setCheckPass] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [jwtToken, setJwtToken] = useState(sessionStorage.getItem('jwtToken'));
  const [oldPass, setOldPass] = useState("");
  const [oldPassError, setOldPassError] = useState("");
  const [accountRole, setAccountRole] = useState('');

  const [account, setAccount] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    address: '',
    phoneNumber: ''
  });

  useEffect(() => {
    const getAccount = async () => {
      if (jwtToken !== null) {
        try {
          const account = await AccountService.getAccount(jwtToken);
          console.log("account checkout: ", account)
          console.log("password", account.password)
          setEmail(account.email)
          setAccountRole(account.role)
          setAccount(account)
        } catch (error) {
          console.error("Lỗi lấy thông tin tài khoản:", error);
        }
      } else {
        setEmail('');
      }
    }
    getAccount();
  }, [jwtToken]);

  // Check Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isOldPasswordValid =
      oldPass.trim() !== "" && oldPass.length >= 6 && oldPass.length <= 30;

    const isPasswordValid =
      password.trim() !== "" && password.length >= 6 && password.length <= 30;

    const isRePasswordValid =
      rePassword.trim() !== "" &&
      rePassword.length >= 6 &&
      rePassword.length <= 30 &&
      rePassword === password;

    if (
      isOldPasswordValid &&
      isPasswordValid &&
      isRePasswordValid &
      !checkPass
    ) {
      setIsSubmitted(true);
      try {
        const response = await AccountService.updatePassword(email, password, oldPass);
        setOldPass("");
        setPassword("");
        setRePassword("");
        setInfoUpdate(response.data);
        setInfoUpdateErr("")
        setTimeout(() => {
          setIsSubmitted(false);
        }, 20000);
      } catch (error) {
        console.error("Error fetching account information:", error);
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

  // Receive old password
  const OldPasswordChange = (e) => {
    const value = e.target.value;
    setOldPass(value);
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

  const OldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  }

  // Check password
  const PasswordBlur = () => {
    const enteredPassword = password.trim();
    if (enteredPassword === "") {
      setPasswordError("Xin vui lòng nhập mật khẩu của bạn");
    } else if (enteredPassword.length < 6) {
      setPasswordError("Mật khẩu dài hơn 6 ký tự");
    } else if (enteredPassword.length > 30) {
      setPasswordError("Mật khẩu ít hơn 30 ký tự");
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
      setRePasswordError("Mật khẩu phải có từ 6 đến 30 ký tự");
    } else {
      setRePasswordError("");
    }
  };

  const OldPassBlur = () => {
    const enteredPassword = oldPass.trim();
    if (enteredPassword === "") {
      setOldPassError("Vui lòng nhập mật khẩu cũ của bạn");
    } else if (enteredPassword.length < 6) {
      setOldPassError("Mật khẩu dài hơn 6 ký tự");
    } else if (enteredPassword.length > 30) {
      setOldPassError("Mật khẩu ít hơn 30 ký tự");
    } else {
      setOldPassError("");
    }
  };

  if (accountRole === 'user' || accountRole === 'admin') {
    return (
      <>
        <Meta title={"Update password"} />
        <div className="login-wrapper py-5">
          <div className="row">
            <div className="col-12">
              <div className="auth-card box">
                <h3 className="text-center mb-3">Thay đổi mật khẩu</h3>
                <form action="" className="d-flex flex-column gap-15">
                  {/* Old password start */}
                  <div className="d-flex part-password-eye">
                    <div className="position-relative w-100 d-flex input-edit-profile">
                      <input
                        type={showOldPassword ? "text" : "password"}
                        name="oldpassword"
                        value={oldPass}
                        onChange={OldPasswordChange}
                        onBlur={OldPassBlur}
                        placeholder="Nhập mật khẩu cũ"
                        className="form-control"
                      />
                      <FontAwesomeIcon className="icon-eye-password p-2 position-absolute end-0 mt-2"
                        icon={showOldPassword ? faEyeSlash : faEye} onClick={OldPasswordVisibility}
                      />
                    </div>
                  </div>
                  {oldPassError && (
                    <p style={{ color: "red" }}>{oldPassError}</p>
                  )}
                  {/* Old password end */}

                  {/* Password start*/}
                  <div className="d-flex part-password-eye">
                    <div className="position-relative w-100 d-flex input-edit-profile">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={PasswordChange}
                        onBlur={PasswordBlur}
                        placeholder="Mật khẩu mới"
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
                  {/* Password end */}

                  {/* Re-password start */}
                  <div className="d-flex part-password-eye">
                    <div className="position-relative w-100 d-flex input-edit-profile">
                      <input
                        type={showRePassword ? "text" : "password"}
                        name="rePassword"
                        value={rePassword}
                        onChange={ConfirmPasswordChange}
                        onBlur={RePasswordBlur}
                        placeholder="Nhập lại mật khẩu mới"
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
                  {/* RePassword end */}

                  {/* Button */}
                  <div>
                    {isSubmitted && (
                      <p style={{ color: "green" }}>{infoUpddate}</p>
                    )}
                    {isSubmitted && (
                      <p style={{ color: "red" }}>{infoUpdateErr}</p>
                    )}
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <div
                        className="button px-3 py-1"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Đổi mật khẩu
                      </div>

                      <Link to="/Profile">
                        <div className="button-profile-1 link px-3 py-1">Quay lại</div>
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