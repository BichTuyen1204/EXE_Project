import React, { useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap';

function ShowInforCategory({ show, onHide }) {
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
                            Sorry
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            You can't delete this category !
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>Go back</Button>
                    </Modal.Footer>
                </Modal>
            </td>
        </div >
    );
}

export default ShowInforCategory;