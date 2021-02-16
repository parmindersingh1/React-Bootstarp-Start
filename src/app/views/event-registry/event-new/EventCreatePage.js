import { Col, Row } from "reactstrap";
import React, { Component } from "react";
import { createEvent } from "../../../../store/event-registry/eventRegistryAction";
import { connect } from "react-redux";
import EventForm from "../event-form/EventForm";
import Toast from "../../../../utils/Toast";


class EventCreatePage extends Component {
  state = {
    fileLoaded: false,
    event: null,
  };

  handleSubmit = (data) => {
    this.props
      .createEvent(data)
      .then((response) => {
        console.log("response", response);
        Toast.successMsg(response.data.message);
        this.props.history.goBack();
      })
      .catch((err) => {
        console.error(err);
        Toast.errorMsg("something went wrong");
      });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <>
        <div data-test="test-event-create-update-page">
          <Row>
            <Col sm={12}>
              <div className="row mb-1">
                <div className="col-lg-12 text-right">
                  <button
                    color="danger"
                    className="btn btn-primary"
                    onClick={this.goBack}
                  >
                    <i className="feather icon-arrow-left"></i> Back
                  </button>
                </div>
              </div>
              <EventForm
                handleSubmit={this.handleSubmit}
                loading={false}
                isEdit={false}
                event={this.state.event}
                initialValues={this.initialValues}
                loadSchemaFile={this.loadSchemaFile}
                successMsg={null}
                data-test="test-EventFormUpdates-page"
              />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapActionsToProps = {
  createEvent,
};

export default connect(null, mapActionsToProps)(EventCreatePage);
