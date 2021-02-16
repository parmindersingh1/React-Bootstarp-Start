import { Redirect, Route, Switch } from "react-router-dom";

import EventCreatePageUpdated from "./event-newUpdated/EventCreatePageUpdated";
import EventsListPageUpdates from "./event-listUpdated/EventListPageUpdated";
import React from "react";
import EventEditUpdated from "./event-editUpdated/EventEditUpdated";

const EventRegistryPageUpdated = () => {
  return (
    <Switch>
      {
        /* Redirect from bookings root URL to /bookings */
        // <Redirect exact={true} from="/admin/course" to="/admin/course/list" />
      }
      <Route path="/events/edit/:id" component={EventEditUpdated} />
      <Route path="/events/new" component={EventCreatePageUpdated} />
      <Route path="/events" component={EventsListPageUpdates} />
      <Redirect exact from="/" to="/events" />
    </Switch>
  );
};

export default EventRegistryPageUpdated;
