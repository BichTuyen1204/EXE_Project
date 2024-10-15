import React, { useState } from "react";
import { BreadCrumb } from "./BreadCrumb";
import Meta from "./Meta";
import { Link } from "react-router-dom";

export const OTP = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);

  const handleChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError(false); // Reset error when user starts typing again
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra xem tất cả các ô input đã được điền đầy đủ hay chưa
    if (code.every((digit) => digit !== "")) {
      // Nếu đã điền đầy đủ, thực hiện xử lý submit ở đây
      console.log("Submitting OTP:", code.join(""));
    } else {
      // Nếu chưa điền đầy đủ, hiển thị thông báo lỗi
      setError(true);
    }
  };

  return (
    <>
      <Meta title={"OTP"} />
      <BreadCrumb title="OTP" />
      <div className="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">OTP</h3>
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-15">
                <p className="text-center mb-3">Hãy nhập mã vào ô bên dưới.</p>

                <div className="row pt-2">
                  {code.map((digit, index) => (
                    <div className="col" key={index}>
                      <input
                        type="text"
                        className={`input-the-code form-control form-control-lg text-center py-4 ${
                          error && digit === "" ? "is-invalid" : ""
                        }`}
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
                {error && <div className="text-danger text-center">Please fill in all the fields.</div>}
                <div>
                  <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                    <Link to="/ResetPassword"><button className="button border-0" type="submit">
                      Gửi
                    </button></Link>
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
