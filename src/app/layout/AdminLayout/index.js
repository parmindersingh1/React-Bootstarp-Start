import './app.scss';

import * as actionTypes from "../../../store/layout/actions";

import React, { Component, Suspense } from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import Aux from "../../../hoc/_Aux";
import Breadcrumb from './Breadcrumb';
import Fullscreen from "react-full-screen";
import Loader from "../Loader";
import NavBar from './NavBar';
import Navigation from './Navigation';
import {connect} from 'react-redux';
import routes from "../../../routes";
import windowSize from 'react-window-size';

class AdminLayout extends Component {

    fullScreenExitHandler = () => {
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            this.props.onFullScreenExit();
        }
    };

    componentWillMount() {
        if (this.props.windowWidth > 992 && this.props.windowWidth <= 1024 && this.props.layout !== 'horizontal') {
            this.props.onComponentWillMount();
        }
    }

    mobileOutClickHandler() {
        if (this.props.windowWidth < 992 && this.props.collapseMenu) {
            this.props.onComponentWillMount();
        }
    }

    render() {

        /* full screen exit call */
        document.addEventListener('fullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('webkitfullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('mozfullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('MSFullscreenChange', this.fullScreenExitHandler);

        const menu = routes.map((route, index) => {
            return (route.component) ? (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                        <route.component {...props} />
                    )} />
            ) : (null);
        });

        return (
            <Aux>
                <Fullscreen enabled={this.props.isFullScreen}>
                    <Navigation />
                    <NavBar />
                    <div className="pcoded-main-container" onClick={() => this.mobileOutClickHandler}>
                        <div className="pcoded-wrapper">
                            <div className="pcoded-content">
                                <div className="pcoded-inner-content">
                                    <Breadcrumb />
                                    <div className="main-body">
                                        <div className="page-wrapper">
                                            <Suspense fallback={<Loader/>}>
                                                <Switch>
                                                    {menu}
                                                    <Redirect from="/" to={this.props.defaultPath} />
                                                </Switch>
                                            </Suspense>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fullscreen>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        defaultPath: state.layout.defaultPath,
        isFullScreen: state.layout.isFullScreen,
        collapseMenu: state.layout.collapseMenu,
        configBlock: state.layout.configBlock,
        layout: state.layout.layout
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFullScreenExit: () => dispatch({type: actionTypes.FULL_SCREEN_EXIT}),
        onComponentWillMount: () => dispatch({type: actionTypes.COLLAPSE_MENU})
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (windowSize(AdminLayout));