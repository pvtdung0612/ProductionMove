import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { sendMailError } from "../../../api/manager";
import ToastMessage from "../../Toast/ToastMessage";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";

class DialogSendMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openToast: false,
      errServer: null,
      apiLoading: false,
      description: "",
    };
  }
  timerID = null;
  //Xử lý submit form
  handleSubmitForm = async (e) => {
    e.preventDefault();
    const payload = {
      productID: this.props.product.id,
      descriptionError: this.state.description,
    };
    clearTimeout(this.timerID);
    this.timerID = null;
    this.setState({
      apiLoading: true,
    });

    await sendMailError(payload)
      .then((res) => {
        //Thành công thêm, gửi thông điệp khi update
        if (res.errCode === -1) this.props.logOut();
        else if (res.errCode === 0) this.props.onUpdateSuccess(res.message);
        // Lỗi valid phía server
        else if (res.errCode === 1) {
          this.setState({
            errServer: res.message,
          });
          this.handleToast();
          this.timerID = setTimeout(this.handleToast, 3000);
        }
      })
      .finally(() => {
        this.setState({
          apiLoading: false,
        });
      });
  };
  handleCloseToast = () => {
    clearTimeout(this.timerID);
    this.handleToast();
  };
  handleToast = () => {
    this.setState({ openToast: !this.state.openToast });
  };

  handleChange = (e) => {
    this.setState({ description: e.target.value });
  };

  render() {
    return (
      <div>
        <Dialog open={this.props.open}>
          <DialogTitle>Xác nhận gửi mail đến người dùng</DialogTitle>
          <DialogContent>
            <form
              id="form-add-account"
              className="form-add-account"
              onSubmit={this.state.apiLoading ? null : this.handleSubmitForm}
            >
              <TextField
                style={{ width: "50px" }}
                fullWidth
                label="ID"
                margin="dense"
                autoFocus
                type="text"
                value={this.props.product.id}
                variant="outlined"
                disabled
              />
              <TextField
                fullWidth
                label="Tên"
                margin="dense"
                autoFocus
                type="text"
                value={this.props.product.name}
                variant="outlined"
                disabled
              />
              <TextField
                fullWidth
                label="Trạng thái"
                margin="dense"
                autoFocus
                type="text"
                value={this.props.product.status}
                variant="outlined"
                disabled
              />
              <TextareaAutosize
                style={{ width: "100%", resize: "vertical", margin: "dense" }}
                aria-label="minimum height"
                minRows={12}
                onChange={(event) => this.handleChange(event)}
                value={this.state.description}
                placeholder="Miêu tả"
              ></TextareaAutosize>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.handleClose()} color="primary">
              Hủy
            </Button>
            <Button color="primary" type="submit" form="form-add-account">
              {this.state.apiLoading ? (
                <CircularProgress size="1.6rem" />
              ) : (
                "Gửi"
              )}
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

export default connect(null, mapDispatchToProps)(DialogSendMail);
