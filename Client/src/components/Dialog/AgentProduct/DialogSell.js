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
import { sellProduct } from "../../../api/manager";
import ToastMessage from "../../Toast/ToastMessage";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";

class DialogSell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openToast: false,
      errServer: null,
      customer: null,
    };
  }

  timerID = null;

  //Xử lý submit form
  handleSubmitForm = async (e) => {
    e.preventDefault();
    clearTimeout(this.timerID);
    this.timerID = null;

    if (!this.state.customer) {
      this.setState({
        errServer: "Chưa nhập thông tin người dùng",
      });
      this.handleToast();
      this.timerID = setTimeout(this.handleToast, 3000);
    } else
      await sellProduct(this.state.customer.id, this.props.product.id).then(
        (res) => {
          //Thành công, gửi thông điệp khi update
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
        }
      );
  };
  handleCloseToast = () => {
    clearTimeout(this.timerID);
    this.handleToast();
  };
  handleToast = () => {
    this.setState({ openToast: !this.state.openToast });
  };

  handleChange = (e, value) => {
    this.setState({
      customer: value ? value : null,
    });
  };

  render() {
    return (
      <div>
        <Dialog open={this.props.open}>
          <DialogTitle>Bán</DialogTitle>
          <DialogContent>
            <form
              id="form-add-account"
              className="form-add-account"
              onSubmit={this.handleSubmitForm}
            >
              <div>
                <h3>Thông tin khác hàng</h3>
              </div>
              <Autocomplete
                style={{ width: "560px", margin: "10px 0" }}
                onChange={this.handleChange}
                value={this.state.customer}
                getOptionLabel={(option) => `${option.name} (id ${option.id})`}
                options={this.props.listCustomer.sort((a, b) =>
                  a.name > b.name ? 1 : -1
                )}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Khách hàng"
                    ></TextField>
                  );
                }}
              />
              <Autocomplete
                style={{ width: "200px", margin: "10px 0" }}
                onChange={this.handleChange}
                value={this.state.customer}
                getOptionLabel={(option) => option.sdt}
                options={this.props.listCustomer.sort((a, b) =>
                  a.sdt > b.sdt ? 1 : -1
                )}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Số điện thoại"
                    ></TextField>
                  );
                }}
              />
              <TextField
                label="Email"
                margin="dense"
                variant="outlined"
                type="text"
                disabled
                fullWidth
                value={this.state.customer ? this.state.customer.email : ""}
              />
              <TextField
                label="Address"
                margin="dense"
                variant="outlined"
                type="text"
                disabled
                fullWidth
                value={this.state.customer ? this.state.customer.address : ""}
              />
            </form>
            <div>
              <h3>Sản phẩm</h3>
              <TextField
                label="Tên"
                margin="dense"
                variant="outlined"
                type="text"
                disabled
                fullWidth
                value={this.props.product.name}
              />
              <TextField
                label="Dòng sản phẩm"
                margin="dense"
                variant="outlined"
                type="text"
                disabled
                fullWidth
                value={this.props.product.productLine}
              />
              <TextField
                label="Ngày sản xuất"
                margin="dense"
                variant="outlined"
                type="text"
                disabled
                value={this.props.product.bornDate}
              />
            </div>
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
                onClose={() => this.handleCloseToast()}
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

export default connect(null, mapDispatchToProps)(DialogSell);
