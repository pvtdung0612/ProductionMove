import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Autocomplete,
  TextareaAutosize,
} from "@mui/material";
import { finishInsurance } from "../../../api/manager";
import ToastMessage from "../../Toast/ToastMessage";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";

class DialogFinishInsurance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openToast: false,
      errServer: null,
      inFo: {
        productID: this.props.product.id,
        description: "",
        result: this.results[0],
        endDate: "2022/12/24",
      },
    };
  }
  timerID = null;
  results = ["FAILURE", "SUCCESS"];

  //Xử lý submit form
  handleSubmitForm = async (e) => {
    e.preventDefault();
    //Xóa Toast trong setTimeout trước đó
    clearTimeout(this.timerID);
    this.timerID = null;

    await finishInsurance(this.state.inFo).then((res) => {
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

  handleChangeAutocomplete = (e, value, field) => {
    this.setState({
      inFo: {
        ...this.state.inFo,
        [field]: value,
      },
    });
  };

  handleChangeTextarea = (e, field) => {
    this.setState({
      inFo: {
        ...this.state.inFo,
        [field]: e.target.value,
      },
    });
  };

  render() {
    console.log(this.state.inFo);
    return (
      <div>
        <Dialog open={this.props.open}>
          <DialogTitle>Bảo hành</DialogTitle>
          <DialogContent>
            <form
              id="form-add-account"
              className="form-add-account"
              onSubmit={this.handleSubmitForm}
            >
              <TextField
                margin="dense"
                label="ID sản phẩm"
                value={this.state.inFo.productID}
                disabled
              />
              <TextField
                margin="dense"
                label="Tên sản phẩm"
                value={this.props.product.name}
                fullWidth
                disabled
              />
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  margin="dense"
                  label="Hạn bảo hành"
                  inputFormat="DD/MM/YYYY"
                  value={moment(this.state.inFo.endDate, "YYYY/MM/DD")}
                  minDate={moment("24/12/2017", "DD/MM/YYYY")}
                  onChange={(newValue) => {
                    this.setState({
                      inFo: {
                        ...this.state.inFo,
                        endDate: moment(newValue, "DD/MM/YYYY").format(
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
                style={{ width: "47%", resize: "vertical", margin: "dense" }}
                margin="dense"
                onChange={(e, value) =>
                  this.handleChangeAutocomplete(e, value, "result")
                }
                defaultValue={this.results[0]}
                getOptionLabel={(option) => option}
                options={this.results}
                renderInput={({ inputProps, ...rest }) => {
                  return (
                    <TextField
                      {...rest}
                      label="Kết quả bảo hành"
                      inputProps={{ ...inputProps, readOnly: true }}
                    ></TextField>
                  );
                }}
              />
              <TextareaAutosize
                style={{ width: "100%", resize: "vertical", margin: "dense" }}
                aria-label="minimum height"
                minRows={12}
                onChange={(event) =>
                  this.handleChangeTextarea(event, "description")
                }
                value={this.state.inFo.description}
                placeholder="Mô tả"
              ></TextareaAutosize>
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

export default connect(null, mapDispatchToProps)(DialogFinishInsurance);
