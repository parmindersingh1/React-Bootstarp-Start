import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import React, { Component } from "react";
import {
  deleteEventData,
  getAllEvents,
} from "../../../../store/event-registry/eventRegistryAction";
import { connect } from "react-redux";
import EventsListTable from "./events-table/EventsListTable";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Toast from "../../../../utils/Toast";

class EventListPage extends Component {
  state = {
    eventRegistries: [],
    loading: false,
  };
  componentDidMount() {
    this.setState({ loading: true });
    this.props.getAllEvents();

    // this.setState({ loading: false });
  }
  refreshContent = () => {
    this.setState({ loading: true });
    getAllEvents().then((response) => {
      console.log("fetchRefreshRegistries", response.data);
      this.setState({ eventRegistries: response.data, loading: false });
      // this.setState({ loading: false });
    });
  };
  componentDidUpdate(prevProps) {
    if (prevProps.events !== this.props.events) {
      this.setState({
        eventRegistries: this.props.events,
        loading: false,
      });
    }
  }

  onEditEventRegistry = (id) => {
    this.props.history.push(`/events/edit/${id}`);
    // console.log(id);
  };

  onDeleteEventRegistry = (id) => {
    Swal.fire({
      title: "Do you want to delete?",
      showCancelButton: true,
      confirmButtonText: `Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          this.setState({ loading: true });
          this.props.deleteEventData(id);
          Toast.successMsg("Event Deleted successfully");
          this.props.getAllEvents();
          this.setState({ eventRegistries: this.props.events, loading: false });
          // this.setState({ loading: false });
        } catch (error) {
          console.log(error);
          Toast.errorMsg("something went wrong");
          this.setState({ loading: false });
        }
      }
    });
  };

  render() {
    return (
      <>
        <div data-test="EventsListPage">
          <Row>
            <Col sm={12}>
              <div className="row mb-1">
                <div className="col-lg-12 text-right">
                  <Link
                    color="primary"
                    className="btn btn-primary"
                    to="/events/new"
                  >
                    <i className="feather icon-plus"></i> Add Event
                  </Link>
                  <button
                    color="primary"
                    className="btn btn-primary ml-2"
                    onClick={this.refreshContent}
                  >
                    <i className="feather icon-refresh-cw"></i> Refresh
                  </button>
                </div>
              </div>
              <Card>
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div>
                      <CardTitle>Event Registries</CardTitle>
                      {/* <CardSubtitle>Overview of Latest Month</CardSubtitle> */}
                    </div>
                  </div>
                  <EventsListTable
                    eventRegistries={this.state.eventRegistries}
                    loading={this.state.loading}
                    onDeleteEventRegistry={this.onDeleteEventRegistry}
                    onEditEventRegistry={this.onEditEventRegistry}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  // loading: state.simulations.loading,
  // error: state.simulations.error,
  // events: state.events.events,
});

const mapActionsToProps = {
  getAllEvents,
  deleteEventData,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(EventListPage);
