import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductService from "../../api/ProductService";
import AccountService from "../../api/AccountService";
import { Login } from "../../pages/Login";
import $ from 'jquery';
import { Button } from 'react-bootstrap';
import DeleteProduct from "./DeleteProduct";
import 'datatables.net-bs5';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import { FiPlus } from "react-icons/fi";
import "../../css/Style.css"

export const Product2 = () => {
    const [products, setProducts] = useState([]);
    const [jwtToken] = useState(sessionStorage.getItem('jwtToken'));
    const [accountRole, setAccountRole] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [activeCell, setActiveCell] = useState(null); // State để theo dõi ô đang được nhấn

    const handleCellClick = (index) => {
        setActiveCell(index); // Cập nhật state khi một ô được nhấn
    };

    // Hàm mở Modal và set productId để xác nhận xóa
    const handleOpenDeleteModal = (idBook) => {
        setDeleteProductId(idBook);
        setModalShow(true);
    };

    // Kiểm tra account
    useEffect(() => {
        const getAccount = async () => {
            if (jwtToken !== '') {
                try {
                    const account = await AccountService.getAccount(jwtToken);
                    console.log("account header: ", account)
                    setAccountRole(account.role)
                } catch (error) {
                    console.error("Error fetching account information:", error);
                }
            }
        }
        getAccount();
    }, [jwtToken]);

    // Lấy data
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await ProductService.getAllProductsAdmin();
                setProducts(data);
            } catch (error) {
                console.error("No products found or data is undefined:", error);
            }
        };
        $('#myDataTable').DataTable();
        getData();
    }, [products]);


    const filteredProducts = products.filter(product => product.status == null);


    // Xét điều kiện của admin
    if (accountRole === 'admin') {
        // Hàm delete start
        const handleDelete = () => {
            try {
                ProductService.deleteProduct(deleteProductId);
                console.log("Product deleted successfully");
                //getData();
                setModalShow(false);
            } catch (error) {
                console.error("Error deleting product:", error.response);
            }
        };
        // Hàm delete end

        return (
            <div>
                <div className="">

                    <div class="mx-xxl-3 px-4 px-sm-5 col-12">
                        <div class="py-5 col-12">
                            <div class="row g-4 align-items-center col-12">
                                <div class="col">
                                    <h1>Products list</h1>
                                </div>
                                <div class="col-auto d-flex">
                                    <div className="button-banner me-2">
                                        <Link className='button link button-add-product d-flex' to='/Category'>Category</Link>
                                    </div>
                                    <div className="button-banner me-2">
                                        <Link className='button link button-add-product d-flex' to='/Banner'>Banner</Link>
                                    </div>
                                    <div className="button-admin-new-show me-2">
                                        <Link className='button link button-add-product d-flex' to='/ShowProductBooked'>All Bill</Link>
                                    </div>
                                    <div className="button-admin-new-show me-2">
                                        <Link className='button-profile-1 link button-add-product' to='/Product2'>Products</Link>
                                    </div>
                                    <div className="button-admin-new-show">
                                        <Link className='button link button-add-product d-flex' to='/Customer'>Account</Link>
                                    </div>
                                </div>
                                <div className="me-2">
                                    <Link className='button-profile-1 link button-add-product d-flex' to='/addproduct'><FiPlus className="mt-1 me-1" />Add Product</Link>
                                </div>
                            </div>

                        </div>
                    </div>



                    {/* Show product start*/}
                    <div class="mx-xxl-3 px-sm-5">
                        <div className="row g-4 align-items-center ">
                            <div class="table-responsive">
                                <table id='myDataTable' className="table table-striped table-bordered table-in-adddata">
                                    <thead>
                                        <tr>
                                            <th className="col-1 text-center" onClick={() => handleCellClick(0)}>Book Id {activeCell === 0 && <FaCaretUp />}</th>
                                            <th className="col-1 text-center" onClick={() => handleCellClick(1)}>Name {activeCell === 1 && <FaCaretUp />}</th>
                                            <th className="col-1 text-center" onClick={() => handleCellClick(2)}>Image {activeCell === 2 && <FaCaretUp />}</th>
                                            <th className="col-2 text-center" onClick={() => handleCellClick(3)}>Place Production {activeCell === 3 && <FaCaretUp />}</th>
                                            <th className="col-1 text-center" onClick={() => handleCellClick(4)}>Category {activeCell === 4 && <FaCaretUp />}</th>
                                            <th className="col-1 text-center" onClick={() => handleCellClick(5)}>Price {activeCell === 5 && <FaCaretUp />}</th>
                                            <th className="col-2 text-center" onClick={() => handleCellClick(6)}>Description {activeCell === 6 && <FaCaretUp />}</th>
                                            <th className="col-1 text-center" onClick={() => handleCellClick(7)}>Weight {activeCell === 7 && <FaCaretUp />}</th>
                                            <th className="col-1 text-center" onClick={() => handleCellClick(8)}>Quantity {activeCell === 8 && <FaCaretUp />}</th>
                                            <th className="col-1 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredProducts.map(product =>
                                            <tr key={product.idBook}>
                                                <td className="col-1 text-center">{product.idBook}</td>
                                                <td className="col-1 text-center">{product.title}</td>
                                                <td className="col-1 align-center img-edit"><img src={`http://localhost:8090/${product.image}`}/> </td>
                                                <td className="col-2 text-center">{product.place_production}</td>
                                                <td className="col-1 text-center">{product.category.name}</td>
                                                <td className="col-1 text-center">{product.price}</td>
                                                <td className="col-2" style={{
                                                    display: "-webkit-box",
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    WebkitLineClamp: 2, 
                                                  }}>{product.describle}</td>
                                                <td className="col-1 text-center">{product.weight}</td>
                                                <td className="col-1 text-center">{product.quantity}</td>
                                                <td className="col-1 text-center">
                                                    <div className="d-flex col-1 button-order-big">
                                                        <Button className="btn btn-danger me-2" onClick={() => handleOpenDeleteModal(product.idBook)}>
                                                            Delete
                                                        </Button>
                                                        {/* <Button style={{ backgroundColor: '#ff4000', borderColor: 'black' }} className="button button-order-detail" onClick={handleOpenOrderModal}>
                                                            Order
                                                        </Button> */}
                                                        
                                                        <Link
                                                            to={`/EditProduct/${product.idBook}`}
                                                            className="btn btn-success me-2"
                                                        >
                                                            Edit
                                                        </Link>

                                                    </div>
                                                </td>
                                            </tr>

                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <DeleteProduct
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                onConfirmDelete={handleDelete}
                            />
                        </div>
                    </div>
                    {/* Show product end*/}
                </div>

            </div>
        );
    } else {
        return (<Login />)
    }
}