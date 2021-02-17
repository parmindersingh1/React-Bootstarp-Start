import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import React, { useState, useEffect, useRef } from "react";
import SockJsClient from "react-stomp";

import SplitterTable from "./splitter-table/SplitterTable";
import { connect } from 'react-redux'
import { env } from "../../../../env";
// import { getApibyId } from "../store/apiCrud";
import { getApibyId } from "../../../../store/api-registry/apiRegistryAction";

const SplitterListPage = (props) => {
  const [splitterData, setSplitterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiId, setApiId] = useState(props.match.params.id);
  let clientRef = useRef();

  const getSplittersData = () => {
    props.getApibyId(apiId).then((res) => {
      setSplitterData([res.data]);
      console.log(res.data)
    })
    /* fetchSplittersData function Yet to be define */
    // const apiData = await getApibyId(apiId);
    // const splittersData = await fetchSplittersData()
    // setAppQueueData(splittersData.data)
    // setSplitterData([apiData.data]);
  };

  const handleStatusUpdate = (data) => {
    console.log(data); // {id, type, status}
    if(apiId === data.id )
        getSplittersData();
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
    getSplittersData();
    setLoading(false);
  }, []);

  return (
    <>
      <SockJsClient
        url={`${env.apiUrl}/ws`}
        topics={["/topic/splitter/status"]}
        onConnect={() => {
          console.log("connected to socket");
        }}
        onMessage={(msg, topic) => {
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
                    <CardTitle>Splitter Topics</CardTitle>
                    {/* <CardSubtitle>Overview of Latest Month</CardSubtitle> */}
                  </div>
                </div>
                <SplitterTable splitterData={splitterData} loading={loading} />
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

export default connect(mapStateToProps,mapActionsToProps)(SplitterListPage);
