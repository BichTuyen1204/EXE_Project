import React, { useState, useEffect, useRef } from "react";
import { BreadCrumb } from "./BreadCrumb";
import Meta from "./Meta";
import Book10 from "../images/Book10.png";
import Book9 from "../images/Book9.png";
import ReactStars from "react-rating-stars-component";
import { Link, NavLink } from "react-router-dom";
import ProductService from "../api/ProductService";
import CategoryService from "../api/CategoryService";
import { ProductCard } from "./ProductCard.js";
import { useLocation } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { data, get } from "jquery";
import { Header } from "../components/Header.js";
import "../css/Style.css";
export const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState("");
  const [products, setProducts] = useState([]);
  const { searchInputTranfer } = useParams();
  let searchInput = searchInputTranfer;
  // const [searchInput, setSearchInput] = useState('');
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState();
  const [typeOfCurrentPage, setTypeOfCurrentPage] = useState();
  const [idCategory, setIdCategory] = useState(0);
  const [idKeyWord, setIdKeyWord] = useState(0);
  const location = useLocation();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  // tap hop cac loai filter muon thuc hien
  const [filters, setFilters] = useState({
    priceFrom: '',
    priceTo: '',
    brand: '',
    category: '',
    inStock: false,
    outOfStock: false
  });

  const updateSearchKey = () => {
    setSelectedCategoryId(null);
    searchInput = undefined;
    getData(1);
  }

  // ham set up cac loai filter can thuc hien
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    const filterValue = type === 'checkbox' ? checked : value;
    if ((name === 'priceFrom' || name === 'priceTo') && (isNaN(value) || parseFloat(value) < 0)) {
      return;
    }
    if (name === 'inStock' && checked) {
      setFilters(prevFilters => ({
        ...prevFilters,
        [name]: filterValue,
      }));
    } else if (name === 'outOfStock' && checked) {
      setFilters(prevFilters => ({
        ...prevFilters,
        [name]: filterValue,
      }));
    } else {
      setFilters(prevFilters => ({
        ...prevFilters,
        [name]: filterValue
      }));
    }
  };

  // Ham sort data tong/ data theo category (sort theo price, con hang het hang)
  const filterProducts = () => {
    const filteredProducts = products.filter(product => {
      let passPriceFilter;
      if (!filters.priceFrom && !filters.priceTo) {
        passPriceFilter = true
      } else {
        passPriceFilter = (product.price >= parseFloat(filters.priceFrom) && product.price <= parseFloat(filters.priceTo))
          || (!filters.priceTo && product.price >= parseFloat(filters.priceFrom))
          || (!filters.priceFrom && product.price <= parseFloat(filters.priceTo));
      }
      let passStockFilter;
      if (!filters.inStock && !filters.outOfStock) {
        passStockFilter = true;
      } else if (filters.inStock && filters.outOfStock) {
        passStockFilter = true;
      } else {
        passStockFilter = (!filters.inStock || product.quantity > 0) &&
          (!filters.outOfStock || product.quantity <= 0);
      }
      console.log("day la gia tri cua category:", filters)
      return passPriceFilter && passStockFilter;
    });
    setProductsFiltered(filteredProducts);
  };

  useEffect(() => {
    filterProducts();
  }, [filters, products]);

  // Nút nhấn về trang trước
  const goToPreviousPage = () => {
    if (currentPage >= 1) {
      if (typeOfCurrentPage === 'category') {
        handleCategorySelect(idCategory, currentPage - 1)
      } else if (typeOfCurrentPage === 'allProduct') {
        searchInput = undefined;
        getData(currentPage - 1);
      } else if (typeOfCurrentPage === 'findProduct') {
        getData(currentPage - 1);
      }
    }
  };

  // Nút nhấn trở về trang sau
  const goToNextPage = () => {
    if (currentPage <= totalPage) {
      if (typeOfCurrentPage === 'category') {
        handleCategorySelect(idCategory, currentPage + 1)
      } else if (typeOfCurrentPage === 'allProduct') {
        searchInput = undefined;
        getData(currentPage + 1);
      } else if (typeOfCurrentPage === 'findProduct') {
        getData(currentPage + 1);
      }
    }
  };

  // ham nhan vao id category va so trang can load va thuc hien load du lieu
  const handleCategorySelect = async (idCate, currentPageCategory) => {
    try {
      setSelectedCategory(idCate);
      setSelectedCategoryId(idCate);
      setCurrentPage(currentPageCategory)
      setIdCategory(idCate)
      setTypeOfCurrentPage('Phân loại');
      const data = await ProductService.getNameCategory(idCate, currentPageCategory);
      setProducts(data.dataForPage);
      setTotalPage(data.totalPages)
      console.log("List category:", data);
      filterProducts();
    } catch (error) {
      console.error('Lỗi khi tìm nạp sản phẩm:', error);
    }
  };



  // Ham nhan vao so trang can thuc hien roi tien hanh load data dua vao so trang
  const getData = async (pageNumber) => {
    try {
      if (searchInput === undefined) {
        setTypeOfCurrentPage('Tất cả sản phẩm');
        const data = await ProductService.getAllProducts(pageNumber);
        console.log("product at", data)
        if (data.dataForPage.length > 0) {
          setProducts(data.dataForPage);
          setProductsFiltered(data.dataForPage);
          setTotalPage(data.totalPages);
          setCurrentPage(pageNumber)
        } else {
          console.log("No products found or data is undefined");
        }
      } else {
        setTypeOfCurrentPage('findProduct');
        const response = await ProductService.searchProduct(searchInput, pageNumber);
        console.log("This is result find product", response.data.dataForPage);
        console.log("All", response);
        setProducts(response.data.dataForPage);
        setProductsFiltered(response.data.dataForPage);
        setTotalPage(response.data.totalPages);
        setCurrentPage(pageNumber);
      }
    } catch (error) {
      console.error("Không thể tìm nạp sản phẩm: ", error);
    }
  }

  // Khi trang nay duoc goi, he thong se hien thi so luong san pham trong trang dau tien
  useEffect(() => {
    getData(1);
  }, [searchInput]);



  // ham xu li yeu cau load den so trang can thiet, neu typeOfCurrentPage = false thi load du lieu tong
  // neu typeOfCurrentPage = true thi se loa du lieu category
  const paginate = (pageNumber) => {
    if (typeOfCurrentPage === 'category') {
      handleCategorySelect(idCategory, pageNumber)
    } else if (typeOfCurrentPage === 'allProduct') {
      searchInput = undefined;
      getData(pageNumber);
    } else {
      getData(pageNumber);
    }
  };

  // Lấy dữ liệu của Category
  const getDataCategory = async () => {
    try {
      const dataCategory = await CategoryService.getAllCategory();
      setCategory(dataCategory);
      console.log("category", dataCategory);
    }
    catch (error) {
      console.log("Failed")
    }
  }
  // Gọi hàm Category
  useEffect(() => {
    getDataCategory();
  }, []);

  // sort product, dung useEffect, goi ham moi khi sort type thay doi, sort type thay doi dua vao useState va onchange cua <select>
  useEffect(() => {
    switch (sortType) {
      case "price-ascending":
        const priceascend = [...products].sort((a, b) => a.price - b.price);
        setProducts(priceascend);
        console.log("sorted products gia asc", products);
        break;
      case "price-descending":
        const pricedescend = [...products].sort((a, b) => b.price - a.price);
        setProducts(pricedescend);
        console.log("sorted products gia des", products);
        break;
      case "title-ascending":
        const titleascend = [...products].sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1,);
        setProducts(titleascend);
        console.log("sorted products title asc", products);
        break;
      case "title-descending":
        const titledescend = [...products].sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1,);
        setProducts(titledescend);
        console.log("sorted products title des", products);
        break;
    }
    filterProducts();
  }, [sortType])


  const panigation = () => {
    if (productsFiltered.length > 0) {
      return <nav aria-label="Page navigation example">
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
                    backgroundColor: currentPage === index + 1 ? '#538641' : 'white',
                    color: currentPage === index + 1 ? 'white' : '#538641',
                    borderColor: currentPage === index + 1 ? '#538641' : '' }}
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
    }
  }

  return (
    <>
    <div className="store-wrapper py-5 light background">
      <Meta title={"Cửa hàng"} />
      <BreadCrumb title="Cửa hàng" />
      
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3 box">
                <h3 className="filter-title">Lọc sản phẩm theo danh mục</h3>
                <div>
                  <ul className="select-categories">
                    <li onClick={() => updateSearchKey()} className={selectedCategoryId === null ? 'selected-category' : ''}>Tất cả</li>
                    {category.map((cate) =>
                      <li onClick={() => handleCategorySelect(cate.idCategory, 1)} className={selectedCategoryId === cate.idCategory ? 'selected-category' : ''}>{cate.name}</li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Filter By Start */}
              <div className="filter-card mb-3 box">
                <h3 className="filter-title">Lọc sản phẩm theo</h3>
                <div>
                  <h5 className="sub-title">Sản phẩm :</h5>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={filters.inStock}
                        name="inStock"
                        onChange={handleFilterChange}
                      />
                      <label className="form-check-label" htmlFor="">
                        Còn hàng
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={filters.outOfStock}
                        name="outOfStock"
                        onChange={handleFilterChange}
                      />
                      <label className="form-check-label" htmlFor="">
                        Hết hàng
                      </label>
                    </div>
                  </div>
                  <h5 className="sub-title">Lọc theo giá tiền :</h5>
                  <div className="d-flex align-items-center gap-10">
                    {/* From of price start */}
                    <div className="form-floating mb-3">
                      <input
                        type="number"
                        className="form-control input-price-from"
                        id="fromInput"
                        placeholder="From"
                        name="priceFrom"
                        value={filters.priceFrom}
                        onChange={handleFilterChange}
                      />
                      <label htmlFor="fromInput">Giá từ</label>
                    </div>
                    {/* From of price end */}

                    {/* To of price start */}
                    <div className="form-floating mb-3">
                      <input
                        type="number"
                        className="form-control input-price-to"
                        id="toInput"
                        placeholder="To"
                        name="priceTo"
                        value={filters.priceTo}
                        onChange={handleFilterChange}
                      />
                      <label htmlFor="toInput">Giá đến</label>
                    </div>
                    {/* To of price end */}
                  </div>
                </div>
              </div>
              {/* Filter By End */}
            </div>

            <div className="col-9">
              {/* Sort type */}
              <div className="filter-sort-grid mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10">
                    <p className="mb-0 d-block" style={{ width: "100px" }}>
                      Sắp xếp:
                    </p>
                    <select name="" className="form-select box" id="" onChange={(e) => setSortType(e.target.value)}>
                      <option value="title-ascending">
                      Theo thứ tự bảng chữ cái, A-Z
                      </option>
                      <option value="title-descending">
                      Theo thứ tự bảng chữ cái, Z-A
                      </option>
                      <option value="price-ascending">
                      Giá từ thấp đến cao
                      </option>
                      <option value="price-descending">
                      Giá từ cao đến thấp
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="products-list ">
                {/* Product card starts here */}
                <div>
                  <div className="row box">
                    <ProductCard listProduct={productsFiltered} />
                    <div>
                      {panigation()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
