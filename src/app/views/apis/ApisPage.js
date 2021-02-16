import { Redirect, Route, Switch } from 'react-router-dom';

import ApiCreatePage from './ApiCreate/ApiCreatePage';
import ApisListPage from './ApisList/ApisListPage';
// import MetaListPage from './MetaQueueList/MetaListPage';
// import ApplicationListPage from './ApplicationQueueList/ApplicationListPage';
import React from 'react';
import JoinersListPage from './Joiners/JoinersListPage';
import SplitterListPage from './Splitters/SplitterListPage';
import ApiEditPage from './ApiEdit/ApiEditPage';
// import SimulatorListPage from './Simulator/SimulatorListPage';
// import SimulatorCreatePage from './Simulator/simulator-create/SimulatorCreatePage';
// import ViewSimulatorListPage from './Simulator/view-simulator/ViewSimulatorListPage';
// import ViewSimulatorMessageList from './Simulator/view-simulator/ViewSimulatorMessage/ViewSimulatorMessageList';
// import ViewSimulatorTopicList from './Simulator/view-simulator/ViewSimulatorTopics/ViewSimulatorTopicList';
import ApiNewpage from './apis-new/ApiNewpage';

const ApisPage = () => {
  return (
    <Switch>
      {
        /* Redirect from bookings root URL to /bookings */
        // <Redirect exact={true} from="/admin/course" to="/admin/course/list" />
      }
      <Route path='/apis/new' component={ApiNewpage} />
      <Route path='/apis/edit/:id' component={ApiEditPage} />
      {/* <Route path='/apis/meta' component={MetaListPage} /> */}
      {/* <Route path='/apis/application' component={ApplicationListPage} /> */}
      <Route path='/apis/:id/joiners' component={JoinersListPage} />
      <Route path='/apis/:id/splitters' component={SplitterListPage} />
      {/* <Route path='/apis/simulator/new' component={SimulatorCreatePage} /> */}
      {/* <Route
        path='/apis/simulator/view/:id/message'
        component={ViewSimulatorMessageList}
      />
      <Route
        path='/apis/simulator/view/:id/topic'
        component={ViewSimulatorTopicList}
      />
      <Route
        path='/apis/simulator/view/:id'
        component={ViewSimulatorListPage}
      />

      <Route path='/apis/simulator' component={SimulatorListPage} /> */}
      <Route path='/apis' component={ApisListPage} />
      <Redirect exact from='/' to='/apis' />
    </Switch>
  );
};

export default ApisPage;
