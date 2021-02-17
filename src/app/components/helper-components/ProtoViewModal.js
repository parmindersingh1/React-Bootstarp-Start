import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'
import JSONPretty from "react-json-pretty";
import Toast from "../../../utils/Toast";
import { getProtoDef } from "../../../store/api-registry/apiRegistryAction";

const ProtoViewModal = ({ handleClose, show, protoType,getProtoDef }) => {
  const [protoData, setProtoData] = useState("");

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  useEffect(() => {
    getProtoDef(protoType)
      .then((response) => {
        console.log("response", response);
        setProtoData(response.data);
      })
      .catch((err) => {
        Toast.errorMsg(err.response.data.message);
      });
  }, [protoType]);

  return (
    <>
      <div>
        <Modal isOpen={show} toggle={handleClose} size="lg">
          <ModalHeader toggle={handleClose}>ProtoBuf Definition</ModalHeader>
          <ModalBody>
            <p>
              <strong>{protoType}</strong> :
            </p>
            <div style={{ overflow: "scroll" }}>
              <JSONPretty id="json-pretty" data={protoData}></JSONPretty>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};


const mapActionsToProps = {
  getProtoDef
};

export default connect(null, mapActionsToProps)(ProtoViewModal);
