import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductService from "../../api/ProductService";
import AccountService from "../../api/AccountService";
import InvoiceService from "../../api/InvoiceService";
import { Login } from "../../pages/Login";
import $ from 'jquery';
import { Button } from 'react-bootstrap';
import DeleteProduct from "./DeleteProduct";
import 'datatables.net-bs5';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';

export const ViewDetail = () => {
    const [view, setView] = useState([]);
    const [jwtToken] = useState(sessionStorage.getItem('jwtToken'));
    const [accountRole, setAccountRole] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [activeCell, setActiveCell] = useState(null); // State để theo dõi ô đang được nhấn

    const handleCellClick = (index) => {
        setActiveCell(index); // Cập nhật state khi một ô được nhấn
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
                const data = await InvoiceService.getAllInvoice();
                setView(data);
            } catch (error) {
                console.error("No products found or data is undefined:", error);
            }
        };
        $('#myDataTable').DataTable();
        getData();
    }, [view]);

    if (accountRole === 'admin') {
        return (
            <div>
                <div className="">
                    <div class="mx-xxl-3 px-4 px-sm-5">
                        <div class="py-5">
                            <div class="row g-4 align-items-center">
                                <div class="col">
                                    <h1>View detail</h1>
                                </div>
                                <div class="col-auto d-flex">
                                    <div className="button-admin-new-show">
                                        <Link className='btn btn-primary' to='/ShowProductBooked'>All Bill</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Show product start*/}
                    <div class="mx-xxl-3 px-4 px-sm-5">
                        <div className="row g-4 align-items-center ">
                            <div class="table-responsive">
                                <table id='myDataTable' className="table table-striped table-bordered table-in-adddata">
                                    <thead>
                                        <tr>
                                            <th onClick={() => handleCellClick(0)}>{activeCell === 0 && <FaCaretUp />}</th>
                                            <th onClick={() => handleCellClick(1)}>Name of customer {activeCell === 1 && <FaCaretUp />}</th>
                                            <th onClick={() => handleCellClick(2)}>Phone number {activeCell === 2 && <FaCaretUp />}</th>
                                            <th onClick={() => handleCellClick(3)}>Address {activeCell === 3 && <FaCaretUp />}</th>
                                            <th onClick={() => handleCellClick(4)}>Date {activeCell === 4 && <FaCaretUp />}</th>
                                            {/* <th onClick={() => handleCellClick(6)}>Id Product{activeCell === 6 && <FaCaretUp />}</th> */}
                                            {/* <th onClick={() => handleCellClick(6)}>Description {activeCell === 6 && <FaCaretUp />}</th>
                                            <th onClick={() => handleCellClick(7)}>Age {activeCell === 7 && <FaCaretUp />}</th>
                                            <th onClick={() => handleCellClick(8)}>Quantity {activeCell === 8 && <FaCaretUp />}</th> */}

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {view && view.length > 0 && view.map(vi =>
                                            <tr key={vi.invoiceID}>
                                                <td>{vi.invoiceID}</td>
                                                <td>{vi.account.name}</td>
                                                <td>{vi.account.phoneNumber}</td>
                                                <td>{vi.shipAddress}</td>
                                                <td>{vi.invoiceDate}</td>

                                                {/* <td>
                                                    {invoice.invoiceItems.map(item =>
                                                        <tr key={item.itemID}>
                                                            <td>{item.itemID}Quantity:{item.quantity}</td>
                                                        
                                                        </tr>
                                                    )}
                                                </td> */}
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
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
