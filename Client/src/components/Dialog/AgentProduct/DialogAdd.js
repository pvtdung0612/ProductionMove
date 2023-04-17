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
import { getFromFactory } from "../../../api/manager";
import ToastMessage from "../../Toast/ToastMessage";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";

class DialogAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openToast: false,
      errServer: null,
      productLineSelected: null,
      ids: [],
      listSelected: [],
      listProductLine: [],
      listProductName: [],
      listFactory: [],
    };
  }

  timerID = null;

  componentDidMount() {
    this.setState({
      listFactory: this.filterDuplicates(this.props.listProduct, "factoryID"),
    });
  }

  //Xử lý submit form
  handleSubmitForm = async (e) => {
    e.preventDefault();
    //Xóa Toast trong setTimeout trước đó
    clearTimeout(this.timerID);
    this.timerID = null;

    if (this.state.ids.length > 0) {
      this.setState({ errServer: null });
      await getFromFactory(this.state.ids).then((res) => {
        //Thành công thêm, gửi thông điệp khi update
        if (res.errCode === -1) this.props.logOut();
        else if (res.errCode === 0) this.props.onUpdateSuccess(res.message);

        // Lỗi valid phía server
        if (res.errCode === 1)
          this.setState({
            errServer: res.message,
          });
        this.handleToast();
        this.timerID = setTimeout(this.handleToast, 3000);
      });
    } else {
      this.setState({
        errServer: "Chưa chọn sản phẩm",
      });
      this.handleToast();
      this.timerID = setTimeout(this.handleToast, 3000);
    }
  };

  handleCloseToast = () => {
    clearTimeout(this.timerID);
    this.handleToast();
  };
  handleToast = () => {
    this.setState({ openToast: !this.state.openToast });
  };

  handleChangeFactory = (e, value) => {
    this.setState({
      listSelected: [],
      listProductName: [],
      productLineSelected: null,
      listProductLine: value
        ? this.filterDuplicates(
            this.props.listProduct.filter(
              (product) => product.factoryID === value.factoryID
            ),
            "productLine"
          )
        : [],
    });
  };

  handleChangeProductLine = (e, value) => {
    this.setState({
      listSelected: [],
      productLineSelected: value,
      listProductName: value
        ? this.props.listProduct.filter(
            (line) => line.productLine === value.productLine
          )
        : [],
    });
  };

  handleChangeName = (e, values) => {
    this.setState({
      ids: values ? values.map((value) => value.id) : [],
      listSelected: values ? values : null,
    });
  };

  filterDuplicates = (array, property) => {
    return array.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t[property] === value[property])
    );
  };

  render() {
    return (
      <div>
        <Dialog open={this.props.open}>
          <DialogTitle>Thêm sản phẩm mới từ cơ sở sản xuất</DialogTitle>
          <DialogContent>
            <form
              id="form-add-account"
              className="form-add-account"
              onSubmit={this.handleSubmitForm}
            >
              <Autocomplete
                style={{ width: "560px", margin: "10px 0" }}
                onChange={this.handleChangeFactory}
                defaultValue={null}
                getOptionLabel={(option) => option.factoryID.toString()}
                options={this.state.listFactory}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Cơ sở sản xuất"
                    ></TextField>
                  );
                }}
              />
              <Autocomplete
                style={{ width: "560px", margin: "10px 0" }}
                onChange={this.handleChangeProductLine}
                defaultValue={null}
                value={this.state.productLineSelected}
                getOptionLabel={(option) => option.productLine}
                options={this.state.listProductLine}
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
              <Autocomplete
                style={{ width: "560px", margin: "10px 0" }}
                multiple
                margin="dense"
                onChange={this.handleChangeName}
                // defaultValue={null}
                value={this.state.listSelected}
                getOptionLabel={(options) => options.name}
                options={this.state.listProductName}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Tên"
                    ></TextField>
                  );
                }}
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
