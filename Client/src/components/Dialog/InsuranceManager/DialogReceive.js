import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Autocomplete,
} from "@mui/material";
import { receiveProductFromInsurance } from "../../../api/manager";
import ToastMessage from "../../Toast/ToastMessage";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";

class DialogReceive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openToast: false,
      errServer: null,
      product: this.props.listProduct[0],
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
      productID: this.state.product ? this.state.product.id : null,
    };
    await receiveProductFromInsurance(payload).then((res) => {
      //Thành công thêm, gửi thông điệp khi update
      if (res.errCode === -1) this.props.logOut();
      else if (res.errCode === 0) this.props.onUpdateSuccess(res.message);

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

  handleChange = (e, value, field) => {
    this.setState({ [field]: value });
  };

  render() {
    return (
      <div>
        <Dialog open={this.props.open}>
          <DialogTitle>Nhận từ TTBH</DialogTitle>
          <DialogContent>
            <DialogContent>
              <form
                id="form-add-account"
                className="form-add-account"
                onSubmit={this.handleSubmitForm}
              >
                <Autocomplete
                  style={{ width: "20%" }}
                  value={this.state.product}
                  onChange={(e, value) =>
                    this.handleChange(e, value, "product")
                  }
                  getOptionLabel={(option) => option.id.toString()}
                  options={this.props.listProduct}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="ID"
                      ></TextField>
                    );
                  }}
                />
                <TextField
                  label="Sản phẩm"
                  margin="dense"
                  autoFocus
                  fullWidth
                  type="text"
                  value={this.state.product ? this.state.product.name : ""}
                  variant="outlined"
                  disabled
                  multiline
                  rows={2}
                />
                <TextField
                  fullWidth
                  label="Dòng"
                  margin="dense"
                  autoFocus
                  type="text"
                  value={
                    this.state.product ? this.state.product.productLine : ""
                  }
                  variant="outlined"
                  disabled
                />
                <TextField
                  fullWidth
                  label="Trạng thái"
                  margin="dense"
                  autoFocus
                  type="text"
                  value={this.state.product ? this.state.product.status : ""}
                  variant="outlined"
                  disabled
                />
              </form>
            </DialogContent>
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

export default connect(null, mapDispatchToProps)(DialogReceive);
