import { Component } from "react";
import {
  TableHead,
  TableBody,
  Table,
  TableRow,
  TableCell,
  TableContainer,
  ButtonGroup,
  Button,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getItemsType } from "../../../api/manager";
import "../../../assets/css/productTypeManager.scss";
import DialogEdit from "../../Dialog/ProductTypeManager/DialogEdit";
import DialogRemove from "../../Dialog/ProductTypeManager/DialogRemove";
import DialogAdd from "../../Dialog/ProductTypeManager/DialogAdd";
import ToastMessage from "../../Toast/ToastMessage";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";

class ProductTypeManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      selectedItem: null,
      openEdit: false,
      openRemove: false,
      openAdd: false,
      errorMsg: null,
      messageUpdated: null,
    };
  }

  componentDidMount() {
    this.getData();
  }
  // Lấy dữ liệu
  getData = async () => {
    const data = await getItemsType();
    if (data.errCode === -1) this.props.logOut();
    else if (data.errCode === 1) this.setState({ errorMsg: data.message });
    else this.setState({ rows: data.data });
  };

  // Xử lý mở và đóng Dialog

  handleAddOpen = () => {
    this.setState({ openAdd: true });
  };

  handleEditOpen = (item) => {
    this.setState({ openEdit: true, selectedItem: item });
  };

  handleRemoveOpen = (item) => {
    this.setState({ openRemove: true, selectedItem: item });
  };

  handleOpen = (field, item) => {
    this.setState({ [`open${field}`]: true, selectedItem: item });
  };

  handleClose = () => {
    this.setState({
      openEdit: false,
      openRemove: false,
      selectedItem: null,
      openAdd: false,
      messageUpdated: null,
    });
  };

  // Update lại dữ liệu
  handleUpdateDataSuccess = async (message) => {
    await this.getData();
    await this.handleClose();
    this.setState({ messageUpdated: message });
    setTimeout(() => {
      this.setState({ messageUpdated: null });
    }, 3000);
  };

  actionsBlock = (item) => {
    return (
      <div className="actionsBlock">
        <EditIcon onClick={() => this.handleOpen("Edit", item)} />
        <DeleteIcon onClick={() => this.handleOpen("Remove", item)} />
      </div>
    );
  };

  render() {
    return (
      <div className="product-type">
        <ButtonGroup>
          <Button color="primary" onClick={() => this.handleOpen("Add", null)}>
            Thêm dòng máy mới
          </Button>
        </ButtonGroup>
        <TableContainer className="table-item" component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Mã</TableCell>
                <TableCell>Dòng sản phẩm</TableCell>
                <TableCell>CPU</TableCell>
                <TableCell>Màn hình</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell>Giá</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.productLine}</TableCell>
                  <TableCell>{row.cpu}</TableCell>
                  <TableCell>{row.screen}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.total}</TableCell>
                  <TableCell>{this.actionsBlock(row)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {this.state.openEdit ? (
          <DialogEdit
            open={this.state.openEdit}
            handleClose={this.handleClose}
            item={this.state.selectedItem}
            onUpdateSuccess={this.handleUpdateDataSuccess}
          ></DialogEdit>
        ) : null}
        {this.state.openRemove ? (
          <DialogRemove
            open={this.state.openRemove}
            handleClose={this.handleClose}
            item={this.state.selectedItem}
            onUpdateSuccess={this.handleUpdateDataSuccess}
          ></DialogRemove>
        ) : null}
        {this.state.openAdd ? (
          <DialogAdd
            open={this.state.openAdd}
            handleClose={this.handleClose}
            onUpdateSuccess={this.handleUpdateDataSuccess}
          ></DialogAdd>
        ) : null}
        {this.state.errorMsg ? (
          <ToastMessage type="warning" message={this.state.errorMsg} />
        ) : this.state.messageUpdated ? (
          <ToastMessage type="success" message={this.state.messageUpdated} />
        ) : null}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loginSuccess: (inFo) => dispatch(actions.loginSuccess(inFo)),
    logOut: () => dispatch(actions.logOut()),
  };
};
export default connect(null, mapDispatchToProps)(ProductTypeManager);
