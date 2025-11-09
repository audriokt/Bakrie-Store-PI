// src/components/productAdmin/DeleteProductModal.jsx
import React from "react";
import { Modal, Button } from "flowbite-react";
import { HiTrash } from "react-icons/hi";

const DeleteProductModal = ({ open, onClose, onConfirm, product }) => {
  return (
    <Modal show={open} size="md" popup={true} onClose={onClose}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiTrash className="mx-auto mb-4 h-14 w-14 text-red-600" />
          <h3 className="mb-5 text-lg font-normal text-gray-600">
            Apakah Anda yakin ingin menghapus{" "}
            <span className="font-semibold text-gray-800">
              {product?.name}
            </span>{" "}
            ?
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="failure"
              onClick={onConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Ya, hapus
            </Button>
            <Button
              color="gray"
              onClick={onClose}
              className="border border-gray-300 text-gray-700"
            >
              Batal
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteProductModal;
