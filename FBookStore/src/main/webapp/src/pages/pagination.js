import React, { useState } from "react";
import { BreadCrumb } from "./BreadCrumb";
import Meta from "./Meta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import AccountService from "../api/AccountService";

export const pagination = () => {
  return <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a
            className="page-link"
            aria-label="Previous"
            onClick={goToPreviousPage}
            style={{
              outline: "none",
              boxShadow: "none",
            }}
          >
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only"></span>
          </a>
        </li>

        <li class="page-item">
          <div className="pagination">
            {Array.from({
              length: totalPage,
            }).map((_, index) => (
              <span
                class={`page-link ${currentPage === index + 1 ? 'active' : ''}`}
                href="#"
                key={index}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </span>
            ))}
          </div>
        </li>

        <li class="page-item">
          <a
            className="page-link"

            aria-label="Next"
            onClick={goToNextPage}
            style={{
              outline: "none",
              boxShadow: "none",
            }}
          >
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only"></span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
};

