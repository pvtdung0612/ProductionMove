import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { deleteCustomer } from "../../../api/manager";
import ToastMessage from "../../Toast/ToastMessage";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";

class DialogDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openToast: false,
      errServer: null,
      customer: {
        customerID: this.props.customer.id,
      },
    };
  }
  timerID = null;
  accountTypes = ["R1", "R2", "R3", "R4"];

  //Xử lý submit form
  handleSubmitForm = async (e) => {
    e.preventDefault();
    //Xóa Toast trong setTimeout trước đó
    clearTimeout(this.timerID);
    this.timerID = null;
    await deleteCustomer(this.state.customer).then((res) => {
      //Thành công thêm, gửi thông điệp khi update
      if (res.errCode === -1) this.props.logOut();
      else if (res.errCode === 0) {
        this.props.onUpdateSuccess(res.message);
      }
      // Lỗi valid phía server
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
        <Dialog open={this.props.open}>
          <DialogTitle>Xóa khách hàng</DialogTitle>
          <DialogContent>
            Xóa thông tin khách hàng {this.props.customer.name}{" "}
            {`(id: ${this.props.customer.id}) khỏi danh sách`}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.handleClose()} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={this.handleSubmitForm}>
              Submit
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

export default connect(null, mapDispatchToProps)(DialogDelete);
