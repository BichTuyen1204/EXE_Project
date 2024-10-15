import React, { useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap';

function DeleteBanner({ show, onHide, onConfirmDelete }) {
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
                            Confirm Delete
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Are you sure you want to delete this banner?
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>Cancel</Button>
                        <Button variant="danger" onClick={onConfirmDelete}>OK</Button>
                    </Modal.Footer>
                </Modal>
            </td>
        </div >
    );
}

export default DeleteBanner;