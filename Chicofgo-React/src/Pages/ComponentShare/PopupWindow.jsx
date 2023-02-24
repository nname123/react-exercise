import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PopupWindow(props) {
  return (
    <>
      <Modal className="chicofgo-font" show={props.show} onHide={props.show}>
        <Modal.Header>
          <Modal.Title className="chicofgo-font-700">{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.content}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-chicofgo-green" onClick={props.onclose}>
            {props.btnContent}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopupWindow;
