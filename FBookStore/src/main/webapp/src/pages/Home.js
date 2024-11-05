import React, { useState, useEffect } from 'react';
import { BsTruck } from "react-icons/bs";
import { Link } from "react-router-dom";
import { SlPresent } from "react-icons/sl";
import { SlEarphonesAlt } from "react-icons/sl";
import { FaRegCreditCard } from "react-icons/fa";
import { IoPricetagsSharp } from "react-icons/io5";
import Marquee from "react-fast-marquee";
import { ProductCard } from "./ProductCard";
import ProductService from "../api/ProductService";
import BannerService from '../api/BannerService';
import "../css/Style.css"
import "../css/homeMobile.css"
export const Home = () => {
  const [currentImage, setCurrentImage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState('');
  const [products, setProducts] = useState([]);
  const [slides, setSlides] = useState([]);
  const [bigbanners, setBigBanners] = useState([]);
  const [banner1, setBanner1] = useState();
  const [banner2, setBanner2] = useState();
  const [banner3, setBanner3] = useState();
  const [banner4, setBanner4] = useState();

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Nút nhấn trở về trang sau
  const goToNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await ProductService.getAllProducts(currentPage);
        if (data.dataForPage.length > 0) {
          setProducts(data.dataForPage);
          setTotalPage(data.totalPages)

        } else {
          console.log("No products found or data is undefined");
        }
      } catch (error) {
        console.error("Không thể tìm nạp sản phẩm:", error);
      }
    }
    getData();
  }, [currentPage]);


  const getBanner = async () => {
    let tempBigBanners = [];
    let tempSlides = [];
    try {
      const data = await BannerService.getAllBanner();
      console.log("banners", data);
      for (let banner of data) {
        if (banner.type === "big-banner") {
          tempBigBanners.push(banner);
          console.log("banner big", bigbanners)
        }
        if (banner.type === "slide") {
          tempSlides.push(banner);
          console.log("slide", slides)
        }
      }

      setBigBanners(tempBigBanners);
      setSlides(tempSlides);
      for (let banner of data) {
        if (banner.type === "small-banner-1") {
          setBanner1(banner.image);
          console.log("banner big", banner1)
        } else if (banner.type === "small-banner-2") {
          setBanner2(banner.image);
          console.log("banner big", banner1)
        } else if (banner.type === "small-banner-3") {
          setBanner3(banner.image);
          console.log("banner big", banner1)
        } else if (banner.type === "small-banner-4") {
          setBanner4(banner.image);
          console.log("banner big", banner1)
        }
      }
    } catch (error) {
      console.error("Không thể tìm nạp sản phẩm:", error);
    }
  }
  useEffect(() => {
    getBanner();
  }, []);
  return (
    <>
      {/* Home-Wrapper-1 */}
      <section className="py-5">
        <div className="container-xxl">
          <div className="mainbanner py-3">
            {/* Big image */}
            <div className="bigbanner box">
              <div className="main-banner position-relative slide-from-right">
                <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                  <div className="carousel-indicators">
                    {bigbanners.map((bigbanner, index) => (
                      <button
                        key={index}
                        type="button"
                        data-bs-target="#carouselExampleDark"
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                        aria-label={`Slide ${index + 1}`}
                      ></button>
                    ))}
                  </div>
                  <div className="carousel-inner bg-white">
                    {bigbanners.map((bigBanner, index) => (
                      <div key={bigBanner.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                        <div className='d-flex img-big-banner'>
                          <img
                            className="img-product-card-general"
                            src={`http://localhost:8090/${bigBanner.image}`}
                            alt={`Slide ${index + 1}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Small image */}
            <div className="small-banner-top smallbanner col-6 ms-5">
              <div className="d-flex flex-wrap gap-15 justify-content-between align-items-center">
                <div className="small-banner position-relative">
                  <img src={`http://localhost:8090/${banner1}`} className="img-fluid rounded-3" />
                  <div className="small-banner-content position-absolute"></div>
                </div>

                <div className="small-banner position-relative">
                  <img src={`http://localhost:8090/${banner2}`} className="img-fluid rounded-3" />
                  <div className="small-banner-content position-absolute"></div>
                </div>
                <div className="small-banner position-relative">
                  <img src={`http://localhost:8090/${banner3}`} className="img-fluid rounded-3" />
                  <div className="small-banner-content position-absolute"></div>
                </div>
                {/* <div className="small-banner position-relative">
                  <img src={`http://localhost:8090/${banner4}`} className="img-fluid rounded-3" />
                  <div className="small-banner-content position-absolute"></div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Home-Wrapper-2 */}
      <section className="py-5 service box">
        <div className="container-xxl">
          <div className="col-12">
            <div className="servies d-flex align-items-center justify-content-between">
              <div className="servies-item align-items-center gap-15">
                <BsTruck className="icon-home-wrapper-2" />
                <div className="home-wrapper">
                  <h6>Miễn phí vận chuyển</h6>
                  <p className="mb-0">Tất cả các đơn hàng trên 300k VNĐ</p>
                </div>
              </div>

              <div className="servies-item align-items-center gap-15">
                <SlPresent className="icon-home-wrapper-2" />
                <div className="home-wrapper">
                  <h6>Ưu đãi bất ngờ</h6>
                  <p className="mb-0">Tiết kiệm tới 5%</p>
                </div>
              </div>

              <div className="servies-item align-items-center gap-15">
                <SlEarphonesAlt className="icon-home-wrapper-2" />
                <div className="home-wrapper">
                  <h6>Hỗ trợ 24/7</h6>
                  <p className="mb-0">Mua sắm cùng chuyên gia</p>
                </div>
              </div>

              <div className="servies-item align-items-center gap-15">
                <FaRegCreditCard className="icon-home-wrapper-2" />
                <div className="home-wrapper">
                  <h6>Giá cả phải chăng</h6>
                  <p className="mb-0">Nhận giá mặc định của nhà máy</p>
                </div>
              </div>

              <div className="servies-item align-items-center gap-15">
                <IoPricetagsSharp className="icon-home-wrapper-2" />
                <div className="home-wrapper">
                  <h6>Thanh toán an toàn</h6>
                  <p className="mb-0">Được bảo vệ 100%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Card product */}
      <section className="featured-wrapper py-5 ">
        <div className="container-xxl">
          <div className="row box">
            <div className="col-12">
              <h3 className="section-heading pb-4 pt-2">Sản Phẩm Nổi Bật</h3>
            <ProductCard listProduct={products} />

            </div>
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item">
                  <a
                    className="page-link previous-button"
                    aria-label="Previous"
                    onClick={goToPreviousPage}
                    style={{
                      outline: "none",
                      boxShadow: "none",
                    }}
                  >
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only"></span>
                  </a>
                </li>

                <li class="page-item">
                  <div className="pagination">
                    {Array.from({
                      length: totalPage,
                    }).map((_, index) => (
                      <span
                        class={`page-link ${currentPage === index + 1 ? 'active' : ''}`}
                        href="#"
                        key={index}
                        onClick={() => paginate(index + 1)}
                        style={{
                          backgroundColor: currentPage === index + 1 ? '#538641' : '',
                          color: currentPage === index + 1 ? 'white' : '#538641',
                          borderColor: currentPage === index + 1 ? '#538641' : ''
                        }}
                      >
                        {index + 1}
                      </span>
                    ))}
                  </div>
                </li>

                <li class="page-item">
                  <a
                    className="page-link previous-button"

                    aria-label="Next"
                    onClick={goToNextPage}
                    style={{
                      outline: "none",
                      boxShadow: "none",
                    }}
                  >
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only"></span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      {/* Marque-wrapper */}
      <section className="marque-wrapper  py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marquee-inner-wrapper card-wrapper">
                <marquee direction="left" scrollamount="10">
                  {slides.map((slide) => (
                    <img
                      key={slide.id}
                      className="img-move img-thumbnail mx-2"
                      src={`http://localhost:8090/${slide.image}`}
                      style={{ height: '15rem', maxWidth: '10rem' }}
                    />
                  ))}
                </marquee>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

