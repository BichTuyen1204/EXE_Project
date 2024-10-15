import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import ProductService from "../../api/ProductService";
import { useParams } from "react-router-dom";
import CategoryService from "../../api/CategoryService";
import ReactQuill from "react-quill";

import "../../css/Style.css";
const EditProduct = () => {

    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState('');
    const [imageName, setImageName] = useState('');
    const [imageError, setImageError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [place_production, setPlaceProduction] = useState('');
    const [place_productionError, setPlaceProductionError] = useState('');
    const [price, setPrice] = useState('');
    const [priceError, setPriceError] = useState('');
    const [describle, setDescrible] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [weight, setWeight] = useState('');
    const [weightError, setWeightError] = useState('');
    const [quantity, setQuantity] = useState('');
    const [quantityError, setQuantityError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { idBook } = useParams();
    const [categoryId, setCategoryId] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    const [categoryError, setCategoryError] = useState('');

    const getDataCategory = async () => {
        try {
            const dataCategory = await CategoryService.getAllCategory();
            setCategoryList(dataCategory);
            console.log("category", dataCategory);
        }
        catch (error) {
            console.log("Failed")
        }
    }

    const getData = async (idBook) => {
        try {
            const data = await ProductService.getProductDetail(idBook);
            getDataCategory();
            setTitle(data.title)
            setImageName(data.image)
            setPlaceProduction(data.place_production)
            setCategoryId(data.category.idCategory)
            setPrice(data.price)
            setDescrible(data.describle)
            setWeight(data.weight)
            setQuantity(data.quantity)
            console.log("product deatail", data);
        } catch (error) {
            console.error("no product");
        }
    }

    useEffect(() => {
        getData(idBook);
    }, [idBook]);


    const TitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
    };

    const TitleBlur = () => {
        if (title.trim() === "") {
            setTitleError("Please input the name of the book");
        } else {
            setTitleError("");
        }
    }

    const ImageChange = async (e) => {
        const formData = new FormData();
        formData.append('idBook', idBook);
        formData.append('file', e.target.files[0]);

        try {
            console.log("no toi day")
            await ProductService.updateImage(formData);
            getData(idBook);
        } catch (error) {
            console.log("test update image", error)
        }
    };

    const CategoryChange = (e) => {
        const value = e.target.value;
        setCategoryId(value);
    };

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

    // Price
    const PriceChange = (e) => {
        const value = e.target.value;
        setPrice(value);
    };

    const PriceBlur = () => {
        const regexPrice = /^[0-9]+$/;
        if (!regexPrice.test(price)) {
            setPriceError("Please input only the number");
        } else if (price.length > 8) {
            setPriceError("Please input less than 8 numbers");
        } else {
            setPriceError("");
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

    // Weight
    const WeightChange = (e) => {
        const value = e.target.value;
        setWeight(value);
    };

    const WeightBlur = () => {
        const regexWeight = /^[0-9]+$/;
        if (!regexWeight.test(weight)) {
            setWeightError("Please input only the number");
        }
        else if (weight <= 2 || weight >= 150) {
            setWeightError("Please input the age over 3 age")
        }
        else {
            setWeightError("");
        }
    }

    // Quantity
    const QuantityChange = (e) => {
        const value = e.target.value;
        setQuantity(value);
    };

    const QuantityBlur = () => {
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

        const isPrice =
            price !== "";

        const isDescription =
            describle.trim() !== "";

        const isWeight =
            weight !== "";

        const isQuantity =
            quantity !== "";

        if (
            isTitle &&
            isPlaceProduction &&
            isPrice &&
            isDescription &&
            isWeight &&
            isQuantity
        ) {
            try {
                // Make an API call to update the product with the modified data
                const image = imageName;

                const category = categoryList.find(cate => cate.idCategory == categoryId)

                const product = {
                    idBook,
                    title,
                    image,
                    place_production: place_production,
                    category,
                    price,
                    describle,
                    weight: weight,
                    quantity
                }
                await ProductService.update(product);
                console.log("OK ROI");
                setIsSubmitted(true);
            } catch (error) {
                console.error("Error updating product", error);
            }
            setTimeout(() => {
                setIsSubmitted(false);
            }, 20000);
        } else {
            alert("Please fill in complete and correct information");
        }
    };

    return (
        <div className="add-product-form-container container d-flex flex-column align-items-center justify-content-center">
            <h3 className="mb-4 title mt-5">Edit Product</h3>
            <div className="main-product-wrapper my-5 py-5 col-9 box">
                <div className="container-xxl col-12">
                    <div className="row col-12 px-3">
                        <div className="col-4">
                            <div className="col-12 img-product-card-2 product-details">
                                <div className="img-edit-product">
                                    <img
                                        className="img-product-card-general"
                                        src={`http://localhost:8090/${imageName}`}
                                    />
                                </div>
                                {/* Input image */}
                                <div className="mt-3">
                                    <input
                                        type="file"
                                        id="imageUpload"
                                        style={{ display: 'none' }}
                                        name="file"
                                        className="form-control"
                                        onChange={ImageChange}
                                    />
                                    {imageError && (
                                        <p style={{ color: "red" }}>{imageError}</p>
                                    )}
                                </div>
                                <div className="text-center">
                                    <button
                                        type="button"
                                        className="btn-edit-img px-3 py-1"
                                        onClick={() => document.getElementById('imageUpload').click()}
                                    >
                                        Update Image
                                    </button>
                                </div>

                            </div>
                        </div>
                        <div className="col-8">
                            <div className="" key={idBook}>
                                {/* Input Title Book */}
                                <div className="col-12 input-edit-admin">
                                    <label className="form-label"><strong>ID</strong></label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={idBook}
                                        className="form-control"
                                    />
                                </div>

                                <div className="mt-3 input-edit-admin">
                                    <label className="form-label"><strong>Name</strong></label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Enter name"
                                        value={title}
                                        onChange={TitleChange}
                                        onBlur={TitleBlur}
                                        className="form-control"
                                    />
                                    {titleError && (
                                        <p style={{ color: "red" }}>{titleError}</p>
                                    )}
                                </div>

                                {/* Input place_production */}
                                <div className="mt-3 input-edit-admin">
                                    <label className="form-label"><strong>Place Production</strong></label>
                                    <input
                                        type="text"
                                        name="place_production"
                                        placeholder="Enter place production"
                                        value={place_production}
                                        onChange={PlaceProductionChange}
                                        onBlur={PlaceProductionBlur}
                                        className="form-control"
                                    />
                                    {place_productionError && (
                                        <p style={{ color: "red" }}>{place_productionError}</p>
                                    )}
                                </div>

                                {/* Input category */}
                                <div className="mt-3 input-edit-admin">
                                    <label className="form-label"><strong>Category</strong></label>
                                    <div>
                                        <select onChange={CategoryChange} value={categoryId} class="form-select" aria-label="Default select example">
                                            {categoryList.map((cate) => (
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
                                <div className="mt-3 input-edit-admin">
                                    <label className="form-label"><strong>Price</strong></label>
                                    <input
                                        type="text"
                                        name="price"
                                        placeholder="Enter price"
                                        value={price}
                                        onChange={PriceChange}
                                        onBlur={PriceBlur}
                                        className="form-control"
                                    />
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
                                <div className="mt-3 input-edit-admin">
                                    <label className="form-label"><strong>Weight</strong></label>
                                    <input
                                        type="text"
                                        name="weight"
                                        placeholder="Enter weight"
                                        value={weight}
                                        onChange={WeightChange}
                                        onBlur={WeightBlur}
                                        className="form-control" />
                                    {weightError && (
                                        <p style={{ color: "red" }}>{weightError}</p>
                                    )}
                                </div>

                                {/* Input Quantity */}
                                <div className="mt-3 input-edit-admin">
                                    <label className="form-label"><strong>Quantity</strong></label>
                                    <input
                                        type="text"
                                        name="quantity"
                                        placeholder="Enter quantity"
                                        value={quantity}
                                        onChange={QuantityChange}
                                        onBlur={QuantityBlur}
                                        className="form-control"
                                    />
                                    {quantityError && (
                                        <p style={{ color: "red" }}>{quantityError}</p>
                                    )}
                                </div>


                                <div>
                                    {isSubmitted && (
                                        <p style={{ color: "green" }}>Change the book successfully!</p>
                                    )}
                                    <div className="mt-3 mb-4 d-flex justify-content-center align-items-center">
                                        <button
                                            className="btn-submit me-2"
                                            type="submit"
                                            onClick={handleSubmit}
                                        >
                                            Save Changes
                                        </button>
                                        <Link to={'/Product2'} className="btn btn-secondary">
                                            Go Back
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EditProduct;