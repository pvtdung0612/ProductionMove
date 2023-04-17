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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAccounts } from "../../../api/manager";
import DialogAdd from "../../Dialog/AccountManager/DialogAdd";
import DialogEdit from "../../Dialog/AccountManager/DialogEdit";
import DialogRemove from "../../Dialog/AccountManager/DialogRemove";
import "../../../assets/css/accountManager.scss";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";
import ToastMessage from "../../Toast/ToastMessage";

class AccountManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      selectedAccount: null,
      openEdit: false,
      openRemove: false,
      openAdd: false,
      errorMsg: null,
      messageUpdated: null,
    };
  }

  timerID = null;

  componentDidMount() {
    this.getData();
  }
  // Lấy dữ liệu
  getData = async () => {
    const data = await getAccounts();
    if (data.errCode === -1) this.props.logOut();
    else if (data.errCode === 1) this.setState({ errorMsg: data.message });
    else this.setState({ rows: data.data });
  };

  // Xử lý mở và đóng Dialog
  handleAddOpen = () => {
    this.setState({ openAdd: true });
  };

  handleEditOpen = (account) => {
    this.setState({ openEdit: true, selectedAccount: account });
  };

  handleRemoveOpen = (account) => {
    this.setState({ openRemove: true, selectedAccount: account });
  };

  handleClose = () => {
    this.setState({
      openEdit: false,
      openRemove: false,
      selectedAccount: null,
      openAdd: false,
      errorMsg: null,
      messageUpdated: null,
    });
  };

  // Validate
  validation = (value, field) => {
    //Space Regex
    const spaceRegex = new RegExp("^[^ ]*$");

    // Regex username
    const beginNameRegex = new RegExp("^[A-Za-z]");
    const lengthNameRegex = new RegExp("^.{4,16}");
    const usernameRegex = new RegExp("^[a-zA-Z0-9]*$");

    //Regex password
    const lengthPasswordRegex = new RegExp("^.{8,}");
    const passwordRegex = new RegExp(
      "^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9@$!%*#?&]+)$"
    );

    //Trả về lỗi
    if (field === "username") {
      if (!value) return "Không để trống";
      if (!beginNameRegex.test(value))
        return "Tên người dùng phải bắt đầu bằng chữ cái";
      else if (!spaceRegex.test(value)) return "Không chứa khoảng cách";
      else if (!usernameRegex.test(value))
        return "Tên người dùng chỉ chứa các chữ cái và số";
      else if (!lengthNameRegex.test(value))
        return "Độ dài trong khoảng 4-16 kí tự";
      return null;
    } else if (field === "password") {
      if (!value) return "Không để trống";
      if (!spaceRegex.test(value)) return "Không chứa khoảng cách";
      else if (!passwordRegex.test(value))
        return "Mật khẩu phải chứa ít nhất 1 chữ hoặc 1 số";
      else if (!lengthPasswordRegex.test(value))
        return "Độ dài ít nhất 8 kí tự";
      return null;
    }
  };

  // Update lại dữ liệu
  handleUpdateDataSuccess = (message) => {
    this.getData();
    this.handleClose();
    this.setState({ messageUpdated: message });
    setTimeout(this.handleCloseToast, 3000);
  };
  handleCloseToast = () => {
    clearTimeout(this.timerID);
    this.timerID = null;
    this.setState({ errorMsg: null, messageUpdated: null });
  };

  actionsBlock = (account) => {
    return (
      <div className="actionsBlock">
        <EditIcon onClick={() => this.handleEditOpen(account)}></EditIcon>
        <DeleteIcon onClick={() => this.handleRemoveOpen(account)} />
      </div>
    );
  };

  render() {
    return (
      <div className="account-container">
        <ButtonGroup>
          <Button color="primary" onClick={() => this.handleAddOpen()}>
            Thêm tài khoản
          </Button>
        </ButtonGroup>
        <TableContainer className="table-account" component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell width="5%">ID</TableCell>
                <TableCell width="15%">Tên người dùng</TableCell>
                <TableCell width="40%">Mật khẩu</TableCell>
                <TableCell width="10%">Role Key</TableCell>
                <TableCell width="20%">Nơi làm việc</TableCell>
                <TableCell width="5%">WorkplaceID</TableCell>
                <TableCell width="5%">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row" width="5%">
                    {row.id}
                  </TableCell>
                  <TableCell width="15%">{row.username}</TableCell>
                  <TableCell width="40%">{row.password}</TableCell>
                  <TableCell width="10%">{row.roleKey}</TableCell>
                  <TableCell width="20%">{row.workplaceName}</TableCell>
                  <TableCell width="5%">{row.workplaceID}</TableCell>
                  <TableCell width="5%">{this.actionsBlock(row)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {this.state.openAdd ? (
          <DialogAdd
            open={this.state.openAdd}
            check={this.validation}
            handleClose={this.handleClose}
            onUpdateSuccess={this.handleUpdateDataSuccess}
          ></DialogAdd>
        ) : null}
        {this.state.openEdit ? (
          <DialogEdit
            open={this.state.openEdit}
            check={this.validation}
            account={this.state.selectedAccount}
            handleClose={this.handleClose}
            onUpdateSuccess={this.handleUpdateDataSuccess}
          ></DialogEdit>
        ) : null}
        {this.state.openRemove ? (
          <DialogRemove
            open={this.state.openRemove}
            handleClose={this.handleClose}
            account={this.state.selectedAccount}
            onUpdateSuccess={this.handleUpdateDataSuccess}
          ></DialogRemove>
        ) : null}
        {this.state.errorMsg ? (
          <ToastMessage
            type="warning"
            message={this.state.errorMsg}
            handleCloseToast
          />
        ) : this.state.messageUpdated ? (
          <ToastMessage
            type="success"
            message={this.state.messageUpdated}
            handleCloseToast
          />
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

export default connect(null, mapDispatchToProps)(AccountManager);
