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
import { sendInsuranceCenter } from "../../../api/manager";
import ToastMessage from "../../Toast/ToastMessage";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";

class DialogSendInsurance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openToast: false,
      errServer: null,
      product: this.props.listProduct[0],
      insuranceCenter: this.props.listInsuranceCenter[0],
    };
  }
  timerID = null;
  //Xử lý submit form
  handleSubmitForm = async (e) => {
    e.preventDefault();
    const payload = {
      productID: this.state.product ? this.state.product.id : null,
      insurancecenterID: this.state.insuranceCenter
        ? this.state.insuranceCenter.id
        : null,
    };
    clearTimeout(this.timerID);
    this.timerID = null;
    console.log(payload);
    await sendInsuranceCenter(payload).then((res) => {
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
          <DialogTitle>Gửi tới TTBH</DialogTitle>
          <DialogContent style={{ padding: "1.15rem 1.5rem" }}>
            <form
              id="form-add-account"
              className="form-add-account"
              onSubmit={this.handleSubmitForm}
            >
              <Autocomplete
                style={{ width: "20%" }}
                value={this.state.product}
                onChange={(e, value) => this.handleChange(e, value, "product")}
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
                value={this.state.product ? this.state.product.productLine : ""}
                variant="outlined"
                disabled
              />
              <Autocomplete
                margin="dense"
                value={this.state.insuranceCenter}
                onChange={(e, value) =>
                  this.handleChange(e, value, "insuranceCenter")
                }
                getOptionLabel={(option) => option.name.toString()}
                options={this.props.listInsuranceCenter}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Trung tâm bảo hành"
                    ></TextField>
                  );
                }}
              />
              <TextField
                style={{ width: "50px" }}
                fullWidth
                label="ID"
                margin="dense"
                autoFocus
                type="text"
                value={
                  this.state.insuranceCenter
                    ? this.state.insuranceCenter.id
                    : ""
                }
                variant="outlined"
                disabled
              />
              <TextField
                fullWidth
                label="Địa chỉ"
                margin="dense"
                autoFocus
                type="text"
                value={
                  this.state.insuranceCenter
                    ? this.state.insuranceCenter.address
                    : ""
                }
                variant="outlined"
                disabled
              />
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

export default connect(null, mapDispatchToProps)(DialogSendInsurance);
