import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import CategoryService from "../../api/CategoryService";

const Edit_Category = () => {

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const { idCategory } = useParams();
    const [isSubmitted, setIsSubmitted] = useState(false);


    const getData = async (idCategory) => {
        try {
            const data = await CategoryService.getCategoryDetail(idCategory);
            setName(data.name)
            console.log("product deatail", data);
        } catch (error) {
            console.error("no product");
        }
    }

    useEffect(() => {
        getData(idCategory);
    }, [idCategory]);

    // Name change
    const NameChange = (e) => {
        const value = e.target.value;
        setName(value);
    };

    // Validation of name
    const NameBlur = () => {
        if (name.trim() === "") {
            setNameError("Please input the name of the category");
        } else {
            setNameError("");
        }
    }





    const handleSubmit = async (e) => {
        e.preventDefault();
        const isName =
            name.trim() !== "" &&
            name.length >= 2 &&
            name.length <= 200;
        if (
            isName
        ) {
            try {
                const category = {
                    idCategory,
                    name
                }
                await CategoryService.update(category);
                setIsSubmitted(true);
            } catch (error) {
                console.error("Error update category", error);
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
            <div className="main-product-wrapper my-5 py-5 home-wrapper-2 col-9">
                <div className="container-xxl col-12">
                    <div className="row col-12 px-3">
                        <div className="col-8">
                            <div className="" key={idCategory}>

                                {/* ID category start */}
                                <div className="col-12 input-edit-admin">
                                    <label className="form-label"><strong>ID of category</strong></label>
                                    <input
                                        type="text"
                                        name="id"
                                        value={idCategory}
                                        className="form-control"
                                    />
                                </div>
                                {/* ID category end */}

                                {/* Input the name of category start */}
                                <div className="mt-3 input-edit-admin">
                                    <label className="form-label"><strong>Name</strong></label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter name of category"
                                        value={name}
                                        onChange={NameChange}
                                        onBlur={NameBlur}
                                        className="form-control"
                                    />
                                    {nameError && (
                                        <p style={{ color: "red" }}>{nameError}</p>
                                    )}
                                </div>
                                {/* Input the name of category end */}

                                {/* Save start */}
                                <div>
                                    {isSubmitted && (
                                        <p style={{ color: "green" }}>Change the category successfully!</p>
                                    )}
                                    <div className="mt-3 mb-4 d-flex justify-content-center align-items-center">
                                        <button
                                            className="btn btn-warning me-2"
                                            type="submit"
                                            onClick={handleSubmit}
                                        >
                                            Save Changes
                                        </button>
                                        <Link to={'/Category'} className="btn btn-secondary  me-2">
                                            Go Back
                                        </Link>
                                    </div>
                                </div>
                                {/* Save end */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Edit_Category;