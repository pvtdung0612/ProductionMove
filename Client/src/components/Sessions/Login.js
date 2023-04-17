import React, { Component } from "react";
import { withRouter } from "../withRouter";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";
import { login } from "../../api/manager";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      apiLoading: false,
      err: null,
      isShowPassword: false,
    };
  }

  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleOnClick = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleLoginSuccess = async (res) => {
    await this.props.loginSuccess(res);
    await this.props.navigate("/dashboard");
  };

  onSubmit = () => {
    this.setState({
      apiLoading: true,
      err: "",
    });
    login(this.state.username, this.state.password)
      .then((res) => {
        if (res.error) throw res.error;
        if (res.errCode !== 0) {
          this.setState({
            err: res.message,
          });
        }
        if (res.errCode === 0) {
          this.handleLoginSuccess(res);
        }
      })
      .catch((err) => {
        this.setState({
          err: err.message,
        });
      })
      .finally(() => {
        this.setState({
          apiLoading: false,
        });
      });
  };

  render() {
    return !this.props.isLoginIn ? (
      <div className="containerLogin">
        <div className="contentLogin">
          <div className="login-layout">
            <h1 className="login-heading">Login</h1>
            <form className="form">
              <div className="main">
                <input
                  type="text"
                  required
                  id="outlined-basic"
                  value={this.state.username}
                  onChange={(event) => this.handleOnChangeUsername(event)}
                />
                <span></span>
                <label>Username</label>
              </div>
              <div className="main">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  required
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangePassword(event)}
                />
                <span></span>
                <label>Password</label>
                <div className="custom">
                  <FontAwesomeIcon
                    icon={this.state.isShowPassword ? faEye : faEyeSlash}
                    onClick={this.handleOnClick}
                  />
                </div>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className="buttonLogin"
                  style={{
                    backgroundColor: "#ff4d4d",
                  }}
                  onClick={() => this.onSubmit()}
                >
                  {this.state.apiLoading ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </form>
            <p style={{ textAlign: "center", color: "red" }}>
              {this.state.err ? this.state.err : <br />}
            </p>
          </div>
        </div>
      </div>
    ) : (
      <Navigate to={"/dashboard"} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginIn: state.app.isLoginIn,
    user: state.app.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginSuccess: (inFo) => dispatch(actions.loginSuccess(inFo)),
    // loginFail: () => dispatch(actions.loginFail)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
