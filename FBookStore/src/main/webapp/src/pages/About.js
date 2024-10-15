import React, { useEffect } from "react";
import BV from "../images/bv.png";
import BT from "../images/bt.png";
import TT from "../images/tt.png";
import monan from "../images/monan.png";
import combosup from "../images/combosup.png";
import lau from "../images/lau.png";
import nem from "../images/nemcuon.png";
import anvat from "../images/comboanvat.png";
import kho from "../images/bongchuoikho.png";

import "uikit/dist/css/uikit.min.css";
import "uikit/dist/js/uikit.min.js";
import "uikit/dist/js/uikit-icons.min.js";
import "../css/Style.css";

export const About = () => {
  useEffect(() => {
    // Ensure the active item is in the center on initial load
    const items = document.querySelectorAll(".uk-slider-items .uk-width-1-3");
    items.forEach((item, index) => {
      if (item.classList.contains("uk-active")) {
        item.querySelector(".uk-panel").classList.add("uk-active");
      }
    });
  }, []);

  return (
    <div className="aboutus container-xxl">
      <div className="col-12">
        <div className="text-center mb-5">
          {/*<h1>
            <strong>Thông Tin Về Trang Web</strong>
          </h1>*/}
          <h2 style={{ color: "rgb(83, 134, 65)" }}>
            <strong>
              AN <br /> Tịnh Thực Thanh Khiết, Tâm An Thân Khỏe
            </strong>
          </h2>
        </div>

        <div className="col-12">
          <div className="col-12 d-flex align-content-center">
            <div className="col-6 align-content-center">
              <h3>
                <strong> Lịch sử hình thành và phát triển</strong>
              </h3>
              <p>
                Website bán thực phẩm chay AN Store được thành lập vào ngày
                17/07/2024. Với sứ mệnh mang đến những sản phẩm chay an toàn,
                chất lượng cao, và thúc đẩy lối sống lành mạnh, chúng tôi đã và
                đang không ngừng nỗ lực để trở thành thương hiệu hàng đầu trong
                lĩnh vực cung cấp thực phẩm chay trực tuyến tại Việt Nam.
              </p>
            </div>
            <div className="col-2"></div>
            <div className="col-4 align-content-center">
              <img
                className=""
                style={{ width: "100%", height: "aotu", objectFit: "cover" }}
                src={combosup}
              />
            </div>
          </div>
          <br />
          <div className="col-12 d-flex align-content-center">
            <div className="col-4 align-content-center">
              <img
                className=""
                style={{ width: "100%", height: "aotu", objectFit: "cover" }}
                src={kho}
              />
            </div>
            <div className="col-2"></div>
            <div className="col-6 align-content-center">
              <h3>
                <strong>Sứ mệnh và mục tiêu </strong>
              </h3>
              <p>
                <strong>Sứ mệnh </strong> <br />
                Sứ mệnh của An không chỉ đơn thuần là kinh doanh và cung cấp các
                thực phẩm chay đến người tiêu dùng, mà còn bao gồm những mục
                tiêu cao cả hơn, hướng tới lợi ích cộng đồng và sự phát triển
                bền vững. An mong muốn thúc đẩy lối sống ăn chay, góp phần bảo
                vệ sức khỏe và môi trường, tạo ra và phát triển một cộng đồng
                chay bền vững để chia sẻ các công thức nấu đồ ăn chay, các câu
                chuyện và tổ chức các hoạt động giúp đỡ cộng đồng, kết nối và
                gắn kết mọi người lại với nhau.{" "}
              </p>
              <p>
                <strong>Mục tiêu </strong> <br />- Cung cấp các sản phẩm chay
                chất lượng cao, đa dạng và an toàn. <br />
                - Phát triển cộng đồng người tiêu dùng yêu thích thực phẩm chay.
                <br />
                - Bảo vệ môi trường và động vật thông qua việc thúc đẩy lối sống
                xanh.
                <br />- Đảm bảo khách hàng luôn cảm thấy hài lòng với dịch vụ và
                sản phẩm của chúng tôi.
              </p>
            </div>
          </div>
          <br />
          <div className="col-12 d-flex align-content-center">
            <div className="col-6 align-content-center">
              <h3>
                <strong>Sản phẩm và dịch vụ </strong>
              </h3>
              <p>
                <strong>Sản phẩm </strong> <br />
                Chúng tôi tự hào giới thiệu website An, nền tảng trực tuyến
                chuyên cung cấp các mặt hàng thực phẩm chay phong phú và chất
                lượng cao. An được thiết kế đặc biệt để phục vụ nhu cầu của
                những khách hàng yêu thích thực phẩm chay, từ những người mới
                bắt đầu đến những người đã có kinh nghiệm.
              </p>
              <p>
                <strong>Dịch vụ </strong> <br />
                - Cung cấp thực phẩm chay: Chúng tôi nhập khẩu và bán các thực
                phẩm chay đã chế biến và chưa chế biến. <br />
                - Hướng dẫn sử dụng và nấu ăn: Website An sẽ cung cấp các công
                thức nấu ăn và hướng dẫn chi tiết cách chế biến các món ăn chay
                từ những nguyên liệu sẵn có trên website. <br />- Dịch vụ chăm
                sóc khách hàng: Chúng tôi cam kết mang đến dịch vụ chăm sóc
                khách hàng tận tình trước và sau khi mua hàng.
              </p>
            </div>
            <div className="col-2"></div>
            <div className="col-4 align-content-center">
              <img
                className=""
                style={{ width: "100%", height: "aotu", objectFit: "cover" }}
                src={nem}
              />
            </div>
          </div>
          <br />
          <div className="col-12 d-flex align-content-center">
            <div className="col-4 align-content-center">
              <img
                className=""
                style={{ width: "100%", height: "aotu", objectFit: "cover" }}
                src={lau}
              />
            </div>
            <div className="col-2"></div>
            <div className="col-6 align-content-center">
              <h3>
                <strong>Cam kết về bền vững và xã hội </strong>
              </h3>
              <p>
                An luôn chú trọng đến việc bảo vệ môi trường và xã hội. Chúng
                tôi thúc đẩy lối sống ăn chay, giúp giảm thiểu tác động tiêu cực
                đến môi trường và động vật. An cũng thường xuyên tham gia các
                hoạt động cộng đồng, từ việc chia sẻ công thức nấu ăn chay đến
                tổ chức các sự kiện bảo vệ môi trường và động vật.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*slide*/}
      <div className="text-center mb-5">
        <h2>
          <strong> Người sáng lập</strong>
        </h2>
      </div>
      <div
        className="container-xxl container-xxl uk-position-relative uk-visible-toggle uk-light"
        tabIndex="-1"
        uk-slider="center: true; autoplay: true; autoplay-interval: 2000"
      >
        <div className="container-xxl container-xxl  uk-slider-items uk-grid">
          <div className="uk-width-1-3">
            <div
              className="uk-panel box"
              style={{ width: "250px", height: "300px", textAlign: "center" }}
            >
              <img
                src={BV}
                alt="1"
                style={{
                  width: "50%",
                  objectFit: "contain",
                  borderRadius: "100px",
                  marginTop: "25px",
                }}
              />
              <div className="uk-position-center uk-panel mt-5">
                <h5 style={{ color: "black" }}>
                  Sơn Thị Bích Vân <br /> CIO and Design Director
                </h5>
              </div>
            </div>
          </div>
          <div className="uk-width-1-3">
            <div
              className="uk-panel box"
              style={{ width: "250px", height: "300px", textAlign: "center" }}
            >
              <img
                src={BT}
                alt="1"
                style={{
                  width: "50%",
                  objectFit: "contain",
                  borderRadius: "100px",
                  marginTop: "25px",
                }}
              />
              <div className="uk-position-center uk-panel mt-5">
                <h5 style={{ color: "black" }}>
                  Vũ Thị Bích Tuyền <br /> CEO
                </h5>
              </div>
            </div>
          </div>
          <div className="uk-width-1-3">
            <div
              className="uk-panel box"
              style={{ width: "250px", height: "300px", textAlign: "center" }}
            >
              <img
                src={TT}
                alt="1"
                style={{
                  width: "50%",
                  objectFit: "contain",
                  borderRadius: "100px",
                  marginTop: "25px",
                }}
              />
              <div className="uk-position-center uk-panel mt-5">
                <h5 style={{ color: "black" }}>
                  Nguyễn Tiến Tài <br /> CMO and CFO
                </h5>
              </div>
            </div>
          </div>
          <div className="uk-width-1-3">
            <div
              className="uk-panel box"
              style={{ width: "250px", height: "300px", textAlign: "center" }}
            >
              <img
                src={BV}
                alt="1"
                style={{
                  width: "50%",
                  objectFit: "contain",
                  borderRadius: "100px",
                  marginTop: "25px",
                }}
              />
              <div className="uk-position-center uk-panel mt-5">
                <h5 style={{ color: "black" }}>
                  Sơn Thị Bích Vân <br /> CIO and Design Director
                </h5>
              </div>
            </div>
          </div>
          <div className="uk-width-1-3">
            <div
              className="uk-panel box"
              style={{ width: "250px", height: "300px", textAlign: "center" }}
            >
              <img
                src={BT}
                alt="1"
                style={{
                  width: "50%",
                  objectFit: "contain",
                  borderRadius: "100px",
                  marginTop: "25px",
                }}
              />
              <div className="uk-position-center uk-panel mt-5">
                <h5 style={{ color: "black" }}>
                  Vũ Thị Bích Tuyền <br /> CEO
                </h5>
              </div>
            </div>
          </div>
          <div className="uk-width-1-3">
            <div
              className="uk-panel box"
              style={{ width: "250px", height: "300px", textAlign: "center" }}
            >
              <img
                src={TT}
                alt="1"
                style={{
                  width: "50%",
                  objectFit: "contain",
                  borderRadius: "100px",
                  marginTop: "25px",
                }}
              />
              <div className="uk-position-center uk-panel mt-5">
                <h5 style={{ color: "black" }}>
                  Nguyễn Tiến Tài <br /> CMO and CFO
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
