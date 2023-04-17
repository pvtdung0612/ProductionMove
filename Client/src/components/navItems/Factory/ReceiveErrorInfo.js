import { Component } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import ToastMessage from "../../Toast/ToastMessage";
import { getErrorInfo } from "../../../api/manager";
import moment from "moment";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import DialogReceive from "../../Dialog/ReceiveErrorInfo/DialogReceive";
import "../../../assets/css/productTracking.scss";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";
class ReceiveErrorInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      pageSize: 10,
      messageUpdated: null,
      errorMsg: null,
      openReceive: false,
      selectedItem: null,
    };
  }

  timerID = null;
  columns = [
    {
      field: "actions",
      headerName: "Actions",
      width: 65,
      renderCell: (params) => {
        return (
          <div className="actionsBlock">
            <Button variant="text" color="primary" title="Nhận về kho">
              <MarkunreadMailboxIcon
                onClick={() => this.handleReceiveOpen(params.row)}
              />
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
    { field: "name", headerName: "Tên sản phẩm", width: 350 },
    {
      field: "productLine",
      headerName: "Dòng",
      width: 100,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 150,
    },
    {
      field: "bornDate",
      headerName: "Ngày sản xuất",
      width: 120,
    },
    {
      field: "insurancecenterName",
      headerName: "Trung tâm bảo hành",
      width: 160,
    },
  ];
  componentDidMount() {
    this.getData();
  }

  // Lấy dữ liệu
  getData = async () => {
    const data = await getErrorInfo();
    if (data.errCode === -1) this.props.logOut();
    else if (data.errCode === 1) this.setState({ errorMsg: data.message });
    else
      this.setState({
        rows: data.data.map((record) => {
          return {
            ...record,
            bornDate: moment(record.bornDate, "MM/DD/YYYY").format(
              "DD/MM/YYYY"
            ),
          };
        }),
      });
  };

  // Update lại dữ liệu
  handleUpdateDataSuccess = async (message) => {
    await this.getData();
    await this.handleClose();
    this.setState({ messageUpdated: message });
    setTimeout(this.handleCloseToast, 3000);
  };

  handleCloseToast = () => {
    clearTimeout(this.timerID);
    this.timerID = null;
    this.setState({ errorMsg: null, messageUpdated: null });
  };
  //Xử lý open dialog receive
  handleReceiveOpen = (row) => {
    this.setState({
      openReceive: true,
      selectedItem: row,
    });
  };

  handleClose = () => {
    this.setState({
      openReceive: false,
      selectedItem: null,
    });
  };

  //Dialog receive
  dialogReceive = () => {
    return (
      <DialogReceive
        open={this.state.openReceive}
        item={this.state.selectedItem}
        handleClose={this.handleClose}
        onUpdateSuccess={this.handleUpdateDataSuccess}
      />
    );
  };

  render() {
    return (
      <div className="product">
        <div className="btn-group">
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              this.handleUpdateDataSuccess("Nhận thông tin thành công")
            }
            className="btn"
          >
            Cập nhật thông tin
          </Button>
        </div>
        <Box sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={this.state.rows}
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
        {this.state.openReceive ? this.dialogReceive() : null}
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
export default connect(mapStateToProps, mapDispatchToProps)(ReceiveErrorInfo);
