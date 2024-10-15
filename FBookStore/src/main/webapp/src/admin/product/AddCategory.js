import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import CategoryService from '../../api/CategoryService';
import { Login } from "../../pages/Login";
import AccountService from "../../api/AccountService";

const AddCategory = () => {
    const [jwtToken] = useState(sessionStorage.getItem('jwtToken'));
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [accountRole, setAccountRole] = useState('');

    const NameChange = (e) => {
        const value = e.target.value;
        setName(value);
    };

    const NameBlur = () => {
        if (name.trim() === '') {
            setNameError('Please input the name of the category');
        } else {
            setNameError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isName = name.trim() !== '' && name.length >= 2 && name.length <= 100;
        if (isName) {
            try {
                await CategoryService.getAdd(name);
                setIsSubmitted(true);
                setName('');
            } catch (error) {
                console.error('There was an error creating the category', error);
            }
            setTimeout(() => {
                setIsSubmitted(false);
            }, 5000); // Timeout 5 giây
        } else {
            alert('Please fill in complete and correct information');
        }
    };

    // Check account
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

    if (accountRole === 'admin') {
        return (
            <div className="add-product-form-container container d-flex flex-column align-items-center justify-content-center">
                <h3 className="mb-4 title mt-5">Add Category</h3>
                <div className="">
                    <form className="add-product-form d-flex gap-2 flex-column border p-3">
                        <div className="input-checkout">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                placeholder="Enter name of the category"
                                name="title"
                                value={name}
                                className="form-control select-checkout-address"
                                onChange={NameChange}
                                onBlur={NameBlur}
                            />
                            {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
                        </div>
                    </form>

                    <div>
                        {isSubmitted && <p style={{ color: 'green' }}>Create the category successfully!</p>}
                        <div className="mt-3 mb-4 d-flex justify-content-center align-items-center">
                            <button className="button link me-3" onClick={handleSubmit}>Create new category</button>
                            <Link to={'/Category'} className="button-profile-1 link text-dark">
                                Go back
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (<Login />)
    }
};

export default AddCategory;
