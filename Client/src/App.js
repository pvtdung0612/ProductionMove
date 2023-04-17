import { Route, Routes, Navigate } from "react-router-dom";
import React, { Component } from "react";
import Login from "./components/Sessions/Login";
import NoMatch from "./components/Sessions/NoMatch";
import DashBoard from "./components/DashBoard/DashBoard";
import { path, NAV_ITEM } from "./utils/constant";
import { connect } from "react-redux";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRouteDashboard: "",
    };
  }

  initActiveRoute = (item) => {
    // init route mặc định khi vào DashBoard
    this.setState({
      activeRouteDashboard: item.path,
    });
  };

  render() {
    return (
      <div className="App">
        <Routes>
          <Route path={path.HOME} element={<Login />} />
          <Route
            path={path.DASHBOARD}
            element={<DashBoard init={this.initActiveRoute} />}
          >
            {/* Hiển thị các chức năng theo loại account */}
            {!this.props.isLoginIn
              ? null
              : NAV_ITEM.map((item, index) => {
                  return item.accessRolekey.includes(
                    this.props.user.roleKey
                  ) ? (
                    <Route
                      path={item.path}
                      key={index}
                      element={item.component}
                    />
                  ) : null;
                })}
            {this.state.activeRouteDashboard ? (
              <Route
                index
                element={<Navigate to={this.state.activeRouteDashboard} />}
              ></Route>
            ) : null}
            <Route
              path="*"
              element={<Navigate to={this.state.activeRouteDashboard} />}
            />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.app.user,
    isLoginIn: state.app.isLoginIn,
  };
};

export default connect(mapStateToProps, null)(App);
