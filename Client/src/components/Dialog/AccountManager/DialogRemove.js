import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import { deleteAccount } from "../../../api/manager";
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
    clearTimeout(this.timerID);
    this.timerID = null;
    const payload = { id: this.props.account.id };
    console.log(this.props.account);
    await deleteAccount(payload).then((res) => {
      //Thành công xóa, gửi thông điệp khi update
      if (res.errCode === -1) this.props.logOut();
      else if (res.errCode === 0) this.props.onUpdateSuccess(res.message);
      // Lỗi phía server
      if (res.errCode === 1) {
        this.setState({
          errServer: res.message,
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
            Xác nhận xoá: {this.props.account && this.props.account.username}{" "}
            (id {this.props.account && this.props.account.id})
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Bạn sẽ không thể phục hồi dữ liệu đã bị xoá
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.handleClose()} color="primary">
              Thoát
            </Button>
            <Button
              onClick={() => this.handleSubmitForm()}
              color="primary"
              autoFocus
            >
              Xóa
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
