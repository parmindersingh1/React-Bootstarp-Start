import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import React, { Component } from 'react';
import { deleteApiData, fetchConfigs } from '../store/apiCrud';

import ApiInputModal from './apis-modal/ApiInputModal';
import ApiOutputModal from './apis-modal/ApiOutputModal';
import ApisListTable from './apis-table/ApisListTable';
import { Link } from 'react-router-dom';
import SockJsClient from 'react-stomp';
import Toast from '../../../../utils/Toast';
import { env } from '../../../../env';

class ApisListPage extends Component {
  state = {
    apiConfigs: [],
    loading: false,
    previewInputData: [],
    previewOutputData: [],
    showInputType: false,
    showOutputType: false,
  };
  componentDidMount() {
    this.setState({ loading: true });
    fetchConfigs().then((response) => {
      try {
        console.log('fetchConfigs', response.data);
      this.setState({ apiConfigs: response.data });
      this.setState({ loading: false });
      } catch (error) {
        console.log(error)
      }
      
    });
  }

  refreshContent = () => {
    this.setState({ loading: true });
    fetchConfigs().then((response) => {
      console.log('fetchRefreshConfigs', response.data);
      this.setState({ apiConfigs: response.data });
      this.setState({ loading: false });
    });
  }

  handleStatusUpdate = (apiData) => {
    console.log(apiData); // {id, type, status}
    const tempApiConfigs = this.state.apiConfigs.map((item) => {
      if (item.id === apiData.id) {
        const tempItem = { ...apiData };
        // if (apiData.type === "API_STATUS") {
        //   tempItem.apiDeploymentStatus = apiData.status;
        // } else if (apiData.type === "JOINER_STATUS") {
        //   tempItem.joinerDeploymentStatus = apiData.status;
        // } else if (apiData.type === "SPLITTER_STATUS") {
        //   tempItem.splitterDeploymentStatus = apiData.status;
        // }
        return tempItem;
      } else {
        return item;
      }
    });
    this.setState({ apiConfigs: tempApiConfigs });
  };

  onEditApi = (id) => {
    this.props.history.push(`/apis/edit/${id}`);
  };

  handleApiInput = (values) => {
    console.log('data', values);
    this.setState({ previewInputData: values });
    console.log(this.state.previewInputData);
    this.setState({ showInputType: true });
  };

  handleInputClose = () => {
    this.setState({ showInputType: false });
  };

  handleApiOutput = (values) => {
    console.log('data', values);
    this.setState({ previewOutputData: values });
    console.log(this.state.previewOutputData);
    this.setState({ showOutputType: true });
  };
  handleOutputClose = () => {
    this.setState({ showOutputType: false });
  };

  onDeleteApi = (id) => {
    try {
      deleteApiData(id).then((response) => {
        console.log(response.data);
        Toast.successMsg('Api Deleted successfully');
        fetchConfigs().then((response) => {
          this.setState({ apiConfigs: response.data });
          this.setState({ loading: false });
        });
      });
    } catch (error) {
      Toast.errorMsg('something went wrong');
    }
  };

  render() {
    return (
      <>
        <SockJsClient
          url={`${env.apiUrl}/ws`}
          topics={[
            '/topic/api/status',
            '/topic/joiner/status',
            '/topic/splitter/status',
          ]}
          onConnect={() => {
            console.log('connected to socket');
          }}
          onMessage={(msg, topic) => {
            this.handleStatusUpdate(msg);
          }}
          ref={(client) => {
            this.clientRef = client;
          }}
        />
        <div>
          <Row>
            <Col sm={12}>
              <div className='row mb-1 '>
                <div className='col-lg-12 text-right'>
                  <Link
                    color='primary'
                    className='btn btn-primary'
                    to='/apis/new'
                  >
                   <i className="feather icon-plus"></i> Add Api
                  </Link>
                  <button
                    color='primary'
                    className='btn btn-primary ml-2'
                    onClick={this.refreshContent}
                  >
                   <i className="feather icon-refresh-cw"></i> Refresh
                  </button>
                </div>
              </div>
              <Card>
                <CardBody>
                  <div className='d-flex align-items-center'>
                    <div>
                      <CardTitle>Apis</CardTitle>
                      {/* <CardSubtitle>Overview of Latest Month</CardSubtitle> */}
                    </div>
                  </div>
                  <ApisListTable
                    apiConfigs={this.state.apiConfigs}
                    loading={this.state.loading}
                    onDeleteApi={this.onDeleteApi}
                    onEditApi={this.onEditApi}
                    handleApiInput={this.handleApiInput}
                    handleApiOutput={this.handleApiOutput}
                  />
                  {this.state.showInputType && (
                    <ApiInputModal
                      show={this.state.showInputType}
                      handleInputClose={this.handleInputClose}
                      previewInputData={this.state.previewInputData}
                    />
                  )}
                  {this.state.showOutputType && (
                    <ApiOutputModal
                      show={this.state.showOutputType}
                      handleOutputClose={this.handleOutputClose}
                      previewOutputData={this.state.previewOutputData}
                    />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default ApisListPage;
