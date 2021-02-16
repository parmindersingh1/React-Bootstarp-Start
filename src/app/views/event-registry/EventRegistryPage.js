import { Redirect, Route, Switch } from "react-router-dom";

import EventCreatePage from "./event-new/EventCreatePage";
import EventsListPage from "./event-list/EventListPage";
import React from "react";
import EventEdit from "./event-edit/EventEdit";

const EventRegistryPage = () => {
  return (
    <Switch>
      {
        /* Redirect from bookings root URL to /bookings */
        // <Redirect exact={true} from="/admin/course" to="/admin/course/list" />
      }
      <Route path="/events/edit/:id" component={EventEdit} />
      <Route path="/events/new" component={EventCreatePage} />
      <Route path="/events" component={EventsListPage} />
      <Redirect exact from="/" to="/events" />
    </Switch>
  );
};

export default EventRegistryPage;
