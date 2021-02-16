import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import React, { useState } from 'react';

import JSONPretty from 'react-json-pretty';

const ApiInputModal = (props) => {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const { handleInputClose, show, previewInputData } = props;
  console.log();
  return (
    <>
      <div>
        <Modal isOpen={show} toggle={handleInputClose} size='lg'>
          <ModalHeader toggle={handleInputClose}>Input Type</ModalHeader>
          <ModalBody>
            {/* {Object.keys(previewInputData).map((it, i) => (
              <span key={i}>{it}, </span>
            ))} */}
            <span>{Object.keys(previewInputData).join(', ')}</span>
            {/* <table className='table table table-head-custom table-vertical-center no-wrap v-middle'>
              <tbody>
                {previewData.inputType &&
                  previewData.inputType.map((pData, i) => (
                    <tr key={i}>
                      <td>
                        <JSONPretty id='json-pretty' data={pData}></JSONPretty>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table> */}
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' onClick={handleInputClose}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default ApiInputModal;
