import { Component } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { grey } from "@mui/material/colors";
import DialogAdd from "../../Dialog/FactoryManager/DialogAdd";
import DialogDelete from "../../Dialog/FactoryManager/DialogDelete";
import DialogSend from "../../Dialog/FactoryManager/DialogSend";
import ToastMessage from "../../Toast/ToastMessage";
import {
  getAllAgent,
  getAllFactory,
  getAllProductLine,
} from "../../../api/manager";
import moment from "moment";
import "../../../assets/css/productTracking.scss";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";
class FactoryManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      pageSize: 10,
      selectedItem: null,
      openSend: false,
      openDelete: false,
      openAdd: false,
      listProductLineNumbers: [],
      listAgent: [],
      errorMsg: null,
      messageUpdated: null,
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
            <Button variant="text" color="primary" title="Xóa">
              <DeleteIcon
                onClick={() => this.handleDialogOpen(params.row, "Delete")}
              />
            </Button>
          </div>
        );
      },
      sortable: false,
    },
    {
      field: "send",
      headerName: "Gửi",
      width: 50,
      renderCell: (params) => {
        return (
          <div className="actionsBlock">
            <Button variant="text" color="primary" title="Gửi cho đại lý">
              <SendIcon
                onClick={() => this.handleDialogOpen(params.row, "Send")}
              />
            </Button>
          </div>
        );
      },
      sortable: false,
    },

    { field: "id", headerName: "ID", width: 50 },
    {
      field: "name",
      headerName: "Tên sản phẩm",
      width: 350,
    },
    {
      field: "productLine",
      headerName: "Dòng",
      width: 100,
    },
    {
      field: "bornDate",
      headerName: "Ngày sản xuất",
      type: "date",
      width: 110,
    },
    {
      field: "factoryName",
      headerName: "Nơi sản xuất",
      width: 160,
    },
    {
      field: "bornDateMonth",
      headerName: "Tháng",
      width: 80,
    },
    {
      field: "bornDateQuarter",
      headerName: "Quý",
      width: 50,
    },
    {
      field: "bornDateYear",
      headerName: "Năm",
      width: 80,
    },
    {
      field: "insurancecenterName",
      headerName: "Trung tâm bảo hành",
      width: 150,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 100,
    },
  ];
  componentDidMount() {
    this.getData();
  }

  // Lấy dữ liệu
  getData = async () => {
    const data = await getAllFactory();
    const productLines = await getAllProductLine();
    const agents = await getAllAgent();

    if (
      data.errCode === -1 ||
      productLines.errCode === -1 ||
      agents.errCode === -1
    )
      this.props.logOut();
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
        listProductLine: productLines.data,
        listAgent: agents.data,
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

  handleDialogOpen = (item, field) => {
    this.setState({
      [`open${field}`]: true,
      selectedItem: item,
    });
  };

  handleClose = () => {
    this.setState({
      openSend: false,
      openAdd: false,
      openDelete: false,
      selectedItem: null,
      messageUpdated: null,
    });
  };

  // DialogAdd
  dialogAdd = () => {
    return this.state.openAdd ? (
      <DialogAdd
        open={this.state.openAdd}
        handleClose={this.handleClose}
        onUpdateSuccess={this.handleUpdateDataSuccess}
        listProductLine={this.state.listProductLine}
      />
    ) : null;
  };
  dialogSend = () => {
    return this.state.openSend ? (
      <DialogSend
        open={this.state.openSend}
        handleClose={this.handleClose}
        onUpdateSuccess={this.handleUpdateDataSuccess}
        listAgent={this.state.listAgent}
        item={this.state.selectedItem}
      />
    ) : null;
  };
  dialogDelete = () => {
    return this.state.openDelete ? (
      <DialogDelete
        open={this.state.openDelete}
        handleClose={this.handleClose}
        onUpdateSuccess={this.handleUpdateDataSuccess}
        item={this.state.selectedItem}
      />
    ) : null;
  };

  render() {
    console.log(this.state.openDelete);
    return (
      <div className="product">
        <div className="btn-group">
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.handleDialogOpen(null, "Add")}
            className="btn"
          >
            Thêm lô sản phẩm
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
          />
        </Box>
        {this.state.openAdd ? this.dialogAdd() : null}
        {this.state.openSend ? this.dialogSend() : null}
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
export default connect(mapStateToProps, mapDispatchToProps)(FactoryManager);
