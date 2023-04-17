import React, { Component } from "react";
import "../../assets/css/leftNavigationBar.scss";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { NAV_ITEM } from "../../utils/constant";
import { motion } from "framer-motion";

class LeftNavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <motion.div
          animate={{ width: this.props.isOpenNav ? "250px" : "auto" }}
          className="leftNavigationBar"
        >
          <div className="wrapper">
            {!this.props.user
              ? null
              : NAV_ITEM.map((item) => {
                  return item.accessRolekey.includes(
                    this.props.user.roleKey
                  ) ? (
                    <NavLink
                      to={item.path}
                      key={item.name}
                      className={({ isActive }) => {
                        return `item ${isActive ? "active" : ""}`;
                      }}
                    >
                      <div className="icon">{item.icon}</div>
                      {this.props.isOpenNav ? (
                        <div className="text">{item.name}</div>
                      ) : null}
                    </NavLink>
                  ) : null;
                })}
          </div>
        </motion.div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.app.user,
  };
};

export default connect(mapStateToProps, null)(LeftNavigationBar);
