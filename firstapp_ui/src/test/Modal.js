import React from 'react';

function Modal(props) {
  return (
    <div className="modal">
      <div className="modal-content">
        {/* Content of the modal */}
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
