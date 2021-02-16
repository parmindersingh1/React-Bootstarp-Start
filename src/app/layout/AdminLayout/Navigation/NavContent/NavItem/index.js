import * as actionTypes from "../../../../../../store/layout/actions";

import React, {Component} from 'react';

import Aux from "../../../../../../hoc/_Aux";
import NavBadge from "../NavBadge";
import NavIcon from "../NavIcon";
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import windowSize from 'react-window-size';
import {withRouter} from 'react-router-dom';

class NavItem extends Component {

    render() {
        let itemTitle = this.props.item.title;
        if (this.props.item.icon) {
            itemTitle = <span className="pcoded-mtext">{this.props.item.title}</span>;
        }

        let itemTarget = '';
        if (this.props.item.target) {
            itemTarget = '_blank';
        }

        let subContent;
        if(this.props.item.external) {
            subContent = (
                <a href={this.props.item.url} target='_blank' rel='noopener noreferrer'>
                    <NavIcon items={this.props.item}/>
                    {itemTitle}
                    <NavBadge layout={this.props.layout} items={this.props.item}/>
                </a>
            );
        } else {
            subContent = (
                <NavLink to={this.props.item.url} className="nav-link" exact={true} target={itemTarget}>
                    <NavIcon items={this.props.item}/>
                    {itemTitle}
                    <NavBadge layout={this.props.layout} items={this.props.item}/>
                </NavLink>
            );
        }
        let mainContent = '';
        if (this.props.layout === 'horizontal') {
            mainContent = (
                <li onClick={this.props.onItemLeave}>{subContent}</li>
            );
        } else {
            if (this.props.windowWidth < 992) {
                mainContent = (
                    <li className={this.props.item.classes} onClick={this.props.onItemClick}>{subContent}</li>
                );
            } else {
                mainContent = (
                    <li className={this.props.item.classes}>{subContent}</li>
                );
            }
        }

        return (
            <Aux>
                {mainContent}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        layout: state.layout.layout,
        collapseMenu: state.layout.collapseMenu
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onItemClick: () => dispatch({type: actionTypes.COLLAPSE_MENU}),
        onItemLeave: () => dispatch({type: actionTypes.NAV_CONTENT_LEAVE})
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (windowSize(NavItem)));
