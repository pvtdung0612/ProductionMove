import { Component } from "react";
import {
  getAgentProduct,
  getCustomers,
  getProductFactory,
} from "../../../api/manager";
import { Box, Button, TextField, Autocomplete } from "@mui/material";
import ToastMessage from "../../Toast/ToastMessage";
import { DataGrid } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { connect } from "react-redux";
import moment from "moment";
import DialogAdd from "../../Dialog/AgentProduct/DialogAdd";
import DialogSell from "../../Dialog/AgentProduct/DialogSell";
import DialogReport from "../../Dialog/AgentProduct/DialogReport";
import DialogReceive from "../../Dialog/AgentProduct/DialogReceive";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { date } from "../../../utils/constant";
import "../../../assets/css/productTracking.scss";
import * as actions from "../../../store/actions/actions";

class AgentProduct extends Component {
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
      openReport: false,
      openReceive: false,
      openSell: false,
      openAdd: false,
      listCustomer: [],
      listProductFactory: [],
    };
  }

  timerID = null;
  columns = [
    {
      field: "sell",
      headerName: "Bán",
      width: 65,
      renderCell: (params) => {
        return (
          <div className="actionsBlock">
            <Button variant="text" color="primary" title="Sell">
              <AttachMoneyIcon
                onClick={() => this.handleOpen(params.row, "Sell")}
              />
            </Button>
          </div>
        );
      },
      sortable: false,
    },
    {
      field: "receive",
      headerName: "Nhận bảo hành",
      width: 65,
      renderCell: (params) => {
        return (
          <div className="actionsBlock">
            <Button variant="text" color="primary" title="Nhận bảo hành">
              <MoveToInboxIcon
                onClick={() => this.handleOpen(params.row, "Receive")}
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
      field: "report",
      headerName: "Report",
      width: 65,
      renderCell: (params) => {
        return (
          <div className="actionsBlock">
            <Button variant="text" title="Report">
              <ErrorOutlineIcon
                onClick={() => this.handleOpen(params.row, "Report")}
              />
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
    const data = await getAgentProduct();
    const factory = await getProductFactory();
    const customers = await getCustomers();
    if (
      data.errCode === -1 ||
      factory.errCode === -1 ||
      customers.errCode === -1
    )
      this.props.logOut();
    else if (data.errCode === 1) this.setState({ errorMsg: data.message });
    else if (factory.errCode === 1)
      this.setState({ errorMsg: factory.message });
    else if (customers.errCode === 1)
      this.setState({ errorMsg: customers.message });
    else
      this.setState({
        listCustomer: customers.data,
        listProductFactory: factory.data,
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
      openReceive: false,
      openReport: false,
      openSell: false,
      openAdd: false,
      selectedItem: null,
      messageUpdated: null,
    });
  };

  //Dialog
  dialogAdd = () => {
    return (
      <DialogAdd
        open={this.state.openAdd}
        handleClose={this.handleClose}
        listProduct={this.state.listProductFactory}
        onUpdateSuccess={this.handleUpdateDataSuccess}
      />
    );
  };
  dialogReceive = () => {
    return (
      <DialogReceive
        open={this.state.openReceive}
        handleClose={this.handleClose}
        product={this.state.selectedItem}
        onUpdateSuccess={this.handleUpdateDataSuccess}
      />
    );
  };
  dialogReport = () => {
    return (
      <DialogReport
        open={this.state.openReport}
        handleClose={this.handleClose}
        product={this.state.selectedItem}
        onUpdateSuccess={this.handleUpdateDataSuccess}
      />
    );
  };
  dialogSell = () => {
    return this.state.openSell ? (
      <DialogSell
        open={this.state.openSell}
        handleClose={this.handleClose}
        product={this.state.selectedItem}
        listCustomer={this.state.listCustomer}
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
            onClick={() => this.handleOpen(null, "Add")}
            className="btn"
          >
            Thêm sản phẩm
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
        {this.state.openReceive ? this.dialogReceive() : null}
        {this.state.openAdd ? this.dialogAdd() : null}
        {this.state.openSell ? this.dialogSell() : null}
        {this.state.openReport ? this.dialogReport() : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(AgentProduct);
