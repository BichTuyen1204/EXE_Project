import React from "react";
import Book4 from "../images/Book4.png";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

export const SpecialProduct = () => {
  return (
    <div className="col-6 mb-3">
      <div className="special-product-card">
        <div className="d-flex justify-content-between">
          <div>
            <img className="img-special-book" src={Book4} />
          </div>
          <div className="special-product-content">
            <h5 className="brand">Naruto</h5>
            <h6 className="title">Naruto so cute.....</h6>
            <ReactStars
              count={5}
              size={24}
              value="3"
              edit={false}
              activeColor="#ffd700"
            />
            <p className="price">
              <span className="red-p">$9999</span> <strike>$99</strike>
            </p>
            <div className="discount-till d-flex align-items-center gap-10">
              <p className="mb-0">
                <b>5</b>days
              </p>
              <div className="d-flex gap-10 align-items-center">
                <span className="badge rounded-circle p-3 bg-danger">1</span>:
                <span className="badge rounded-circle p-3 bg-danger">1</span>:
                <span className="badge rounded-circle p-3 bg-danger">1</span>
              </div>
            </div>
            <div className="prod-count my-3">
                <p>Products: 5</p>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style= {{ width: "25%" }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <Link className="button mt-2 link">Add to Cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
