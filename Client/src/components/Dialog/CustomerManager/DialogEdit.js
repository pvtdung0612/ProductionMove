import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { editCustomer } from "../../../api/manager";
import ToastMessage from "../../Toast/ToastMessage";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";

class DialogEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openToast: false,
      errServer: null,
      customer: {
        customerID: this.props.customer.id,
        name: this.props.customer.name,
        sdt: this.props.customer.sdt,
        email: this.props.customer.email,
        address: this.props.customer.address,
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
    await editCustomer(this.state.customer).then((res) => {
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

  handleChange = (e, field) => {
    this.setState({
      customer: { ...this.state.customer, [field]: e.target.value },
    });
  };

  render() {
    return (
      <div>
        <Dialog open={this.props.open}>
          <DialogTitle>Sửa thông tin</DialogTitle>
          <DialogContent>
            <form
              id="form-add-account"
              className="form-add-account"
              onSubmit={this.handleSubmitForm}
            >
              <TextField
                style={{ width: "80px" }}
                label="ID"
                margin="dense"
                disabled
                type="text"
                defaultValue={this.props.customer.id}
                variant="outlined"
              ></TextField>
              <TextField
                style={{ textAlign: "left" }}
                label="Tên người dùng"
                margin="dense"
                autoFocus
                type="text"
                value={this.state.customer.name}
                onChange={(event) => this.handleChange(event, "name")}
                variant="outlined"
                fullWidth
              ></TextField>
              <TextField
                label="Số điện thoại"
                margin="dense"
                autoFocus
                type="text"
                value={this.state.customer.sdt}
                onChange={(event) => this.handleChange(event, "sdt")}
                variant="outlined"
                inputProps={{ minLength: 10, maxLength: 10 }}
              ></TextField>
              <TextField
                label="Email"
                margin="dense"
                autoFocus
                type="text"
                value={this.state.customer.email}
                onChange={(event) => this.handleChange(event, "email")}
                variant="outlined"
                fullWidth
              ></TextField>
              <TextField
                label="Địa chỉ"
                margin="dense"
                autoFocus
                type="text"
                value={this.state.customer.address}
                onChange={(event) => this.handleChange(event, "address")}
                variant="outlined"
                fullWidth
              ></TextField>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.handleClose()} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit" form="form-add-account">
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

export default connect(null, mapDispatchToProps)(DialogEdit);
