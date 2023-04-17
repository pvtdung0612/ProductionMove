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
import { addBatches } from "../../../api/manager";
import ToastMessage from "../../Toast/ToastMessage";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";

class DialogAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openToast: false,
      errServer: null,
      newOne: {
        name: "",
        productlineID: this.props.listProductLine[0].id,
        quantity: 3,
        bornDate: "2022/12/24",
      },
    };
  }
  timerID = null;
  //Xử lý submit form
  handleSubmitForm = async (e) => {
    e.preventDefault();
    //Xóa Toast trong setTimeout trước đó
    clearTimeout(this.timerID);
    this.timerID = null;

    await addBatches(this.state.newOne).then((res) => {
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

  handleChange = (field, value) => {
    this.setState({ newOne: { ...this.state.newOne, [field]: value } });
  };

  handleChangeProductLine = (e, value) => {
    this.setState({
      newOne: {
        ...this.state.newOne,
        productlineID: value.id,
      },
    });
  };

  render() {
    return (
      <div>
        <Dialog open={this.props.open}>
          <DialogTitle>Add account</DialogTitle>
          <DialogContent>
            <form
              id="form-add-account"
              className="form-add-account"
              onSubmit={this.handleSubmitForm}
            >
              <TextField
                onChange={(e) => this.handleChange("name", e.target.value)}
                margin="dense"
                label="Tên sản phẩm"
                fullWidth
              />
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  margin="dense"
                  label="Ngày sản xuất"
                  inputFormat="DD/MM/YYYY"
                  value={moment(this.state.newOne.bornDate, "YYYY/MM/DD")}
                  minDate={moment("24/12/2017", "DD/MM/YYYY")}
                  onChange={(newValue) => {
                    this.setState({
                      newOne: {
                        ...this.state.newOne,
                        bornDate: moment(newValue, "DD/MM/YYYY").format(
                          "YYYY/MM/DD"
                        ),
                      },
                    });
                  }}
                  renderInput={(props) => (
                    <TextField {...props} name="date" margin="dense" />
                  )}
                />
              </LocalizationProvider>
              <Autocomplete
                margin="dense"
                onChange={this.handleChangeProductLine}
                defaultValue={this.props.listProductLine[0]}
                getOptionLabel={(option) => option.productLine}
                options={this.props.listProductLine}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Dòng sản phẩm"
                    ></TextField>
                  );
                }}
              />
              <TextField
                onChange={(e) => this.handleChange("quantity", e.target.value)}
                label="Số lượng"
                margin="dense"
                autoFocus
                type="number"
                defaultValue={this.state.newOne.quantity}
                variant="outlined"
                InputProps={{ inputProps: { min: 1 } }}
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

export default connect(null, mapDispatchToProps)(DialogAdd);
