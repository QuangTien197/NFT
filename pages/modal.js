import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import Style from "../components/Error/Error.module.css";

import { Modal, Button } from 'react-bootstrap';
const Modals = () => {
 
  const [isOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>

      <Modal show={isOpen} onHide={closeModal} centered className={Style.modal} >
        <div className={Style.modal_box}>
        <Modal.Header closeButton >
                <Modal.Title>Thêm điều kiện lọc</Modal.Title>
              </Modal.Header>
              <Modal.Body >
                <label htmlFor="bootstrapSelect">KHÁCH HÀNG <b className="text-danger">*</b>:</label>
               
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                  Đóng
                </Button>
              </Modal.Footer>
        </div>
              
            </Modal>
    </div>
  );
}
export default Modals;
