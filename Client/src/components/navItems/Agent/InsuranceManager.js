import { Component } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { connect } from "react-redux";
import moment from "moment";
import {
  getInsuranceCenter,
  getInsuranceManagement,
  sendBackFactory,
  sendInsuranceCustomer,
} from "../../../api/manager";
import DialogSendInsurance from "../../Dialog/InsuranceManager/DialogSendInsurance";
import DialogReceive from "../../Dialog/InsuranceManager/DialogReceive";
import DialogSendMail from "../../Dialog/InsuranceManager/DialogSendMail";
import ToastMessage from "../../Toast/ToastMessage";
import SendIcon from "@mui/icons-material/Send";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import "../../../assets/css/productTracking.scss";
import * as actions from "../../../store/actions/actions";

class InsuranceManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      filterRows: null,
      pageSize: 10,
      messageUpdated: null,
      errorMsg: null,
      // Ngày tháng
      bornDateYear: null,
      bornDateMonth: "",
      bornDateQuarter: null,
      listMonthSelected: [],
      //dialog
      openSendInsurance: false,
      openSendFactory: false,
      openSendMail: false,
      openReceive: false,
      selectedItem: null,
      listInsuranceCenter: [],
      //tgian toast
      duration: 3000,
    };
  }

  timerID = null;
  columns = [
    {
      field: "send",
      headerName: "Gửi",
      width: 55,
      renderCell: (params) => {
        return (
          <div className="actionsBlock">
            <Button
              variant="text"
              // color="primary"
              title="Gửi cho khách hàng"
            >
              <SendIcon onClick={() => this.sendCustomer(params.row)} />
            </Button>
          </div>
        );
      },
      sortable: false,
    },
    {
      field: "back",
      headerName: "Trả",
      width: 55,
      renderCell: (params) => {
        return (
          <div className="actionsBlock">
            <Button variant="text" color="primary" title="Gửi trả nhà máy">
              <PrecisionManufacturingIcon
                onClick={() => this.sendFactory(params.row)}
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
      field: "factoryName",
      headerName: "Cơ sở sản xuất",
      width: 160,
    },
    {
      field: "insurancecenterName",
      headerName: "Trung tâm bảo hành",
      width: 160,
    },
    {
      field: "insuranceResult",
      headerName: "Kết quả bảo hành",
      width: 160,
    },
  ];

  componentDidMount() {
    this.getData();
  }

  // Lấy dữ liệu
  getData = async () => {
    const data = await getInsuranceManagement();
    const center = await getInsuranceCenter();
    if (data.errCode === -1 || center.errCode === -1) this.props.logOut();
    else if (data.errCode === 1) this.setState({ errorMsg: data.message });
    else if (center.errCode === 1) this.setState({ errorMsg: center.message });
    else
      this.setState({
        listInsuranceCenter: center.data,
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
    this.timerID = setTimeout(this.handleCloseToast, 3000);
  };

  handleCloseToast = () => {
    clearTimeout(this.timerID);
    this.timerID = null;
    this.setState({ errorMsg: null, messageUpdated: null });
  };

  //Gửi cho khách hàng
  sendCustomer = async (row) => {
    this.handleCloseToast();
    const payload = {
      productID: row.id,
    };
    await sendInsuranceCustomer(payload).then((res) => {
      //Thành công thêm, gửi thông điệp khi update
      if (res.errCode === -1) this.props.logOut();
      else if (res.errCode === 0) this.handleUpdateDataSuccess(res.message);

      // Lỗi valid phía server
      if (res.errCode === 1) {
        this.setState({
          errorMsg: res.message,
        });
        this.timerID = setTimeout(this.handleCloseToast, 3000);
      }
    });
  };

  sendFactory = async (row) => {
    clearTimeout(this.timerID);
    const payload = {
      productID: row.id,
    };
    this.handleCloseToast();
    await sendBackFactory(payload).then((res) => {
      //Thành công thêm, gửi thông điệp khi update
      if (res.errCode === -1) this.props.logOut();
      else if (res.errCode === 0) {
        this.handleOpen(row, "SendMail");
      }

      // Lỗi valid phía server
      if (res.errCode === 1) {
        this.setState({
          errorMsg: res.message,
        });
        this.timerID = setTimeout(this.handleCloseToast, 3000);
      }
    });
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
      openReceive: false,
      openSendInsurance: false,
      openSendMail: false,
      messageUpdated: null,
      selectedItem: null,
    });
  };

  dialogSendInsurance = () => {
    return this.state.openSendInsurance ? (
      <DialogSendInsurance
        open={this.state.openSendInsurance}
        handleClose={this.handleClose}
        onUpdateSuccess={this.handleUpdateDataSuccess}
        listProduct={this.state.rows}
        listInsuranceCenter={this.state.listInsuranceCenter}
      />
    ) : null;
  };
  dialogReceive = () => {
    return this.state.openReceive ? (
      <DialogReceive
        open={this.state.openReceive}
        handleClose={this.handleClose}
        onUpdateSuccess={this.handleUpdateDataSuccess}
        listProduct={this.state.rows}
      />
    ) : null;
  };
  dialogSendMail = () => {
    return this.state.openSendMail ? (
      <DialogSendMail
        open={this.state.openSendMail}
        handleClose={this.handleClose}
        product={this.state.selectedItem}
        onUpdateSuccess={this.handleUpdateDataSuccess}
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
            onClick={() => this.handleOpen(null, "SendInsurance")}
            className="btn"
            title="Gửi sản phẩm lỗi cho ttbh"
          >
            Gửi TTBH
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.handleOpen(null, "Receive")}
            className="btn"
            title="Nhận sản phẩm từ ttbh"
          >
            Nhận TTBH
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
        {this.state.openSendInsurance ? this.dialogSendInsurance() : null}
        {this.state.openReceive ? this.dialogReceive() : null}
        {this.state.openSendMail ? this.dialogSendMail() : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceManager);
