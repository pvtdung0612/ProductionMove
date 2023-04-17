import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  TextareaAutosize,
  FormControl,
} from "@mui/material";
import { addItemType } from "../../../api/manager";
import ToastMessage from "../../Toast/ToastMessage";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";

class DialogAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errServer: null,
      openToast: false,
      item: {
        description: "",
        cpu: "",
        screen: "",
        productLine: "",
        price: "",
      },
    };
  }

  timerID = null;

  onChange = (event, target) => {
    this.setState({
      item: { ...this.state.item, [target]: event.target.value },
    });
  };

  handleSubmitForm = async (e) => {
    e.preventDefault();
    //Xóa Toast trong setTimeout trước đó
    clearTimeout(this.timerID);
    this.timerID = null;
    await addItemType(this.state.item).then((res) => {
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
          <DialogTitle>Add item</DialogTitle>
          <DialogContent>
            <form
              id="form-add-item"
              className="form-add-item"
              onSubmit={this.handleSubmitForm.bind(this)}
            >
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
              <FormControl>
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
              </FormControl>

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
            <Button color="primary" type="submit" form="form-add-item">
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
