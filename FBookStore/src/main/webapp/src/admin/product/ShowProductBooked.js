import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountService from "../../api/AccountService";
import InvoiceService from "../../api/InvoiceService";
import { Login } from "../../pages/Login";
import $ from 'jquery';
import 'datatables.net-bs5';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCaretUp } from 'react-icons/fa';
import { Button } from 'react-bootstrap';


export const ShowProductBooked = () => {

    const [invoices, setInvoices] = useState([]);
    const [jwtToken] = useState(sessionStorage.getItem('jwtToken'));
    const [accountRole, setAccountRole] = useState('');
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
                setInvoices(data);
            } catch (error) {
                console.error("No products found or data is undefined:", error);
            }

        };
        getData();
    }, []);

    useEffect(() => {
        // Ensure the table is not initialized until the data is fetched
        if (invoices.length > 0) {
            // DataTable initialization
            const table = $('#myDataTable').DataTable();
            // Clean-up function to destroy DataTables instance
            return () => {
                table.destroy();
            };
        }
    }, [invoices]);

    const totalValue = (invoiceItems) => {
        return invoiceItems.reduce((accumulator, item) => {
            return accumulator + (item.quantity * item.product.price);
        }, 0);
    }


    // Xét điều kiện của admin
    if (accountRole === 'admin') {
        return (
            <div>
                <div className="">
                    <div class="mx-xxl-3 px-4 px-sm-5">
                        <div class="py-5">
                            <div class="row g-4 align-items-center">
                                <div class="col">
                                    <h1>All Bill</h1>
                                </div>
                                <div class="col-auto d-flex">
                                    <div className="button-banner me-2">
                                        <Link className='button link button-add-product d-flex' to='/Category'>Category</Link>
                                    </div>
                                    <div className="button-banner me-2">
                                        <Link className='button link button-add-product d-flex' to='/Banner'>Banner</Link>
                                    </div>
                                    <div className="button-admin-new-show me-2">
                                        <Link className='button-profile-1 link button-add-product' to='/ShowProductBooked'>All Bill</Link>
                                    </div>
                                    <div className="button-admin-new-show me-2">
                                        <Link className='button link button-add-product d-flex' to='/Product2'>Products</Link>
                                    </div>
                                    <div className="button-admin-new-show">
                                        <Link className='button link button-add-product d-flex' to='/Customer'>Account</Link>
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
                                            <th className="text-center col-1" onClick={() => handleCellClick(0)}>Id Invoice{activeCell === 0 && <FaCaretUp />}</th>
                                            <th className="text-center col-2" onClick={() => handleCellClick(1)}>Name of customer {activeCell === 1 && <FaCaretUp />}</th>
                                            <th className="text-center col-2" onClick={() => handleCellClick(2)}>Phone number {activeCell === 2 && <FaCaretUp />}</th>
                                            <th className="text-center col-4" onClick={() => handleCellClick(3)}>Address {activeCell === 3 && <FaCaretUp />}</th>
                                            <th className="text-center col-1" onClick={() => handleCellClick(4)}>Date {activeCell === 4 && <FaCaretUp />}</th>
                                            <th className="text-center col-1" onClick={() => handleCellClick(6)}>Total bill{activeCell === 6 && <FaCaretUp />}</th>
                                            <th className="text-center col-1" onClick={() => handleCellClick(5)}>View detail {activeCell === 5 && <FaCaretUp />}</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {invoices && invoices.length > 0 && invoices.map(invoice =>
                                            <tr key={invoice.invoiceID}>
                                                <td className="text-center">{invoice.invoiceID}</td>
                                                <td className="text-center">{invoice.account.name}</td>
                                                <td className="text-center">{invoice.account.phoneNumber}</td>
                                                <td className="">{invoice.shipAddress}</td>
                                                <td className="text-center">{invoice.invoiceDate}</td>
                                                <td className="text-center">${totalValue(invoice.invoiceItems)}</td>
                                                <td className="text-center">
                                                    <Link to={`/Bill/${invoice.invoiceID}`}>
                                                        <Button className="button link button-add-product d-flex">
                                                            View
                                                        </Button>
                                                    </Link>
                                                </td>

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