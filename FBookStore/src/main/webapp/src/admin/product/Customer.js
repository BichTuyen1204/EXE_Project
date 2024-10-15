import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountService from "../../api/AccountService";
import { Login } from "../../pages/Login";
import $ from 'jquery';
import 'datatables.net-bs5';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiPlus } from "react-icons/fi";

export const Customer = () => {
    const [customer, setCustomer] = useState([]);
    const [jwtToken] = useState(sessionStorage.getItem('jwtToken'));
    const [accountRole, setAccountRole] = useState('');

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

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await AccountService.getEntities();
                setCustomer(data);
            } catch (error) {
                console.error("No account found or data is undefined:", error);
            }
        };
        
        getData();
        
    }, []);

    useEffect(() => {
        // Ensure the table is not initialized until the data is fetched
        if (customer.length > 0) {
            // DataTable initialization
            const table = $('#myDataTable').DataTable();
            // Clean-up function to destroy DataTables instance
            return () => {
                table.destroy();
            };
        }
    }, [customer]);

    if (accountRole === 'admin') {
        return (
            <div>
                <div className="">
                    <div class="mx-xxl-3 px-4 px-sm-5">
                        <div class="py-5 col-12">
                            <div class="row g-4 align-items-center col-12">
                                <div class="col">
                                    <h1>Account of Customer</h1>
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
                                        <Link className='button link button-add-product d-flex' to='/Product2'>Products</Link>
                                    </div>
                                    <div className="button-admin-new-show">
                                        <Link className='button-profile-1 link button-add-product' to='/Customer'>Account</Link>
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
                                            <th className="col-1 text-center">Id Account</th>
                                            <th className="col-3 text-center">Name</th>
                                            <th className="col-3 text-center">Email</th>
                                            <th className="col-2 text-center">Phone number</th>
                                            <th className="col-1 text-center">Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customer.map(cus =>
                                            <tr key={cus.id}>
                                                <td className="text-center">{cus.id}</td>
                                                <td className="">{cus.name}</td>
                                                <td className="">{cus.email}</td>
                                                <td className="text-center">{cus.phoneNumber}</td>
                                                <td className="text-center">{cus.role}</td>
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