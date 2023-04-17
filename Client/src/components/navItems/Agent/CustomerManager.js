import { Component } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { connect } from "react-redux";
import { getCustomerManager } from "../../../api/manager";
import ToastMessage from "../../Toast/ToastMessage";
import "../../../assets/css/productTracking.scss";
import * as actions from "../../../store/actions/actions";
import DialogAdd from "../../Dialog/CustomerManager/DialogAdd";
import DialogDelete from "../../Dialog/CustomerManager/DialogDelete";
import DialogEdit from "../../Dialog/CustomerManager/DialogEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

class CustomerManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      filterRows: null,
      pageSize: 10,
      messageUpdated: null,
      errorMsg: null,
      //
      openAdd: false,
      openDelete: false,
      openEdit: false,
      selectedItem: null,
    };
  }

  timerID = null;
  columns = [
    {
      field: "delete",
      headerName: "Xóa",
      width: 50,
      renderCell: (params) => {
        return (
          <div className="actionsBlock">
            <Button variant="text" title="Xóa">
              <DeleteForeverIcon
                onClick={() => this.handleOpen(params.row, "Delete")}
              />
            </Button>
          </div>
        );
      },
      sortable: false,
    },
    {
      field: "edit",
      headerName: "Sửa",
      width: 50,
      renderCell: (params) => {
        return (
          <div className="actionsBlock">
            <Button variant="text" title="Sửa">
              <EditIcon onClick={() => this.handleOpen(params.row, "Edit")} />
            </Button>
          </div>
        );
      },
      sortable: false,
    },
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },
    { field: "name", headerName: "Tên khách hàng", width: 100 },
    {
      field: "sdt",
      headerName: "Số đth",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 350,
    },
  ];

  componentDidMount() {
    this.getData();
  }

  // Lấy dữ liệu
  getData = async () => {
    const data = await getCustomerManager();
    if (data.errCode === -1) this.props.logOut();
    else if (data.errCode === 1) this.setState({ errorMsg: data.message });
    else
      this.setState({
        rows: data.data,
      });
  };

  // Update lại dữ liệu
  handleUpdateDataSuccess = async (message) => {
    await this.getData();
    this.handleClose();
    this.setState({ messageUpdated: message });
    this.timerID = setTimeout(this.handleCloseToast, 3000);
  };

  handleCloseToast = () => {
    clearTimeout(this.timerID);
    this.timerID = null;
    this.setState({ errorMsg: null, messageUpdated: null });
  };

  //Handle dialog
  handleOpen = (row, field) => {
    this.setState({
      [`open${field}`]: true,
      selectedItem: row,
    });
  };
  handleClose = () => {
    this.setState({
      openAdd: false,
      openDelete: false,
      openEdit: false,
      errorMsg: null,
      messageUpdated: null,
      selectedItem: null,
    });
  };

  dialogAdd = () => {
    return this.state.openAdd ? (
      <DialogAdd
        open={this.state.openAdd}
        handleClose={this.handleClose}
        onUpdateSuccess={this.handleUpdateDataSuccess}
        customer={this.state.selectedItem}
      />
    ) : null;
  };
  dialogDelete = () => {
    return this.state.openDelete ? (
      <DialogDelete
        open={this.state.openDelete}
        handleClose={this.handleClose}
        onUpdateSuccess={this.handleUpdateDataSuccess}
        customer={this.state.selectedItem}
      />
    ) : null;
  };
  dialogEdit = () => {
    return this.state.openEdit ? (
      <DialogEdit
        open={this.state.openEdit}
        handleClose={this.handleClose}
        onUpdateSuccess={this.handleUpdateDataSuccess}
        customer={this.state.selectedItem}
      />
    ) : null;
  };

  render() {
    return (
      <div className="product">
        <div className="btn-group">
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.handleOpen(null, "Add")}
            className="btn"
            title="Gửi sản phẩm lỗi cho ttbh"
          >
            Thêm
          </Button>
        </div>
        <Box sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={
              this.state.filterRows === null
                ? this.state.rows
                : this.state.filterRows
            }
            columns={this.columns}
            getRowId={(row) => row.id}
            disableSelectionOnClick
            getRowHeight={() => "auto"}
            pageSize={this.state.pageSize}
            rowsPerPageOptions={[10, 15, 20]}
            onPageSizeChange={(newPageSize) =>
              this.setState({ pageSize: newPageSize })
            }
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 2,
              bottom: params.isLastVisible ? 0 : 2,
            })}
            sx={{
              [`.MuiDataGrid-row`]: {
                bgcolor: grey[200],
              },
            }}
            onSelectionModelChange={(ids) => {
              this.handleSelectedRow(ids);
            }}
          />
        </Box>
        {this.state.openEdit ? this.dialogEdit() : null}
        {this.state.openAdd ? this.dialogAdd() : null}
        {this.state.openDelete ? this.dialogDelete() : null}
        {this.state.errorMsg ? (
          <ToastMessage
            type="warning"
            message={this.state.errorMsg}
            onClose={this.handleCloseToast}
          />
        ) : this.state.messageUpdated ? (
          <ToastMessage
            type="success"
            message={this.state.messageUpdated}
            onClose={this.handleCloseToast}
          />
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.app.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginSuccess: (inFo) => dispatch(actions.loginSuccess(inFo)),
    logOut: () => dispatch(actions.logOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerManager);
