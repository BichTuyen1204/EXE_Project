import React, { useState } from "react";
import { BreadCrumb } from "./BreadCrumb";
import Meta from "./Meta";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AccountService from "../api/AccountService";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailExisted, setEmailExisted] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmail =
      email.trim() !== "" &&
      email.length >= 10 &&
      email.length <= 200 &&
      ValidEmail(email.trim()) &&
      await checkEmailExisted(email)
    if (isEmail) {
      setEmail("");
      navigate(`/ResetPassword/${email}`)
    } else {
      alert("Vui lòng điền thông tin đầy đủ và chính xác");
    }
  };

  // Receive email
  const EmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
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
      setEmailExisted("")
    } else if (!ValidEmail(email.trim())) {
      setEmailError("Email phải chứa @ và .com");
      setEmailExisted("")
    } else if (email.length < 6) {
      setEmailError("Email phải có ít nhất 6 ký tự");
      setEmailExisted("")
    } else if (email.length > 100) {
      setEmailError("Email phải nhỏ hơn 100 ký tự");
      setEmailExisted("")
    } else if (await checkEmailExisted(email)) {
      setEmailExisted("Email này đã được sử dụng..");
      setEmailError("")
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailExisted("")
      setEmailError("Xin vui lòng gõ lại email");
    } else if (/@[^\w@]+\w/.test(email)) {
      setEmailExisted("")
      setEmailError("in vui lòng gõ lại email");
    } else if (!/^[^\s@]+@[^\d@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Không được phép nhập số sau @ và trước .com.");
      setEmailExisted("")
    } else {
      setEmailError("Tài khoản này không tồn tại");
      setEmailExisted("")
    }
  };

  // Check email
  const ValidEmail = (e) => {
    const emailRegex = /@.*/;
    return emailRegex.test(e);
  };

  return (
    <>
      <Meta title={"Quên mật khẩu"} />
      <BreadCrumb title="Quên mật khẩu" />
      <div className="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Quên mật khẩu</h3>
              <form action="" className="d-flex flex-column gap-15">
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

                {/* Button */}
                <div >
                  <div>
                    {emailExisted && <p style={{ color: "green" }} className="text-center mb-2">{emailExisted}</p>}
                  </div>
                  <div className="d-flex justify-content-center">
                    <div className="mt-1 flex-column gap-15 align-items-center">
                      <Link to="/OTP">
                        <button className="button m-lg-2" type="submit" onClick={handleSubmit} >
                          Submit
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <p className="" style={{ marginRight: "5px" }}>Do have any account?</p>
                  <Link to="/Login">
                    <div className="link-forgot-password link">Login</div>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
