import { Component } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getItems } from "../../../api/manager";
import "../../../assets/css/productTracking.scss";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";
const columns = [
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
    // type: "number",
    width: 110,
  },
  {
    field: "factoryName",
    headerName: "Nơi sản xuất",
    // description: "This column has a value getter and is not sortable.",
    // sortable: false,
    width: 160,
  },
  {
    field: "agentName",
    headerName: "Đại lý phân phối",
    width: 150,
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

class ProductTracking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      selectedItem: null,
      openEdit: false,
      openRemove: false,
      openAdd: false,
    };
  }

  componentDidMount() {
    this.getData();
  }
  // Lấy dữ liệu
  getData = async () => {
    const data = await getItems();
    if (data.errCode === -1) this.props.logOut();
    else if (data.errCode === 1) this.setState({ errorMsg: data.message });
    else this.setState({ rows: data.data });
  };

  // Update lại dữ liệu
  handleUpdateDataSuccess = async () => {
    await this.getData();
    await this.handleClose();
  };

  actionsBlock = (item) => {
    return (
      <div className="actionsBlock">
        <EditIcon onClick={() => this.handleEditOpen(item)} />
        <DeleteIcon onClick={() => this.handleRemoveOpen(item)} />
      </div>
    );
  };

  render() {
    return (
      <div className="product">
        <Box sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            getRowHeight={() => "auto"}
            rows={this.state.rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection={false}
          />
        </Box>
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
export default connect(null, mapDispatchToProps)(ProductTracking);
