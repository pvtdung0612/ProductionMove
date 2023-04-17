import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import { receiveErrorProduct } from "../../../api/manager";
import ToastMessage from "../../Toast/ToastMessage";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";

class DialogRemove extends Component {
  constructor(props) {
    super(props);
    this.state = { errServer: null, openToast: false };
  }
  timerID = null;
  handleSubmitForm = async () => {
    const payload = this.props.item.id;
    clearTimeout(this.timerID);
    this.timerID = null;
    await receiveErrorProduct(payload).then((res) => {
      //Thành công, gửi thông điệp khi update
      if (res.errCode === -1) this.props.logOut();
      else if (res.errCode === 0) this.props.onUpdateSuccess(res.message);

      // Lỗi phía server
      if (res.errCode === 1) {
        this.setState({
          errServer: res.message,
          timerID: setTimeout(this.handleToast, 3000),
        });
        this.handleToast();
        this.timerID = setTimeout(this.handleToast, 3000);
      }
    });
  };
  handleCloseToast = () => {
    clearTimeout(this.timerID);
    this.handleToast();
  };
  handleToast = () => {
    this.setState({ openToast: !this.state.openToast });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Nhận sản phẩm về cơ sở sản xuất
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Sản phẩm: {this.props.item.name} <br />
              ID: {this.props.item.id}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.handleClose()} color="primary">
              Disagree
            </Button>
            <Button
              onClick={() => this.handleSubmitForm()}
              color="primary"
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>

        {/* Bật thông báo */}
        {this.state.openToast ? (
          <Dialog open={this.state.openToast}>
            {this.state.errServer ? (
              <ToastMessage
                type="warning"
                message={this.state.errServer}
                onClose={this.handleCloseToast}
              />
            ) : null}
          </Dialog>
        ) : null}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(actions.logOut()),
  };
};

export default connect(null, mapDispatchToProps)(DialogRemove);
