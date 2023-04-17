import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { connect } from "react-redux";
import { withRouter } from "../withRouter";
import * as actions from "../../store/actions/actions";
import { major } from "../../utils/constant";
import "../../assets/css/header.scss";
import { Box } from "@mui/system";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  onToggleMenuClick = () => {
    this.props.onHambugerClick();
  };

  handleProfileMenuOpen = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleMenuClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleLogout = () => {
    this.props.logOut();
    this.setState({
      anchorEl: null,
    });
    this.props.navigate("/");
  };

  render() {
    return (
      <div>
        <AppBar position="fixed" top="0px" style={{ backgroundColor: "black" }}>
          <Toolbar>
            <div className="menuHeader">
              <IconButton color="inherit" onClick={this.onToggleMenuClick}>
                <MenuIcon />
              </IconButton>
            </div>
            <div>
              <Typography variant="h6">Stock Manager</Typography>
            </div>
            <div className="profileButton">
              <IconButton
                onClick={(event) => this.handleProfileMenuOpen(event)}
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={this.state.anchorEl}
                id="menuId"
                keepMounted
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleMenuClose}
                className="drop-profile"
              >
                <Box className="info-container">
                  <div className="avatar">
                    <img
                      src={
                        this.props.user.image
                          ? this.props.user.image
                          : require("../../assets/img/avatar.jpg")
                      }
                    />
                  </div>
                  <div className="info">
                    Người dùng: {this.props.user.username}
                  </div>
                  <div className="info">
                    Chức vụ: {major[this.props.user.roleKey]}
                  </div>
                  <div className="info">
                    Nơi làm: {this.props.user.workplaceName}
                  </div>
                  <MenuItem className="action" onClick={this.handleLogout}>
                    <span>Log out</span>
                  </MenuItem>
                </Box>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
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
const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(actions.logOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
