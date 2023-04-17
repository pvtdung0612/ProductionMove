import React, { Component } from "react";
import { connect } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import "../../assets/css/dashBoard.scss";
import Header from "./Header";
import { NAV_ITEM } from "../../utils/constant";
import { withRouter } from "../withRouter";
import LeftNavigationBar from "./LeftNavigationBar";
import * as actions from "../../store/actions/actions";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenNav: true,
    };
  }

  componentDidMount() {
    if (this.props.isLoginIn) {
      this.initActiveRoute();
    }
  }

  initActiveRoute() {
    for (const item of NAV_ITEM) {
      if (item.accessRolekey.includes(this.props.user.roleKey)) {
        this.props.init(item);
        break;
      }
    }
  }

  onToggleMenu = () => {
    this.setState({
      isOpenNav: !this.state.isOpenNav,
    });
  };

  render() {
    return this.props.isLoginIn ? (
      <div className="dashboard">
        <Header onHambugerClick={this.onToggleMenu} />
        <div className="body">
          <LeftNavigationBar isOpenNav={this.state.isOpenNav} />
          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
    ) : (
      <Navigate to={"/"} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.app.user,
    isLoginIn: state.app.isLoginIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginSuccess: (inFo) => dispatch(actions.loginSuccess(inFo)),
    logOut: () => dispatch(actions.logOut()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DashBoard));
