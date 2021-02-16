import Loader from "../../Loader";
import React from "react";
import { connect } from "react-redux";

const LoadingSplashScreen = (props) => {
  return <>{props.loader ? <Loader /> : null}</>;
};
const mapStateToProps = (state) => {
  return {
    loader: state.loader,
  };
};

export default connect(mapStateToProps)(LoadingSplashScreen);
