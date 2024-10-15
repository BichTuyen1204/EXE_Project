import React, { useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

function PopupOrder({ show, onHide, onConfirmOrder }) {
    return (
        <div>
            <td>
                <Modal
                    show={show}
                    onHide={onHide}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Xác nhận đơn hàng
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                        Bạn có chắc chắn muốn đặt hàng không?
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>Hủy bỏ</Button>
                        
                        <Button variant="danger" onClick={() => {
                            onConfirmOrder();
                            onHide();
                        }}>Đặt Hàng</Button>
                       
                        
                    </Modal.Footer>
                </Modal>
        </td>
        </div >
    );
}

export default PopupOrder;