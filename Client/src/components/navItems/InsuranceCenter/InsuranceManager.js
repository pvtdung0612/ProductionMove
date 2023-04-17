import { Component } from "react";
import {
  getInsuranceManager,
  receiveFromAgent,
  reportFactory,
  sendInsuranceAgent,
  sendInsuranceFactory,
} from "../../../api/manager";
import {
  Box,
  Button,
  TextField,
  Autocomplete,
  ButtonGroup,
} from "@mui/material";
import ToastMessage from "../../Toast/ToastMessage";
import { DataGrid } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { connect } from "react-redux";
import moment from "moment";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import ArticleIcon from "@mui/icons-material/Article";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import ReportIcon from "@mui/icons-material/Report";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { date } from "../../../utils/constant";
import "../../../assets/css/productTracking.scss";
import * as actions from "../../../store/actions/actions";
import DialogFinishInsurance from "../../Dialog/ManagerProduct/DialogFinishInsurance";

class InsunranceManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      filterRows: null,
      pageSize: 10,
      messageUpdated: null,
      errorMsg: null,
      selectedItem: null,
      // Ngày tháng
      bornDateYear: null,
      bornDateMonth: "",
      bornDateQuarter: null,
      listMonthSelected: [],
      // thêm, bán sp
      openFinishInsurance: false,
      openReport: false,
      openReceive: false,
      openSell: false,
      openAdd: false,
    };
  }

  timerID = null;
  columns = [
    {
      field: "action",
      headerName: "Actions",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="actionsBlock">
            <ButtonGroup>
              <Button variant="text" color="primary" title="Bảo hành">
                <ArticleIcon
                  onClick={() => this.handleOpen(params.row, "FinishInsurance")}
                />
              </Button>
              <Button variant="text" color="primary" title="Nhận từ đại lý">
                <MoveToInboxIcon
                  onClick={() => this.receiveFromAgent(params.row)}
                />
              </Button>
              <Button variant="text" title="Gửi nhà máy">
                <PrecisionManufacturingIcon
                  onClick={() => this.sendFactory(params.row)}
                />
              </Button>
              <Button variant="text" title="Gửi đại lý">
                <LoyaltyIcon onClick={() => this.sendAgent(params.row)} />
              </Button>
            </ButtonGroup>
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
      width: 140,
    },
    {
      field: "report",
      headerName: "Report",
      width: 50,
      renderCell: (params) => {
        return (
          <div className="actionsBlock">
            <Button variant="text" title="Báo nhà máy">
              <ReportIcon onClick={() => this.reportFactory(params.row)} />
            </Button>
          </div>
        );
      },
      sortable: false,
    },
  ];

  componentDidMount() {
    this.getData();
  }

  // Lấy dữ liệu
  getData = async () => {
    const data = await getInsuranceManager();
    console.log(data);
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
            insuranceTermEndDate: moment(record.insuranceTermEndDate).format(
              "DD/MM/YYYY"
            ),
          };
        }),
      });
  };

  // Update lại dữ liệu
  handleUpdateDataSuccess = async (message) => {
    await this.getData();
    this.handleClose();
    this.setState({ messageUpdated: message });
    this.timerID = setTimeout(this.handleCloseToast, 3000);
  };
  //Đóng Toast
  handleCloseToast = () => {
    clearTimeout(this.timerID);
    this.timerID = null;
    this.setState({ errorMsg: null, messageUpdated: null });
  };

  //Xử lý open and close dialog
  handleOpen = (row, field) => {
    this.setState({
      [`open${field}`]: true,
      selectedItem: row,
    });
  };
  handleClose = () => {
    this.setState({
      openFinishInsurance: false,
      selectedItem: null,
      messageUpdated: null,
    });
  };

  //Gửi cho khách hàng
  receiveFromAgent = async (row) => {
    this.handleCloseToast();
    const payload = {
      productID: row.id,
    };
    console.log(payload);
    await receiveFromAgent(payload).then((res) => {
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
  //Gửi lại nhà máy
  sendFactory = async (row) => {
    this.handleCloseToast();
    const payload = {
      productID: row.id,
      factoryID: row.factoryID,
    };
    console.log(payload);
    await sendInsuranceFactory(payload).then((res) => {
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
  //báo nhà máy
  reportFactory = async (row) => {
    this.handleCloseToast();
    const payload = {
      productID: row.id,
      factoryID: row.factoryID,
    };
    console.log(payload);
    await reportFactory(payload).then((res) => {
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
  //Gửi đại lý
  sendAgent = async (row) => {
    this.handleCloseToast();
    const payload = {
      productID: row.id,
      agentID: row.agentID,
    };
    console.log(payload);
    await sendInsuranceAgent(payload).then((res) => {
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

  //Dialog
  dialogFinishInsurance = () => {
    return this.state.openFinishInsurance ? (
      <DialogFinishInsurance
        open={this.state.openFinishInsurance}
        handleClose={this.handleClose}
        product={this.state.selectedItem}
        onUpdateSuccess={this.handleUpdateDataSuccess}
      />
    ) : null;
  };

  //Date change
  handleDateChange = (e, value, field) => {
    //lọc danh sách phù hợp với sự thay đổi
    const month =
      field === "Month"
        ? parseInt(value)
        : field === "Quarter"
        ? null
        : parseInt(this.state.bornDateMonth);
    const quarter =
      field === "Quarter" && value
        ? value.value
        : field === "Month"
        ? this.state.bornDateQuarter
        : null;
    const year = parseInt(moment(this.state.bornDateYear).format("YYYY"));
    let cnt = this.handlefilterRows(month, quarter, year);

    //update state
    if (field === "Month") {
      this.setState({ bornDateMonth: value ? value : null, filterRows: cnt });
    }
    if (field === "Quarter") {
      this.setState({
        bornDateQuarter: value ? value.value : null,
        bornDateMonth: null,
        filterRows: cnt,
        listMonthSelected: value ? value.months : this.state.listMonthSelected,
      });
    }
  };

  handlefilterRows(month, quarter, year) {
    const origin = this.state.rows;
    if (!year) return origin;
    else if (!quarter) return origin.filter((row) => row.bornDateYear === year);
    else if (!month)
      return origin.filter(
        (row) => row.bornDateYear === year && row.bornDateQuarter === quarter
      );
    else
      return origin.filter(
        (row) =>
          row.bornDateYear === year &&
          row.bornDateQuarter === quarter &&
          row.bornDateMonth === month
      );
  }

  render() {
    console.log(this.state.openSell);
    return (
      <div className="product">
        <div className="btn-group">
          <div className="date-picker">
            <Autocomplete
              margin="dense"
              onChange={(e, value) => this.handleDateChange(e, value, "Month")}
              defaultValue=""
              value={this.state.bornDateMonth}
              getOptionLabel={(option) => option.toString()}
              options={this.state.listMonthSelected}
              renderInput={({ inputProps, ...rest }) => {
                return (
                  <TextField
                    {...rest}
                    label="Tháng"
                    inputProps={{ ...inputProps, readOnly: true }}
                  ></TextField>
                );
              }}
            />
            <Autocomplete
              margin="dense"
              onChange={(e, value) =>
                this.handleDateChange(e, value, "Quarter")
              }
              defaultValue={null}
              getOptionLabel={(option) => option.label}
              options={date.QUARTER}
              renderInput={({ inputProps, ...rest }) => {
                return (
                  <TextField
                    {...rest}
                    label="Quý"
                    inputProps={{ ...inputProps, readOnly: true }}
                  ></TextField>
                );
              }}
            />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                style={{ with: "150px" }}
                views={["year"]}
                label="Năm"
                openTo="year"
                value={this.state.bornDateYear}
                minDate={moment("24/12/1990", "DD/MM/YYYY")}
                maxDate={new Date()}
                onChange={(newValue) => {
                  const cnt = this.handlefilterRows(
                    parseInt(this.state.bornDateMonth),
                    this.state.bornDateQuarter,
                    parseInt(moment(newValue).format("YYYY"))
                  );
                  this.setState({
                    bornDateYear: newValue,
                    filterRows: cnt,
                  });
                }}
                renderInput={(props) => <TextField {...props} margin="none" />}
              />
            </LocalizationProvider>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.handleUpdateDataSuccess("Cập nhật thành công")}
            className="btn"
          >
            Cập nhật
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
        {this.state.openFinishInsurance ? this.dialogFinishInsurance() : null}
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
    logOut: () => dispatch(actions.logOut()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsunranceManagement);
