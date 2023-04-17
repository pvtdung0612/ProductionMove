import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextareaAutosize,
} from "@mui/material";
import { receiveProductFromCustomer } from "../../../api/manager";
import ToastMessage from "../../Toast/ToastMessage";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";

class DialogReceive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openToast: false,
      errServer: null,
      description: "",
    };
  }

  timerID = null;
  //Xử lý submit form
  handleSubmitForm = async (e) => {
    e.preventDefault();
    //Xóa Toast trong setTimeout trước đó
    clearTimeout(this.timerID);
    this.timerID = null;
    const payload = {
      productID: this.props.product.id,
      descriptionInsurance: this.state.description,
    };
    await receiveProductFromCustomer(payload).then((res) => {
      //Thành công thêm, gửi thông điệp khi update
      if (res.errCode === -1) this.props.logOut();
      else if (res.errCode === 0)
        this.props.onUpdateSuccess(res.message);

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
  handleOnChange = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <Dialog open={this.props.open}>
          <DialogTitle>Gửi tới TTBH</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Nhận lại sản phẩm: {this.props.product.name} <br />
              Gửi tới TTBH với mô tả:
            </DialogContentText>
            <TextareaAutosize
              style={{ width: "100%", resize: "vertical", margin: "dense" }}
              aria-label="minimum height"
              minRows={12}
              onChange={(event) => this.handleOnChange(event)}
              value={this.state.description}
              placeholder="Mô tả"
            ></TextareaAutosize>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.handleClose()} color="primary">
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              onClick={this.handleSubmitForm}
            >
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

export default connect(null, mapDispatchToProps)(DialogReceive);
