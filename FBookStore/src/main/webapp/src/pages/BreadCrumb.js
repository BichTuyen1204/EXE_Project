import React from 'react'
import { Link } from 'react-router-dom';

export const BreadCrumb = (props) => {
    const { title } = props;
  return (
    <div className='breadcrumb mb-0 py-4'>
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <p className='test-strong'>
                        <Link to="/" className='text-dark link'>
                            Trang chủ
                        </Link>
                        / {title}
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}
