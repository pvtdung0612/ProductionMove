import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { updateItemType } from "../../../api/manager";
import ToastMessage from "../../Toast/ToastMessage";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";

class DialogEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errServer: null,
      openToast: false,
      openDefinitely: false,
      item: this.props.item,
    };
  }
  timerID = null;
  //Cập nhật giá trị input
  onChange = (event, target) => {
    this.setState({
      item: { ...this.state.item, [target]: event.target.value },
    });
  };

  //Submit
  handleOpenDefinitely = () => {
    this.setState({
      openDefinitely: true,
    });
  };
  handleSubmitForm = async (e) => {
    e.preventDefault();
    //Đóng cửa sổ xác nhận thay đổi
    this.setState({
      openDefinitely: false,
    });
    clearTimeout(this.timerID);
    this.timerID = null;

    await updateItemType(this.state.item).then((res) => {
      //Thành công xóa, gửi thông điệp khi update
      if (res.errCode === -1) this.props.logOut();
      else if (res.errCode === 0) this.props.onUpdateSuccess(res.message);

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
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>
            <form
              id="form-edit"
              className="formEditItem"
              onSubmit={this.handleSubmitForm.bind(this)}
            >
              <TextField
                label="Mã sản phẩm"
                disabled
                margin="dense"
                type="text"
                value={this.state.item.id}
                variant="outlined"
              ></TextField>
              <TextField
                style={{ textAlign: "left" }}
                multiline
                rows={3}
                label="Dòng sản phẩm"
                margin="dense"
                autoFocus
                // required
                type="text"
                value={this.state.item.productLine}
                onChange={(event) => this.onChange(event, "productLine")}
                variant="outlined"
                fullWidth
                inputProps={{ maxLength: 100 }}
              ></TextField>

              <TextField
                label="CPU"
                margin="dense"
                autoFocus
                type="text"
                defaultValue={this.state.item.cpu}
                onChange={(event) => this.onChange(event, "cpu")}
                variant="outlined"
                fullWidth
                inputProps={{ maxLength: 100 }}
              ></TextField>
              <TextField
                label="Màn hình"
                margin="dense"
                autoFocus
                type="text"
                defaultValue={this.state.item.screen}
                onChange={(event) => this.onChange(event, "screen")}
                variant="outlined"
                fullWidth
                inputProps={{ maxLength: 100 }}
              ></TextField>
              <TextField
                label="Giá"
                margin="dense"
                autoFocus
                // required
                type="text"
                defaultValue={this.state.item.price}
                onChange={(event) => this.onChange(event, "price")}
                variant="outlined"
                inputProps={{ maxLength: 100 }}
              ></TextField>

              <TextareaAutosize
                defaultValue={this.state.item.description}
                style={{ width: "100%", resize: "vertical", margin: "dense" }}
                aria-label="minimum height"
                minRows={3}
                placeholder="Mô tả"
                onChange={(event) => this.onChange(event, "description")}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.handleClose()} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={() => this.handleOpenDefinitely()}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openDefinitely}
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Bạn chắc chắn muốn sửa ?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Nếu bạn sửa productline thì tất cả các sản phẩm có productLine vừa
              sửa sẽ tự động sửa theo
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.handleClose()} color="primary">
              Hủy
            </Button>
            <Button color="primary" autoFocus form="form-edit" type="submit">
              Chắc chắn
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
