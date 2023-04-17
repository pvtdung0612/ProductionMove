import { Component } from "react";
import { Box, Button, TextField, Autocomplete } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import ToastMessage from "../../Toast/ToastMessage";
import { getSellReport } from "../../../api/manager";
import moment from "moment";
import "../../../assets/css/productTracking.scss";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { date } from "../../../utils/constant";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";
class SellReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      filterRows: null,
      pageSize: 10,
      messageUpdated: null,
      errorMsg: null,
      sellDateYear: null,
      sellDateMonth: "",
      sellDateQuarter: null,
      listMonthSelected: [],
    };
  }
  timerID = null;
  columns = [
    { field: "productID", headerName: "ID sản phẩm", width: 100 },
    {
      field: "productName",
      headerName: "Tên sản phẩm",
      width: 350,
    },
    {
      field: "productLine",
      headerName: "Dòng",
      width: 100,
    },
    {
      field: "productStatus",
      headerName: "Trạng thái",
      width: 150,
    },
    { field: "customerName", headerName: "Khách hàng", width: 100 },
    { field: "customerID", headerName: "ID", width: 50 },
    {
      field: "sellDate",
      headerName: "Ngày bán",
      type: "date",
      width: 100,
    },
    {
      field: "agentName",
      headerName: "Đại lý phân phối",
      width: 180,
    },
    {
      field: "insuranceTermEndDate",
      headerName: "Thời hạn bảo hành",
      type: "date",
      width: 150,
    },
    {
      field: "insuranceCenterName",
      headerName: "Trung tâm bảo hành",
      type: "date",
      width: 200,
    },
  ];

  componentDidMount() {
    this.getData();
  }

  // Lấy dữ liệu
  getData = async () => {
    const data = await getSellReport();
    if (data.errCode === -1) this.props.logOut();
    else if (data.errCode === 1) this.setState({ errorMsg: data.message });
    else
      this.setState({
        rows: data.data.map((record) => {
          return {
            ...record,
            sellDate: moment(record.sellDate).format("DD/MM/YYYY"),
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
    this.setState({ messageUpdated: message });
    setTimeout(this.handleCloseToast, 3000);
  };

  handleCloseToast = () => {
    clearTimeout(this.timerID);
    this.timerID = null;
    this.setState({ errorMsg: null, messageUpdated: null });
  };

  handleDateChange = (e, value, field) => {
    //lọc danh sách phù hợp với sự thay đổi
    const month =
      field === "Month"
        ? parseInt(value)
        : field === "Quarter"
        ? null
        : parseInt(this.state.sellDateMonth);
    const quarter =
      field === "Quarter" && value
        ? value.value
        : field === "Month"
        ? this.state.sellDateQuarter
        : null;
    const year = parseInt(moment(this.state.sellDateYear).format("YYYY"));
    let cnt = this.handlefilterRows(month, quarter, year);

    //update state
    if (field === "Month") {
      this.setState({ sellDateMonth: value ? value : null, filterRows: cnt });
    }
    if (field === "Quarter") {
      this.setState({
        sellDateQuarter: value ? value.value : null,
        sellDateMonth: null,
        filterRows: cnt,
        listMonthSelected: value ? value.months : this.state.listMonthSelected,
      });
    }
  };

  handlefilterRows(month, quarter, year) {
    const origin = this.state.rows;
    if (!year) return origin;
    else if (!quarter) return origin.filter((row) => row.sellDateYear === year);
    else if (!month)
      return origin.filter(
        (row) => row.sellDateYear === year && row.sellDateQuarter === quarter
      );
    else
      return origin.filter(
        (row) =>
          row.sellDateYear === year &&
          row.sellDateQuarter === quarter &&
          row.sellDateMonth === month
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
              value={this.state.sellDateMonth}
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
                value={this.state.sellDateYear}
                minDate={moment("24/12/1990", "DD/MM/YYYY")}
                maxDate={new Date()}
                onChange={(newValue) => {
                  const cnt = this.handlefilterRows(
                    parseInt(this.state.sellDateMonth),
                    this.state.sellDateQuarter,
                    parseInt(moment(newValue).format("YYYY"))
                  );
                  this.setState({
                    sellDateYear: newValue,
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
            Cập nhật thống kê
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
export default connect(mapStateToProps, mapDispatchToProps)(SellReport);
