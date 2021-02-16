import { Col, Row } from "reactstrap";
import React, { useEffect, useState } from "react";
import {
  getEventbyId,
  updateEvent,
} from "../../../_redux/event-registry/eventRegistryAction";
import { connect } from "react-redux";

import EventFormUpdated from "../event-formUpdated/EventFormUpdated";
import Toast from "../../../utils/Toast";

const EventEditPage = (props) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [eventId] = useState(props.match && props.match.params.id);

  useEffect(() => {
    setLoading(true);
    props.getEventbyId(eventId).then((response) => {
      setEvent(response.data);
      setLoading(false);
    });
  }, [eventId]);

  const goBack = () => {
    props.history.goBack();
  };

  const handleSubmit = async (data) => {
    console.log("data", data);
    // const tags = data.tags.map((st) => st.value);
    try {
      await props.updateEvent(
        eventId,
        {
          ...data,
          filePath: event.filePath,
          tags: data.tags.map((tag) =>
            typeof tag === "string" ? tag : tag.value
          ),
        },
        eventId
      );
      Toast.successMsg("Event Registry updated successfully");
      goBack();
    } catch (err) {
      console.error(err);
      Toast.errorMsg("something went wrong");
    }
  };

  return (
    <div data-test="test-event-edit-updated-page">
      <Row>
        <Col sm={12}>
          <div className="row mb-1">
            <div className="col-lg-12 text-right">
              <button
                color="danger"
                className="btn btn-primary"
                onClick={goBack}
              >
                <i className="ti ti-arrow-left"></i> Back
              </button>
            </div>
          </div>
          {event && (
            <EventFormUpdated
              data-test="test-edit-event"
              event={props.events}
              handleSubmit={handleSubmit}
              loading={loading}
              isEdit={true}
              successMsg={null}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  events: state.events.eventRegistry,
});
const mapActionsToProps = {
  getEventbyId,
  updateEvent,
};

export default connect(mapStateToProps, mapActionsToProps)(EventEditPage);
