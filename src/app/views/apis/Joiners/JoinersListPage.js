import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import React, { useState, useEffect, useRef } from "react";
import SockJsClient from "react-stomp";

import JoinersTable from "./joiners-table/JoinersTable";
import { env } from "../../../../env";
// import { getApibyId } from "../store/apiCrud";
import { connect } from 'react-redux'
import { getApibyId } from "../../../../store/api-registry/apiRegistryAction";

const JoinersListPage = (props) => {
  const [joinerData, setJoinerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiId, setApiId] = useState(props.match.params.id);
  let clientRef = useRef();

  const getJoinersData = () => {
    /* fetchJoinersData function Yet to be define */
    props.getApibyId(apiId).then((res) => {
      setJoinerData([res.data]);
      console.log(res.data)
    })
    // const splittersData = await fetchJoinersData()
    // setAppQueueData(splittersData.data)
    // setJoinerData([apiData.data]);
  };

  const handleStatusUpdate = (data) => {
    console.log(data); // {id, type, status}
    if(apiId === data.id)
        getJoinersData();
    // const tempApiConfigs = this.state.apiConfigs.map((item) => {
    //   if (item.id === data.id) {
    //     const tempItem = { ...item };
    //     if (data.type === "API_STATUS") {
    //       tempItem.apiDeploymentStatus = data.status;
    //     } else if (data.type === "JOINER_STATUS") {
    //       tempItem.joinerDeploymentStatus = data.status;
    //     } else if (data.type === "SPLITTER_STATUS") {
    //       tempItem.splitterDeploymentStatus = data.status;
    //     }
    //     return tempItem;
    //   } else {
    //     return item;
    //   }
    // });
  };

  useEffect(() => {
    setLoading(true);
    getJoinersData();
    setLoading(false);
  }, []);

  return (
    <>
      <SockJsClient
        url={`${env.apiUrl}/ws`}
        topics={["/topic/joiner/status"]}
        onConnect={() => {
          console.log("connected to socket");
        }}
        onMessage={(msg, topic) => {
        console.log("TEST  ",msg);
          handleStatusUpdate(msg);
        }}
        ref={(client) => {
          clientRef = client;
        }}
      />
      <div>
        <Row>
          <Col sm={12}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-center">
                  <div>
                    <CardTitle>Joiner Topics</CardTitle>
                    {/* <CardSubtitle>Overview of Latest Month</CardSubtitle> */}
                  </div>
                </div>
                <JoinersTable joinerData={joinerData} loading={loading} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  api: state.api.apiRegistry,
});
const mapActionsToProps = {
  getApibyId
};

export default connect(mapStateToProps, mapActionsToProps)(JoinersListPage);
