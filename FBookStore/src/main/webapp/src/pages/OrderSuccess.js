import React, { useEffect, useState } from "react";
import { BreadCrumb } from "./BreadCrumb.js";
import Meta from "./Meta.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Login } from "../pages/Login";
import AccountService from "../api/AccountService.js";
import { CiCircleCheck } from "react-icons/ci";
import "../css/orderSuccessMobile.css"
export const OrderSuccess = () => {
    const [jwtToken, setJwtToken] = useState(sessionStorage.getItem('jwtToken'));
    const [numberOfBookInCart, setNumberOfBookInCart] = useState();
    const navigate = useNavigate();
    const [cardBodyDeleted, setCardBodyDeleted] = useState([false, false]);
    const [accountRole, setAccountRole] = useState('');
    const [accountEmail, setAccountEmail] = useState('');
    const [productsInCart, setProductsInCart] = useState([]);
    const [idCart, setIdcart] = useState('');
    const [account, setAccount] = useState('');
    const [total, setTotal] = useState(0);
    const { invoiceId } = useParams();

    useEffect(() => {
        const getAccount = async () => {
            if (jwtToken !== '') {
                try {
                    const account = await AccountService.getAccount(jwtToken);
                    console.log("account cart: ", account)
                    setAccountEmail(account.email)
                    setAccountRole(account.role)
                    return setAccount(account)
                } catch (error) {
                    console.error("Lỗi lấy thông tin tài khoản:", error);
                }
            } else {
                setAccountRole('');
                setAccountEmail('');
            }
        }
        getAccount();
    }, [jwtToken]);

    if (account.role === 'user') {
        return (
            <>
                <Meta title={"OrderSuccess"} />
                <BreadCrumb title="Order successful" />
                <section className="cart-wrapper home-wrapper-2 py-5 px-5">
                    <div className="col-12">
                        <div className="OrderSuccess container bg-white position-relative">
                            <div className=" pt-3">
                                <div className="icon-container" >
                                    <CiCircleCheck size={55} />
                                </div>

                                <div className="name-of-customer mt-2">
                                    Hey <strong className="ms-1">{account.name}</strong>,
                                </div>

                                <div className="name-of-customer mt-2">
                                    <h3>
                                        <strong>Đơn hàng của bạn đã được xác nhận!</strong>
                                    </h3>
                                </div>

                                <div className="name-of-customer mt-2">
                                    <h7>
                                        Cảm ơn bạn đã đặt hàng
                                    </h7>
                                </div>

                                <div className="button-order-success">
                                    <div className="btn-view">
                                        <Link to={`/Bill/${invoiceId}`}>
                                            <button className="button-go-back px-4 py-1">
                                                Xem đơn hàng
                                            </button>
                                        </Link>

                                    </div>

                                    <div className="btn-back button-view">
                                        <Link to="/Product">
                                            <button className="btn-submit px-4 py-1">
                                                Quay lại cửa hàng
                                            </button>
                                        </Link>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    } else {
        return (<Login />)
    }
};