import { Component } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import ToastMessage from "../../Toast/ToastMessage";
import { getErrorReport } from "../../../api/manager";
import "../../../assets/css/productTracking.scss";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";
class ErrorManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      pageSize: 10,
      messageUpdated: null,
      errorMsg: null,
    };
  }

  timerID = null;
  columns = [
    { field: "productID", headerName: "ID sản phẩm", width: 110 },
    {
      field: "productName",
      headerName: "Tên sản phẩm",
      width: 350,
    },
    { field: "customerID", headerName: "ID khách hàng", width: 110 },
    {
      field: "productLine",
      headerName: "Dòng",
      width: 100,
    },
    {
      field: "description",
      headerName: "Lỗi",
      width: 200,
    },
    {
      field: "productStatus",
      headerName: "Trạng thái sản phẩm",
      width: 160,
    },
    {
      field: "factoryName",
      headerName: "Nơi sản xuất",
      width: 120,
    },
    {
      field: "agentName",
      headerName: "Đại lý phân phối",
      width: 120,
    },
  ];
  componentDidMount() {
    this.getData();
  }

  // Lấy dữ liệu
  getData = async () => {
    const data = await getErrorReport();
    if (data.errCode === -1) this.props.logOut();
    else if (data.errCode === 1) this.setState({ errorMsg: data.message });
    else
      this.setState({
        rows: data.data,
      });
  };

  handleCloseToast = () => {
    clearTimeout(this.timerID);
    this.timerID = null;
    this.setState({ errorMsg: null, messageUpdated: null });
  };

  // Update lại dữ liệu
  handleUpdateDataSuccess = async (message) => {
    await this.getData();
    this.setState({ messageUpdated: message });
    setTimeout(this.handleCloseToast, 3000);
  };

  render() {
    return (
      <div className="product">
        <div className="btn-group">
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.handleUpdateDataSuccess("Cập nhật thành công")}
            className="btn"
          >
            Cập nhật thống kê
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
export default connect(mapStateToProps, mapDispatchToProps)(ErrorManager);
