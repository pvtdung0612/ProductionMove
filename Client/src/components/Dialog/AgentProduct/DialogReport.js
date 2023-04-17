import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextareaAutosize,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { reporterror, sendMail } from "../../../api/manager";
import ToastMessage from "../../Toast/ToastMessage";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";

class DialogReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerID: null,
      errServer: null,
      openToast: false,
      openSendMail: false,
      apiLoading: false,
      mail: { productID: this.props.product.id, descriptionError: "" },
    };
  }
  timerID = null;

  handleReport = async () => {
    //Xóa Toast trong setTimeout trước đó
    clearTimeout(this.timerID);
    this.timerID = null;

    await reporterror(this.props.product.id).then((res) => {
      //Thành công xóa, gửi thông điệp khi update
      if (res.errCode === -1) this.props.logOut();
      else if (res.errCode === 0) this.setState({ openSendMail: true });

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

  handleSubmitForm = async () => {
    //Xóa Toast trong setTimeout trước đó
    clearTimeout(this.timerID);
    this.timerID = null;
    this.setState({
      apiLoading: true,
    });
    await sendMail(this.state.mail)
      .then((res) => {
        //Thành công xóa, gửi thông điệp khi update
        if (res.errCode === -1) this.props.logOut();
        else if (res.errCode === 0) {
          this.props.onUpdateSuccess(res.message);
        }
        // Lỗi phía server
        else if (res.errCode === 1) {
          this.handleToast();
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

  handleOnChange = (event) => {
    this.setState({
      mail: { ...this.state.mail, descriptionError: event.target.value },
    });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {this.state.openSendMail
              ? "Xác nhận gửi mail báo lỗi sản phẩm"
              : "Xác nhận report"}
          </DialogTitle>
          {this.state.openSendMail ? (
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ID sản phẩm: {this.props.product.id} <br />
                Tên sản phẩm: {this.props.product.name}
                <br />
                Dòng sản phẩm:{" "}
                {this.props.product.productLine
                  ? this.props.product.productLine
                  : "Không có"}
                <br />
              </DialogContentText>
              <TextareaAutosize
                style={{ width: "100%", resize: "vertical", margin: "dense" }}
                aria-label="minimum height"
                minRows={12}
                onChange={(event) => this.handleOnChange(event)}
                value={this.state.mail.descriptionError}
                placeholder="Miêu tả lỗi"
              ></TextareaAutosize>
            </DialogContent>
          ) : null}

          <DialogActions>
            <Button onClick={() => this.props.handleClose()} color="primary">
              Hủy
            </Button>
            <Button
              onClick={
                this.state.openSendMail
                  ? !this.state.apiLoading
                    ? () => this.handleSubmitForm()
                    : null
                  : () => this.handleReport()
              }
              color="primary"
              autoFocus
            >
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

export default connect(null, mapDispatchToProps)(DialogReport);
