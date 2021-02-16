import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import React, { useState } from 'react';

import JSONPretty from 'react-json-pretty';

const ApiOutputModal = (props) => {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const { handleOutputClose, show, previewOutputData } = props;

  return (
    <>
      <div>
        <Modal isOpen={show} toggle={handleOutputClose} size='lg'>
          <ModalHeader toggle={handleOutputClose}>Output Type</ModalHeader>
          <ModalBody>
            {/* {previewOutputData.map((ot, i) => (
              <span key={i}>{ot}, </span>
            ))} */}
            <span>{previewOutputData.join(', ')}</span>
            {console.log("previewOutputData",previewOutputData)}
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
            <Button color='secondary' onClick={handleOutputClose}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default ApiOutputModal;
