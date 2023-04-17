import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { addAccount } from "../../../api/manager";
import ToastMessage from "../../Toast/ToastMessage";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";

class DialogAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openToast: false,

      formError: {
        username: "Không để trống",
        password: "Không để trống",
        errServer: null,
      },
      account: {
        username: "",
        password: "",
        roleKey: "R1",
        workplaceID: "",
      },
      touched: {
        username: false,
        password: false,
        workplaceID: false,
      },
    };
  }
  timerID = null;
  accountTypes = ["R1", "R2", "R3", "R4"];

  // Xử lý khi nào hiển thị lỗi
  handleTouch = (field) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };
  handleBlur = (value, field) => {
    this.setState({
      touched: { ...this.state.touched, [field]: false },
    });
    this.onHandleInputValidation(value, field);
  };

  // Xử lý thay đổi các input
  onHandleChangeInput = (event, field) => {
    this.setState({
      account: { ...this.state.account, [field]: event.target.value },
    });
    this.onHandleInputValidation(event.target.value, field);
  };

  // Validate input
  onHandleInputValidation = (value, field) => {
    this.setState({
      formError: {
        ...this.state.formError,
        [field]: this.props.check(value, field),
      },
    });
  };

  //Xử lý submit form
  handleSubmitForm = async (e) => {
    e.preventDefault();
    //Xóa Toast trong setTimeout trước đó
    clearTimeout(this.timerID);
    this.timerID = null;
    await addAccount(this.state.account).then((res) => {
      //Thành công thêm, gửi thông điệp khi update
      if (res.errCode === -1) this.props.logOut();
      else if (res.errCode === 0) {
        this.props.onUpdateSuccess(res.message);
      }
      // Lỗi valid phía server
      if (res.errCode === 1) {
        this.setState({
          formError: { ...this.state.formError, errServer: res.message },
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
          <DialogTitle>Add account</DialogTitle>
          <DialogContent>
            <form
              id="form-add-account"
              className="form-add-account"
              onSubmit={this.handleSubmitForm}
            >
              <TextField
                style={{ textAlign: "left" }}
                label="Tên người dùng *"
                margin="dense"
                autoFocus
                type="text"
                defaultValue={this.state.account.username}
                onFocus={() => this.handleTouch("username")}
                onBlur={() =>
                  this.handleBlur(this.state.account.username, "username")
                }
                onChange={(event) =>
                  this.onHandleChangeInput(event, "username")
                }
                variant="outlined"
                fullWidth
                helperText={
                  this.state.touched.username
                    ? null
                    : this.state.formError.username
                }
              ></TextField>
              <TextField
                label="Mật khẩu *"
                margin="dense"
                autoFocus
                type="text"
                value={this.state.account.password}
                onFocus={() => this.handleTouch("password")}
                onBlur={() =>
                  this.handleBlur(this.state.account.password, "password")
                }
                onChange={(event) =>
                  this.onHandleChangeInput(event, "password")
                }
                variant="outlined"
                helperText={
                  this.state.touched.password
                    ? null
                    : this.state.formError.password
                }
              ></TextField>

              <TextField
                label="Nơi làm việc (id)"
                margin="dense"
                autoFocus
                type="text"
                defaultValue={this.state.account.workplaceID}
                onFocus={() => this.handleTouch("workplaceID")}
                onBlur={() =>
                  this.handleBlur(this.state.account.workplaceID, "workplaceID")
                }
                onChange={(event) =>
                  this.onHandleChangeInput(event, "workplaceID")
                }
                variant="outlined"
                fullWidth
                inputProps={{ maxLength: 100 }}
              ></TextField>

              <FormControl margin="dense" fullWidth>
                <InputLabel id="role-key">RoleKey</InputLabel>
                <Select
                  labelId="role-key"
                  label="role-key"
                  value={this.state.account.roleKey}
                  onChange={(event) =>
                    this.onHandleChangeInput(event, "roleKey")
                  }
                  displayEmpty
                >
                  {this.accountTypes.map((type, index) => (
                    <MenuItem key={index} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
            {this.state.formError.username ? (
              <ToastMessage
                type="warning"
                message={this.state.formError.username}
                onClose={this.handleCloseToast}
              />
            ) : this.state.formError.password ? (
              <ToastMessage
                type="warning"
                message={this.state.formError.password}
                onClose={this.handleCloseToast}
              />
            ) : this.state.formError.errServer ? (
              <ToastMessage
                type="warning"
                message={this.state.formError.errServer}
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
