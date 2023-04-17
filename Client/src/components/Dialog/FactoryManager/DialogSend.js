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
import { sendAgent } from "../../../api/manager";
import ToastMessage from "../../Toast/ToastMessage";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";

class DialogSend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openToast: false,
      errServer: null,
      agentAddress: "",
      agentName: "",
      data: {
        productID: this.props.item.id,
        agentID: 0,
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
    await sendAgent(this.state.data).then((res) => {
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
      data: {
        ...this.state.data,
        agentID: value ? value.id : this.state.data.agentID,
      },
      agentName: value ? value.name : this.state.agentName,
      agentAddress: value ? value.address : this.state.agentAddress,
    });
  };

  render() {
    return (
      <div>
        <Dialog open={this.props.open}>
          <DialogTitle>Gửi tới đại lý bán hàng</DialogTitle>
          <DialogContent>
            <form
              id="form-add-account"
              className="form-add-account"
              onSubmit={this.handleSubmitForm}
            >
              <TextField
                fullWidth
                label="Sản phẩm đã chọn"
                margin="dense"
                autoFocus
                type="text"
                defaultValue={this.props.item.name}
                variant="outlined"
                disabled
              />
              <TextField
                fullWidth
                label="Dòng"
                margin="dense"
                autoFocus
                type="text"
                defaultValue={this.props.item.productLine}
                variant="outlined"
                disabled
              />
              <Autocomplete
                margin="dense"
                onChange={this.handleChangeProductLine}
                // value={this.props.listAgent[0]}
                getOptionLabel={(option) => option.name.toString()}
                options={this.props.listAgent}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Đại lý bán hàng"
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
                value={this.state.data.agentID}
                variant="outlined"
                disabled
              />
              <TextField
                fullWidth
                label="Địa chỉ"
                margin="dense"
                autoFocus
                type="text"
                value={this.state.agentAddress}
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

export default connect(null, mapDispatchToProps)(DialogSend);
