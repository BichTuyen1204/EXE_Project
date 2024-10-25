import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BannerService from "../../api/BannerService";
import ProductService from "../../api/ProductService";
import AccountService from "../../api/AccountService";
import { Login } from "../../pages/Login";
import $ from "jquery";
import { Button } from "react-bootstrap";
import DeleteProduct from "./DeleteProduct";
import "datatables.net-bs5";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiPlus } from "react-icons/fi";
import DeleteBanner from "./DeleteBanner";
import CategoryService from "../../api/CategoryService";
import DeleteCategory from "./DeleteCategory";
import ShowInforCategory from "./ShowInforCategory";

export const Category = () => {
  const [category, setCategory] = useState([]);
  const [jwtToken] = useState(sessionStorage.getItem("jwtToken"));
  const [accountRole, setAccountRole] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalShowCategory, setModalShowShowCategory] = useState(false);
  const [deletCategoryId, setDeletCategoryId] = useState(null);

  useEffect(() => {
    const getAccount = async () => {
      if (jwtToken !== "") {
        try {
          const account = await AccountService.getAccount(jwtToken);
          console.log("account header: ", account);
          setAccountRole(account.role);
        } catch (error) {
          console.error("Error fetching account information:", error);
        }
      }
    };
    getAccount();
  }, [jwtToken]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await CategoryService.getAllCategory();
        setCategory(data);
      } catch (error) {
        console.error("No categories found or data is undefined:", error);
      }
    };
    $("#myDataTable").DataTable();
    getData();
  }, [category]);

  const handleOpenDeleteModal = (idCategory) => {
    setDeletCategoryId(idCategory);
    setModalShow(true);
  };

  if (accountRole === "admin") {
    const handleDelete = async () => {
      try {
        CategoryService.delete(deletCategoryId);
        setModalShow(false);
      } catch (error) {
        console.error("Error deleting product:", error);
        setModalShowShowCategory(true);
        setModalShow(false);
      }
    };
    return (
      <div>
        <div className="">
          <div class="mx-xxl-3 px-4 px-sm-5">
            <div class="py-5 col-12">
              <div class="row g-4 align-items-center col-12">
                <div class="col">
                  <h1>Category</h1>
                </div>
                <div class="col-auto d-flex">
                  <div className="button-banner me-2">
                    <Link
                      className="button-profile-1 link button-add-product"
                      to="/Category"
                    >
                      Category
                    </Link>
                  </div>
                  <div className="button-banner me-2">
                    <Link
                      className="button link button-add-product d-flex"
                      to="/Banner"
                    >
                      Banner
                    </Link>
                  </div>
                  <div className="button-admin-new-show me-2">
                    <Link
                      className="button link button-add-product d-flex"
                      to="/ShowProductBooked"
                    >
                      All Bill
                    </Link>
                  </div>
                  <div className="button-admin-new-show me-2">
                    <Link
                      className="button link button-add-product d-flex"
                      to="/Product2"
                    >
                      Products
                    </Link>
                  </div>
                  <div className="button-admin-new-show">
                    <Link
                      className="button link button-add-product d-flex"
                      to="/Customer"
                    >
                      Account
                    </Link>
                  </div>
                </div>
                <div className="me-2">
                  <Link
                    className="button-profile-1 link button-add-product d-flex"
                    to="/AddCategory"
                  >
                    <FiPlus className="mt-1 me-1" />
                    Add Category
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Show product start*/}
          <div class="mx-xxl-3 px-4 px-sm-5">
            <div className="row g-4 align-items-center ">
              <div class="table-responsive">
                <table
                  id="myDataTable"
                  className="table table-striped table-bordered table-in-adddata"
                >
                  <thead>
                    <tr>
                      <th className="col-2 text-center">Category Id </th>
                      <th className="col-8 text-center">Name </th>
                      <th className="col-2 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.map((cate) => (
                      <tr key={cate.idCategory}>
                        <td className="col-2 text-center">{cate.idCategory}</td>
                        <td className="col-10 text-center">{cate.name}</td>
                        <td className=" text-center">
                          <Button
                            className="btn btn-danger me-2"
                            onClick={() =>
                              handleOpenDeleteModal(cate.idCategory)
                            }
                          >
                            Delete
                          </Button>

                          <Link
                            to={`/Edit_Category/${cate.idCategory}`}
                            className="btn btn-success me-2 link"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <DeleteCategory
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  onConfirmDelete={handleDelete}
                />
              </div>
              <ShowInforCategory
                show={modalShowCategory}
                onHide={() => setModalShowShowCategory(false)}
              />
            </div>
          </div>
          {/* Show product end*/}
        </div>
      </div>
    );
  } else {
    return <Login />;
  }
};
