import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import ProductService from "../../api/ProductService";
import AccountService from "../../api/AccountService";
import CategoryService from "../../api/CategoryService";
import { Login } from "../../pages/Login";
import ReactQuill from "react-quill";

const AddProduct = () => {
    const [jwtToken] = useState(sessionStorage.getItem('jwtToken'));
    // Tuyen code start
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState('');
    const [imageError, setImageError] = useState('');
    const [place_production, setPlaceProduction] = useState('');
    const [place_productionError, setPlaceProductionError] = useState('');
    const [type, setType] = useState('');
    const [typeError, setTypeError] = useState('');
    const [price, setPrice] = useState('');
    const [priceError, setPriceError] = useState('');
    const [describle, setDescrible] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [weight, setWeight] = useState('');
    const [weightError, setWeightError] = useState('');
    const [quantity, setQuantity] = useState('');
    const [quantityError, setQuantityError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [category, setCategory] = useState([]);
    const [idCategory, setIdCategory] = useState("");
    const [categoryError, setCategoryError] = useState('');
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isTitle =
            title.trim() !== "" &&
            title.length >= 2 &&
            title.length <= 200;

        const isPlaceProduction =
            place_production.trim() !== "" &&
            place_production.length >= 2 &&
            place_production.length <= 200;

        const isCategory =
            idCategory.trim() !== "";

        const isPrice =
            price.trim() !== "";

        const isDescription =
            describle.trim() !== "";

        const isWeight =
            weight.trim() !== "";

        const isQuantity =
            quantity.trim() !== "";

        if (
            isTitle &&
            selectedFile &&
            isPlaceProduction &&
            isCategory &&
            isPrice &&
            isDescription &&
            isWeight &&
            isQuantity &&
            isCategory
        ) {
            try {
                console.log(formData)
                const response = await ProductService.addNew(formData);
                setIsSubmitted(true);
                console.log('product created', response);
                setTitle("");
                setIdCategory("");
                setSelectedFile(null);
                setPlaceProduction("");
                setPrice("");
                setDescrible("");
                setWeight("");
                setQuantity("");
            } catch (error) {
                console.error('There was an error creating the product', error)
                console.log("LOI");
            }
            setTimeout(() => {
                setIsSubmitted(false);
                console.log("ROI");
            }, 20000);
        } else {
            alert("Please fill in complete and correct information");
            console.log("OK ROI");
        }
    };

    // Title
    const TitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
    };

    const TitleBlur = () => {
        if (title.trim() === "") {
            setTitleError("Please input the name");
        } else {

            setTitleError("");
        }
    }

    // Image
    const ImageChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const ImageBlur = () => {
        if (!selectedFile) {
            setImageError("Please input image")
        } else {
            setImageError("");
        }
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('title', title);
    formData.append('idCategory', idCategory);
    formData.append('place_production', place_production);
    formData.append('type', type);
    formData.append('describe', describle);
    formData.append('price', price);
    formData.append('weight', weight);
    formData.append('quantity', quantity);

    // place_production
    const PlaceProductionChange = (e) => {
        const value = e.target.value;
        setPlaceProduction(value);
    };

    const PlaceProductionBlur = () => {
        if (place_production.trim() === "") {
            setPlaceProductionError("Please input the place_production")
        } else if (place_production.length < 4) {
            setPlaceProductionError("Author must be at least 4 characters")
        } else if (place_production.length > 100) {
            setPlaceProductionError("Full name must be less than 100 characters")
        } else if (!/^[\p{L}\s]+$/u.test(place_production)) {
            setPlaceProductionError("Please input only alphabetic characters");
        } else {
            setPlaceProductionError("");
        }
    }

    // Type
    const CategoryChange = (e) => {
        const value = e.target.value;
        setIdCategory(value);
    };

    const CategoryBlur = () => {
        if (idCategory.trim() === "") {
            setCategoryError("Please input the category")
        } else {
            setTypeError("");
        }
    }

    // Price
    const PriceChange = (e) => {
        const value = e.target.value;
        setPrice(value);
    };

    const PriceBlur = () => {
        if (price.trim() === "") {
            setPriceError("Please input the price")
        } else {
            const regexPrice = /^[0-9]+$/;
            if (!regexPrice.test(price)) {
                setPriceError("Please input only the number");
            } else if (price.length > 8) {
                setPriceError("Please input less than 8 numbers");
            } else {
                setPriceError("");
            }
        }
    }

    // Description
    const DescriptionChange = (e) => {
        const value = e.target.value;
        setDescrible(value);
    };

    const DescriptionBlur = () => {
        if (describle.trim() === "") {
            setDescriptionError("Please input the description");
        } else {
            setDescriptionError("");
        }
    }

    // Age
    const WeightChange = (e) => {
        const value = e.target.value;
        setWeight(value);
    };

    const WeightBlur = () => {
        if (weight.trim() === "") {
            setWeightError("Please input the weight");
        } else {
            // const regexAge = /^[0-9]+$/;
            // if (!regexAge.test(weight)) {
            //     setAgeError("Please input only the number");
            // }
            // else if (weight <= 2 || weight >= 150) {
            //     setAgeError("Please input the age over 3 age")
            // }
            // else {
            //     setAgeError("");
            // }
            setWeightError("");
        }
    }

    // Quantity
    const QuantityChange = (e) => {
        const value = e.target.value;
        setQuantity(value);
    };

    const QuantityBlur = () => {
        if (quantity.trim() === "") {
            setQuantityError("Please input quantity")
        } else {
            const regexQuantity = /^[0-9]+$/;
            if (!regexQuantity.test(quantity)) {
                setQuantityError("Please input only the number")
            }
            else if (quantity.length >= 11) {
                setQuantityError("Please input less than 10 number")
            } else {
                setQuantityError("");
            }
        }
    }

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

    useEffect(() => {
        getDataCategory();
    }, []);

    if (accountRole === 'admin') {
        return (
            <div className="add-product-form-container container d-flex flex-column align-items-center justify-content-center col-8">
                <h3 className="mb-4 title mt-5">Add Product</h3>
                <div className="">
                    <form className="add-product-form d-flex gap-2 flex-column border p-3 col-12">
                        {/* Input Title Book */}
                        <div className="input-edit-admin">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                placeholder="Enter name"
                                name="title"
                                value={title}
                                className="form-control"
                                onChange={TitleChange}
                                onBlur={TitleBlur}
                            />
                            {titleError && (
                                <p style={{ color: "red" }}>{titleError}</p>
                            )}
                        </div>

                        {/* Input image */}
                        <div className="input-edit-admin">
                            <label className="form-label">Image</label>
                            <input
                                type="file"
                                placeholder="Enter image"
                                name="file"
                                // value={image}
                                className="form-control"
                                onChange={ImageChange}
                                onBlur={ImageBlur}
                            />
                            {imageError && (
                                <p style={{ color: "red" }}>{imageError}</p>
                            )}
                        </div>

                        {/* Input PlaceProduction */}
                        <div className="input-edit-admin">
                            <label className="form-label">Place Production</label>
                            <input
                                type="text"
                                placeholder="Enter place production of the book"
                                name="place production"
                                value={place_production}
                                className="form-control"
                                onChange={PlaceProductionChange}
                                onBlur={PlaceProductionBlur} />
                            {place_productionError && (
                                <p style={{ color: "red" }}>{place_productionError}</p>
                            )}
                        </div>

                        {/* Input category */}
                        <div className="input-edit-admin">
                            <label className="form-label">Category</label>
                            <div>
                                <select onChange={CategoryChange} onBlur={CategoryBlur} class="form-select" aria-label="Default select example">
                                    <option disabled selected>Select category</option>
                                    {category.map((cate) => (
                                        <option key={cate.idCategory} value={cate.idCategory}>
                                            {cate.name}
                                        </option>
                                    ))}
                                </select>
                                {categoryError && (
                                    <p style={{ color: "red" }}>{categoryError}</p>
                                )}
                            </div>
                        </div>

                        {/* Input Price */}
                        <div className="input-edit-admin">
                            <label className="form-label">Price</label>
                            <input
                                type="text"
                                placeholder="Enter price"
                                name="Price"
                                value={price}
                                className="form-control"
                                onChange={PriceChange}
                                onBlur={PriceBlur} />
                            {priceError && (
                                <p style={{ color: "red" }}>{priceError}</p>
                            )}
                        </div>

                        {/* Input Description */}
                        <div className="input-edit-admin">
                            <label className="form-label">Description</label>
                            <ReactQuill
                                type="text"
                                placeholder="Enter description"
                                name="Description"
                                value={describle}
                                className="form-control"
                                onChange={setDescrible}
                                onBlur={DescriptionBlur} />
                            {descriptionError && (
                                <p style={{ color: "red" }}>{descriptionError}</p>
                            )}
                        </div>

                        {/* Input Weight */}
                        <div className="input-edit-admin">
                            <label className="form-label">Weight</label>
                            <input
                                type="text"
                                placeholder="Enter weight"
                                name="weight"
                                value={weight}
                                className="form-control"
                                onChange={WeightChange}
                                onBlur={WeightBlur} />
                            {weightError && (
                                <p style={{ color: "red" }}>{weightError}</p>
                            )}
                        </div>

                        {/* Input Quantity */}
                        <div className="input-edit-admin">
                            <label className="form-label">Quantity</label>
                            <input
                                type="text"
                                placeholder="Enter quantity"
                                name="Quantity"
                                value={quantity}
                                className="form-control"
                                onChange={QuantityChange}
                                onBlur={QuantityBlur} />
                            {quantityError && (
                                <p style={{ color: "red" }}>{quantityError}</p>
                            )}
                        </div>
                    </form>

                    <div>
                        {isSubmitted && (
                            <p style={{ color: "green" }}>Create the book successfully!</p>
                        )}
                        <div className="mt-3 mb-4 d-flex justify-content-center align-items-center">
                            <Link
                                to = {'/Product2'}
                                className="button link me-2"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Create new product
                            </Link>
                            <Link
                                to = {'/Product2'}
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

export default AddProduct;