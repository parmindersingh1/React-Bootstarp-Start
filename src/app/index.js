import "../../node_modules/font-awesome/scss/font-awesome.scss";

import React, { Component, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import Aux from "../hoc/_Aux";
import Loadable from "react-loadable";
import Loader from "./layout/Loader";
import ScrollToTop from "./layout/ScrollToTop";
import { connect } from "react-redux";
import { loading } from "../store/loader/actions";
import routes from "../routes/route";

const AdminLayout = Loadable({
  loader: () => import("./layout/AdminLayout"),
  loading: Loader,
});

class App extends Component {
  render() {
    const menu = routes.map((route, index) => {
      return route.component ? (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          name={route.name}
          render={(props) => <route.component {...props} />}
        />
      ) : null;
    });

    return (
      <Aux>
        {this.props.loader ? <Loader /> : null}
        <ScrollToTop>
          <Suspense fallback={<Loader />}>
            <Switch>
              {menu}
              <Route path="/" component={AdminLayout} />
            </Switch>
          </Suspense>
        </ScrollToTop>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loader: state.loader,
  };
};

const mapActionsToProps = {
  loading,
};

export default connect(mapStateToProps, mapActionsToProps)(App);
