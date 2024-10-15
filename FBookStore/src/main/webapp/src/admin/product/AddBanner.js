import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AccountService from "../../api/AccountService";
import BannerService from "../../api/BannerService";
import { Login } from "../../pages/Login";

const AddBanner = () => {
    const [jwtToken] = useState(sessionStorage.getItem('jwtToken'));
    const [imageError, setImageError] = useState('');
    const [type, setType] = useState('');
    const [typeError, setTypeError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [accountRole, setAccountRole] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isType = type.trim() !== "" && !(await checkBannerTypeExisted(type));

        if (selectedFile && isType) {
            try {
                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append('type', type);

                const response = await BannerService.addNew(formData);
                console.log('banner created', response.data);
                setIsSubmitted(true);
                setTimeout(() => {
                    setIsSubmitted(false);
                    setSelectedFile(null); // Reset selectedFile
                    setType(""); // Reset type
                }, 3000);
            } catch (error) {
                console.error('There was an error creating the banner', error);
            }
        } else {
            alert("Please fill in complete and correct information");
        }
    };

    const ImageChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const ImageBlur = () => {
        if (!selectedFile) {
            setImageError("Please input file")
        } else {
            setImageError("");
        }
    }

    const checkBannerTypeExisted = async (type) => {
        if (await BannerService.checkBannerTypeExisted(type)) {
            console.log("Type existed");
            return true;
        } else {
            console.log("Type available");
            return false;
        }
    }

    const TypeChange = (e) => {
        setType(e.target.value);
    };

    const TypeBlur = async () => {
        if (type.trim() === "") {
            setTypeError("Please input the type")
        }
        else if (await checkBannerTypeExisted(type)) {
            setTypeError("Type existed");
        }
        else {
            setTypeError("");
        }
    }

    if (accountRole === 'admin') {
        return (
            <div className="add-product-form-container container d-flex flex-column align-items-center justify-content-center">
                <h3 className="mb-4 title mt-5">Add New Banner</h3>
                <div className="">
                    <form className="add-product-form d-flex gap-2 flex-column border p-3">
                        <div className="input-edit-admin">
                            <select onChange={TypeChange} onBlur={TypeBlur} class="form-select" aria-label="Default select example">
                                <option disabled selected>Type</option>
                                <option value="big-banner">Big Banner</option>
                                <option value="small-banner-1">Small banner 1</option>
                                <option value="small-banner-2">Small banner 2</option>
                                <option value="small-banner-3">Small banner 3</option>
                                <option value="small-banner-4">Small banner 4</option>
                                <option value="slide">Slide</option>
                            </select>
                            {typeError && (
                                <p style={{ color: "red" }}>{typeError}</p>
                            )}
                        </div>
                        <div className="input-edit-admin">
                            <label className="form-label">Choose Image</label>
                            <input
                                type="file"
                                placeholder="Enter image"
                                name="file"
                                className="form-control"
                                onChange={ImageChange}
                                onBlur={ImageBlur}
                            />
                            {imageError && (
                                <p style={{ color: "red" }}>{imageError}</p>
                            )}
                        </div>
                    </form>

                    <div>
                        {isSubmitted && (
                            <p style={{ color: "green" }}>Banner added successfully!</p>
                        )}
                        <div className="mt-3 mb-4 d-flex justify-content-center align-items-center">
                            <button
                                className="button link me-2"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Add Banner
                            </button>
                            <Link
                                to={'/Banner'}
                                className="button button-go-back link text-dark me-2"
                                type="submit"
                            >
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
}

export default AddBanner;
